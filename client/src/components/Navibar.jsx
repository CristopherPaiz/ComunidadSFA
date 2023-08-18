import React, { useState } from "react";
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
import { Link, Link as RouterLink } from "react-router-dom";
import comunidad from "/comunidad.svg";

const Navibar = () => {
  return (
    <Navbar>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-start" backdrop="blur">
          <DropdownTrigger>
            <Avatar as="button" className="transition-transform -mx-3 sm:-mx-0" size="md" src={comunidad} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Menu Actions" variant="flat">
            <DropdownItem key="login" className="text-primary">
              <Link to={"/login"} className="pr-28 pl-3">
                Login
              </Link>
            </DropdownItem>
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
            <DropdownItem key="logout" className="text-danger" color="danger">
              <Link to={"/login"} className="pr-28 pl-3">
                Log out
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent>
        <NavbarBrand>
          <p className=" font-bold text-inherit text-left">
            <RouterLink to={"/"} className="py-2 -mx-3 px-3">
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
          <Button color="primary" variant="flat">
            <RouterLink to={"/login"} className="py-2 -mx-3 px-3">
              Iniciar sesión
            </RouterLink>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navibar;
