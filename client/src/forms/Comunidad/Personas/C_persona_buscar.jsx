import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const C_persona_buscar = () => {
  const options = [
    "Ninguno",
    "Pueblo",
    "Servidor",
    "Subcoordinador",
    "Coordinador",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };
  return (
    <div className="flex w-full flex-col pb-[170px]">
      <h2 className="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Buscar persona
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto  sm:w-3/5">
        <Input
          type="text"
          label="Nombre o apellido"
          autoComplete="nope"
          placeholder="Ingrese nombre o apellido"
        />
        <Input
          type="text"
          label="Teléfono"
          autoComplete="nope"
          placeholder="Ingrese el número de teléfono"
        />
        <Input
          type="text"
          label="Dirección"
          autoComplete="nope"
          placeholder="Ingrese una dirección"
        />
        <p className="p-0 -mb-5 -mt-2">Tipo de don</p>
        <Dropdown
          options={options}
          onChange={handleSelectChange}
          value={selectedOption}
        />
      </div>
    </div>
  );
};

export default C_persona_buscar;
