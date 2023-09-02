import React from "react";
import { Input, Button } from "@nextui-org/react";

const A_buscar = () => {
  return (
    <div className="flex w-full flex-col h-screen ">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Buscar Actividad
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto  sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre"
          autoComplete="nope"
          placeholder="Ingrese el nombre de la actividad"
        />
      </div>
      <Button color="primary" className="w-11/12 sm:w-3/5 mx-auto">
        Filtrar
      </Button>
    </div>
  );
};

export default A_buscar;
