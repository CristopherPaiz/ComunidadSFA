import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import S_nuevo from "../forms/Social/S_nuevo";
import S_nuevoSaldo from "../forms/Social/S_nuevoSaldo";
import S_quitarSaldo from "../forms/Social/S_quitarSaldo";
import CardExample from "../forms/CardExample";

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
          <CardExample
            img={"https://cdn-icons-png.flaticon.com/512/6000/6000659.png"}
            title={"Nombre beneficiario"}
            txt={"Información del beneficiario"}
            subtxt={"Aquí van otros datos"}
          />
        </Tab>
        <Tab key="addsaldo" title="Añadir Nuevo Saldo">
          <Card>
            <S_nuevoSaldo />
          </Card>
        </Tab>
        <Tab key="addgasto" title="Añadir Nuevo Gasto">
          <Card>
            <S_quitarSaldo />
          </Card>
        </Tab>
        <Tab key="addbeneficiario" title="Añadir beneficiario">
          <Card>
            <S_nuevo />
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavButtonSocial;
