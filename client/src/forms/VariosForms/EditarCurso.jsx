import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { da } from "date-fns/locale";

const EditarCurso = () => {
  const location = useLocation();
  const { retiroSelected } = location.state;

  // const retiroSelected = personSelected;

  if (!location.state) {
    return <Navigate to={"/comunidad"} />;
  }

  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////////////////////
  const tipo = ["Pueblo", "Servidores", "Subcoordinadores", "Coordinadores", "Todos", "Otros"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  //////////////////////////////////////////////////////

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosCursoActualizado, setDatosCursoActualizado] = useState({
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
      nombreCursoCreci: datosCursoActualizado.nombreCursoCreci,
      fechainicio: datosCursoActualizado.fechaInicio,
      fechaFinal: datosCursoActualizado.fechaFinal,
      ofrenda: datosCursoActualizado.ofrenda,
      horario: datosCursoActualizado.horarios,
      ubicacion: datosCursoActualizado.lugar,
      dirigidoA: selectedTipo.value,
      dirigidoPor: datosCursoActualizado.encargados,
      tipo: "Curso",
      estado: true,
    };

    try {
      const response = await fetch(`${API_URL}/cursocreci/update/${datosCursoActualizado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...datosfinales,
        }),
        credentials: "include",
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
        Editar Crecimiento o curso
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <Input
          type="text"
          label="Nombre Curso"
          placeholder="Ingrese el nombre del curso"
          defaultValue={retiroSelected?.nombreCursoCreci ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              nombreCursoCreci: e.target.value,
            })
          }
        />
        <Input
          type="date"
          label="Fecha inicio"
          placeholder="Ingrese la fecha de inicio"
          defaultValue={formatfecha(retiroSelected?.fechainicio) ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
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
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              fechaFinal: e.target.value,
            })
          }
        />
        <Input
          type="number"
          label="ofrenda"
          placeholder="Ingrese la ofrenda"
          defaultValue={retiroSelected?.ofrenda ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              ofrenda: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Ubicación"
          placeholder="Ingrese la ubicación del retiro"
          defaultValue={retiroSelected?.ubicacion ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              ubicacion: e.target.value,
            })
          }
        />

        <Input
          type="text"
          label="Hoaraios"
          placeholder="Ingrese los horarios"
          defaultValue={retiroSelected?.horario ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              horario: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Dirigido por"
          placeholder="Ingrese quien dirige"
          defaultValue={retiroSelected?.dirigidoPor ?? ""}
          onChange={(e) =>
            setDatosCursoActualizado({
              ...datosCursoActualizado,
              dirigidoPor: e.target.value,
            })
          }
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Dirigido a:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleSubmit}>
        Actualizar Datos del retiro
      </Button>
    </div>
  );
};

export default EditarCurso;
