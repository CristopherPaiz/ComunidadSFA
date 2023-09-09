import React, { useContext, useEffect, useState } from "react";
import API_URL from "../config";
import { Button } from "@nextui-org/react";
import { contexto } from "../context/ContextProvider";
import Loading from "../components/Loading";

const Homepage = () => {
  // verificar logueo y token
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

  // datos de la mainpage
  const [cursos, setCursos] = useState([]);
  const [retiros, setRetiros] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  //active
  const [active, setActive] = useState("Curso");
  const [loading, setLoading] = useState(false);

  //flags
  const [flagCurso, setFlagCurso] = useState(true);
  const [flagRetiro, setFlagRetiro] = useState(false);
  const [flagComunidad, setFlagComunidad] = useState(false);

  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const Obtenercursos = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch(`${API_URL}/cursocreci/getallbyyear`);
      const resultado = await respuesta.json();
      setCursos(resultado);
      setLoading(false);
    } catch (error) {
      setCursos([]);
    }
  };

  const Obtenerretiros = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch(`${API_URL}/retiro/getallbyyear`);
      const resultado = await respuesta.json();
      setRetiros(resultado);
      setLoading(false);
    } catch (error) {
      setCursos([]);
    }
  };

  const Obtenercomunidades = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch(`${API_URL}/comunidad/getall`);
      const resultado = await respuesta.json();
      setComunidades(resultado);
      setLoading(false);
    } catch (error) {
      setCursos([]);
    }
  };

  useEffect(() => {
    if (flagCurso) {
      Obtenercursos();
    } else if (flagRetiro) {
      Obtenerretiros();
    } else if (flagComunidad) {
      Obtenercomunidades();
    }
  }, [flagCurso, flagRetiro, flagComunidad]);

  return (
    <>
      {/* botones */}
      <div className="flex gap-2 w-10/12 sm:max-w-7xl mx-auto justify-center my-4">
        {active === "Curso" ? (
          <Button color="primary" variant="solid">
            Crecimientos/cursos
          </Button>
        ) : (
          <Button
            color="primary"
            variant="ghost"
            onClick={() => {
              setFlagCurso(true);
              setFlagRetiro(false);
              setFlagComunidad(false);
              setActive("Curso");
            }}
          >
            Crecimientos / cursos
          </Button>
        )}
        {active === "Retiro" ? (
          <Button color="primary" variant="solid">
            Retiros
          </Button>
        ) : (
          <Button
            color="primary"
            variant="ghost"
            onClick={() => {
              setFlagRetiro(true);
              setFlagCurso(false);
              setFlagComunidad(false);
              setActive("Retiro");
            }}
          >
            Retiros
          </Button>
        )}
        {active === "Comunidad" ? (
          <Button color="primary" variant="solid">
            Comunidades
          </Button>
        ) : (
          <Button
            color="primary"
            variant="ghost"
            onClick={() => {
              setFlagComunidad(true);
              setFlagRetiro(false);
              setFlagCurso(false);
              setActive("Comunidad");
            }}
          >
            Comunidades
          </Button>
        )}
      </div>
      {/* contenido CURSOS */}
      {active === "Curso" && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full sm:max-w-7xl mx-auto">
              <h1 className="text-xl font-extrabold text-center">Todos los cursos o crecimientos</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-40 xl:py-10  sm:max-w-7xl mx-auto">
                {cursos?.map((curso, index) => (
                  <div className="bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md" key={index}>
                    <div className="relative">
                      <span className="absolute top-[90px] right-2 bg-primary text-white text-2xl px-4 py-2 rounded-full">
                        Q. {curso?.ofrenda ?? ""}
                      </span>
                    </div>
                    <div className="p-6">
                      <h5 className="mb-2 text-2xl font-black text-gray-900 dark:text-white">
                        {curso?.nombreCursoCreci ?? ""}
                      </h5>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            fillRule="white"
                            d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatfecha(curso?.fechainicio ?? "")} al {formatfecha(curso?.fechaFinal ?? "")}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                        </svg>
                        {curso?.tipo ?? ""} para {curso?.dirigidoA ?? ""}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {curso?.horario ?? ""}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        {curso?.ubicacion ?? ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {active === "Retiro" && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-center">Todos los retiros</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-40 xl:py-10 sm:max-w-7xl mx-auto">
                {retiros?.map((retiro, index) => (
                  <div className="bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md" key={index}>
                    <div className="relative">
                      <span className="absolute top-[90px] right-2 bg-primary text-white text-2xl px-4 py-2 rounded-full">
                        Q. {retiro?.ofrenda ?? ""}{" "}
                      </span>
                    </div>
                    <div className="p-6">
                      <h5 className="mb-2 text-2xl font-black text-gray-900 dark:text-white">
                        {retiro?.nombreRetiro ?? ""}
                      </h5>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            fillRule="white"
                            d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatfecha(retiro?.fechainicio ?? "")} al {formatfecha(retiro?.fechaFinal ?? "")}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                        </svg>
                        {retiro?.tipoPara ?? ""}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {retiro?.horario ?? ""}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        {retiro?.ubicacion ?? ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
      {active === "Comunidad" && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-center">Todas las Comunidades o células</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-40 xl:py-10  sm:max-w-7xl mx-auto">
                {comunidades.map((comunidad, index) => (
                  <div className="bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md" key={index}>
                    <div className="p-6">
                      <h5 className="mb-2 text-xl font-black text-gray-900 dark:text-white">
                        {comunidad.nombreComunidad}
                      </h5>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                        Tipo: {comunidad.tipo}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {comunidad.horarios}
                      </p>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 fill-black dark:fill-white inline-flex mr-3 align-middle -mt-1"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        {comunidad.ubicacion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Homepage;
