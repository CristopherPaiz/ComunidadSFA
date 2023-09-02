import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const A_nueva = () => {
  const tipo = ["Pueblo", "Servidores", "Subcoordinadores", "Coordinadores", "Todos", "Otros"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  return (
    <div className="flex w-full flex-col mb-[130px]">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nueva Actividad
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto sm:w-3/5 ">
        <Input type="text" label="Nombre" placeholder="Ingrese el nombre" />
        <Input type="Date" label="Fecha" placeholder="Fecha" />
        <Input type="Number" label="Ofrenda" placeholder="Ingrese una ofrenda" />
        <Input type="text" label="Comunidad" placeholder="Ingrese la Comunidad" />
        <Input type="text" label="Lugar / ubicación" placeholder="Ingrese una dirección" />
        <Input type="text" label="Horarios" placeholder="Ingrese los horarios" />
        <Input type="text" label="Encargados" placeholder="Ingrese los encargados" />
        <Input type="text" label="Predicador" placeholder="Ingrese al predicador" />
        <Input type="text" label="Alabanzas" placeholder="Ingrese al de alabanza" />
        <Input type="text" label="Observaciones" placeholder="Observaciones" />
      </div>
      <Button color="primary" className="w-11/12 mx-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default A_nueva;
