import React, { useContext, useEffect, useState } from "react";
import API_URL from "../../config";
import { Navigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { contexto } from "../../context/ContextProvider";
import Loading from "../../components/Loading";

const U_profile = () => {
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
        <h1>Perfil de Usuario</h1>
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default U_profile;
