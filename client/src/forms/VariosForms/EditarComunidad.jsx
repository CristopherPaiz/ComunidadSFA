import React, { useState, useEffect } from "react";
import { Input, Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import "react-dropdown/style.css";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { fromBlob } from "image-resize-compress";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const EditarComunidad = () => {
  const [popOver, setPopOver] = useState(false);
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const { retiroSelected } = location.state;
  const comunidad = retiroSelected;

  // const retiroSelected = personSelected;
  if (!location.state) {
    return <Navigate to={"/comunidad"} />;
  }

  const navigate = useNavigate();
  //useState para las imágenes
  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosComunidadActualizado, setDatosComunidadActualizado] = useState({
    ...comunidad,
  });

  const tipo = ["Comunidad", "Célula", "Iglesia", "Otro"];
  const [selectedTipo, setSelectedTipo] = useState(comunidad.tipo);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

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
      ...datosComunidadActualizado,
      fotos: [...datosComunidadActualizado?.fotos, ...imagenesv2],
      tipo: selectedTipo.length > 1 ? selectedTipo : selectedTipo.value,
      // ofrenda:
      //   datosComunidadActualizado?.ofrenda.length > 1
      //     ? datosComunidadActualizado?.ofrenda?.split(",")
      //     : [datosComunidadActualizado?.ofrenda],
    };

    try {
      const response = await fetch(`${API_URL}/comunidad/update/${comunidad._id}`, {
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
        console.error("Error al actualizar los datos de la comunidad");
      } else {
        setLoadingImages(false);
        setShowLoadingToast(false);
        // Manejar el escenario de éxito si es necesario
        toast.success("Datos de la comunidad actualizados exitosamente", {
          position: "bottom-center",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/comunidad");
      }
    } catch (error) {
      setLoadingImages(false);
      setShowLoadingToast(false);
      console.error("Error al actualizar los datos de la comunidad", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/comunidad/delete/${datosComunidadActualizado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: false,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        throw new Error("Error al eliminar a la comunidad", {});
      }
      const data = await response.json();
      toast.success("Se Eliminó a la comunidad correctamente", {});
      await new Promise((resolve) => setTimeout(resolve, 1300));
      navigate("/comunidad");
    } catch (error) {
      console.log(error);
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
        Editar Comunidad o célula
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <Input
          type="text"
          label="Nombre Comunidad o Célula"
          placeholder="Ingrese el nombre"
          defaultValue={comunidad?.nombreComunidad ?? ""}
          onChange={(e) =>
            setDatosComunidadActualizado({
              ...datosComunidadActualizado,
              nombreComunidad: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Ubicación"
          placeholder="Ingrese la ubicación"
          defaultValue={comunidad?.ubicacion ?? ""}
          onChange={(e) =>
            setDatosComunidadActualizado({
              ...datosComunidadActualizado,
              ubicacion: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha de creación"
          placeholder="Ingrese la fecha"
          defaultValue={formatfecha(comunidad?.fechacreacion) ?? ""}
          onChange={(e) =>
            setDatosComunidadActualizado({
              ...datosComunidadActualizado,
              fechacreacion: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Horarios"
          placeholder="Ingrese los horarios"
          defaultValue={comunidad?.horarios ?? ""}
          onChange={(e) =>
            setDatosComunidadActualizado({
              ...datosComunidadActualizado,
              horarios: e.target.value,
            })
          }
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Tipo:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        {/* <Input
          type="text"
          label="Ofrendas"
          placeholder="Ingrese las ofrendas"
          defaultValue={comunidad?.ofrenda ?? ""}
          onChange={(e) =>
            setDatosComunidadActualizado({
              ...datosComunidadActualizado,
              ofrenda: e.target.value,
            })
          }
        /> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {comunidad?.fotos.map((imagenSrc, index) => (
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
      <div className="mx-auto text-center w-11/12 sm:w-5/12">
        <Popover placement="top" color="danger" isOpen={popOver}>
          <PopoverTrigger>
            <Button
              color="danger"
              className="mx-auto text-center w-11/12 mb-3 sm:w-5/12"
              onClick={() => setPopOver(true)}
            >
              Eliminar Comunidad o Célula
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">¿Está seguro de querer eliminar a la comunidad o célula?</div>
              <div className="text-tiny">¡Esta acción no se puede deshacer!, ¿Desea continuar?</div>
              <div className="mx-auto m-2 text-center">
                <Button color="warning" className="mr-2" onClick={handleDelete}>
                  Sí, deseo eliminarla
                </Button>
                <Button color="primary" onClick={() => setPopOver(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button color="success" className="w-11/12 mx-auto sm:w-5/12" onClick={handleFormSubmit}>
          Actualizar Datos de la Comunidad o Célula
        </Button>
      </div>
    </div>
  );
};

export default EditarComunidad;
