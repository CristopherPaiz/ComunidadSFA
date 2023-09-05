import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import API_URL from "../../config";
import Select from "react-select";
import { contexto } from "../../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const S_nuevoSaldo = () => {
  const [resultadosBeneficiarios, setResultadosBeneficiarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(contexto);

  //useState para el formulario
  const [nombreDonante, setNombreDonante] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");

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
      setResultadosBeneficiarios(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (seleccionado === null) {
      toast.error("Debe seleccionar un beneficiario", {});
      return;
    }
    if (cantidad <= 0) {
      toast.error("Debe ingresar una cantidad válida", {});
      return;
    }
    console.log(seleccionado);

    const formattedData = {
      idbeneficiario: seleccionado._id,
      nombredonante: nombreDonante,
      monto: cantidad,
      observaciones: observaciones,
    };

    try {
      const response = await fetch(`${API_URL}/IngresoSaldo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formattedData,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al añadir saldo a favor del beneficiario", {});
        throw new Error("Error al añadir saldo a favor del beneficiario", {});
      }
      await response.json();
      toast.success("Se añadió nuevo saldo a favor correctamente", {});

      //se limpia el formulario
      setSeleccionado(null);
      setNombreDonante("");
      setCantidad(0);
      setObservaciones("");
    } catch (error) {}
  };

  useEffect(() => {
    obtenerBeneficiarios();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <h2 className="my-4 text-3xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-whited">
        Nuevo Saldo a favor
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <p className="font-bold text-[18px] sm:hidden -mb-2">Seleccione el beneficiario:</p>
        {loading ? (
          <h2 className="mx-auto font-extrabold text-xl text-teal-500">Cargando beneficiarios...</h2>
        ) : (
          <Select
            classNamePrefix="Seleccione un beneficiario"
            isSearchable
            isClearable
            options={resultadosBeneficiarios}
            maxMenuHeight={170}
            value={seleccionado}
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
            noOptionsMessage={() => "¡¡No se encontró al beneficiario!!"}
            placeholder="Seleccione un beneficiario"
            onChange={(e) => setSeleccionado(e)}
            onFocus={() => setSeleccionado(null)}
          />
        )}
        <Input
          type="text"
          label="Nombre donante / entidad"
          value={nombreDonante}
          placeholder="Ingrese un nombre de donate o entidad"
          onChange={(e) => setNombreDonante(e.target.value)}
        />
        <Input
          type="Number"
          label="Cantidad"
          value={cantidad}
          placeholder="Ingrese una cantidad"
          onChange={(e) => setCantidad(e.target.value)}
        />
        <Input
          type="text"
          label="Observaciones"
          value={observaciones}
          placeholder="Ingrese algunas observaciones"
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default S_nuevoSaldo;
