import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const NavbuttonFarmacia = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex w-full px-2 flex-col m-auto sm:w-11/12">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="success"
        className="sm:flex sm:flex-wrap sm:justify-center"
      >
        <Tab key="productos" title="Productos">
          <Card>
            <CardBody>Aquí irán los productos</CardBody>
          </Card>
        </Tab>
        <Tab key="addproductos" title="Agregar Producto">
          <Card>
            <CardBody>Aquí irá el formulario para añadir productos</CardBody>
          </Card>
        </Tab>
        <Tab key="ventas" title="Venta">
          <Card>
            <CardBody>Aquí irá formulario de venta de un producto</CardBody>
          </Card>
        </Tab>
        <Tab key="compras" title="Compra">
          <Card>
            <CardBody>Aquí irá formulario de compra de un producto</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavbuttonFarmacia;
