import React, { useContext, useEffect } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import NavbuttonFarmacia from "../components/NavButtonFarmacia";

const Farmacia = () => {
  const { loggedIn, usuario, setLoggedIn, setUsuario } = useContext(contexto);

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
    const usuarioLS = localStorage.getItem("usuarioSFA");
    const loggedLS = localStorage.getItem("loggedSFA");
    const demasDatosLS = localStorage.getItem("demasdatosSFA");
    if (usuarioLS && loggedLS) {
      setLoggedIn(true);
      setUsuario(JSON.parse(demasDatosLS));
    } else {
      null;
    }
  }, []);

  if ((loggedIn && usuario.rol === "Admin") || (loggedIn && usuario.rol === "Moderator")) {
    return (
      <>
        <NavbuttonFarmacia />
      </>
    );
  } else {
    return <Navigate to={"/login"} />; // Redirige a la página de inicio
  }
};

export default Farmacia;
