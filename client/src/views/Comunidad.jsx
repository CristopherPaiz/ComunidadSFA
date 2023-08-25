import React, { useContext, useState, useEffect } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import Navbutton from "../components/Navbutton";

const Comunidad = () => {
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

  if (loggedIn && usuario.rol === "Admin") {
    return (
      <>
        <Navbutton />
      </>
    );
  } else {
    return <Navigate to={"/login"} />; // Redirige a la página de inicio
  }
};

export default Comunidad;
