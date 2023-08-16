import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

const Navbutton = () => {
  const [selected, setSelected] = useState("photos");

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        className="sm:flex sm:flex-wrap sm:justify-center"
      >
        <Tab key="retiros" title="Retiros">
          <Card>
            <CardBody>Datos de los Retiros</CardBody>
          </Card>
        </Tab>
        <Tab key="cursos" title="Cursos">
          <Card>
            <CardBody>Datos de los Cursos</CardBody>
          </Card>
        </Tab>
        <Tab key="crecimientos" title="Crecimientos">
          <Card>
            <CardBody>Datos de los Crecimientos</CardBody>
          </Card>
        </Tab>
        <Tab key="comunidades" title="Comunidades">
          <Card>
            <CardBody>Datos de las Comunidades</CardBody>
          </Card>
        </Tab>
        <Tab key="actividades" title="Actividades">
          <Card>
            <CardBody>Datos de las Actividades</CardBody>
          </Card>
        </Tab>
        <Tab key="personas" title="Personas">
          <Card>
            <CardBody>Datos de las Personas</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Navbutton;
