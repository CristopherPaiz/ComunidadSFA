import React, { useState, useContext } from "react";
import { Input, Button, Divider, useDisclosure } from "@nextui-org/react";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../config.js";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link as Linky } from "react-router-dom";
import { contexto } from "../../context/ContextProvider";
import NFblack from "../../../public/notfoundblack.svg";
import NFWhite from "../../../public/notfoundwhite.svg";

const F_venta_producto = () => {
  const { theme } = useContext(contexto);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productSelected, setProductSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (seleccionado === "") {
      toast.error("Ingrese un nombre de producto", {});
      setResultados([]);
      return null;
    } else {
      setLoading(true);
      try {
        console.log(productSelected);
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
        console.log(data);
        toast.success("Productos cargados correctamente" + error);
      } catch (error) {
        setLoading(false);
      }
    }
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
          resultados.map((producto) => (
            <>
              <Linky
                key={producto._id}
                className="flex my-2 p-4 border-1 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-zinc-700 w-11/12 mx-auto sm:w-4/5"
                to={`/farmacia/medicamento/${producto._id}`}
                state={{ producto }}
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
              </Linky>
            </>
          ))
        ) : (
          <h2 className="mx-auto">No hay resultados</h2>
        )}
      </div>
    </div>
  );
};

export default F_venta_producto;
