import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

const Navibar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Comunidad",
    "Personas",
    "Actividades",
    "Farmacia",
    "Social",
    "Cerrar Sesión",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} position="static">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-right">COMUNIDAD SFA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-1 " justify="center">
        <NavbarItem>
          <Button className="bg-transparent hover:bg-success-100">
            Comunidad
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-transparent hover:bg-success-100">
            Actividades
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-transparent hover:bg-success-100">
            Personas
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-transparent hover:bg-success-100"
            variant="flat"
          >
            Farmacia
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-transparent hover:bg-success-100">
            Social
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
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navibar;
