import React, { useContext, useEffect, useState } from "react";
import { contexto } from "../../../context/ContextProvider";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const R_VerReportes = () => {
  const { loggedIn, usuario } = useContext(contexto);
  const [loadingUsuario, setLoadingUsuario] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingUsuario(false);
    }, 500);
  }, []);

  if (loadingUsuario) {
    return <Loading />;
  }

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (usuario && (usuario.rol === "Admin" || usuario.rol === "Super" || usuario.rol === "Reports")) {
    return (
      <>
        <h1 className="text-3xl font-black text-center m-2 mb-6">Reportes</h1>
        <div className="bg-slate-200 w-11/12 p-3 mx-auto my-3 rounded-md flex gap-2 flex-col sm:w-5/12 dark:bg-slate-800">
          <h1 className="font-bold">Reportes Comunidad</h1>
          <RouterLink to={"/reports"}>Reportes Comunidad</RouterLink>
        </div>
        <div className="bg-slate-200 w-11/12 p-3 mx-auto my-3 rounded-md flex gap-2 flex-col sm:w-5/12 dark:bg-slate-800">
          <h1 className="font-bold">Reportes Farmacia</h1>
          <RouterLink
            to={"/reports/farmacia/medicamentos"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Lista de medicamentos disponibles
          </RouterLink>
          <RouterLink
            to={"/reports/farmacia/compras"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Reporte de compra de medicamento
          </RouterLink>
          <RouterLink
            to={"/reports/farmacia/ventas"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Reportes de venta de medicamento
          </RouterLink>
        </div>
        <div className="bg-slate-200 w-11/12 p-3 mx-auto my-3 rounded-md flex gap-2 flex-col sm:w-5/12 dark:bg-slate-800">
          <h1 className="font-bold">Reportes Beneficiarios</h1>
          <RouterLink
            to={"/reports/farmacia/medicamentos"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Lista de beneficiarios
          </RouterLink>
          <RouterLink
            to={"/reports/farmacia/compras"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Reporte de gastos de beneficiarios
          </RouterLink>
          <RouterLink
            to={"/reports/farmacia/ventas"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Reportes de saldos a favor para los beneficiarios
          </RouterLink>
        </div>
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default R_VerReportes;
