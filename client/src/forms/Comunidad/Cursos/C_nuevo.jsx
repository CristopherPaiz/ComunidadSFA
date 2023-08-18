import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const C_nuevo = () => {
  const tipo = [
    "Pueblo",
    "Servidores",
    "Subcoordinadores",
    "Coordinadores",
    "Todos",
    "Otros",
  ];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  return (
    <div className="flex w-full flex-col mb-[130px]">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Curso o Crecimiento
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input type="text" label="Nombre" placeholder="Ingrese el nombre" />
        <Input type="Date" label="Fecha de inicio" placeholder="Fecha inicio" />
        <Input type="Date" label="Fecha final" placeholder="Fecha final" />
        <Input
          type="Number"
          label="Ofrenda"
          placeholder="Ingrese una ofrenda"
        />
        <Input
          type="text"
          label="Dirigido a"
          placeholder="Ingrese a quien va dirigido"
        />
        <Input
          type="text"
          label="Impartido por"
          placeholder="Ingrese quien lo imparte"
        />
        <Input
          type="text"
          label="Lugar / ubicación"
          placeholder="Ingrese una dirección"
        />
        <Input
          type="text"
          label="Horarios"
          placeholder="Ingrese los horarios"
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">
          Seleccione el tipo de curso o crecimiento:
        </p>
        <Dropdown
          options={tipo}
          onChange={handleSelectTipo}
          value={selectedTipo}
        />
      </div>
      <Button color="primary" className="w-11/12 m-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default C_nuevo;
