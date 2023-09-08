import React, { useContext, useState, useEffect } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import NavButtonUsuarios from "../components/NavButtonUsuarios";

const Usuarios = () => {
  const { loggedIn, usuario } = useContext(contexto);

  const verificarExpiracionToken = () => {
    const expirationDate = localStorage.getItem("miTokenExpiration");
    if (expirationDate) {
      const now = new Date();
      const expired = now >= new Date(expirationDate);
      if (expired) {
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

  if (loggedIn && usuario.rol === "Super") {
    return (
      <>
        <NavButtonUsuarios />
      </>
    );
  } else {
    return <Navigate to={"/login"} />; // Redirige a la página de inicio
  }
};

export default Usuarios;
