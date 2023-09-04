import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";

const EditarMedicamento = () => {
  const location = useLocation();
  const { producto } = location.state;

  if (!location.state) {
    return <Navigate to={"/comunidad"} />;
  }

  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////////////////////
  const tipo = [
    "Ninguno",
    "1er seminario",
    "Retiro general",
    "Retiro de servidores",
    "Retiro de vida en el espíritu",
    "Retiro de sanidad",
    "Retiro de jóvenes",
    "Retiro de matrimonios",
    "Retiro de mujeres",
    "Retiro de hombres",
    "Otros",
  ];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  //////////////////////////////////////////////////////
  const tipo2 = ["Para todo público", "Pueblo", "Servidores", "Subcoordinadores", "Coordinadores", "Otros"];
  const [selectedTipo2, setSelectedTipo2] = useState(tipo2[0]);

  const handleSelectTipo2 = (selected) => {
    setSelectedTipo2(selected);
  };
  //////////////////////////////////////////////////////////////////////////////

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosProductoActualizado, setDatosProductoActualizado] = useState({
    ...producto,
  });

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const datosfinales = {
      label: datosProductoActualizado.label,
      cantidadTotal: datosProductoActualizado.cantidadTotal,
      tipo: datosProductoActualizado.tipo,
      precio: datosProductoActualizado.precio,
      descripcion: datosProductoActualizado.descripcion,
      observaciones: datosProductoActualizado.observaciones,

      estado: true,
    };

    try {
      const response = await fetch(`${API_URL}/retiro/update/${datosRetiroActualizado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...datosfinales,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        throw new Error("Error al actualiza el retiro", {});
      }
      await response.json();
      toast.success("Se actualizaron los datos correctamente", {});
      await new Promise((resolve) => setTimeout(resolve, 1300));
      navigate("/comunidad");
    } catch (error) {
      toast.error("Error al actualizar los datos");
      console.log(error);
    }
  };

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
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleSubmit}>
        Actualizar Datos del medicamento
      </Button>
    </div>
  );
};

export default EditarMedicamento;
