import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
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
import "react-dropdown/style.css";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../config.js";
import Loading from "../../../components/Loading.jsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link as Linky } from "react-router-dom";

const C_buscar_Curso = () => {
  const [valueretiro, setValueretiro] = useState(new Set([]));
  const [retiroes, setretiroes] = useState([]);

  ///////////////////////////////
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [personSelected, setPersonSelected] = useState();

  const [loading, setLoading] = useState(false);

  const [resultadosPersonas, setResultadosPersonas] = useState([]);

  //fetch para cargar las retiroes
  const buscarcurso = async () => {
    try {
      const response = await fetch(`${API_URL}/cursocreci/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Error al obtener la lista de cursos");
        throw new Error("Error al filtrar las cursos", {});
      }

      const data = await response.json();
      setretiroes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarcurso();
  }, []);

  // filtrar por retiro
  const handleBuscarPorretiro = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/persona/getrbycursocreci`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCursoCreci: valueretiro.currentKey,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar las cursos", {});
      }
      const data = await response.json();
      setResultadosPersonas(data);
      toast.success("Persona por curso o crecimiento filtrado con éxito");
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar las cursos");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col h-screen ">
      <Toaster />
      <h2 className="my-4 text-2xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl">
        Filtrar por Crecimiento o curso
        </h2>
      <div className="grid mx-auto gap-6  w-11/12 sm:w-3/5 sm:grid-cols-2">
        <p className="font-bold text-[17px] sm:hidden -mb-2 ">Seleccione el Crecimiento o curso:</p>
        <Select
          label="Crecimiento o curso"
          variant="bordered"
          placeholder="Seleccione un Crecimiento o curso"
          selectedKeys={valueretiro}
          className="max-w-xs mx-auto"
          onSelectionChange={setValueretiro}
        >
          {retiroes.length > 0 ? (
            retiroes.map((retiro) => (
              <SelectItem key={retiro?._id} value={retiro?.nombreCursoCreci} s>
                {retiro?.nombreCursoCreci ?? ""}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="cargando" text="Cargando retiroes..." disabled />
          )}
        </Select>

        <Button color="primary" onClick={handleBuscarPorretiro} className="sm:h-full">
          Filtrar
        </Button>
      </div>
      <Divider className="my-5" />

      {loading ? (
        <Loading />
      ) : resultadosPersonas.length > 0 ? (
        <>
          <div className="flex w-full flex-row flex-wrap gap-4 pb-5">
            {resultadosPersonas?.map((persona, idx) => (
              <div
                key={idx}
                className="m-auto min-w-[300px] max-w-[500px] sm:min-w-[500px] cursor-pointer dark:border-white border-1 rounded-xl"
                onClick={() => {
                  setPersonSelected(persona);
                  onOpen();
                }}
              >
                <Card className="w-full">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">
                        <b>Nombre:</b> {persona?.nombre ?? ""}
                      </p>
                      <p className="text-md">
                        <b>Teléfono:</b> {persona?.telefono ?? ""}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardFooter>
                    <p className="text-md">
                      <b>Dones:</b> {persona?.dones?.length > 0 ? persona?.dones?.join(", ") ?? "" : "N/A - "}
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
                          <TableCell className="font-bold">retiro</TableCell>
                          <TableCell>{personSelected?.idretiro?.nombreRetiro ?? ""}</TableCell>
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
                      to={`/retiro/persona/${personSelected._id}`}
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
  );
};

export default C_buscar_Curso;
