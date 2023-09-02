import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
const F_venta_producto = () => {
  return (
    <div className="flex w-full flex-col h-screen">
      <h2 className="my-6 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Venta Producto
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto sm:w-3/5 ">
        <h2 className="block m-auto font-medium text-2xl sm:hidden">Precio de venta: Q. --.--</h2>
        <Input type="text" label="Nombre" placeholder="Ingrese el nombre del producto" />
        <Input type="Number" label="Cantidad" placeholder="Ingrese cantidad a vender" />
        <Input type="Date" label="Fecha" placeholder="Fecha" isDisabled />
        <Button color="success" className="w-11/12 m-auto sm:w-3/5">
          Vender
        </Button>
      </div>
    </div>
  );
};

export default F_venta_producto;
