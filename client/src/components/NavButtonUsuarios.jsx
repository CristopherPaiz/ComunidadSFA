import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

const NavButtonUsuarios = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex w-full px-2 flex-col mx-auto sm:w-11/12">
      <p className="m-auto sm:hidden mb-3 mt-1 animate-bounceEdit">← Desliza para ver las demás opciones → </p>

      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="secondary"
        className="sm:flex sm:flex-wrap sm:justify-center justify-center"
      >
        <Tab key="user1" title="Todos los usuarios">
          <Card>
            <CardBody>
              <h1>Todos los usuarios</h1>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="user2" title="Crear nuevo usuario">
          <Card>
            <CardBody>
              <h1>Crear nuevo usuario</h1>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="user3" title="Editar un usuario">
          <Card>
            <CardBody>
              <h1>Editar al usuario</h1>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavButtonUsuarios;
