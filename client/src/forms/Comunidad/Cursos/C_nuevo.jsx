import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";

const C_nuevo = () => {
  const tipo = ["Pueblo", "Servidores", "Subcoordinadores", "Coordinadores", "Todos", "Otros"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  ///////////////////////////////////////////////////////
  // useState para los demás campos que no sean dropdown
  const [nombreCursoCreci, setNombreCursoCreci] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [encargados, setEncargados] = useState("");
  const [lugar, setLugar] = useState("");
  const [ofrenda, setOfrenda] = useState("");
  const [horarios, setHorarios] = useState("");

  const handleSubmit = async () => {
    const dataFinal = {
      nombreCursoCreci: nombreCursoCreci,
      fechainicio: fechaInicio,
      fechaFinal: fechaFinal,
      ofrenda: ofrenda,
      horario: horarios,
      ubicacion: lugar,
      dirigidoA: selectedTipo.value,
      dirigidoPor: encargados,
      tipo: "Curso",
      estado: true,
    };

    try {
      const response = await fetch(`${API_URL}/cursocreci/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dataFinal,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al añadir el retiro", {});
        throw new Error("Error al añadir el retiro", {});
      }
      const data = await response.json();
      toast.success("Se agrego el retiro correctamente", {});
      console.log(data);
      //Setear todos los campos en blanco
      setNombreCursoCreci("");
      setFechaInicio("");
      setFechaFinal("");
      setEncargados("");
      setLugar("");
      setOfrenda("");
      setHorarios("");
      setSelectedTipo(tipo[0]);
      await new Promise((resolve) => setTimeout(resolve, 1300));
    } catch (error) {
      toast.error("Error al añadir el retiro: " + error);
    }
  };

  useEffect(() => {}, [nombreCursoCreci, selectedTipo]);
  return (
    <div className="flex w-full flex-col mb-[130px]">
      <Toaster />
      <h2 className="my-4 text-2xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Crecimiento o Curso
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre Crecimiento o curso"
          placeholder="Ingrese el nombre del curso"
          onChange={(e) => setNombreCursoCreci(e.target.value)}
        />
        <Input
          type="Date"
          label="Fecha de inicio"
          placeholder="Fecha inicio"
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <Input
          type="Date"
          label="Fecha final"
          placeholder="Fecha final"
          onChange={(e) => setFechaFinal(e.target.value)}
        />
        <Input
          type="Number"
          label="Ofrenda"
          placeholder="Ingrese una ofrenda"
          onChange={(e) => setOfrenda(e.target.value)}
        />
        <Input
          type="text"
          label="Horarios"
          placeholder="Ingrese los horarios"
          onChange={(e) => setHorarios(e.target.value)}
        />
        <Input
          type="text"
          label="Lugar / ubicación"
          placeholder="Ingrese una dirección"
          onChange={(e) => setLugar(e.target.value)}
        />
        <Input
          type="text"
          label="Dirigido Por"
          placeholder="Ingrese quien dirigió el curso"
          onChange={(e) => setEncargados(e.target.value)}
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Dirigido a:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
      </div>
      <Button color="primary" className="w-11/12 m-auto sm:w-3/5" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default C_nuevo;
