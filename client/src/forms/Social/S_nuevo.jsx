import React, { useState, useEffect } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { fromBlob } from "image-resize-compress";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/duwvnqyeu/image/upload";

const S_nuevo = () => {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //useStates para todos los inputs
  const [nombre, setNombre] = useState("");
  const [nombreActividad, setNombreActividad] = useState("Amigos de Alemania");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [saldoTotal, setSaldoTotal] = useState("");
  const [nombreEncargado, setNombreEncargado] = useState("");
  const [telefonoEncargado, setTelefonoEncargado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [otrosDatos, setOtrosDatos] = useState("");
  const [dpi, setDpi] = useState("");
  const [comunidad, setComunidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState(formatfecha(Date()));
  const [fechaSalida, setFechaSalida] = useState("");

  ///////////////////////////////////////////////////////////////////////
  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  const [imagenesDoc, setImagenesDoc] = useState([]);
  const [loadingImagesDoc, setLoadingImagesDoc] = useState(false);
  const [showLoadingToastDoc, setShowLoadingToastDoc] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setNombre("");
    setNombreActividad("Amigos de Alemania");
    setFechaNacimiento("");
    setSaldoTotal("");
    setNombreEncargado("");
    setTelefonoEncargado("");
    setObservaciones("");
    setOtrosDatos("");
    setDpi("");
    setComunidad("");
    setDireccion("");
    setEstadoCivil("");
    setTelefono("");
    setFechaRegistro(formatfecha(Date()));
    setFechaSalida("");
    setImagenes([]);
    setImagenesDoc([]);
  };

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

  /////////////////////////////////////////////////////////////////////////
  const handleFormSubmit = async () => {
    if (nombre === "") {
      toast.error("Ingrese el nombre del beneficiario");
      return;
    }

    try {
      setLoadingImages(true);
      setLoadingImagesDoc(true);
      setShowLoadingToast(true);
      setShowLoadingToastDoc(true);

      // Upload each image to Cloudinary and get the URLs
      const uploadedImages = await Promise.all(imagenes.map((file) => uploadImageToCloudinary(file)));
      const uploadedImagesDoc = await Promise.all(imagenesDoc.map((file) => uploadImageToCloudinaryDoc(file)));

      // Format the data including the uploaded image URLs
      const formattedData = {
        nombre: nombre,
        actividadSocial: nombreActividad,
        dpi: dpi,
        comunidad: comunidad,
        direccion: direccion,
        estadocivil: estadoCivil,
        telefono: telefono,
        cumpleanios: fechaNacimiento,
        fechainicio: fechaRegistro,
        fechafinal: fechaSalida,
        encargado: nombreEncargado,
        telefonoencargado: telefonoEncargado,
        ubicacion: direccion,
        saldoTotal: saldoTotal,
        observaciones: observaciones,
        fotosbeneficiario: uploadedImages.map((url) => url),
        fotosdocumentos: uploadedImagesDoc.map((url) => url),
        otrosdatos: otrosDatos,
        estado: true,
      };

      const response = await fetch(`${API_URL}/BeneficiarioSocial/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      if (!response.ok) {
        setLoadingImages(false);
        setLoadingImagesDoc(false);
        setShowLoadingToast(false);
        setShowLoadingToastDoc(false);
        toast.error("Error al añadir al Beneficiario");
        return;
      }
      toast.success("Beneficiario añadido correctamente");
      resetForm();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingImages(false);
      setLoadingImagesDoc(false);
      setShowLoadingToast(false);
      setShowLoadingToastDoc(false);
    } catch (error) {
      setLoadingImages(false);
      setLoadingImagesDoc(false);
      setShowLoadingToast(false);
      setLoadingImagesDoc(false);
      toast.error("Error al añadir al Beneficiario", error);
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
    <div className="flex w-full flex-col ">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Beneficiario
      </h2>
      <div className="grid mb-6 md:grid-cols-2">
        <div className="grid gap-4 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-11/12 rounded-lg border border-gray-500 dark:border-white px-6 py-4">
          <h1 className="sm:hidden md:hidden font-bold text-xl">Datos Principales</h1>
          <Input
            type="text"
            label="Nombre"
            isRequired
            placeholder="Ingrese el nombre del beneficiario"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <Input
            type="text"
            label="Nombre Actividad Social"
            placeholder="Nombre de la Actividad social a la que pertenece"
            value={nombreActividad}
            onChange={(e) => setNombreActividad(e.target.value)}
          />
          <Input
            type="Date"
            label="Fecha de nacimiento"
            value={fechaNacimiento}
            placeholder="Ingrese una fecha de nacimiento"
            onChange={(e) =>
              setFechaNacimiento(
                new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                  .toISOString()
                  .split("T")[0]
              )
            }
          />
          <Input
            type="number"
            label="Saldo total"
            value={saldoTotal}
            placeholder="Saldo total o inicial"
            onChange={(e) => setSaldoTotal(e.target.value)}
          />
        </div>
        <div className="grid gap-4 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-11/12 rounded-lg border border-gray-500 dark:border-white px-6 py-4">
          <h1 className="sm:hidden md:hidden font-bold text-xl">Datos Encargado</h1>
          <Input
            type="text"
            label="Nombre del encargado"
            value={nombreEncargado}
            placeholder="Nombre del encargado"
            onChange={(e) => setNombreEncargado(e.target.value)}
          />
          <Input
            type="text"
            label="Teléfono del encargado"
            value={telefonoEncargado}
            placeholder="Teléfono del encargado"
            onChange={(e) => setTelefonoEncargado(e.target.value)}
          />
          <Textarea
            type="text"
            label="Observaciones"
            placeholder="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
          <Textarea
            type="text"
            label="Otros datos"
            value={otrosDatos}
            placeholder="Otros Datos"
            onChange={(e) => setOtrosDatos(e.target.value)}
          />
        </div>
        <div className="grid gap-4 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-11/12 rounded-lg border border-gray-500 dark:border-white px-6 py-4">
          <h1 className="sm:hidden md:hidden font-bold text-xl">Más datos del beneficiario</h1>
          <Input
            type="text"
            label="DPI"
            placeholder="Ingrese DPI"
            onChange={(e) => setDpi(e.target.value)}
            value={dpi}
          />
          <Input
            type="text"
            label="Comunidad"
            value={comunidad}
            placeholder="Ingrese comunidad a la que pertenece"
            onChange={(e) => setComunidad(e.target.value)}
          />
          <Input
            type="text"
            label="Dirección"
            placeholder="Dirección"
            onChange={(e) => setDireccion(e.target.value)}
            value={direccion}
          />
          <Input
            type="text"
            label="Estado Civil"
            value={estadoCivil}
            placeholder="Ingrese el estado civil"
            onChange={(e) => setEstadoCivil(e.target.value)}
          />
          <Input
            type="text"
            label="Teléfono"
            value={telefono}
            placeholder="Ingrese un número de teléfono"
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Input
            type="date"
            label="Fecha de registro al programa"
            placeholder="Fecha de registro al programa"
            value={formatfecha(new Date(Date().now + 86400000).toISOString().split("T")[0])}
            onChange={(e) =>
              setFechaRegistro(
                new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                  .toISOString()
                  .split("T")[0]
              )
            }
          />
          <Input
            type="date"
            label="Fecha de salida del programa"
            value={fechaSalida}
            placeholder="Fecha de salida del programa"
            onChange={(e) =>
              setFechaSalida(
                new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                  .toISOString()
                  .split("T")[0]
              )
            }
          />
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
      <Button color="success" className="w-11/12 m-auto sm:w-3/5" onClick={handleFormSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default S_nuevo;
