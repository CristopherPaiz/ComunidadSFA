import React, { useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const EditarPersona = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { personSelected } = location.state;

  if (!location.state) {
    return <Navigate to={"/comunidad"} />;
  }

  const tipo = ["Pueblo", "Servidor", "Subcoordinador", "Coordinador", "Otro"];
  const [selectedTipo, setSelectedTipo] = useState(personSelected.tipo);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };
  //////////////////////////////////////////////////////////////////////////////
  const [selected, setSelected] = React.useState(personSelected.dones);

  // Paso 1: Agregar estado para seguir los datos actualizados del cliente
  const [datosPersonaActualizados, setDatosPersonaActualizados] = useState({
    ...personSelected,
  });

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Editar Hermano
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el tipo de persona:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <Input
          type="text"
          label="Nombre completo"
          placeholder="Ingrese el nombre completo"
          defaultValue={personSelected?.nombre ?? ""}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              nombre: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Teléfono"
          placeholder="Ingrese el número de teléfono"
          defaultValue={personSelected?.telefono ?? ""}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              telefono: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Trabaja en..."
          placeholder="Trabajo"
          defaultValue={personSelected?.trabajaen ?? ""}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              trabajaen: e.target.value,
            })
          }
        />
        <Input
          type="text"
          label="Dirección"
          placeholder="Ingrese una dirección"
          defaultValue={personSelected?.direccion ?? ""}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              direccion: e.target.value,
            })
          }
        />
        <p className="font-bold sm:hidden -mb-2">Seleccione el tipo de Dones</p>
        <div className="flex flex-col gap-3">
          <CheckboxGroup
            color="primary"
            value={selected}
            orientation="horizontal"
            onValueChange={setSelected}
          >
            <Checkbox value="Predicador">Predicador</Checkbox>
            <Checkbox value="Avivador">Avivador</Checkbox>
            <Checkbox value="Músico">Músico</Checkbox>
            <Checkbox value="Orador">Orador</Checkbox>
          </CheckboxGroup>
          <p className="text-default-500 text-small">Seleccionado: {selected.join(", ")}</p>
        </div>
        <p className="font-bold sm:hidden -mb-2">Lista de Retiros</p>
        <Button color="primary" className="sm:h-13">
          Ingresar un nuevo retiro
        </Button>
        <p className="font-bold text-[18px] sm:hidden -mb-2">Lista de Crecimientos / cursos</p>
        <Button color="primary" className="sm:h-13">
          Ingresar un nuevo crecimiento / curso
        </Button>
        <p className="font-bold sm:hidden -m-2">Fecha primer retiro</p>
        <Input
          type="Date"
          label="Fecha primer retiro"
          placeholder="Ingrese una fecha"
          defaultValue={formatfecha(personSelected?.fechainicio ?? "")}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              fechainicio: e.target.value,
            })
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha primer crecimiento / curso</p>
        <Input
          type="Date"
          label="Fecha Primer crecimiento / curso"
          placeholder="Ingrese una fecha"
          defaultValue={formatfecha(personSelected?.fechacreci ?? "")}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              fechacreci: e.target.value,
            })
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Servidor</p>
        <Input
          type="Date"
          label="Fecha inició a ser Servidor"
          placeholder="Ingrese una fecha"
          defaultValue={formatfecha(personSelected?.fechaservi ?? "")}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              fechaservi: e.target.value,
            })
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Subcoordinador</p>
        <Input
          type="Date"
          label="Fecha inició a ser Subcoordinador"
          placeholder="Ingrese una fecha"
          defaultValue={formatfecha(personSelected?.fechasubcordi ?? "")}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              fechasubcordi: e.target.value,
            })
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Coordinador</p>
        <Input
          type="Date"
          label="Fecha inició a ser Coordinador"
          placeholder="Ingrese una fecha"
          defaultValue={formatfecha(personSelected?.fechacordi ?? "")}
          onChange={(e) =>
            setDatosPersonaActualizados({
              ...datosPersonaActualizados,
              fechacordi: e.target.value,
            })
          }
        />
        <p className="font-bold text-[18px] sm:hidden -mb-2">Lista de Ofrendas</p>
        <Button color="primary" className="sm:h-full">
          Ingresar un nueva ofrenda
        </Button>
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5">
        Guardar
      </Button>
    </div>
  );
};

export default EditarPersona;
