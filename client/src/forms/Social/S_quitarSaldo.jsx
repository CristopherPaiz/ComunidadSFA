import React, { useState, useEffect, useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import API_URL from "../../config";
import Select from "react-select";
import { fromBlob } from "image-resize-compress";
import { contexto } from "../../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const S_quitarSaldo = () => {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [resultadosBeneficiarios, setResultadosBeneficiarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(contexto);

  //useState para el formulario
  const [fechaGasto, setFechaGasto] = useState(formatfecha(Date()));
  const [cantidad, setCantidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  const obtenerBeneficiarios = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/BeneficiarioSocial/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los beneficiarios");
        throw new Error("Error al filtrar los beneficiarios", {});
      }

      const data = await response.json();
      setResultadosBeneficiarios(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  /////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////

  const resetForm = () => {
    setSeleccionado(null);
    setFechaGasto(formatfecha(Date()));
    setCantidad(0);
    setObservaciones("");
    setImagenes([]);
  };

  const handleSubmit = async () => {
    if (seleccionado === null) {
      toast.error("Debe seleccionar un beneficiario", {});
      return;
    }
    if (cantidad <= 0) {
      toast.error("Debe ingresar una cantidad válida", {});
      return;
    }

    try {
      setLoadingImages(true);
      setShowLoadingToast(true);

      // Upload each image to Cloudinary and get the URLs
      const uploadedImages = await Promise.all(imagenes.map((file) => uploadImageToCloudinary(file)));

      // Format the data including the uploaded image URLs
      const formattedData = {
        idbeneficiario: seleccionado._id,
        fecha: fechaGasto,
        monto: cantidad,
        fotos: uploadedImages.map((url) => url),
        observaciones: observaciones,
      };

      const response = await fetch(`${API_URL}/egresoSaldo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      if (!response.ok) {
        setLoadingImages(false);
        setShowLoadingToast(false);
        toast.error("Error al añadir un nuevo gasto al beneficiario");
        return;
      }
      toast.success("Nuevo gasto añadido correctamente");
      resetForm();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingImages(false);
      setShowLoadingToast(false);
    } catch (error) {
      setLoadingImages(false);
      setShowLoadingToast(false);
      toast.error("Error al añadir el gasto", error);
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
    obtenerBeneficiarios();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo gasto
      </h2>

      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        {loading ? (
          <h2 className="mx-auto font-extrabold text-xl text-teal-500">Cargando beneficiarios...</h2>
        ) : (
          <Select
            classNamePrefix="Seleccione un beneficiario"
            isSearchable
            isClearable
            options={resultadosBeneficiarios}
            maxMenuHeight={170}
            value={seleccionado}
            className="text-black dark:text-white mb-8"
            styles={{
              option: (base) => ({
                ...base,
                backgroundColor: theme === "light" ? "white" : "#0e0e0e",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 13,
              colors: {
                ...theme.colors.neutral90,
              },
            })}
            noOptionsMessage={() => "¡¡No se encontró al beneficiario!!"}
            placeholder="Seleccione un beneficiario"
            onChange={(e) => setSeleccionado(e)}
            onFocus={() => setSeleccionado(null)}
          />
        )}
        {seleccionado !== null && (
          <>
            <h3 className="text-3xl font-bold mx-auto">Disponible: Q. {seleccionado?.saldoTotal ?? ""}</h3>
          </>
        )}
        <Input
          type="Date"
          label="Fecha gasto"
          placeholder="Ingrese fecha"
          onChange={(e) =>
            setFechaGasto(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
          value={fechaGasto}
        />
        <Input
          type="Number"
          label="Cantidad"
          placeholder="Ingrese una cantidad"
          onChange={(e) => setCantidad(e.target.value)}
          value={cantidad}
        />
        <Input
          type="text"
          label="Observaciones"
          placeholder="Ingrese algunas observaciones"
          onChange={(e) => setObservaciones(e.target.value)}
          value={observaciones}
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Ingrese fotografías:</p>
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
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default S_quitarSaldo;
