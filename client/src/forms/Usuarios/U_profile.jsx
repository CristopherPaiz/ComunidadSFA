import React, { useContext, useEffect, useState } from "react";
import API_URL from "../../config";
import { Navigate } from "react-router-dom";
import { Button, Avatar, Divider, Input } from "@nextui-org/react";
import { contexto } from "../../context/ContextProvider";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { fromBlob } from "image-resize-compress";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const U_profile = () => {
  const { loggedIn, usuario, setUsuario } = useContext(contexto);
  const [loadingUsuario, setLoadingUsuario] = useState(true);

  //Nombre y nombre de usuario
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [username, setUsername] = useState(usuario?.username ?? "");

  //Contraseña
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  //useState para las imágenes
  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  //useState para cambiar color al input de ocntraseña
  const [passwordState, setPasswordState] = useState("valid");
  const [mensajeError, setMensajeError] = useState("");
  const [errorState, setErrorState] = useState(true);

  const handleFormSubmitNombre = async () => {
    try {
      const formattedData = {
        nombre: nombre,
        username: username,
      };
      const response = await fetch(`${API_URL}/user/update/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Datos actualizados correctamente");

        // Actualizar datos locales si es necesario
        const datosSFA = JSON.parse(localStorage.getItem("demasdatosSFA"));
        if (datosSFA) {
          const datosFinales = {
            ...datosSFA,
            nombre: data.resultado.nombre,
            username: data.resultado.username,
          };
          setUsuario(datosFinales);
          localStorage.setItem("demasdatosSFA", JSON.stringify(datosFinales));
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Error al actualizar datos del usuario: " + error.message);
    }
  };

  const handleFormSubmitContrasenia = async () => {
    if (password !== repetirPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const formattedData = {
        contrasenia: password,
      };
      const response = await fetch(`${API_URL}/user/update/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Contraseña actualizada correctamente");
        await response.json();
        //vaciamos los campos
        setPassword("");
        setRepetirPassword("");
      } else {
        toast.error("Error al actualizar la contraseña");
      }
    } catch (error) {
      toast.error("Error al actualizar la contraseña", error);
    }
  };

  //código para subir a cloudinary
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Create an array to store the compressed images
    const compressedImages = [];

    for (const file of files) {
      // Compress the image using image-resize-compress library
      try {
        const compressedImage = await fromBlob(file, 80, "auto", 300, "webp"); // Comprimir la imagen con calidad 80 y formato webp
        compressedImages.push(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        // If there's an error in compression, add the original image
        compressedImages.push(file);
      }
    }

    // Set the compressed images to the state
    setImagenes(compressedImages);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...imagenes];
    newImages.splice(index, 1);
    setImagenes(newImages);
  };

  const handleFormSubmitImagen = async () => {
    try {
      setLoadingImages(true);
      setShowLoadingToast(true);
      // Upload each image to Cloudinary and get the URLs
      const uploadedImages = await Promise.all(imagenes.map((file) => uploadImageToCloudinary(file)));
      // Format the data including the uploaded image URLs
      const formattedData = {
        foto: uploadedImages[0],
      };
      const response = await fetch(`${API_URL}/user/update/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      if (response.ok) {
        setLoadingImages(false);
        setShowLoadingToast(false);
        toast.success("Imagen Actualizada correctamente");

        // Actualizar datos locales si es necesario
        const datosSFA = JSON.parse(localStorage.getItem("demasdatosSFA"));
        if (datosSFA) {
          const datosFinales = {
            ...datosSFA,
            foto: uploadedImages[0],
          };
          setUsuario(datosFinales);
          localStorage.setItem("demasdatosSFA", JSON.stringify(datosFinales));
        }
        setImagenes([]);
      } else {
        // Show an error toast if there was an issue adding the client
        setLoadingImages(false);
        setShowLoadingToast(false);
        toast.error("Error al actualizar la imagen de perfil");
      }
    } catch (error) {
      setLoadingImages(false);
      setShowLoadingToast(false);
      toast.error("Error al actualizar la imagen de perfil", error);
    }
  };

  const getSaludo = (nombre) => {
    const hora = new Date().getHours();

    if (hora >= 0 && hora < 12) {
      return `Buenos días, ${nombre}`;
    } else if (hora >= 12 && hora < 18) {
      return `Buenas tardes, ${nombre}`;
    } else {
      return `Buenas noches, ${nombre}`;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadingUsuario(false);
    }, 200);
  }, []);

  //useEffect para controlar estado y mensaje de error de contraseña
  useEffect(() => {
    if (password === "" || repetirPassword === "") {
      setPasswordState("valid");
      setMensajeError("");
      setErrorState(true);
    } else if (password !== repetirPassword) {
      setPasswordState("invalid");
      setMensajeError("Las contraseñas no coinciden");
      setErrorState(true);
    } else {
      setPasswordState("valid");
      setMensajeError("");
      setErrorState(false);
    }
  }, [repetirPassword]);

  if (loadingUsuario) {
    return <Loading />;
  }

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (usuario && (usuario.rol === "Admin" || usuario.rol === "Moderator" || usuario.rol === "Super")) {
    return (
      <div className="mx-5 flex flex-col mb-10">
        <Toaster />
        <Avatar
          src={usuario?.foto ?? ""}
          name={usuario.nombre}
          className="w-40 h-40 text-4xl mt-2 mb-4 mx-auto"
        />
        <h1 className="text-3xl font-semibold text-center">{getSaludo(usuario.nombre)}</h1>
        <div className="gap-2 w-11/12 mx-auto sm:w-5/12 ">
          <Divider className="my-5" />
          <h1 className="text-lg font-semibold text-left opacity-50">Ajustes de la cuenta:</h1>
          <div className="mt-4 flex p-4 gap-6 flex-col bg-neutral-200 dark:bg-neutral-900 rounded-xl">
            <Input
              type="text"
              label="Nombre"
              defaultValue={usuario?.nombre ?? ""}
              labelPlacement="outside"
              placeholder="Ingrese su nombre"
              autoComplete="nope"
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              type="text"
              label="Nombre de usuario"
              defaultValue={usuario?.username ?? ""}
              labelPlacement="outside"
              placeholder="Ingrese un nombre de usuario"
              description="Este nombre de usuario deberá ser único, no podrá repetirse con algún otro usuario"
              autoComplete="nope"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button color="success" className="text-white" onClick={handleFormSubmitNombre}>
              Guardar
            </Button>
          </div>
        </div>
        <div className="gap-2 w-11/12 mx-auto sm:w-5/12">
          <Divider className="my-5" />
          <h1 className="text-lg font-semibold text-left opacity-50">Cambiar contraseña:</h1>
          <div className="mt-4  flex p-4 gap-6 flex-col bg-neutral-200 dark:bg-neutral-900 rounded-xl">
            <Input
              type="password"
              label="Nueva contraseña"
              labelPlacement="outside"
              placeholder="Ingrese la nueva contraseña"
              autoComplete="nope"
              value={password}
              onValueChange={setPassword}
            />
            <Input
              type="password"
              label="Repita la nueva contraseña"
              labelPlacement="outside"
              validationState={passwordState}
              placeholder="Repita la nueva contraseña"
              errorMessage={mensajeError}
              autoComplete="nope"
              value={repetirPassword}
              onValueChange={setRepetirPassword}
            />
            <Button
              isDisabled={errorState ? true : false}
              color="success"
              className="text-white"
              onClick={handleFormSubmitContrasenia}
            >
              Actualizar contraseña
            </Button>
          </div>
        </div>
        <div className="gap-2 w-11/12 mx-auto sm:w-5/12">
          <div className="mt-4  flex p-4 gap-6 flex-col bg-neutral-200 dark:bg-neutral-900 rounded-xl">
            <p className="font-bold text-[18px] sm:hidden -mb-2">Ingrese una imagen de perfil:</p>
            <div className="flex items-center justify-center p-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Toca para subir</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="flex flex-wrap flex-row w-full">
              {imagenes.map((file, index) => (
                <div key={index} className="mx-auto">
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Previsualización ${index}`}
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      className="rounded-xl mx-auto text-center"
                    />
                    <Button
                      size="tiny"
                      onClick={() => handleRemoveImage(index)}
                      className="text-white bg-danger"
                      style={{
                        marginTop: "5px",
                        width: "70px",
                        textAlign: "center",
                      }}
                    >
                      X
                    </Button>
                  </div>
                  <Button
                    color="success"
                    className="text-white mx-auto px-10"
                    onClick={handleFormSubmitImagen}
                  >
                    Actualizar foto de perfil
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default U_profile;
