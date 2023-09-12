import React, { useContext, useEffect, useState } from "react";
import { contexto } from "../../../context/ContextProvider";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";

const R_VerReportes = () => {
  const { loggedIn, usuario } = useContext(contexto);

  const verificarExpiracionToken = () => {
    const expirationDate = localStorage.getItem("miTokenExpiration");
    if (expirationDate) {
      const now = new Date();
      const expired = now >= new Date(expirationDate);
      if (expired) {
        // El token ha expirado, borrarlo del LocalStorage
        localStorage.removeItem("usuarioSFA");
        localStorage.removeItem("loggedSFA");
        localStorage.removeItem("demasdatosSFA");
        localStorage.removeItem("miTokenExpiration");
      }
    }
  };

  useEffect(() => {
    verificarExpiracionToken();
  }, []);

  console.log(usuario);
  if ((loggedIn && usuario.rol === "Admin") || (loggedIn && usuario.rol === "Super")) {
    return (
      <>
        <h1 className="text-3xl font-black text-center m-2 mb-6">Reportes</h1>
        <div className="bg-slate-200 w-11/12 p-3 mx-auto my-3 rounded-md flex gap-2 flex-col sm:w-5/12 dark:bg-slate-800">
          <h1 className="font-bold">Reportes Comunidad</h1>
          <RouterLink to={"/reports/farmacia/compras"}>Reportes Comunidad</RouterLink>
        </div>
        <div className="bg-slate-200 w-11/12 p-3 mx-auto my-3 rounded-md flex gap-2 flex-col sm:w-5/12 dark:bg-slate-800">
          <h1 className="font-bold">Reportes Farmacia</h1>
          <RouterLink
            to={"/reports/farmacia/medicamentos"}
            className="underline text-blue-600 block dark:text-blue-400"
          >
            Lista de medicamentos disponibles
          </RouterLink>
          <RouterLink to={"/reports/farmacia/compras"} className="underline text-blue-600 block dark:text-blue-400">
            Reporte de compra de medicamento
          </RouterLink>
          <RouterLink to={"/reports/farmacia/ventas"} className="underline text-blue-600 block dark:text-blue-400">
            Reportes de venta de medicamento
          </RouterLink>
        </div>
      </>
    );
  } else {
    return <Navigate to={"/login"} />; // Redirige a la página de inicio
  }
};

export default R_VerReportes;
