import React from "react";
import { Input, Button, Divider } from "@nextui-org/react";

const R_buscar = () => {
  return (
    <>
      <div className="flex w-full flex-col h-screen ">
        <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
          Buscar Retiro
        </h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto  sm:w-3/5 ">
          <Input type="text" label="Nombre del retiro" autoComplete="nope" placeholder="Ingrese nombre del retiro" />
        </div>
        <Button color="primary" className="w-11/12 sm:w-3/5 mx-auto">
          Filtrar
        </Button>
        <Divider className="my-5" />
      </div>
    </>
  );
};

export default R_buscar;
