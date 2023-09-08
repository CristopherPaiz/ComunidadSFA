import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import U_todos from "../forms/Usuarios/U_todos";
import U_add from "../forms/Usuarios/U_add";

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
              <U_todos />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="user2" title="Crear nuevo usuario">
          <Card>
            <CardBody>
              <U_add />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavButtonUsuarios;
