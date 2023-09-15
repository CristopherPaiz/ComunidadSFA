import React, { useContext, useEffect, useState } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import NavButtonSocial from "../components/NavButtonSocial";
import Loading from "../components/Loading";
const Social = () => {
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

  if (usuario && (usuario.rol === "Admin" || usuario.rol === "Moderator" || usuario.rol === "Super")) {
    return (
      <>
        <NavButtonSocial />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Social;
