import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import C_persona_buscar from "../forms/Comunidad/Personas/C_persona_buscar";
import C_persona_nuevo from "../forms/Comunidad/Personas/C_persona_nuevo";
import C_persona_comunidad from "../forms/Comunidad/Personas/C_persona_comunidad";
import R_nuevo from "../forms/Comunidad/Retiros/R_nuevo";
import R_buscar from "../forms/Comunidad/Retiros/R_buscar";
import C_nuevo from "../forms/Comunidad/Cursos/C_nuevo";
import C_buscar from "../forms/Comunidad/Cursos/C_buscar";
import C_comunidad_nueva from "../forms/Comunidad/Comunidades/C_comunidad_nueva";
import C_comunidad_buscar from "../forms/Comunidad/Comunidades/C_comunidad_buscar";
import A_nueva from "../forms/Comunidad/Actividades/A_nueva";
import A_buscar from "../forms/Comunidad/Actividades/A_buscar";

const Navbutton = () => {
  const [selected, setSelected] = useState("");
  const [selectedPersonas, setSelectedPersonas] = useState("");
  const [selectedRetiros, setSelectedRetiros] = useState("");
  const [selectedCursos, setSelectedCursos] = useState("");
  const [selectedComunidades, setSelectedComunidades] = useState("");
  const [selectedActividades, setSelectedActividades] = useState("");

  return (
    <div className="flex w-full px-2 flex-col m-auto sm:w-11/12 sm:m-auto ">
      <p className="m-auto sm:hidden mb-3 mt-1 animate-bounceEdit">← Desliza para ver las demás opciones → </p>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="primary"
        className="sm:flex sm:flex-wrap sm:justify-center"
      >
        <Tab key="personas" title="Personas">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsPersonas"
                selectedKey={selectedPersonas}
                onSelectionChange={setSelectedPersonas}
              >
                <Tab key="persona_buscar" title="Buscar">
                  <C_persona_buscar />
                </Tab>
                <Tab key="persona_nuevo" title="Nuevo">
                  <C_persona_nuevo />
                </Tab>
                <Tab key="persona_comunidad" title="Por comunidad">
                  <C_persona_comunidad />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="retiros" title="Retiros">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="Optionsretiros"
                selectedKey={selectedRetiros}
                onSelectionChange={setSelectedRetiros}
              >
                <Tab key="retirosLista" title="Todos los retiros">
                  Aquí se listarán todos los Retiros...
                </Tab>
                <Tab key="retiros_nuevo" title="Nuevo">
                  <R_nuevo />
                </Tab>
                <Tab key="retiros_buscar" title="Buscar">
                  <R_buscar />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="cursos" title="Cursos/Crecimientos">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsCursos"
                selectedKey={selectedCursos}
                onSelectionChange={setSelectedCursos}
              >
                <Tab key="cursosLista" title="Todos">
                  Aqui se listarán todos los cursos / crecimientos
                </Tab>
                <Tab key="cursos_nuevo" title="Nuevo">
                  <C_nuevo />
                </Tab>
                <Tab key="cursos_buscar" title="Buscar">
                  <C_buscar />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="comunidades" title="Comunidades">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsComunidades"
                selectedKey={selectedComunidades}
                onSelectionChange={setSelectedComunidades}
              >
                <Tab key="comunidadesLista" title="Todas">
                  Aqui se listarán todas las Comunidades
                </Tab>
                <Tab key="comunidades_nuevo" title="Nueva">
                  <C_comunidad_nueva />
                </Tab>
                <Tab key="comunidades_buscar" title="Buscar">
                  <C_comunidad_buscar />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="actividades" title="Actividades">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsComunidades"
                selectedKey={selectedActividades}
                onSelectionChange={setSelectedActividades}
              >
                <Tab key="actividadesLista" title="Todas">
                  Aqui se listarán todas las Actividades
                </Tab>
                <Tab key="actividades_nuevo" title="Nueva">
                  <A_nueva />
                </Tab>
                <Tab key="actividadess_buscar" title="Buscar">
                  <A_buscar />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Navbutton;
