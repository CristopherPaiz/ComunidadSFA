import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import "react-dropdown/style.css";
import API_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const C_comunidad_nueva = () => {
  const tipo = ["Comunidad", "Célula", "Iglesia", "Otro"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  ///////////////////////////////////////////////////////
  // useState para los demás campos que no sean dropdown
  const [nombreCursoCreci, setNombreCursoCreci] = useState("");
  const [lugar, setLugar] = useState("");
  const [horarios, setHorarios] = useState("");

  const handleSubmit = async () => {
    const dataFinal = {
      nombreComunidad: nombreCursoCreci,
      ubicacion: lugar,
      fechacreacion: new Date(),
      horarios: horarios,
      tipo: selectedTipo.value,
      estado: true,
    };

    try {
      const response = await fetch(`${API_URL}/comunidad/add`, {
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
        toast.error("Error al añadir la comunidad", {});
        throw new Error("Error al añadir la comunidad", {});
      }
      const data = await response.json();
      toast.success("Se agrego la comunidad correctamente", {});
      console.log(data);
      //Setear todos los campos en blanco
      setNombreCursoCreci("");
      setLugar("");
      setHorarios("");
      setSelectedTipo(tipo[0]);
      await new Promise((resolve) => setTimeout(resolve, 1300));
    } catch (error) {
      toast.error("Error al añadir la comunidad: " + error);
    }
  };

  return (
    <div className="flex w-full flex-col h-screen">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tightmd:text-5xl lg:text-3xl dark:text-whited">
        Nueva Comunidad
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre de la comunidad"
          placeholder="Ingrese el nombre de la comunidad"
          onChange={(e) => setNombreCursoCreci(e.target.value)}
        />
        <Input
          type="text"
          label="Lugar / ubicación"
          placeholder="Ingrese una dirección"
          onChange={(e) => setLugar(e.target.value)}
        />
        <Input
          type="text"
          label="Horarios"
          placeholder="Ingrese los horarios"
          onChange={(e) => setHorarios(e.target.value)}
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Tipo:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
      </div>
      <Button color="success" className="w-11/12 mx-auto sm:w-3/5" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default C_comunidad_nueva;
