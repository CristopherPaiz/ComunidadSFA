import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

const Navbutton = () => {
  const [selected, setSelected] = useState("");
  const [selectedPersonas, setSelectedPersonas] = useState("");
  const [selectedRetiros, setSelectedRetiros] = useState("");
  const [selectedCursos, setSelectedCursos] = useState("");
  const [selectedCrecimientos, setSelectedCrecimientos] = useState("");
  const [selectedComunidades, setSelectedComunidades] = useState("");
  const [selectedActividades, setSelectedActividades] = useState("");

  return (
    <div className="flex w-full flex-col">
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
                  Aqui irá las búsquedas de personas
                </Tab>
                <Tab key="persona_nuevo" title="Nuevo">
                  Aqui irá el formulario de nueva persona
                </Tab>
                <Tab key="persona_comunidad" title="Por comunidad">
                  Aqui irá la lista de personas por comunidad
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
                  Aqui se listarán todos los retiros
                </Tab>
                <Tab key="retiros_nuevo" title="Nuevo">
                  Aqui irá el formulario de Nuevo
                </Tab>
                <Tab key="retiros_buscar" title="Buscar">
                  Aqui irán las búsquedas de retiros
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="cursos" title="Cursos">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsCursos"
                selectedKey={selectedCursos}
                onSelectionChange={setSelectedCursos}
              >
                <Tab key="cursosLista" title="Todos los Cursos">
                  Aqui se listarán todos los cursos
                </Tab>
                <Tab key="cursos_nuevo" title="Nuevo">
                  Aqui irá el formulario de Nuevo curso
                </Tab>
                <Tab key="cursos_buscar" title="Buscar">
                  Aqui irán las búsquedas de cursos
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="crecimientos" title="Crecimientos">
          <Card>
            <CardBody>
              <Tabs
                color="primary"
                className="sm:flex sm:flex-wrap"
                aria-label="OptionsCursos"
                selectedKey={selectedCrecimientos}
                onSelectionChange={setSelectedCrecimientos}
              >
                <Tab key="crecimientosLista" title="Todos los Crecimientos">
                  Aqui se listarán todos los crecimientos
                </Tab>
                <Tab key="crecimientos_nuevo" title="Nuevo">
                  Aqui irá el formulario de Nuevo Crecimiento
                </Tab>
                <Tab key="crecimientos_buscar" title="Buscar">
                  Aqui irán las búsquedas de Crecimientos
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
                <Tab key="comunidadesLista" title="Todas las comunidades">
                  Aqui se listarán todas las Comunidades
                </Tab>
                <Tab key="comunidades_nuevo" title="Nueva">
                  Aqui irá el formulario de Nueva Comunidad
                </Tab>
                <Tab key="comunidades_buscar" title="Buscar">
                  Aqui irán las búsquedas de Comunidades
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
                <Tab key="actividadesLista" title="Todas las Actividades">
                  Aqui se listarán todas las Actividades
                </Tab>
                <Tab key="actividades_nuevo" title="Nueva">
                  Aqui irá el formulario de Nueva Actividad
                </Tab>
                <Tab key="actividadess_buscar" title="Buscar">
                  Aqui irán las búsquedas de Actividades
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
