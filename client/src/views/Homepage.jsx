import React, { useContext, useEffect, useState } from "react";
import API_URL from "../config";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { contexto } from "../context/ContextProvider";
import Loading from "../components/Loading";

const Homepage = () => {
  const list = [
    {
      title: "Día de la Biblia",
      description: "Las Sagradas Escrituras para guía espiritual.",
      price: "Día: 16/08/2023",
      img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    },
    {
      title: "Collares de Cruz",
      description: "Un símbolo de fe y devoción. ¿Es realemente un regalo cristiano?",
      price: "Día: 16/08/2023",
      img: "https://ilariape.vtexassets.com/arquivos/ids/157717-800-auto?v=637696701218400000&width=800&height=auto&aspect=true",
    },
    {
      title: "Diario de Oración",
      description: "Registra tus pensamientos, oraciones y reflexiones.",
      price: "Día: 16/08/2023",
      img: "https://pictures.abebooks.com/isbn/9781978215603-us.jpg",
    },
    {
      title: "CD de Música de Adoración",
      description: "Canciones inspiradoras para alabar y adorar.",
      price: "Día: 16/08/2023",
      img: "https://i.ytimg.com/vi/BAIIYWPkzqs/maxresdefault.jpg",
    },
    {
      title: "Libro Devocional",
      description: "Lecturas diarias e ideas para el crecimiento espiritual.",
      price: "Día: 16/08/2023",
      img: "https://m.media-amazon.com/images/I/41g7q-kUTAL.jpg",
    },
    {
      title: "Entradas para Evento Cristiano",
      description: "Admisión a un evento o conferencia cristiana especial.",
      price: "Día: 16/08/2023",
      img: "https://e4g7x2b3.rocketcdn.me/wp-content/uploads/2022/10/evangelismo-en-formosa-819x1024.jpg",
    },
    {
      title: "Impresión de Arte con Cruz",
      description: "Hermosa obra de arte con la cruz como tema.",
      price: "Día: 16/08/2023",
      img: "https://c8.alamy.com/compes/2pgj574/matthias-grunewald-cristo-en-la-cruz-dibujando-en-carbon-con-pluma-y-tinta-y-pincel-blanco-hacia-1520-2pgj574.jpg",
    },
    {
      title: "Camiseta Cristiana",
      description: "Inspiración que puedes llevar puesta con un mensaje cristiano.",
      price: "Día: 16/08/2023",
      img: "https://ae01.alicdn.com/kf/H483c0d157e884b6cb236506f4433c141T.jpg_640x640Q90.jpg_.webp",
    },
    {
      title: "Calcomanía de Pared con Mensaje de Fe",
      description: "Decora tu espacio con un mensaje basado en la fe.",
      price: "Día: 16/08/2023",
      img: "https://m.media-amazon.com/images/I/611+8S4+r0L.jpg",
    },
    {
      title: "Donación para Viaje de Misión",
      description: "Apoya el viaje de un misionero para difundir el evangelio.",
      price: "Día: 16/08/2023",
      img: "https://images.squarespace-cdn.com/content/596f9e6edb29d6603ed3a7e3/1561136539292-PH1DAE0OVOQ7Y0EJ96ED/VA-mission-web2.jpg?content-type=image%2Fjpeg",
    },
  ];

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
  const [active, setActive] = useState("Curso");
  const [loading, setLoading] = useState(false);

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
      console.log(resultado);
      setLoading(false);
    } catch (error) {
      setCursos([]);
    }
  };

  useEffect(() => {
    Obtenercursos();
  }, []);

  return (
    <>
      {/* botones */}
      <div className="flex gap-2 mx-auto justify-center my-4">
        {active === "Curso" ? (
          <Button color="primary" variant="solid" onClick={() => setActive("Curso")}>
            Crecimientos / cursos
          </Button>
        ) : (
          <Button color="primary" variant="ghost" onClick={() => setActive("Curso")}>
            Crecimientos / cursos
          </Button>
        )}
        {active === "Retiro" ? (
          <Button color="primary" variant="solid" onClick={() => setActive("Retiro")}>
            Retiros
          </Button>
        ) : (
          <Button color="primary" variant="ghost" onClick={() => setActive("Retiro")}>
            Retiros
          </Button>
        )}
        {active === "Comunidad" ? (
          <Button color="primary" variant="solid" onClick={() => setActive("Comunidad")}>
            Comunidades
          </Button>
        ) : (
          <Button color="primary" variant="ghost" onClick={() => setActive("Comunidad")}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-40 xl:py-10">
              {cursos.map((curso, index) => (
                <div className="bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md" key={index}>
                  <div className="relative">
                    <span className="absolute top-20 right-6 bg-primary text-white text-2xl px-4 py-2 rounded-full">
                      Q. {curso.ofrenda}
                    </span>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 text-2xl font-black text-gray-900 dark:text-white">{curso.nombreCursoCreci}</h5>
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
                      {formatfecha(curso.fechainicio)} al {formatfecha(curso.fechaFinal)}
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
                      {curso.tipo} para {curso.dirigidoA}
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

                      {curso.horario}
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
                      {curso.ubicacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Homepage;
