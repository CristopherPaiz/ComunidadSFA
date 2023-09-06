import React, { useState, useEffect } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { fromBlob } from "image-resize-compress";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const EditarBeneficiario = () => {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();

  //capturar los datos de State que viene de la página anterior
  const { beneficiarioSeleccionado } = location.state;
  const beneficiario = beneficiarioSeleccionado;

  //si no hay nada mandarlo de regreso
  if (!location.state) {
    return <Navigate to={"/social"} />;
  }

  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  const [imagenesDoc, setImagenesDoc] = useState([]);
  const [loadingImagesDoc, setLoadingImagesDoc] = useState(false);
  const [showLoadingToastDoc, setShowLoadingToastDoc] = useState(false);

  const navigate = useNavigate();

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosBeneficiarioActualizado, setDatosBeneficiarioActualizado] = useState({
    ...beneficiario,
  });

  /////////////////////////////////////////////////////////////////////////
  // imágenes para el beneficiario
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Create an array to store the compressed images
    const compressedImages = [];

    for (const file of files) {
      // Compress the image using image-resize-compress library
      try {
        const compressedImage = await fromBlob(file, 80, "auto", 800, "webp"); // Comprimir la imagen con calidad 80 y formato webp
        compressedImages.push(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        // If there's an error in compression, add the original image
        compressedImages.push(file);
      }
    }

    // Set the compressed images to the state
    setImagenes([...imagenes, ...compressedImages]);
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

  /////////////////////////////////////////////////////////////////////////
  // imágenes para otros documentos
  const handleImageChangeDoc = async (e) => {
    const files = Array.from(e.target.files);

    // Create an array to store the compressed images
    const compressedImages = [];

    for (const file of files) {
      // Compress the image using image-resize-compress library
      try {
        const compressedImage = await fromBlob(file, 80, "auto", 1200, "webp"); // Comprimir la imagen con calidad 80 y formato webp
        compressedImages.push(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        // If there's an error in compression, add the original image
        compressedImages.push(file);
      }
    }

    // Set the compressed images to the state
    setImagenesDoc([...imagenesDoc, ...compressedImages]);
  };

  const uploadImageToCloudinaryDoc = async (file) => {
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

  const handleRemoveImageDoc = (index) => {
    const newImages = [...imagenesDoc];
    newImages.splice(index, 1);
    setImagenesDoc(newImages);
  };

  const handleFormSubmit = async () => {
    setLoadingImages(true);
    setLoadingImagesDoc(true);
    setShowLoadingToast(true);
    setShowLoadingToastDoc(true);

    // Upload each image to Cloudinary and get the URLs
    const uploadedImages = await Promise.all(imagenes.map((file) => uploadImageToCloudinary(file)));
    const uploadedImagesDoc = await Promise.all(imagenesDoc.map((file) => uploadImageToCloudinaryDoc(file)));

    const imagenesv2 = uploadedImages.map((url) => url);
    const imagenesv2Doc = uploadedImagesDoc.map((url) => url);

    const formattedData = {
      ...datosBeneficiarioActualizado,
      fotosbeneficiario: [...datosBeneficiarioActualizado.fotosbeneficiario, ...imagenesv2],
      fotosdocumentos: [...datosBeneficiarioActualizado.fotosdocumentos, ...imagenesv2Doc],
    };

    console.log(formattedData);

    try {
      const response = await fetch(`${API_URL}/BeneficiarioSocial/update/${beneficiario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include", // Asegúrate de incluir esta opción
      });

      if (!response.ok) {
        setLoadingImages(false);
        setLoadingImagesDoc(false);
        setShowLoadingToast(false);
        setShowLoadingToastDoc(false);
        toast.error("Error al actualizar al Beneficiario");
        console.log(response);
        return;
      } else {
        toast.success("Beneficiario actualizado correctamente");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingImages(false);
        setLoadingImagesDoc(false);
        setShowLoadingToast(false);
        setShowLoadingToastDoc(false);
        navigate("/social");
      }
    } catch (error) {
      setLoadingImages(false);
      setLoadingImagesDoc(false);
      setShowLoadingToast(false);
      setLoadingImagesDoc(false);
      toast.error("Error al actiualizar al Beneficiario", error);
      console.log(error);
    }
  };

  useEffect(() => {
    // Muestra el toast "Cargando imágenes" cuando se están subiendo las imágenes
    if (showLoadingToast) {
      toast.loading("Cargando imágenes Beneficiario...", {
        duration: 1300, // Duración del toast en milisegundos
        onClose: () => setShowLoadingToast(false), // Se ejecutará cuando el toast se cierre
      });
    }
  }, [showLoadingToast]);

  useEffect(() => {
    // Muestra el toast "Cargando imágenes" cuando se están subiendo las imágenes
    if (showLoadingToastDoc) {
      toast.loading("Cargando imágenes de documentos...", {
        duration: 1300, // Duración del toast en milisegundos
        onClose: () => setShowLoadingToastDoc(false), // Se ejecutará cuando el toast se cierre
      });
    }
  }, [showLoadingToastDoc]);

  return (
    <div className="flex w-full flex-col pb-10 p-6">
      <Toaster />
      <h2 className="my-2 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Editar Beneficiario
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <Input
          type="text"
          label="Nombre Beneficiario"
          placeholder="Ingrese el nombre del beneficiario"
          defaultValue={beneficiario?.nombre ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              nombre: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Actividad Social"
          placeholder="Ingrese la Actividad Social"
          defaultValue={beneficiario?.actividadSocial ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              actividadSocial: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Documento de identificación Personal DPI"
          placeholder="Ingrese el DPI"
          defaultValue={beneficiario?.dpi ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              dpi: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Comunidad"
          placeholder="Ingrese la comunidad"
          defaultValue={beneficiario?.comunidad ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              comunidad: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Dirección"
          placeholder="Ingrese la dirección"
          defaultValue={beneficiario?.direccion ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              direccion: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Estado Civil"
          placeholder="Ingrese el estado civil"
          defaultValue={beneficiario?.estadocivil ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              estadocivil: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Teléfono"
          placeholder="Ingrese el número de teléfono"
          defaultValue={beneficiario?.telefono ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              telefono: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha de Nacimiento"
          placeholder="Ingrese la fecha de nacimiento"
          defaultValue={formatfecha(beneficiario?.cumpleanios) ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              cumpleanios: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha que ingresó al programa"
          placeholder="Ingrese la fecha de inicio"
          defaultValue={formatfecha(beneficiario?.fechainicio) ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              fechainicio: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha que salió al programa"
          placeholder="Ingrese la fecha final"
          defaultValue={formatfecha(beneficiario?.fechafinal) ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              fechafinal: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Nombre del encargado"
          placeholder="Ingrese el nombre del encargado"
          defaultValue={beneficiario?.encargado ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              encargado: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Teléfono del encargado"
          placeholder="Ingrese un teléfono del encargado"
          defaultValue={beneficiario?.telefonoencargado ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              telefonoencargado: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Ubicación"
          placeholder="Ingrese una ubicación"
          defaultValue={beneficiario?.ubicacion ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              ubicacion: e.target.value,
            })
          }
        />
        <Input
          type="number"
          label="Saldo total o disponible"
          placeholder="Ingrese un saldo"
          defaultValue={beneficiario?.saldoTotal ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              saldoTotal: e.target.value,
            })
          }
        />
        <Textarea
          type="text"
          label="Observaciones"
          placeholder="Ingrese alguna observación"
          defaultValue={beneficiario?.observaciones ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              observaciones: e.target.value,
            })
          }
        />
        <Textarea
          type="text"
          label="Otros datos"
          placeholder="Ingrese algunos otros datos"
          defaultValue={beneficiario?.otrosdatos ?? ""}
          onChange={(e) =>
            setDatosBeneficiarioActualizado({
              ...datosBeneficiarioActualizado,
              otrosdatos: e.target.value,
            })
          }
        />
        <h1 className="font-bold text-[18px] -mb-2 mx-auto">Fotos del beneficiario</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {beneficiario?.fotosbeneficiario?.map((imagenSrc, index) => (
            <img
              key={index}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                margin: "10px",
              }}
              src={imagenSrc}
            />
          ))}
        </div>
        <h1 className="font-bold text-[18px] -mb-2 mx-auto">Fotos de otros documentos</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {beneficiario?.fotosdocumentos?.map((imagenSrc, index) => (
            <img
              key={index}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                margin: "10px",
              }}
              src={imagenSrc}
            />
          ))}
        </div>
        <div className="grid gap-4 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-11/12 rounded-lg border border-gray-500 dark:border-white px-6 py-4">
          <p className="font-bold text-[18px] -mb-2">Fotografías del beneficiario:</p>
          <div className="flex items-center justify-center w-full">
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
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="flex flex-wrap flex-row w-full">
            {imagenes.map((file, index) => (
              <div key={index}>
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
                      width: "95px",
                      height: "95px",
                      objectFit: "cover",
                      margin: "2px",
                    }}
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
              </div>
            ))}
          </div>
          <p className="font-bold text-[18px] -mb-2">Fotografías documentos:</p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-fileDoc"
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
                id="dropzone-fileDoc"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChangeDoc}
              />
            </label>
          </div>
          <div className="flex flex-wrap flex-row w-full">
            {imagenesDoc.map((file, index) => (
              <div key={index}>
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
                      width: "95px",
                      height: "95px",
                      objectFit: "cover",
                      margin: "2px",
                    }}
                  />
                  <Button
                    size="tiny"
                    onClick={() => handleRemoveImageDoc(index)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleFormSubmit}>
        Actualizar Datos del beneficiario
      </Button>
    </div>
  );
};

export default EditarBeneficiario;
