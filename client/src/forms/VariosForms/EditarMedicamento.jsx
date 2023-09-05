import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import "react-dropdown/style.css";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { fromBlob } from "image-resize-compress";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const EditarMedicamento = () => {
  const location = useLocation();
  const { productoSeleccionado } = location.state;
  const producto = productoSeleccionado;

  if (!location.state) {
    return <Navigate to={"/comunidad"} />;
  }

  //useState para las imágenes
  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  const navigate = useNavigate();

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosProductoActualizado, setDatosProductoActualizado] = useState({
    ...producto,
  });

  //código para subir a cloudinary
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

  const handleFormSubmit = async () => {
    setLoadingImages(true);
    setShowLoadingToast(true);
    // Upload each image to Cloudinary and get the URLs
    const uploadedImages = await Promise.all(imagenes.map((file) => uploadImageToCloudinary(file)));

    const imagenesv2 = uploadedImages.map((url) => url);

    const formattedData = {
      ...datosProductoActualizado,
      fotos: [...datosProductoActualizado.fotos, ...imagenesv2],
    };

    console.log(formattedData);

    try {
      const response = await fetch(`${API_URL}/medicamento/update/${producto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include", // Asegúrate de incluir esta opción
      });

      if (!response.ok) {
        // Manejar escenarios de error si es necesario
        setLoadingImages(false);
        setShowLoadingToast(false);
        console.error("Error al actualizar los datos del medicamento");
      } else {
        setLoadingImages(false);
        setShowLoadingToast(false);
        // Manejar el escenario de éxito si es necesario
        toast.success("Datos del medicamento actualizados exitosamente", {
          position: "bottom-center",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/farmacia");
      }
    } catch (error) {
      setLoadingImages(false);
      setShowLoadingToast(false);
      console.error("Error al actualizar los datos del cosmetico", error);
    }
  };

  useEffect(() => {
    // Muestra el toast "Cargando imágenes" cuando se están subiendo las imágenes
    if (showLoadingToast) {
      toast.loading("Cargando imágenes...", {
        duration: 2000, // Duración del toast en milisegundos
        onClose: () => setShowLoadingToast(false), // Se ejecutará cuando el toast se cierre
      });
    }
  }, [showLoadingToast]);

  return (
    <div className="flex w-full flex-col pb-10 p-6">
      <Toaster />
      <h2 className="my-2 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Editar Medicamento
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <Input
          type="text"
          label="Nombre medicamento"
          placeholder="Ingrese el nombre del retiro"
          defaultValue={producto?.label ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              label: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Cantidad Disponible"
          placeholder="Ingrese la cantidad disponible"
          defaultValue={producto?.cantidadTotal ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              cantidadTotal: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Tipo"
          placeholder="Ingrese el tipo de medicamento"
          defaultValue={producto?.tipo ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              tipo: e.target.value,
            })
          }
        />
        <Input
          type="number"
          label="Precio"
          placeholder="Ingrese el precio"
          defaultValue={producto?.precio ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              precio: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Descripcion"
          placeholder="Ingrese la descripción del producto"
          defaultValue={producto?.descripcion ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              descripcion: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Observaciones"
          placeholder="Ingrese alguna observación"
          defaultValue={producto?.observaciones ?? ""}
          onChange={(e) =>
            setDatosProductoActualizado({
              ...datosProductoActualizado,
              observaciones: e.target.value,
            })
          }
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {producto?.fotos.map((imagenSrc, index) => (
            <img
              key={index}
              style={{
                objectFit: "contain",
                width: "auto",
                height: "160px",
                margin: "10px",
              }}
              src={imagenSrc}
            />
          ))}
        </div>
        <p className="font-bold text-[18px] -mb-2">Añadir fotografías:</p>
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
                    width: "100px",
                    height: "100px",
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
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleFormSubmit}>
        Actualizar Datos del medicamento
      </Button>
    </div>
  );
};

export default EditarMedicamento;
