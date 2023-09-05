import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const S_quitarSaldo = () => {
  const tipo = ["Beneficiario A", "Beneficiario B", "Beneficiario C", "Beneficiario D"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  return (
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo gasto
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el beneficiario:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <Input type="Date" label="Fecha gasto" placeholder="Ingrese fechaa" />
        <Input type="Number" label="Cantidad" placeholder="Ingrese una cantidad" />
        <Input type="text" label="Observaciones" placeholder="Ingrese algunas observaciones" />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Ingrese fotografías:</p>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Toca para subir</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/gif, image/jpeg" />
          </label>
        </div>
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default S_quitarSaldo;
