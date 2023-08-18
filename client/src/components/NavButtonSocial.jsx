import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

const NavButtonSocial = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex w-full px-2 flex-col m-auto sm:w-11/12">
      <p className="m-auto sm:hidden mb-3 mt-1 animate-bounceEdit">← Desliza para ver las demás opciones → </p>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="warning"
        className="sm:flex sm:flex-wrap sm:justify-center"
      >
        <Tab key="beneficiarios" title="Beneficiarios">
          <Card>
            <CardBody>Aquí irán los Beneficiarios</CardBody>
          </Card>
        </Tab>
        <Tab key="addsaldo" title="Añadir Nuevo Saldo">
          <Card>
            <CardBody>Aquí irá el formulario para añadir nuevo saldo al beneficiario</CardBody>
          </Card>
        </Tab>
        <Tab key="addgasto" title="Añadir Nuevo Gasto">
          <Card>
            <CardBody>Aquí irá formulario de gasto de un beneficiario</CardBody>
          </Card>
        </Tab>
        <Tab key="addsocial" title="Añadir Nuevo Proyecto">
          <Card>
            <CardBody>Aquí irá formulario para añadir nuevo Proyecto Social</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavButtonSocial;
