import React, { useState } from "react";
import {
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLocation, Navigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import API_URL from "../../config";

const EditarPersona = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [resultadosRetiros, setResultadosRetiros] = useState([]);
  const [valueRetiro, setValueRetiro] = React.useState(new Set([]));

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
  const [retirosActualizados, setRetirosActualizados] = useState([...personSelected.retiros]);
  const [crecimientosActualizados, setCrecimientosActualizados] = useState([...personSelected.crecimientos]);

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

  // fetch para obtener los retiros
  const handleBuscar = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/retiro/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al filtrar a las personas");
        throw new Error("Error al filtrar a las personas", {});
      }

      const data = await response.json();
      console.log(data);
      setResultadosRetiros(data);
      setLoading(false);
      onOpen();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const datosfinales = {
      ...datosPersonaActualizados,
      retiros: retirosActualizados,
      crecimientos: crecimientosActualizados,
    };

    console.log(datosfinales);
  };

  const handleRetiroFechaChange = (index, newValue) => {
    const updatedRetiros = [...retirosActualizados];
    updatedRetiros[index].fecha = newValue;
    setRetirosActualizados(updatedRetiros);
  };

  const handleCrecimientoFechaChange = (index, newValue) => {
    const updatedCrecimientos = [...crecimientosActualizados];
    updatedCrecimientos[index].fecha = newValue;
    setCrecimientosActualizados(updatedCrecimientos);
  };

  const handleRetiroCuotasChange = (index, newCuotas) => {
    const updatedRetiros = [...retirosActualizados];
    updatedRetiros[index].cuota = newCuotas.split(", ");
    setRetirosActualizados(updatedRetiros);
  };

  const handleCrecimientoCuotasChange = (index, newCuotas) => {
    const updatedCrecimientos = [...crecimientosActualizados];
    updatedCrecimientos[index].cuota = newCuotas.split(", ");
    setCrecimientosActualizados(updatedCrecimientos);
  };

  return (
    <div className="flex w-full flex-col mb-10 p-6">
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
        Editar Hermano
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 m-auto sm:w-5/12 ">
        <p className="font-bold text-[18px] -mb-2">Seleccione el tipo de persona:</p>
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
          <CheckboxGroup color="primary" value={selected} orientation="horizontal" onValueChange={setSelected}>
            <Checkbox value="Predicador">Predicador</Checkbox>
            <Checkbox value="Avivador">Avivador</Checkbox>
            <Checkbox value="Músico">Músico</Checkbox>
            <Checkbox value="Orador">Orador</Checkbox>
          </CheckboxGroup>
          <p className="text-default-500 text-small">Seleccionado: {selected.join(", ")}</p>
        </div>
        <p className="font-bold -mb-2">Lista de Retiros</p>
        <div className="container w-full overflow-scroll sm:flex sm:overflow-auto">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-slate-200">Nombre</th>
                <th className="border px-4 py-2 bg-slate-200">Fecha</th>
                <th className="border px-4 py-2 bg-slate-200">Ofrendas</th>
              </tr>
            </thead>
            <tbody>
              {datosPersonaActualizados.retiros.map((item, index) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.idretiro.nombreRetiro}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="Date"
                      value={formatfecha(item.fecha)}
                      onChange={(e) => handleRetiroFechaChange(index, e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Textarea
                      type="text"
                      value={item.cuota.join(", ")}
                      onChange={(e) => handleRetiroCuotasChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button color="primary" className="sm:h-13" onClick={handleBuscar}>
          Ingresar un nuevo retiro
        </Button>
        <p className="font-bold text-[18px] -mb-2">Lista de Crecimientos / cursos</p>
        <div className="container w-full overflow-scroll sm:flex sm:overflow-auto">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-slate-200">Nombre</th>
                <th className="border px-4 py-2 bg-slate-200">Fecha</th>
                <th className="border px-4 py-2 bg-slate-200">Ofrendas</th>
              </tr>
            </thead>
            <tbody>
              {datosPersonaActualizados.crecimientos.map((item, index) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.idcursocreci.nombreCursoCreci}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="Date"
                      value={formatfecha(item.fecha)}
                      onChange={(e) => handleCrecimientoFechaChange(index, e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Textarea
                      type="text"
                      value={item.cuota.join(", ")}
                      onChange={(e) => handleCrecimientoCuotasChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Retiros de {personSelected?.nombre ?? ""}</ModalHeader>
              <ModalBody>
                <div className="grid gap-6 mb-6 w-11/12 m-auto sm:grid-cols-1">
                  <Select
                    label="Retiro"
                    variant="bordered"
                    placeholder="Seleccione un retiro"
                    selectedKeys={valueRetiro}
                    className="max-w-xs"
                    onSelectionChange={setValueRetiro}
                  >
                    {resultadosRetiros.map((retiro) => (
                      <SelectItem key={retiro?._id} value={retiro?.nombreRetiro}>
                        {retiro.nombreRetiro}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input type="Date" label="Ingrese la fecha" autoComplete="nope" placeholder="Ingrese la fecha" />
                  <Input type="text" label="Ofrendas" autoComplete="nope" placeholder="Ingrese las ofrendas" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose}>
                  Añadir
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button color="success" className="w-11/12 m-auto sm:w-5/12" onClick={handleSubmit}>
        Actualizar Datos
      </Button>
    </div>
  );
};

export default EditarPersona;
