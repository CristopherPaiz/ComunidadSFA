import React, { useContext, useEffect, useState } from "react";
import { contexto } from "../context/ContextProvider";

const Aplication = ({ children }) => {
  const { setLoggedIn, setUsuario } = useContext(contexto);

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
    const usuarioSFA = localStorage.getItem("usuarioSFA");
    const loggedSFA = localStorage.getItem("loggedSFA");
    const demasDatosSFA = localStorage.getItem("demasdatosSFA");
    if (usuarioSFA && loggedSFA) {
      setLoggedIn(true);
      setUsuario(JSON.parse(demasDatosSFA));
      console.log(usuarioSFA);
      console.log(loggedSFA);
      console.log(demasDatosSFA);
    } else {
      null;
    }
  }, [usuarioSFA, loggedSFA, demasDatosSFA]);

  return <>{children}</>;
};

export default Aplication;
