import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const R_nuevo = () => {
  const tipo = [
    "Ninguno",
    "1er seminario",
    "Retiro de servidores",
    "Demás retiros...",
  ];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  //////////////////////////////////////////////////////
  const tipo2 = [
    "Pueblo",
    "Servidores",
    "Subcoordinadores",
    "Coordinadores",
    "Mixto",
    "Otros",
  ];
  const [selectedTipo2, setSelectedTipo2] = useState(tipo2[0]);

  const handleSelectTipo2 = (selected) => {
    setSelectedTipo2(selected);
  };

  return (
    <div className="flex w-full flex-col mb-[130px]">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Retiro
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre retiro"
          placeholder="Ingrese el nombre del retiro"
        />
        <Input type="Date" label="Fecha de inicio" placeholder="Fecha inicio" />
        <Input type="Date" label="Fecha final" placeholder="Fecha final" />
        <Input
          type="text"
          label="Encargados"
          placeholder="Ingrese a los encargados"
        />
        <Input
          type="text"
          label="Lugar / ubicación"
          placeholder="Ingrese una dirección"
        />
        <Input
          type="Number"
          label="Ofrenda"
          placeholder="Ingrese una ofrenda"
        />
        <Input
          type="text"
          label="Horarios"
          placeholder="Ingrese los horarios"
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">
          Seleccione el tipo de retiro:
        </p>
        <Dropdown
          options={tipo}
          onChange={handleSelectTipo}
          value={selectedTipo}
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">
          Seleccione a quién va dirigido:
        </p>
        <Dropdown
          options={tipo2}
          onChange={handleSelectTipo2}
          value={selectedTipo2}
        />
      </div>
      <Button color="primary" className="w-11/12 m-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default R_nuevo;
