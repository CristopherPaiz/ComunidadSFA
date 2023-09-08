import React, { createContext, useState, useEffect } from "react";
import API_URL from "../config.js";
import { useTheme } from "next-themes";

export const contexto = createContext();

const ContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // setear el tipo de usuario activo
  const [loggedIn, setLoggedIn] = useState(false); // indicar si el usuario ha iniciado sesión
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Intenta recuperar el tema del localStorage
    const storedTheme = localStorage.getItem("themeSFA");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const changeTheme = (valor) => {
    if (valor === "dark") {
      setTheme("light");
      localStorage.setItem("themeSFA", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("themeSFA", "dark");
    }
  };

  const fetchUser = async (username, contrasenia) => {
    try {
      const response = await fetch(`${API_URL}/user/getbyusername`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, contrasenia }),
        credentials: "include", // Asegúrate de incluir esta opción
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, obtenemos el mensaje de error del servidor
        setUsuario({ rol: "Public" });
        setLoggedIn(false);
        const errorData = await response.json();
        return errorData.message;
      } else {
        const user = await response.json();

        if (!user) {
          //añadir al localstorage un usuario publico como default
          localStorage.setItem("usuarioSFA", JSON.stringify({ rol: "Public" }));
          //seteamos los useState
          setUsuario({ rol: "Public" });
          setLoggedIn(false);
          return "Public";
        } else {
          localStorage.setItem("usuarioSFA", JSON.stringify({ rol: user.rol }));
          localStorage.setItem("demasdatosSFA", JSON.stringify(user));
          localStorage.setItem("loggedSFA", true);
          // Obtener la fecha y hora de expiración (30 minutos a partir del momento actual)
          const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5); // 5 días
          localStorage.setItem("miTokenExpiration", expirationDate.toISOString());
          setLoggedIn(true);
          setUsuario(user);
          return user.rol;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const USER_TYPES = {
    SUPER: "Super",
    ADMIN_USER: "Admin",
    MODERATOR_USER: "Moderator",
    PUBLIC: "Public",
  };

  return (
    <contexto.Provider
      value={{
        ...USER_TYPES,
        usuario,
        fetchUser,
        loggedIn,
        setLoggedIn,
        setUsuario,
        changeTheme,
        theme,
      }}
    >
      {children}
    </contexto.Provider>
  );
};

export default ContextProvider;
