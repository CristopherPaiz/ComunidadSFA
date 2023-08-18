import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const C_persona_comunidad = () => {
  const tipo = [
    "Ninguna",
    "Comunidad A",
    "Comunidad B",
    "Comunidad C",
    "Comunidad D",
    "Comunidad E",
    "Comunidad F",
    "Comunidad G",
    "Comunidad H",
    "Comunidad I",
    "Comunidad J",
    "Comunidad K",
    "Comunidad L",
    "Comunidad M",
    "Comunidad N",
    "Comunidad O",
    "Comunidad P",
    "Comunidad Q",
    "Comunidad R",
    "Comunidad S",
    "Comunidad T",
    "Comunidad U",
    "Comunidad V",
    "Comunidad W",
    "Comunidad X",
    "Comunidad Y",
    "Comunidad Z",
  ];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  return (
    <div className="flex w-full flex-col pb-[180px]">
      <h2 className="my-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Filtrar por comunidad
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">
          Seleccione la comunidad:
        </p>
        <Dropdown
          options={tipo}
          onChange={handleSelectTipo}
          value={selectedTipo}
        />
        <Button color="primary">Filtrar</Button>
      </div>
    </div>
  );
};

export default C_persona_comunidad;
