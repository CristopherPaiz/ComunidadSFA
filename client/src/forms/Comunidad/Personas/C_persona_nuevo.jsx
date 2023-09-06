import React, { useEffect, useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";

const C_persona_nuevo = () => {
  const tipo = ["Pueblo", "Servidor", "Subcoordinador", "Coordinador", "Otro"];
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);

  //useState para todas las variables de ingreso
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaPrimerRetiro, setFechaPrimerRetiro] = useState("");
  const [fechaPrimerCrecimiento, setFechaPrimerCrecimiento] = useState("");
  const [fechaServidor, setFechaServidor] = useState("");
  const [fechaSubcoordinador, setFechaSubcoordinador] = useState("");
  const [fechaCoordinador, setFechaCoordinador] = useState("");
  const [observaciones, setObservaciones] = useState("");
  //////////////////////////////////////////////////////////////////////////////
  const [selected, setSelected] = React.useState([]);

  const [valueComunidad, setValueComunidad] = React.useState(new Set([]));
  const [comunidades, setComunidades] = React.useState([]);

  const handleSelectTipo = (selected) => {
    setSelectedTipo(selected);
  };

  //fetch para cargar las comunidades
  const buscarComunidad = async () => {
    try {
      const response = await fetch(`${API_URL}/comunidad/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener las comunidades");
        throw new Error("Error al filtrar las comunidades", {});
      }

      const data = await response.json();
      setComunidades(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const datos = {
      nuevo: true,
      tipo: selectedTipo.value,
      nombre: nombre,
      telefono: telefono,
      trabajaen: trabajo,
      direccion: direccion,
      idcomunidad: valueComunidad.currentKey,
      dones: selected,
      fechainicio: fechaPrimerRetiro,
      fechacreci: fechaPrimerCrecimiento,
      fechaservi: fechaServidor,
      fechasubcordi: fechaSubcoordinador,
      fechacordi: fechaCoordinador,
      observaciones: observaciones,
      estado: true,
    };
    try {
      const response = await fetch(`${API_URL}/persona/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...datos,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al añadir a la persona", {});
        throw new Error("Error al añadir a la persona", {});
      }
      const data = await response.json();
      toast.success("Se agrego a la persona correctamente", {});
      await new Promise((resolve) => setTimeout(resolve, 1300));
      // window.location.reload();
      //Setear todos los campos en blanco
      setNombre("");
      setTelefono("");
      setTrabajo("");
      setDireccion("");
      setFechaPrimerRetiro("");
      setFechaPrimerCrecimiento("");
      setFechaServidor("");
      setFechaSubcoordinador("");
      setFechaCoordinador("");
      setObservaciones("");
      setSelectedTipo(tipo[0]);
      setSelected([]);
    } catch (error) {
      toast.error("Error al añadir a la persona: " + error);
      console.log(error);
    }
  };

  useEffect(() => {
    buscarComunidad();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Hermano
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el tipo de persona:</p>
        <Dropdown options={tipo} onChange={handleSelectTipo} value={selectedTipo} />
        <Input
          type="text"
          label="Nombre completo"
          isRequired
          placeholder="Ingrese el nombre completo"
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          type="text"
          label="Teléfono"
          placeholder="Ingrese el número de teléfono"
          onChange={(e) => setTelefono(e.target.value)}
        />
        <Select
          label="Comunidad"
          variant="bordered"
          placeholder="Seleccione una Comunidad o Célula"
          selectedKeys={valueComunidad}
          className="max-w-xs"
          onSelectionChange={setValueComunidad}
        >
          {comunidades.length > 0 ? (
            comunidades.map((comunidad) => (
              <SelectItem key={comunidad?._id} value={comunidad?.nombreComunidad}>
                {comunidad?.nombreComunidad ?? ""}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="cargando" text="Cargando comunidades..." disabled />
          )}
        </Select>
        <Input type="text" label="Trabaja en..." placeholder="Trabajo" onChange={(e) => setTrabajo(e.target.value)} />
        <Input
          type="text"
          label="Dirección"
          placeholder="Ingrese una dirección"
          onChange={(e) => setDireccion(e.target.value)}
        />
        <p className="font-bold sm:hidden -mb-2">Seleccione el tipo de Dones</p>
        <div className="flex flex-col gap-3">
          <CheckboxGroup color="primary" value={selected} orientation="horizontal" onValueChange={setSelected}>
            <Checkbox value="Predicador">Predicador</Checkbox>
            <Checkbox value="Avivador">Avivador</Checkbox>
            <Checkbox value="Músico">Músico</Checkbox>
            <Checkbox value="Orador">Orador</Checkbox>
          </CheckboxGroup>
          <p className="text-default-500 text-small">Seleccionado: {selected.join(", ")}</p>
        </div>
        <p className="font-bold sm:hidden -mb-2">Lista de Retiros, cursos y crecimientos</p>
        <p className="text-danger sm:hidden my-2">
          Para agregar retiros, cursos y crecimientos, primero cree a la persona y luego búsquela para poder añadirle
          los retiros, cursos y crecimientos
        </p>
        <p className="font-bold sm:hidden -m-2">Fecha primer retiro</p>
        <Input
          type="Date"
          label="Fecha primer retiro"
          placeholder="Ingrese una dirección"
          onChange={(e) =>
            setFechaPrimerRetiro(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha primer crecimiento / curso</p>
        <Input
          type="Date"
          label="Fecha Primer crecimiento / curso"
          placeholder="Ingrese una dirección"
          onChange={(e) =>
            setFechaPrimerCrecimiento(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Servidor</p>
        <Input
          type="Date"
          label="Fecha inició a ser Servidor"
          placeholder="Ingrese un servidor"
          onChange={(e) =>
            setFechaServidor(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Subcoordinador</p>
        <Input
          type="Date"
          label="Fecha inició a ser Subcoordinador"
          placeholder="Ingrese un subcoordinador"
          onChange={(e) =>
            setFechaSubcoordinador(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
        />
        <p className="font-bold sm:hidden -m-2">Fecha inició a ser Coordinador</p>
        <Input
          type="Date"
          label="Fecha inició a ser Coordinador"
          placeholder="Ingrese una dirección"
          onChange={(e) =>
            setFechaCoordinador(
              new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                .toISOString()
                .split("T")[0]
            )
          }
        />
        <Textarea
          type="text"
          placeholder="Ingrese alguna observación"
          onChange={(e) => setObservaciones(e.target.value)}
        ></Textarea>
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5 text-white" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default C_persona_nuevo;
