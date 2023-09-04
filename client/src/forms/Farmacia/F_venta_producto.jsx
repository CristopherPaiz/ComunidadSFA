import React, { useState, useContext } from "react";
import { Input, Button, Divider } from "@nextui-org/react";

const F_venta_producto = () => {
  const handleSubmit = () => {
    console.log(seleccionado);
  };

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex w-full flex-col h-full pb-6">
      <h2 className="m-6 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Venta Producto
      </h2>
      <div className="grid gap-6  md:grid-cols-2 w-11/12 mx-auto sm:w-3/5 ">
        <Input type="text" label="Buscar" placeholder="Busque un producto" />
        <Button color="success" className="w-11/12 mx-auto sm:w-3/5">
          Filtrar
        </Button>
      </div>
      <Divider className="my-6" />
      <div>
        
      </div>
    </div>
  );
};

export default F_venta_producto;
