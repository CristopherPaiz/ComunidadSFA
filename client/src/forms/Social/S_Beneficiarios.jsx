import React, { useState, useContext, useEffect } from "react";
import {
  Input,
  Button,
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
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../config.js";
import { Link as Linky } from "react-router-dom";
import { contexto } from "../../context/ContextProvider";
import NFblack from "../../assets/notfoundblack.svg";
import NFWhite from "../../assets/notfoundwhite.svg";

const S_Beneficiarios = () => {
  const { theme } = useContext(contexto);
  const [loading, setLoading] = useState(false);

  const [resultados, setResultados] = useState([]);

  //nuevos useState
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [beneficiarioSeleccionado, setBeneficiarioSeleccionado] = useState(null);

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const obtenerBeneficiarios = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/BeneficiarioSocial/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los beneficiarios");
        throw new Error("Error al filtrar los beneficiarios", {});
      }

      const data = await response.json();
      setResultados(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerBeneficiarios();
  }, []);

  return (
    <div className="flex w-full flex-col h-full pb-6">
      <Toaster />
      <h2 className="mx-6 mt-6 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Beneficiarios
      </h2>
      <Divider className="my-6 w-10/12 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {loading ? (
          <Loading />
        ) : resultados.length > 0 ? (
          resultados.map((beneficiario, idx) => (
            <React.Fragment key={idx}>
              <div
                className="flex my-2 p-4 border-1 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-zinc-700 w-11/12 mx-auto sm:w-4/5"
                onClick={() => {
                  setBeneficiarioSeleccionado(beneficiario);
                  onOpen();
                }}
              >
                {theme === "dark" ? (
                  <img
                    src={beneficiario?.fotosbeneficiario[0] ?? NFWhite}
                    alt={beneficiario?.nombre ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[150px] sm:h-[130px] sm:mr-[20px] my-auto"
                  />
                ) : (
                  <img
                    src={beneficiario?.fotosbeneficiario[0] ?? NFblack}
                    alt={beneficiario?.nombre ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[150px] sm:h-[130px] sm:mr-[20px] my-auto"
                  />
                )}

                <div style={{ textAlign: "left" }}>
                  <div className="font-bold text-[18px]">{beneficiario?.nombre}</div>
                  <span className="mt-[3px] block">
                    <strong>Disponibles: </strong>
                    {beneficiario?.saldoTotal}
                  </span>
                  <span className="mt-[3px] block">
                    <strong>Encargado: </strong>
                    {beneficiario?.encargado ?? ""}
                  </span>
                  <span className="mt-[3px] block">
                    <strong>Tel. Encargado: </strong>
                    {beneficiario?.telefonoencargado ?? ""}
                  </span>
                </div>
              </div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside" size="2xl">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        {beneficiarioSeleccionado?.nombre ?? ""}
                      </ModalHeader>
                      <ModalBody>
                        <Table removeWrapper isStriped aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn className="font-bold text-xl">Campos</TableColumn>
                            <TableColumn className="font-bold text-xl">Datos</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow key="1">
                              <TableCell className="font-bold">Nombre completo:</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.nombre ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="2">
                              <TableCell className="font-bold">Actividad Social</TableCell>
                              <TableCell>{"Q. " + beneficiarioSeleccionado?.actividadSocial ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="3">
                              <TableCell className="font-bold">DPI o CUI</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.dpi ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="4">
                              <TableCell className="font-bold">Comunidad</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.comunidad ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="5">
                              <TableCell className="font-bold">Dirección</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.direccion ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="6">
                              <TableCell className="font-bold">Estado Civil</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.estadocivil ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="7">
                              <TableCell className="font-bold">Teléfono</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.telefono ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="8">
                              <TableCell className="font-bold">Cumpleaños</TableCell>
                              <TableCell>{formatfecha(beneficiarioSeleccionado?.cumpleanios) ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="9">
                              <TableCell className="font-bold">Fecha inició el programa</TableCell>
                              <TableCell>{formatfecha(beneficiarioSeleccionado?.fechainicio) ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="10">
                              <TableCell className="font-bold">Fecha salió el programa</TableCell>
                              <TableCell>{formatfecha(beneficiarioSeleccionado?.fechafinal) ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="11">
                              <TableCell className="font-bold">Persona Encargada</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.encargado ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="12">
                              <TableCell className="font-bold">Teléfono persona Encargada</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.telefonoencargado ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="13">
                              <TableCell className="font-bold">Ubicación</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.ubicacion ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="14">
                              <TableCell className="font-bold">Saldo Disponible</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.saldoTotal ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="15">
                              <TableCell className="font-bold">Observaciones</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.observaciones ?? ""}</TableCell>
                            </TableRow>
                            <TableRow key="16">
                              <TableCell className="font-bold">Otros Datos</TableCell>
                              <TableCell>{beneficiarioSeleccionado?.otrosdatos ?? ""}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <h1 className="font-bold text-[18px] -mb-2 mx-auto">Fotos del Beneficiario</h1>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                          }}
                        >
                          {beneficiarioSeleccionado?.fotosbeneficiario.map((imagenSrc, index) => (
                            <img
                              key={index}
                              style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "auto",
                                margin: "5px",
                              }}
                              src={imagenSrc}
                            />
                          ))}
                        </div>
                        <h1 className="font-bold text-[18px] -mb-2 mx-auto">Fotos de otros documentos</h1>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                          }}
                        >
                          {beneficiarioSeleccionado?.fotosdocumentos.map((imagenSrc, index) => (
                            <img
                              key={index}
                              style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "auto",
                                margin: "5px",
                              }}
                              src={imagenSrc}
                            />
                          ))}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Linky
                          to={`/social/beneficiario/${beneficiarioSeleccionado._id}`}
                          state={{ beneficiarioSeleccionado }}
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
            </React.Fragment>
          ))
        ) : (
          <h2 className="mx-auto">No hay resultados</h2>
        )}
      </div>
    </div>
  );
};

export default S_Beneficiarios;
