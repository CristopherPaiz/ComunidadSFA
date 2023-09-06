import React, { useState, useContext, useEffect } from "react";
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Select from "react-select";
import API_URL from "../../config";
import { contexto } from "../../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const F_compra_producto = () => {
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultadosMedicamentos, setResultadosCrecimientos] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const { theme } = useContext(contexto);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/medicamento/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los medicamentos");
        throw new Error("Error al filtrar los medicamentos", {});
      }

      const data = await response.json();
      setResultadosCrecimientos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  //cuando se agrega un retiro
  const handleSubmit = async () => {
    if (seleccionado === null) {
      toast.error("Debe seleccionar un producto", {});
      return;
    }
    if (cantidad <= 0) {
      toast.error("Debe ingresar una cantidad válida", {});
      return;
    }
    const retiroFinal = {
      idmedicamento: seleccionado._id,
      cantidad: cantidad,
      fecha: new Date(),
    };

    try {
      const response = await fetch(`${API_URL}/IngresoMedicamento/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...retiroFinal,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al añadir la compra del medicamento", {});
        throw new Error("Error al añadir la compra del medicamento", {});
      }
      const data = await response.json();
      toast.success("Se añadió la compra correctamente", {});
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col ">
      <Toaster />
      <h2 className="my-6 text-3xl text-center font-extrabold leading-none tracking-tight  md:text-5xl lg:text-3xl dark:text-whited">
        Compra Producto
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-1 w-11/12 mx-auto sm:w-5/12 ">
        {loading ? (
          <h2 className="mx-auto font-extrabold text-xl text-teal-500">Cargando medicamentos...</h2>
        ) : (
          <Select
            classNamePrefix="Seleccione un producto"
            isSearchable
            isClearable
            options={resultadosMedicamentos}
            maxMenuHeight={170}
            className="text-black dark:text-white mb-8"
            styles={{
              option: (base) => ({
                ...base,
                backgroundColor: theme === "light" ? "white" : "#0e0e0e",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 13,
              colors: {
                ...theme.colors.neutral90,
              },
            })}
            noOptionsMessage={() => "¡¡No se encontró el producto!!"}
            placeholder="Seleccione un producto"
            onChange={(e) => setSeleccionado(e)}
            onFocus={() => setSeleccionado(null)}
          />
        )}
        <Input
          type="Number"
          label="Cantidad"
          placeholder="Ingrese cantidad a comprar"
          onChange={(e) => {
            setCantidad(e.target.value);
          }}
        />

        {/* <Input type="Number" label="Precio Compra" placeholder="Ingrese el precio de compra" />
        <Input type="Number" label="Precio de venta" placeholder="Ingrese el precio de venta" /> */}
        <Button color="success" className="w-11/12 m-auto sm:w-3/5" onClick={handleSubmit}>
          Ingresar Compra
        </Button>
        {seleccionado === null ? null : (
          <div>
            <Table removeWrapper isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn className="font-bold text-xl">Campos</TableColumn>
                <TableColumn className="font-bold text-xl">Datos</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="font-bold">Nombre</TableCell>
                  <TableCell>{seleccionado?.label ?? ""}</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell className="font-bold">Tipo</TableCell>
                  <TableCell>{seleccionado.tipo ?? ""}</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell className="font-bold">Precio</TableCell>
                  <TableCell>{"Q. " + seleccionado.precio ?? ""}</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell className="font-bold">Descripción</TableCell>
                  <TableCell>{seleccionado.descripcion ?? ""}</TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell className="font-bold">Observaciones</TableCell>
                  <TableCell>{seleccionado.observaciones ?? ""}</TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell className="font-bold">Disponibles</TableCell>
                  <TableCell>{seleccionado.cantidadTotal ?? ""}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {seleccionado?.fotos.map((imagenSrc, index) => (
                <img
                  key={index}
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "160px",
                    margin: "10px",
                  }}
                  src={imagenSrc}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default F_compra_producto;
