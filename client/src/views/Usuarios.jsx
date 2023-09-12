import React, { useContext, useState, useEffect } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import NavButtonUsuarios from "../components/NavButtonUsuarios";
import Loading from "../components/Loading";

const Usuarios = () => {
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

  if (usuario && usuario.rol === "Super") {
    return (
      <>
        <NavButtonUsuarios />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Usuarios;
