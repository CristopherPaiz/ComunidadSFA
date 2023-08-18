import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import F_agregar_producto from "../forms/Farmacia/F_agregar_producto";
import F_venta_producto from "../forms/Farmacia/F_venta_producto";
import F_compra_producto from "../forms/Farmacia/F_compra_producto";

const NavbuttonFarmacia = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex w-full px-2 flex-col m-auto sm:w-11/12">
      <p className="m-auto sm:hidden mb-3 mt-1 animate-bounceEdit">← Desliza para ver las demás opciones → </p>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="success"
        className="sm:flex sm:flex-wrap sm:justify-center"
      >
        <Tab key="productos" title="Productos">
          <Card>
            <CardBody>Aquí irá la lista de los productos</CardBody>
          </Card>
        </Tab>
        <Tab key="ventas" title="Venta">
          <Card>
            <F_venta_producto />
          </Card>
        </Tab>
        <Tab key="compras" title="Compra">
          <Card>
            <F_compra_producto />
          </Card>
        </Tab>
        <Tab key="addproductos" title="Agregar Producto">
          <Card>
            <F_agregar_producto />;
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavbuttonFarmacia;
