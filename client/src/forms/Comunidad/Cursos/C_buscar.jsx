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

const C_buscar = () => {
  const [loading, setLoading] = useState(false);
  const [resultadosRetiros, setResultadosRetiros] = useState([]);
  const [nombreRetiroUS, setNombreRetiroUS] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [retiroSelected, setRetiroSelected] = useState();

  // filtrar por comunidad
  const handleBuscarPorComunidad = async () => {
    if (nombreRetiroUS === "") return toast.error("Ingrese el nombre del retiro");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cursocreci/getbyname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreCursoCreci: nombreRetiroUS,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar los cursos", {});
      }
      const data = await response.json();
      setResultadosRetiros(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar los cursos");
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
      <Toaster />
      <div className="flex w-full flex-col h-screen ">
        <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
          Buscar Crecimiento o curso{" "}
        </h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 mx-auto  sm:w-3/5 ">
          <Input
            type="text"
            isRequired
            label="Nombre del Crecimiento o Curso"
            autoComplete="nope"
            placeholder="Ingrese nombre del curso"
            onChange={(e) => setNombreRetiroUS(e.target.value)}
          />
          <Button color="primary" className="w-11/12 sm:w-3/5 mx-auto sm:h-full" onClick={handleBuscarPorComunidad}>
            Filtrar
          </Button>
        </div>
        <Divider className="my-5" />
        {loading ? (
          <Loading />
        ) : resultadosRetiros.length > 0 ? (
          <>
            <div className="gap-2 pb-5 mx-auto sm:grid-cols-2 sm:grid flex w-full flex-row flex-wrap">
              {resultadosRetiros?.map((retiro, idx) => (
                <div
                  key={idx}
                  className="mx-auto min-w-[300px] max-w-[500px] sm:min-w-[500px] cursor-pointer dark:border-white border-1 rounded-xl"
                  onClick={() => {
                    setRetiroSelected(retiro);
                    onOpen();
                  }}
                >
                  <Card className="w-full h-full grid center hover:bg-slate-500">
                    <CardHeader className="flex p-0 m-0">
                      <div className="flex items-center">
                        <div className="transform -rotate-90 opacity-30 origin-center text-2xl p-0 -m-2 font-extrabold">
                          {formatYear(retiro?.fechainicio) ?? ""}
                        </div>
                        <div className="flex flex-col flex-grow p-2 gap-1 py-3">
                          <p className="text-md">
                            <b>Nombre:</b> {retiro?.nombreCursoCreci ?? ""}
                          </p>
                          <p className="text-md">
                            <b>Fecha:</b> {formatfecha(retiro?.fechainicio) ?? ""}
                          </p>
                          <p className="text-md">
                            <b>Dirigido a:</b> {retiro?.dirigidoA ?? ""}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mx-auto my-10">No hay resultados</p>
        )}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{retiroSelected?.nombreCursoCreci ?? ""}</ModalHeader>
                <ModalBody>
                  <Table removeWrapper isStriped aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn className="font-bold text-xl">Campos</TableColumn>
                      <TableColumn className="font-bold text-xl">Datos</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell className="font-bold">Nombre</TableCell>
                        <TableCell>{retiroSelected?.nombreCursoCreci ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell className="font-bold">Ofrenda</TableCell>
                        <TableCell>{"Q. " + retiroSelected?.ofrenda ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell className="font-bold">Horario</TableCell>
                        <TableCell>{retiroSelected?.horario ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell className="font-bold">Dirigido A</TableCell>
                        <TableCell className="capitalize">{retiroSelected?.dirigidoA ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="5">
                        <TableCell className="font-bold">Dirigido Por</TableCell>
                        <TableCell className="capitalize">{retiroSelected?.dirigidoPor ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="6">
                        <TableCell className="font-bold">Ubicación</TableCell>
                        <TableCell>{retiroSelected?.ubicacion ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="7">
                        <TableCell className="font-bold">Tipo</TableCell>
                        <TableCell className="capitalize">{retiroSelected?.tipo ?? ""}</TableCell>
                      </TableRow>
                      <TableRow key="8">
                        <TableCell className="font-bold">Fecha inicio</TableCell>
                        <TableCell className="capitalize">
                          {retiroSelected?.fechainicio
                            ? format(new Date(retiroSelected?.fechainicio), "EEEE d 'de' MMMM 'de' yyyy", {
                                locale: es,
                              })
                            : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow key="9">
                        <TableCell className="font-bold">Fecha Finaliza</TableCell>
                        <TableCell className="capitalize">
                          {retiroSelected?.fechaFinal
                            ? format(new Date(retiroSelected?.fechaFinal), "EEEE d 'de' MMMM 'de' yyyy", {
                                locale: es,
                              })
                            : ""}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Linky
                    to={`/comunidad/cursoCreci/${retiroSelected._id}`}
                    state={{ retiroSelected }}
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
      </div>
    </>
  );
};

export default C_buscar;
