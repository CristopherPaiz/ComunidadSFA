import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";

const EditarRetiro = () => {
  const location = useLocation();
  const { personSelected } = location.state;

  const retiroSelected = personSelected;
  
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
  const [datosRetiroActualizado, setDatosRetiroActualizado] = useState({
    ...retiroSelected,
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
      nombreRetiro: datosRetiroActualizado.nombreRetiro,
      fechainicio: datosRetiroActualizado.fechainicio,
      fechaFinal: datosRetiroActualizado.fechaFinal,
      encargados: datosRetiroActualizado.encargados.split(",").map((e) => e.trim()),
      ubicacion: datosRetiroActualizado.ubicacion,
      ofrenda: datosRetiroActualizado.ofrenda,
      horario: datosRetiroActualizado.horario,
      tipo: selectedTipo.value,
      tipoPara: selectedTipo2.value,
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
    <div className="flex w-full flex-col mb-10 p-6">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Editar Retiro
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <Input
          type="text"
          label="Nombre retiro"
          placeholder="Ingrese el nombre del retiro"
          defaultValue={retiroSelected?.nombreRetiro ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              nombreRetiro: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha inicio"
          placeholder="Ingrese la fecha de inicio"
          defaultValue={formatfecha(retiroSelected?.fechainicio) ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              fechainicio: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha final"
          placeholder="Ingrese la fecha final"
          defaultValue={formatfecha(retiroSelected?.fechaFinal) ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              fechaFinal: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Encargados"
          placeholder="Ingrese a los encargados"
          defaultValue={retiroSelected?.encargados ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              encargados: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Ubicación"
          placeholder="Ingrese la ubicación del retiro"
          defaultValue={retiroSelected?.ubicacion ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              ubicacion: e.target.value,
            })
          }
        />
        <Input
          type="number"
          label="ofrenda"
          placeholder="Ingrese la ofrenda"
          defaultValue={retiroSelected?.ofrenda ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              ofrenda: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Hoaraios"
          placeholder="Ingrese los horarios"
          defaultValue={retiroSelected?.horario ?? ""}
          onChange={(e) =>
            setDatosRetiroActualizado({
              ...datosRetiroActualizado,
              horario: e.target.value,
            })
          }
        />
        <p className="font-bold text-[18px] -mb-2">Seleccione el tipo de retiro:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <p className="font-bold text-[18px] -mb-2">Seleccione a quién va dirigido:</p>
        <Dropdown options={tipo2} onChange={handleSelectTipo2} value={selectedTipo2} />
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleSubmit}>
        Actualizar Datos del retiro
      </Button>
    </div>
  );
};

export default EditarRetiro;
