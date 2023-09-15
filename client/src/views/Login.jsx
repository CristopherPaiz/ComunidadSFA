import React, { useContext, useState, useEffect } from "react";
import comunidad from "/comunidad.svg";
import { Button, Checkbox } from "@nextui-org/react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { contexto } from "../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUser, loggedIn, setUsuario, setLoggedIn, usuario } = useContext(contexto);
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const usuarioLS = localStorage.getItem("usuarioSFA");
    const loggedLS = localStorage.getItem("loggedSFA");
    const demasDatosLS = localStorage.getItem("demasdatosSFA");
    if (usuarioLS && loggedLS) {
      setLoggedIn(true);
      setUsuario(JSON.parse(demasDatosLS));
    }
  }, []);

  const obtenerTipoUsuario = async () => {
    const respuesta = await fetchUser(nombreUsuario, password);
    if (respuesta === "Admin") {
      navigate("/comunidad");
    } else if (respuesta === "Moderator") {
      navigate("/farmacia");
    } else if (respuesta === "Super") {
      navigate("/comunidad");
    } else {
      toast.error(respuesta);
    }
  };

  const handleInputChangeUser = (event) => {
    setNombreUsuario(event.target.value);
  };

  const handleInputChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (loggedIn) {
      if (usuario.rol === "Admin") {
        navigate("/comunidad");
      } else if (usuario.rol === "Moderator") {
        navigate("/farmacia");
      } else if (usuario.rol === "Super") {
        navigate("/comunidad");
      } else if (usuario.rol === "Reports") {
        navigate("/reports");
      } else {
        navigate("/");
      }
    }
  }, [loggedIn, usuario]);

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 dark:bg-gray-900 px-6 min-h-screen flex items-center justify-center h-screen -mt-[50px] sm:-mt-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-2/5 h-2/5 m-auto -mt-[65px] -mb-[20px] sm:-mb-[50px] sm:w-2/6"
              src={comunidad}
              alt="logo"
            />
          </a>
          <div className="p-6 space-y-4">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia Sesión en Comunidad San Francisco de Asís
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tu nombre de usuario
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="PedroPerez"
                  required=""
                  autoComplete="nope"
                  value={nombreUsuario}
                  onChange={handleInputChangeUser}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleInputChangePassword}
                  value={password}
                />
                <Checkbox onValueChange={() => setAccepted(!accepted)} className="mt-2"></Checkbox>
                <RouterLink to={"/terms"} className="text-primary-500 underline">
                  He leído los términos y condiciones
                </RouterLink>
              </div>
              <Button
                onClick={obtenerTipoUsuario}
                className="w-full text-white bg-danger-600 hover:bg-danger-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                isDisabled={accepted}
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
