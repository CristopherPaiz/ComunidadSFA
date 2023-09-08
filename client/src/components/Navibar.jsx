import React, { useState, useContext } from "react";
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
            <NavbarItem className="hidden md:flex items-center">
              <Button color="primary" variant="flat">
                <RouterLink to={"/login"} className="py-2 -mx-3 px-3">
                  Iniciar sesión
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
              <Avatar as="button" className="transition-transform sm:hidden bg-transparent" size="md" src={comunidad} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Actions" variant="flat">
              <DropdownItem key="login" className="text-primary">
                <Link to={"/login"} className="pr-28 pl-3">
                  Login
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
            <NavbarItem className="hidden md:flex">
              <Button color="primary" variant="flat">
                <RouterLink to={"/login"} className="py-2 -mx-3 px-3">
                  Iniciar sesión
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
              <Avatar as="button" className="transition-transform sm:hidden bg-transparent" size="md" src={comunidad} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Actions" variant="flat">
              <DropdownItem key="login" className="text-primary">
                <Link to={"/login"} className="pr-28 pl-3">
                  Login
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
                    Comunidad San Francisco de Asís
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 " justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3">
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3">
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
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
                  <Link to={"/farmacia"} className="pr-28 pl-3">
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3">
                    Social
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
                    Comunidad San Francisco de Asís
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 " justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-primary-100">
                  <RouterLink to={"/comunidad"} className="py-2 -mx-3 px-3">
                    Comunidad
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3">
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3">
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
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
                <DropdownItem key="comunidad">
                  <Link to={"/comunidad"} className="pr-28 pl-3">
                    Comunidad
                  </Link>
                </DropdownItem>
                <DropdownItem key="farmacia">
                  <Link to={"/farmacia"} className="pr-28 pl-3">
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3">
                    Social
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
                    Comunidad San Francisco de Asís
                  </RouterLink>
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-1 " justify="center">
              <NavbarItem isActive>
                <Button className="bg-transparent hover:bg-primary-100">
                  <RouterLink to={"/comunidad"} className="py-2 -mx-3 px-3">
                    Comunidad
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-success-100" variant="flat">
                  <RouterLink to={"/farmacia"} className="py-2 -mx-3 px-3">
                    Farmacia
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/social"} className="py-2 -mx-3 px-3">
                    Social
                  </RouterLink>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button className="bg-transparent hover:bg-warning-100">
                  <RouterLink to={"/usuarios"} className="py-2 -mx-3 px-3">
                    Usuarios
                  </RouterLink>
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
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
                <DropdownItem key="comunidad">
                  <Link to={"/comunidad"} className="pr-28 pl-3">
                    Comunidad
                  </Link>
                </DropdownItem>
                <DropdownItem key="farmacia">
                  <Link to={"/farmacia"} className="pr-28 pl-3">
                    Farmacia
                  </Link>
                </DropdownItem>
                <DropdownItem key="social">
                  <Link to={"/social"} className="pr-28 pl-3">
                    Social
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
                <DropdownItem key="usuarios">
                  <Link to={"/usuarios"} className="pr-28 pl-3">
                    Usuarios
                  </Link>
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
