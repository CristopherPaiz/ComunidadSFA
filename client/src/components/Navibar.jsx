import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import comunidad from "/comunidad.svg";
import { contexto } from "../context/ContextProvider.jsx";

const Navibar = () => {
  const USER_TYPES = useContext(contexto);
  const { usuario, setUsuario, loggedIn, setLoggedIn, changeTheme, theme } = useContext(contexto);
  const navigate = useNavigate();

  const logout = async () => {
    if (loggedIn) {
      setLoggedIn(false);
      setUsuario(null);
      localStorage.removeItem("usuarioSFA");
      localStorage.removeItem("loggedSFA");
      localStorage.removeItem("demasdatosSFA");
      localStorage.removeItem("miTokenExpiration");
      navigate("/");
    }
  };

  if (usuario === null) {
    return (
      <>
        <Navbar>
          <NavbarContent>
            <NavbarBrand>
              <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  className="mr-2 dark:fill-white"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              </RouterLink>
              <p className=" font-bold text-inherit text-left">
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  Comunidad San Francisco de Asís
                </RouterLink>
              </p>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden md:flex items-center md:ml-4 gap-x-2">
              <Button color="primary" variant="flat" className=" hover:bg-primary-300 hover:text-white">
                <RouterLink to={"/login"} className="py-2 -mx-3 px-3">
                  Iniciar sesión
                </RouterLink>
              </Button>
              <Button color="secondary" variant="ghost">
                <RouterLink to={"/about"} className="py-2 -mx-3 px-3">
                  Sobre nosotros
                </RouterLink>
              </Button>
              {theme === "dark" ? (
                <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly className="m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </Button>
              ) : (
                <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly className="m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
          <Dropdown placement="bottom-end" className="sm:hidden">
            <DropdownTrigger className="sm:hidden">
              <Avatar
                as="button"
                className="transition-transform sm:hidden bg-transparent"
                size="md"
                src={comunidad}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Actions" variant="flat">
              <DropdownItem key="login" className="text-primary">
                <Link to={"/login"} className="pr-28 pl-3">
                  Login
                </Link>
              </DropdownItem>
              <DropdownItem key="about" className="text-secondary">
                <Link to={"/about"} className="pr-28 pl-3">
                  Sobre Nosotros
                </Link>
              </DropdownItem>
              <DropdownItem key="dark" className="text-primary">
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                    Modo Claro
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    Modo Oscuro
                  </Button>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Navbar>
      </>
    );
  } else {
    return usuario.rol === USER_TYPES.PUBLIC ? (
      <>
        <Navbar>
          <NavbarContent>
            <NavbarBrand>
              <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  className="mr-2 dark:fill-white"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              </RouterLink>
              <p className=" font-bold text-inherit text-left">
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  Comunidad San Francisco de Asís
                </RouterLink>
              </p>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden md:flex gap-2">
              <Button color="primary" variant="flat" className=" hover:bg-primary-300 hover:text-white">
                <RouterLink to={"/login"} className="py-2 -mx-3 px-3">
                  Iniciar sesión
                </RouterLink>
              </Button>
              <Button color="secondary" variant="ghost">
                <RouterLink to={"/about"} className="py-2 -mx-3 px-3">
                  Sobre nosotros
                </RouterLink>
              </Button>
              {theme === "dark" ? (
                <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly className="m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </Button>
              ) : (
                <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly className="m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
          <Dropdown placement="bottom-end" className="sm:hidden">
            <DropdownTrigger className="sm:hidden">
              <Avatar
                as="button"
                className="transition-transform sm:hidden bg-transparent"
                size="md"
                src={comunidad}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Actions" variant="flat">
              <DropdownItem key="login" className="text-primary">
                <Link to={"/login"} className="pr-28 pl-3">
                  Login
                </Link>
              </DropdownItem>
              <DropdownItem key="about" className="text-secondary">
                <Link to={"/about"} className="pr-28 pl-3">
                  Sobre Nosotros
                </Link>
              </DropdownItem>
              <DropdownItem key="dark" className="text-primary">
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                    Modo Claro
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    Modo Oscuro
                  </Button>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Navbar>
      </>
    ) : (
      <>
        {usuario.rol === USER_TYPES.MODERATOR_USER ? (
          <Navbar>
            <NavbarContent>
              <NavbarBrand>
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    className="mr-2 dark:fill-white"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </RouterLink>
                <p className=" font-bold text-inherit text-left">
                  <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                    Comunidad SFA
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 md:ml-12" justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem className="hidden md:flex">
                <Button className="bg-transparent hover:bg-slate-200 dark:hover:bg-slate-900">
                  <RouterLink
                    to={"/perfil"}
                    className="py-2 -mx-3 px-3 flex flex-row flex-nowrap align-middle justify-center my-auto gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem className="hidden md:flex">
                <Button color="danger" variant="flat" onClick={logout}>
                  Cerrar Sesión
                </Button>
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </Button>
                )}
              </NavbarItem>
            </NavbarContent>
            <Dropdown placement="bottom-end" className="sm:hidden">
              <DropdownTrigger className="sm:hidden">
                <Avatar
                  as="button"
                  className="transition-transform sm:hidden bg-transparent"
                  size="md"
                  src={usuario.foto}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions" variant="flat">
                <DropdownItem key="farmacia">
                  <Link to={"/farmacia"} className="pr-28 pl-3 flex gap-2">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </Link>
                </DropdownItem>
                <DropdownItem key="perfil">
                  <Link to={"/perfil"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem key="dark" className="text-primary">
                  {theme === "dark" ? (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                      Modo Claro
                    </Button>
                  ) : (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      Modo Oscuro
                    </Button>
                  )}
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  <Link to={"/"} onClick={logout} className="pr-28 pl-3">
                    Cerrar Sesión
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Navbar>
        ) : usuario.rol === USER_TYPES.REPORTS ? (
          <Navbar>
            <NavbarContent>
              <NavbarBrand>
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    className="mr-2 dark:fill-white"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </RouterLink>
                <p className=" font-bold text-inherit text-left">
                  <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                    Comunidad SFA
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 md:ml-12" justify="center">
              <NavbarItem>
                <Button className="bg-transparent hover:bg-purple-300">
                  <RouterLink to={"/reports"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem className="hidden md:flex">
                <Button className="bg-transparent hover:bg-slate-200 dark:hover:bg-slate-900">
                  <RouterLink
                    to={"/perfil"}
                    className="py-2 -mx-3 px-3 flex flex-row flex-nowrap align-middle justify-center my-auto gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </RouterLink>
                </Button>
                <Button color="danger" variant="flat" onClick={logout}>
                  Cerrar Sesión
                </Button>
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </Button>
                )}
              </NavbarItem>
            </NavbarContent>
            <Dropdown placement="bottom-end" className="sm:hidden">
              <DropdownTrigger className="sm:hidden">
                <Avatar
                  as="button"
                  className="transition-transform sm:hidden bg-transparent"
                  size="md"
                  src={usuario.foto}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions" variant="flat">
                <DropdownItem key="reports">
                  <Link to={"/reports"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </Link>
                </DropdownItem>
                <DropdownItem key="perfil">
                  <Link to={"/perfil"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem key="dark" className="text-primary">
                  {theme === "dark" ? (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                      Modo Claro
                    </Button>
                  ) : (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      Modo Oscuro
                    </Button>
                  )}
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  <Link to={"/"} onClick={logout} className="pr-28 pl-3">
                    Cerrar Sesión
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Navbar>
        ) : null}

        {usuario.rol === USER_TYPES.ADMIN_USER ? (
          <Navbar>
            <NavbarContent>
              <NavbarBrand>
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    className="mr-2 dark:fill-white"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </RouterLink>
                <p className=" font-bold text-inherit text-left">
                  <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                    Comunidad SFA
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 md:ml-6" justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-primary-100">
                  <RouterLink to={"/comunidad"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5 -mt-[2px]"
                    >
                      <path d="M18 7l4 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9l4-2" />
                      <path d="M14 22v-4a2 2 0 00-2-2v0a2 2 0 00-2 2v4" />
                      <path d="M18 22V5l-6-3-6 3v17M12 7v5M10 9h4" />
                    </svg>
                    Comunidad
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-purple-300">
                  <RouterLink to={"/reports"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="hidden md:flex">
                <Button className="bg-transparent hover:bg-slate-200 dark:hover:bg-slate-900">
                  <RouterLink
                    to={"/perfil"}
                    className="py-2 -mx-3 px-3 flex flex-row flex-nowrap align-middle justify-center my-auto gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </RouterLink>
                </Button>
                <Button color="danger" variant="flat" onClick={logout}>
                  Cerrar Sesión
                </Button>
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </Button>
                )}
              </NavbarItem>
            </NavbarContent>
            <Dropdown placement="bottom-end" className="sm:hidden">
              <DropdownTrigger className="sm:hidden">
                <Avatar
                  as="button"
                  className="transition-transform sm:hidden bg-transparent"
                  size="md"
                  src={usuario.foto}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions" variant="flat">
                <DropdownItem key="comunidad">
                  <Link to={"/comunidad"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5 -mt-[2px]"
                    >
                      <path d="M18 7l4 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9l4-2" />
                      <path d="M14 22v-4a2 2 0 00-2-2v0a2 2 0 00-2 2v4" />
                      <path d="M18 22V5l-6-3-6 3v17M12 7v5M10 9h4" />
                    </svg>
                    Comunidad
                  </Link>
                </DropdownItem>
                <DropdownItem key="farmacia">
                  <Link to={"/farmacia"} className="pr-28 pl-3 flex gap-2">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </Link>
                </DropdownItem>
                <DropdownItem key="reports">
                  <Link to={"/reports"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </Link>
                </DropdownItem>
                <DropdownItem key="perfil">
                  <Link to={"/perfil"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem key="dark" className="text-primary">
                  {theme === "dark" ? (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                      Modo Claro
                    </Button>
                  ) : (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      Modo Oscuro
                    </Button>
                  )}
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  <Link to={"/"} onClick={logout} className="pr-28 pl-3">
                    Cerrar Sesión
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Navbar>
        ) : usuario.rol === USER_TYPES.SUPER ? (
          <Navbar>
            <NavbarContent>
              <NavbarBrand>
                <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    className="mr-2 dark:fill-white"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </RouterLink>
                <p className=" font-bold text-inherit text-left">
                  <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
                    Comunidad SFA
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 md:ml-6" justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-primary-100">
                  <RouterLink to={"/comunidad"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5 -mt-[2px]"
                    >
                      <path d="M18 7l4 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9l4-2" />
                      <path d="M14 22v-4a2 2 0 00-2-2v0a2 2 0 00-2 2v4" />
                      <path d="M18 22V5l-6-3-6 3v17M12 7v5M10 9h4" />
                    </svg>
                    Comunidad
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-red-300">
                  <RouterLink to={"/usuarios"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M144 160c44.2 0 80-35.8 80-80S188.2 0 144 0 64 35.8 64 80s35.8 80 80 80zm368 0c44.2 0 80-35.8 80-80S556.2 0 512 0s-80 35.8-80 80 35.8 80 80 80zM0 298.7C0 310.4 9.6 320 21.3 320h214.1c-26.6-23.5-43.3-57.8-43.3-96 0-7.6.7-15 1.9-22.3-13.6-6.3-28.7-9.7-44.6-9.7h-42.7C47.8 192 0 239.8 0 298.7zM320 320c24 0 45.9-8.8 62.7-23.3 2.5-3.7 5.2-7.3 8-10.7 2.7-3.3 5.7-6.1 9-8.3C410 262.3 416 243.9 416 224c0-53-43-96-96-96s-96 43-96 96 43 96 96 96zm65.4 60.2c-10.3-5.9-18.1-16.2-20.8-28.2H261.3C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7h300.5c-2.1-5.2-3.2-10.9-3.2-16.4v-3c-1.3-.7-2.7-1.5-4-2.3l-2.6 1.5c-16.8 9.7-40.5 8-54.7-9.7-4.5-5.6-8.6-11.5-12.4-17.6l-.1-.2-.1-.2-2.4-4.1-.1-.2-.1-.2c-3.4-6.2-6.4-12.6-9-19.3-8.2-21.2 2.2-42.6 19-52.3l2.7-1.5v-2.3-2.3l-2.7-1.5zM533.3 192h-42.6c-15.9 0-31 3.5-44.6 9.7 1.3 7.2 1.9 14.7 1.9 22.3 0 17.4-3.5 33.9-9.7 49 2.5.9 4.9 2 7.1 3.3l2.6 1.5c1.3-.8 2.6-1.6 4-2.3v-3c0-19.4 13.3-39.1 35.8-42.6 7.9-1.2 16-1.9 24.2-1.9s16.3.6 24.2 1.9c22.5 3.5 35.8 23.2 35.8 42.6v3c1.3.7 2.7 1.5 4 2.3l2.6-1.5c16.8-9.7 40.5-8 54.7 9.7 2.3 2.8 4.5 5.8 6.6 8.7-2.1-57.1-49-102.7-106.6-102.7zm91.3 163.9c6.3-3.6 9.5-11.1 6.8-18-2.1-5.5-4.6-10.8-7.4-15.9l-2.3-4c-3.1-5.1-6.5-9.9-10.2-14.5-4.6-5.7-12.7-6.7-19-3L574.4 311c-8.9-7.6-19.1-13.6-30.4-17.6v-21c0-7.3-4.9-13.8-12.1-14.9-6.5-1-13.1-1.5-19.9-1.5s-13.4.5-19.9 1.5c-7.2 1.1-12.1 7.6-12.1 14.9v21c-11.2 4-21.5 10-30.4 17.6l-18.2-10.5c-6.3-3.6-14.4-2.6-19 3-3.7 4.6-7.1 9.5-10.2 14.6l-2.3 3.9c-2.8 5.1-5.3 10.4-7.4 15.9-2.6 6.8.5 14.3 6.8 17.9l18.2 10.5c-1 5.7-1.6 11.6-1.6 17.6s.6 11.9 1.6 17.5l-18.2 10.5c-6.3 3.6-9.5 11.1-6.8 17.9 2.1 5.5 4.6 10.7 7.4 15.8l2.4 4.1c3 5.1 6.4 9.9 10.1 14.5 4.6 5.7 12.7 6.7 19 3l18.2-10.2c8.9 7.6 19.2 13.6 30.4 17.6v21c0 7.3 4.9 13.8 12.1 14.9 6.5 1 13.1 1.5 19.9 1.5s13.4-.5 19.9-1.5c7.2-1.1 12.1-7.6 12.1-14.9v-21c11.2-4 21.5-10 30.4-17.6l18.2 10.5c6.3 3.6 14.4 2.6 19-3 3.7-4.6 7.1-9.4 10.1-14.5l2.4-4.2c2.8-5.1 5.3-10.3 7.4-15.8 2.6-6.8-.5-14.3-6.8-17.9l-18.2-10.5c1-5.7 1.6-11.6 1.6-17.5s-.6-11.9-1.6-17.6l18.2-10.5zM552 384c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40z" />
                    </svg>
                    Usuarios
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-purple-300">
                  <RouterLink to={"/reports"} className="py-2 -mx-3 px-3 flex gap-1">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="hidden md:flex">
                <Button className="bg-transparent hover:bg-slate-200 dark:hover:bg-slate-900">
                  <RouterLink
                    to={"/perfil"}
                    className="py-2 -mx-3 px-3 flex flex-row flex-nowrap align-middle justify-center my-auto gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </RouterLink>
                </Button>
                <Button color="danger" variant="flat" onClick={logout}>
                  Cerrar Sesión
                </Button>
                {theme === "dark" ? (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button onClick={() => changeTheme(theme)} variant="light" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </Button>
                )}
              </NavbarItem>
            </NavbarContent>
            <Dropdown placement="bottom-end" className="sm:hidden">
              <DropdownTrigger className="sm:hidden">
                <Avatar
                  as="button"
                  className="transition-transform sm:hidden bg-transparent"
                  size="md"
                  src={usuario.foto}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions" variant="flat">
                <DropdownItem key="comunidad">
                  <Link to={"/comunidad"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-5 h-5 -mt-[2px]"
                    >
                      <path d="M18 7l4 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9l4-2" />
                      <path d="M14 22v-4a2 2 0 00-2-2v0a2 2 0 00-2 2v4" />
                      <path d="M18 22V5l-6-3-6 3v17M12 7v5M10 9h4" />
                    </svg>
                    Comunidad
                  </Link>
                </DropdownItem>
                <DropdownItem key="farmacia">
                  <Link to={"/farmacia"} className="pr-28 pl-3 flex gap-2">
                    <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 -mt-[1px]">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.657 2.757a6 6 0 118.485 8.486l-9.9 9.9a6 6 0 11-8.485-8.486l9.9-9.9zm7.07 7.071l-4.242 4.243-5.657-5.657 4.243-4.242a4 4 0 115.657 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                    </svg>
                    Social
                  </Link>
                </DropdownItem>
                <DropdownItem key="usuarios">
                  <Link to={"/usuarios"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M144 160c44.2 0 80-35.8 80-80S188.2 0 144 0 64 35.8 64 80s35.8 80 80 80zm368 0c44.2 0 80-35.8 80-80S556.2 0 512 0s-80 35.8-80 80 35.8 80 80 80zM0 298.7C0 310.4 9.6 320 21.3 320h214.1c-26.6-23.5-43.3-57.8-43.3-96 0-7.6.7-15 1.9-22.3-13.6-6.3-28.7-9.7-44.6-9.7h-42.7C47.8 192 0 239.8 0 298.7zM320 320c24 0 45.9-8.8 62.7-23.3 2.5-3.7 5.2-7.3 8-10.7 2.7-3.3 5.7-6.1 9-8.3C410 262.3 416 243.9 416 224c0-53-43-96-96-96s-96 43-96 96 43 96 96 96zm65.4 60.2c-10.3-5.9-18.1-16.2-20.8-28.2H261.3C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7h300.5c-2.1-5.2-3.2-10.9-3.2-16.4v-3c-1.3-.7-2.7-1.5-4-2.3l-2.6 1.5c-16.8 9.7-40.5 8-54.7-9.7-4.5-5.6-8.6-11.5-12.4-17.6l-.1-.2-.1-.2-2.4-4.1-.1-.2-.1-.2c-3.4-6.2-6.4-12.6-9-19.3-8.2-21.2 2.2-42.6 19-52.3l2.7-1.5v-2.3-2.3l-2.7-1.5zM533.3 192h-42.6c-15.9 0-31 3.5-44.6 9.7 1.3 7.2 1.9 14.7 1.9 22.3 0 17.4-3.5 33.9-9.7 49 2.5.9 4.9 2 7.1 3.3l2.6 1.5c1.3-.8 2.6-1.6 4-2.3v-3c0-19.4 13.3-39.1 35.8-42.6 7.9-1.2 16-1.9 24.2-1.9s16.3.6 24.2 1.9c22.5 3.5 35.8 23.2 35.8 42.6v3c1.3.7 2.7 1.5 4 2.3l2.6-1.5c16.8-9.7 40.5-8 54.7 9.7 2.3 2.8 4.5 5.8 6.6 8.7-2.1-57.1-49-102.7-106.6-102.7zm91.3 163.9c6.3-3.6 9.5-11.1 6.8-18-2.1-5.5-4.6-10.8-7.4-15.9l-2.3-4c-3.1-5.1-6.5-9.9-10.2-14.5-4.6-5.7-12.7-6.7-19-3L574.4 311c-8.9-7.6-19.1-13.6-30.4-17.6v-21c0-7.3-4.9-13.8-12.1-14.9-6.5-1-13.1-1.5-19.9-1.5s-13.4.5-19.9 1.5c-7.2 1.1-12.1 7.6-12.1 14.9v21c-11.2 4-21.5 10-30.4 17.6l-18.2-10.5c-6.3-3.6-14.4-2.6-19 3-3.7 4.6-7.1 9.5-10.2 14.6l-2.3 3.9c-2.8 5.1-5.3 10.4-7.4 15.9-2.6 6.8.5 14.3 6.8 17.9l18.2 10.5c-1 5.7-1.6 11.6-1.6 17.6s.6 11.9 1.6 17.5l-18.2 10.5c-6.3 3.6-9.5 11.1-6.8 17.9 2.1 5.5 4.6 10.7 7.4 15.8l2.4 4.1c3 5.1 6.4 9.9 10.1 14.5 4.6 5.7 12.7 6.7 19 3l18.2-10.2c8.9 7.6 19.2 13.6 30.4 17.6v21c0 7.3 4.9 13.8 12.1 14.9 6.5 1 13.1 1.5 19.9 1.5s13.4-.5 19.9-1.5c7.2-1.1 12.1-7.6 12.1-14.9v-21c11.2-4 21.5-10 30.4-17.6l18.2 10.5c6.3 3.6 14.4 2.6 19-3 3.7-4.6 7.1-9.4 10.1-14.5l2.4-4.2c2.8-5.1 5.3-10.3 7.4-15.8 2.6-6.8-.5-14.3-6.8-17.9l-18.2-10.5c1-5.7 1.6-11.6 1.6-17.5s-.6-11.9-1.6-17.6l18.2-10.5zM552 384c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40z" />
                    </svg>
                    Usuarios
                  </Link>
                </DropdownItem>
                <DropdownItem key="reports">
                  <Link to={"/reports"} className="pr-28 pl-3 flex gap-2">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 -mt-[2px]">
                      <path d="M483.82 32.45a16.28 16.28 0 00-11.23 1.37L448 46.1l-24.8-12.4a16 16 0 00-14.31 0l-25.11 12.41L359 33.7a16 16 0 00-14.36 0L320 46.07l-24.45-12.34a16 16 0 00-14.35-.06L256 46.12l-24.8-12.43a16.05 16.05 0 00-14.33 0L192 46.1l-24.84-12.41a16 16 0 00-19.36 3.94 16.25 16.25 0 00-3.8 10.65V288l.05.05H336a32 32 0 0132 32V424c0 30.93 33.07 56 64 56h12a52 52 0 0052-52V48a16 16 0 00-12.18-15.55zM416 240H288.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01288 208h127.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 240zm0-80H224.5c-8.64 0-16.1-6.64-16.48-15.28A16 16 0 01224 128h191.5c8.64 0 16.1 6.64 16.48 15.28A16 16 0 01416 160z" />
                      <path d="M336 424v-88a16 16 0 00-16-16H48a32.1 32.1 0 00-32 32.05c0 50.55 5.78 71.57 14.46 87.57C45.19 466.79 71.86 480 112 480h245.68a4 4 0 002.85-6.81C351.07 463.7 336 451 336 424z" />
                    </svg>
                    Reportes
                  </Link>
                </DropdownItem>
                <DropdownItem key="perfil">
                  <Link to={"/perfil"} className="pr-28 pl-3 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 -mt-[3px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem key="dark" className="text-primary">
                  {theme === "dark" ? (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                      Modo Claro
                    </Button>
                  ) : (
                    <Button onClick={() => changeTheme(theme)} variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      Modo Oscuro
                    </Button>
                  )}
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  <Link to={"/"} onClick={logout} className="pr-28 pl-3">
                    Cerrar Sesión
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Navbar>
        ) : null}
      </>
    );
  }
};

export default Navibar;
