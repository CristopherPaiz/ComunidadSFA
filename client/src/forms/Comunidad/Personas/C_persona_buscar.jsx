import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Loading from "../../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../config.js";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link as Linky } from "react-router-dom";

const C_persona_buscar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [personSelected, setPersonSelected] = useState();

  const options = ["Predicador", "Músico", "Orador", "Avivador"];
  const [loading, setLoading] = useState(false);

  //useState para los 4 campos de texto
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dones, setDones] = useState("");
  const [selectedOption, setSelectedOption] = useState();

  const [resultados, setResultados] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setDones(selected.value);
  };

  const handleBuscar = async () => {
    if (nombre === "" && telefono === "" && direccion === "" && dones === "") {
      toast.error("Ingrese al menos un campo", {});
      setResultados([]);
      return null;
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/persona/filtrar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            telefono,
            direccion,
            dones,
          }),
          credentials: "include", // Asegúrate de incluir esta opción
        });
        if (!response.ok) {
          toast.error("Error al filtrar a las personas", {});
          throw new Error("Error al filtrar a las personas", {});
        }

        const data = await response.json();
        setResultados(data);
        setLoading(false);
        toast.success("Datos cargados correctamente", {});
      } catch (error) {
        setLoading(false);
        toast.error("Error al obtener a las personas", {});
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex w-full flex-col mb-[20px] h-screen">
        <h2 className="mt-4 text-3xl text-center font-extrabold leading-none tracking-tigh md:text-5xl lg:text-3xl dark:text-whited">
          Buscar persona
        </h2>
        <div className="grid gap-6 md:grid-cols-2 w-11/12 mx-auto my-6 sm:w-3/5 ">
          <Input
            type="text"
            label="Nombre o apellido"
            autoComplete="nope"
            placeholder="Ingrese nombre o apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="text"
            label="Teléfono"
            autoComplete="nope"
            placeholder="Ingrese el número de teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Input
            type="text"
            label="Dirección"
            autoComplete="nope"
            placeholder="Ingrese una dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <p className="p-0 sm:hidden">Tipo de don</p>
          <Dropdown options={options} onChange={handleSelectChange} value={selectedOption} zz />
          <Button color="primary" className="w-full sm:w-3/5 mx-auto" onClick={handleBuscar}>
            Filtrar
          </Button>
        </div>
        <Divider className="mb-5" />
        {loading ? (
          <Loading />
        ) : resultados.length > 0 ? (
          <>
            <div className="flex w-full flex-row flex-wrap gap-4 pb-5">
              {resultados?.map((persona, idx) => (
                <div
                  key={idx}
                  className="m-auto min-w-[300px] max-w-[500px] sm:min-w-[500px] cursor-pointer dark:border-white border-1 rounded-xl"
                  onClick={() => {
                    setPersonSelected(persona);
                    onOpen();
                  }}
                >
                  <Card className="w-full h-full grid center hover:bg-slate-500">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md">
                          <b>Nombre:</b> {persona?.nombre ?? ""}
                        </p>
                        <p className="text-md">
                          <b>Teléfono:</b> {persona?.telefono ?? ""}
                        </p>
                        <p className="text-md">
                          <b>Comunidad:</b> {persona?.idcomunidad.nombreComunidad ?? ""}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardFooter>
                      <p className="text-md">
                        <b>Dones:</b>{" "}
                        {persona?.dones?.length > 0 ? persona?.dones?.join(", ") ?? "" : "N/A - "}
                      </p>
                      <p className="w-3/12"></p>
                      <p className="text-md">
                        <b> Tipo:</b> {persona?.tipo ?? ""}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">{personSelected?.nombre ?? ""}</ModalHeader>
                    <ModalBody>
                      <Table removeWrapper isStriped aria-label="Example static collection table">
                        <TableHeader>
                          <TableColumn className="font-bold text-xl">Campos</TableColumn>
                          <TableColumn className="font-bold text-xl">Datos</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell className="font-bold">Nombre</TableCell>
                            <TableCell>{personSelected?.nombre ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell className="font-bold">Teléfono</TableCell>
                            <TableCell>{personSelected?.telefono ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="3">
                            <TableCell className="font-bold">Tipo</TableCell>
                            <TableCell>{personSelected?.tipo ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="4">
                            <TableCell className="font-bold">Trabaja en</TableCell>
                            <TableCell>{personSelected?.trabajaen ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="5">
                            <TableCell className="font-bold">Dirección</TableCell>
                            <TableCell>{personSelected?.direccion ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="6">
                            <TableCell className="font-bold">Comunidad</TableCell>
                            <TableCell>{personSelected?.idcomunidad.nombreComunidad ?? ""}</TableCell>
                          </TableRow>
                          <TableRow key="7">
                            <TableCell className="font-bold">Dones</TableCell>
                            <TableCell>
                              {personSelected?.dones?.length > 0
                                ? personSelected?.dones?.join(", ") ?? ""
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                          <TableRow key="8">
                            <TableCell className="font-bold">Retiros</TableCell>
                            <TableCell>
                              {personSelected?.retiros?.length > 0 &&
                                personSelected?.retiros.map((retiro, index) => (
                                  <div key={index}>
                                    <p className="font-bold">{retiro.idretiro?.nombreRetiro}</p>
                                    <p>Q. {retiro?.cuota?.join(", Q. ")}</p>
                                  </div>
                                ))}
                            </TableCell>
                          </TableRow>
                          <TableRow key="9">
                            <TableCell className="font-bold">Crecimientos</TableCell>
                            <TableCell>
                              {personSelected?.crecimientos?.length > 0 &&
                                personSelected.crecimientos.map((crecimiento, index) => (
                                  <div key={index}>
                                    <p className="font-bold">{crecimiento?.idcursocreci?.nombreCursoCreci}</p>
                                    <p>Q. {crecimiento?.cuota?.join(", Q. ")}</p>
                                  </div>
                                ))}
                            </TableCell>
                          </TableRow>
                          <TableRow key="10">
                            <TableCell className="font-bold">Fecha primer retiro</TableCell>
                            <TableCell>
                              {personSelected?.fechainicio
                                ? format(
                                    new Date(personSelected?.fechainicio),
                                    "EEEE d 'de' MMMM 'de' yyyy",
                                    {
                                      locale: es,
                                    }
                                  )
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow key="11">
                            <TableCell className="font-bold">Fecha primer Crecimiento</TableCell>
                            <TableCell>
                              {personSelected?.fechacreci
                                ? format(new Date(personSelected?.fechacreci), "EEEE d 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow key="12">
                            <TableCell className="font-bold">Fecha empezó a ser Servidor</TableCell>
                            <TableCell>
                              {personSelected?.fechaservi
                                ? format(new Date(personSelected?.fechaservi), "EEEE d 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow key="13">
                            <TableCell className="font-bold">Fecha empezó a ser Subcoordinador</TableCell>
                            <TableCell>
                              {personSelected?.fechasubcordi
                                ? format(
                                    new Date(personSelected?.fechasubcordi),
                                    "EEEE d 'de' MMMM 'de' yyyy",
                                    {
                                      locale: es,
                                    }
                                  )
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow key="14">
                            <TableCell className="font-bold">Fecha empezó a ser Coordinador</TableCell>
                            <TableCell>
                              {personSelected?.fechacordi
                                ? format(new Date(personSelected?.fechacordi), "EEEE d 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow key="15">
                            <TableCell className="font-bold">Permisos</TableCell>
                            <TableCell>
                              {personSelected?.permisos?.length > 0 &&
                                personSelected.permisos?.map((permiso, index) => (
                                  <div key={index}>
                                    <p className="font-bold">{permiso?.descripcion}</p>
                                    <p>
                                      {permiso?.fecha
                                        ? format(new Date(permiso.fecha), "EEEE d 'de' MMMM 'de' yyyy", {
                                            locale: es,
                                          })
                                        : ""}
                                    </p>
                                  </div>
                                ))}
                            </TableCell>
                          </TableRow>
                          <TableRow key="16">
                            <TableCell className="font-bold">Observaciones</TableCell>
                            <TableCell>{personSelected?.observaciones ?? ""}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Linky
                        to={`/comunidad/persona/${personSelected._id}`}
                        state={{ personSelected }}
                        className="bg-warning flex items-center px-4 py-2 rounded-xl hover:bg-warning-400"
                      >
                        Editar
                      </Linky>

                      <Button color="primary" onPress={onClose}>
                        Cerrar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          <p className="mx-auto my-10">No hay resultados</p>
        )}
      </div>
    </>
  );
};

export default C_persona_buscar;
