import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";

const R_nuevo = () => {
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

  ///////////////////////////////////////////////////////
  // useState para los demás campos que no sean dropdown
  const [nombreRetiro, setNombreRetiro] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [encargados, setEncargados] = useState("");
  const [lugar, setLugar] = useState("");
  const [ofrenda, setOfrenda] = useState("");
  const [horarios, setHorarios] = useState("");

  const handleSubmit = async () => {
    const dataFinal = {
      nombreRetiro: nombreRetiro,
      fechainicio: fechaInicio,
      fechaFinal: fechaFinal,
      encargados: encargados.split(",").map((e) => e.trim()),
      ubicacion: lugar,
      ofrenda: ofrenda,
      horario: horarios,
      tipo: selectedTipo.value,
      tipoPara: selectedTipo2.value,
      estado: true,
    };

    try {
      const response = await fetch(`${API_URL}/retiro/add`, {
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
      //Setear todos los campos en blanco
      setNombreRetiro("");
      setFechaInicio("");
      setFechaFinal("");
      setEncargados("");
      setLugar("");
      setOfrenda("");
      setHorarios("");
      setSelectedTipo(tipo[0]);
      setSelectedTipo2(tipo2[0]);
      await new Promise((resolve) => setTimeout(resolve, 1300));
    } catch (error) {
      toast.error("Error al añadir el retiro: " + error);
    }
  };

  useEffect(() => {}, [nombreRetiro, selectedTipo, selectedTipo2]);
  return (
    <div className="flex w-full flex-col mb-[130px]">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Retiro
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre retiro"
          placeholder="Ingrese el nombre del retiro"
          onChange={(e) => setNombreRetiro(e.target.value)}
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
          type="text"
          label="Encargados"
          placeholder="Ingrese a los encargados"
          onChange={(e) => setEncargados(e.target.value)}
        />
        <Input
          type="text"
          label="Lugar / ubicación"
          placeholder="Ingrese una dirección"
          onChange={(e) => setLugar(e.target.value)}
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
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el tipo de retiro:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione a quién va dirigido:</p>
        <Dropdown options={tipo2} onChange={handleSelectTipo2} value={selectedTipo2} />
      </div>
      <Button color="primary" className="w-11/12 m-auto sm:w-3/5" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default R_nuevo;
