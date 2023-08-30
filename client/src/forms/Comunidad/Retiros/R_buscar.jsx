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
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../config.js";
import Loading from "../../../components/Loading.jsx";
import { Link as Linky } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const R_buscar = () => {
  const [loading, setLoading] = useState(false);
  const [resultadosRetiros, setResultadosRetiros] = useState([]);
  const [nombreRetiroUS, setNombreRetiroUS] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [retiroSelected, setRetiroSelected] = useState();

  // filtrar por comunidad
  const handleBuscarPorComunidad = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/retiro/getbyname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreRetiro: nombreRetiroUS,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar los retiros", {});
      }
      const data = await response.json();
      setResultadosRetiros(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar los retiros");
      setLoading(false);
      console.log(error);
    }
  };

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formatYear = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    return `${year}`;
  };

  return (
    <>
      <div className="flex w-full flex-col h-screen ">
        <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-whited">
          Buscar Retiro
        </h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto  sm:w-3/5 ">
          <Input
            type="text"
            label="Nombre del retiro"
            autoComplete="nope"
            placeholder="Ingrese nombre del retiro"
            onChange={(e) => setNombreRetiroUS(e.target.value)}
          />
        </div>
        <Button color="primary" className="w-11/12 sm:w-3/5 mx-auto" onClick={handleBuscarPorComunidad}>
          Filtrar
        </Button>
        <Divider className="my-5" />
        {loading ? (
          <Loading />
        ) : resultadosRetiros.length > 0 ? (
          <>
            <div className="flex w-full flex-row flex-wrap gap-4 pb-5">
              {resultadosRetiros?.map((retiro, idx) => (
                <div
                  key={idx}
                  className="mx-auto min-w-[300px] max-w-[500px] sm:min-w-[500px] cursor-pointer dark:border-white border-1 rounded-xl"
                  onClick={() => {
                    setRetiroSelected(retiro);
                    onOpen();
                  }}
                >
                  <Card className="w-full">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md">
                          <b>Nombre:</b> {retiro?.nombreRetiro ?? ""}
                        </p>
                        <p className="text-md">
                          <b>Año:</b> {formatYear(retiro?.fechainicio) ?? ""}
                        </p>
                        <p className="text-md">
                          <b>Fecha:</b> {formatfecha(retiro?.fechainicio) ?? ""}
                        </p>
                        <p className="text-md">
                          <b>Tipo:</b> {retiro?.tipo ?? ""}
                        </p>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
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
                              {personSelected?.dones?.length > 0 ? personSelected?.dones?.join(", ") ?? "" : "N/A"}
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
                                ? format(new Date(personSelected?.fechainicio), "EEEE d 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
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
                              {personSelected?.fechainicio
                                ? format(new Date(personSelected?.fechainicio), "EEEE d 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
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
            </Modal> */}
          </>
        ) : (
          <p className="mx-auto my-10">No hay resultados</p>
        )}
      </div>
    </>
  );
};

export default R_buscar;
