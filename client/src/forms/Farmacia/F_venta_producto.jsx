import React, { useState, useContext } from "react";
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

const F_venta_producto = () => {
  const { theme } = useContext(contexto);
  const [productSelected, setProductSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const [resultados, setResultados] = useState([]);

  //nuevos useState
  const [restar, setRestar] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleBuscar = async () => {
    if (seleccionado === "" || seleccionado === null) {
      toast.error("Ingrese un nombre de producto", {});
      setResultados([]);
      return null;
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/medicamento/filtrar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: seleccionado,
          }),
          credentials: "include", // Asegúrate de incluir esta opción
        });

        if (!response.ok) {
          throw new Error("Error al filtrar los productos", {});
        }

        const data = await response.json();
        setResultados(data);
        setLoading(false);
        toast.success("Productos cargados correctamente" + error);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleVender = async () => {
    const datosfinales = {
      idmedicamento: productoSeleccionado._id,
      cantidad: restar,
      fecha: Date(),
      precioVenta: productoSeleccionado.precio,
    };

    try {
      const response = await fetch(`${API_URL}/EgresoMedicamento/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...datosfinales,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });

      if (!response.ok) {
        throw new Error("Error al vender el producto", {});
      }

      const data = await response.json();
      setResultados(data);
      toast.success("Venta realizada correctamente");

      setTimeout(() => {
        setLoading(false);
        setRestar(0);
        setResultados([]);
        onOpenChange();
      }, 1200);
    } catch (error) {
      setLoading(false);
    }
  };

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex w-full flex-col h-full pb-6">
      <Toaster />
      <h2 className="m-6 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Venta Producto
      </h2>
      <div className="grid gap-6  md:grid-cols-2 w-11/12 mx-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Buscar"
          placeholder="Busque un producto"
          onChange={(e) => setSeleccionado(e.target.value)}
        />
        <Button color="success" className="w-11/12 mx-auto sm:w-3/5" onClick={handleBuscar}>
          Filtrar
        </Button>
      </div>
      <Divider className="my-6 w-10/12 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {loading ? (
          <Loading />
        ) : resultados.length > 0 ? (
          resultados.map((producto, idx) => (
            <React.Fragment key={idx}>
              <div
                className="flex my-2 p-4 border-1 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-zinc-700 w-11/12 mx-auto sm:w-4/5"
                onClick={() => {
                  setProductoSeleccionado(producto);
                  onOpen();
                  setRestar(0);
                }}
              >
                {theme === "dark" ? (
                  <img
                    src={producto?.fotos[0] ?? NFWhite}
                    alt={producto?.label ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[150px] sm:h-[130px] sm:mr-[20px] my-auto"
                  />
                ) : (
                  <img
                    src={producto?.fotos[0] ?? NFblack}
                    alt={producto?.label ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[150px] sm:h-[130px] sm:mr-[20px] my-auto"
                  />
                )}

                <div style={{ textAlign: "left" }}>
                  <div className="font-bold text-[18px]">{producto?.label}</div>
                  <div>{producto?.descripcion}</div>
                  <span className="mt-[3px] block">
                    <strong>Disponibles: </strong>
                    {producto?.cantidadTotal}
                  </span>
                  <span className="mt-[3px] block">
                    <strong>Precio: </strong> Q. {producto?.precio ?? ""}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <h2 className="mx-auto">No hay resultados</h2>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{productoSeleccionado?.label ?? ""}</ModalHeader>
              <ModalBody>
                {productoSeleccionado?.antibiotico ? (
                  <div className="bg-danger text-white p-4 rounded-lg text-xl">
                    <span className="font-black">ATENCIÓN:</span> Este medicamento es un antibiótico, se requiere receta
                    médica para su venta y documento de idenficación del comprador.
                  </div>
                ) : null}
                <h1 className="font-bold text-center text-xl text-gray-500">Fecha: {formatfecha(Date())}</h1>
                <Table removeWrapper isStriped aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn className="font-bold text-xl">Disponibles</TableColumn>
                    <TableColumn className="font-bold text-xl">
                      {productoSeleccionado?.cantidadTotal - restar ?? ""}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="2">
                      <TableCell className="font-bold">Precio</TableCell>
                      <TableCell>{"Q. " + productoSeleccionado?.precio ?? ""}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell className="font-bold">Tipo</TableCell>
                      <TableCell>{productoSeleccionado?.tipo ?? ""}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mx-auto">
                  <div className="text-center">
                    <p>Seleccione la cantidad a vender</p>
                    <Button className="bg-danger" onClick={() => (restar > 0 ? setRestar(restar - 1) : null)}>
                      -1
                    </Button>
                    <Input
                      type="number"
                      className="w-[60px] inline-flex"
                      defaultValue={restar}
                      min="0"
                      size="lg"
                      isRequired
                      value={restar.toString()}
                      max={`${productoSeleccionado?.cantidadTotal}`}
                    />
                    <Button
                      className="bg-success"
                      size=""
                      onClick={() => (productoSeleccionado.cantidadTotal > restar ? setRestar(restar + 1) : null)}
                    >
                      +1
                    </Button>
                  </div>
                  <Button className="w-full bg-primary mt-4 text-white" onClick={handleVender}>
                    Vender
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Linky
                  to={`/farmacia/medicamento/${productoSeleccionado._id}`}
                  state={{ productoSeleccionado }}
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
  );
};

export default F_venta_producto;
