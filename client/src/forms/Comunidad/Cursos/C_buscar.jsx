import React from "react";
import { Input, Button } from "@nextui-org/react";

const C_buscar = () => {
  return (
    <div className="flex w-full flex-col ">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Buscar Curso o Crecimiento
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto  sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre"
          autoComplete="nope"
          placeholder="Ingrese un nombre"
        />
      </div>
      <Button color="primary" className="w-11/12 sm:w-3/5 m-auto">
        Filtrar
      </Button>
    </div>
  );
};

export default C_buscar;
