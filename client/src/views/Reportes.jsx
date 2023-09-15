import React, { useContext, useEffect, useState } from "react";
import { contexto } from "../context/ContextProvider.jsx";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";

const Reportes = ({ children }) => {
  const { loggedIn, usuario } = useContext(contexto);
  const [loadingUsuario, setLoadingUsuario] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingUsuario(false);
    }, 200);
  }, []);

  if (loadingUsuario) {
    return <Loading />;
  }

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }
  if (usuario && (usuario.rol === "Admin" || usuario.rol === "Super" || usuario.rol === "Reports")) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default Reportes;
