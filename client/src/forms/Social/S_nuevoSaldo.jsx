import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const S_nuevoSaldo = () => {
  const tipo = ["Beneficiario A", "Beneficiario B", "Beneficiario C", "Beneficiario D"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  return (
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Saldo a favor
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el beneficiario:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <Input type="text" label="Nombre donante / entidad" placeholder="Ingrese un nombre de donate o entidad" />
        <Input type="Number" label="Cantidad" placeholder="Ingrese una cantidad" />
        <Input type="text" label="Observaciones" placeholder="Ingrese algunas observaciones" />
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default S_nuevoSaldo;
