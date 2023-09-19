import React, { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";
import {
  Input,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../config.js";
import { contexto } from "../../context/ContextProvider";
import NFblack from "../../assets/notfoundblack.svg";
import NFWhite from "../../assets/notfoundwhite.svg";

const U_todos = () => {
  const roles = [
    {
      value: "Admin",
      label: "Administrador",
    },
    {
      value: "Moderator",
      label: "Moderador",
    },
    {
      value: "Super",
      label: "Super Administrador",
    },
    {
      value: "Reports",
      label: "Reportería",
    },
  ];

  const [valueUsuario, setValueUsuario] = useState(roles);
  const [usuarios, setUsuarios] = useState(null);

  const { theme, usuario } = useContext(contexto);
  const [loading, setLoading] = useState(false);
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [resultados, setResultados] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userSeleccionado, setUsuarioSeleccionado] = useState(null);

  ///////////////////
  const [nombre, setNombre] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [popOver, setPopOver] = useState(false);

  const cargaUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/getall/${usuario.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al filtrar los usuarios", {});
      }

      const data = await response.json();
      setResultados(data);
      setLoading(false);
      toast.success("Usuarios cargados correctamente" + error);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleActualizar = async () => {
    const datos = {
      nombre: nombre === null ? userSeleccionado?.nombre : nombre,
      username: username === null ? userSeleccionado?.username : username,
      // contrasenia: password.length === null ? userSeleccionado?.contrasenia : password,
      rol: usuarios === null ? userSeleccionado?.rol : usuarios.currentKey,
    };

    try {
      const response = await fetch(`${API_URL}/user/update/${userSeleccionado?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario", {});
      }
      await response.json();
      toast.success("Usuario actualizado correctamente");
      onOpenChange();
      cargaUsuarios();
    } catch (error) {
      toast.error("Error al actualizar el usuario" + error);
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await fetch(`${API_URL}/user/delete/${userSeleccionado?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: false }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario", {});
      }
      await response.json();
      toast.success("Usuario eliminado correctamente");
      onOpenChange();
      cargaUsuarios();
    } catch (error) {
      toast.error("Error al eliminar el usuario" + error);
    }
  };

  useEffect(() => {
    cargaUsuarios();
  }, []);

  // const [visiblePasswords, setVisiblePasswords] = useState({});

  // const togglePasswordVisibility = (username) => {
  //   setVisiblePasswords((prevState) => ({
  //     ...prevState,
  //     [username]: !prevState[username],
  //   }));
  // };

  return (
    <>
      <Toaster />
      <h1 className="text-3xl font-semibold mt-2  mx-auto">Hola, {usuario.nombre}</h1>
      <h1 className="text-2xl mx-auto"> Mostrando todos los usuarios</h1>
      <Divider className="my-6 w-10/12 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {loading ? (
          <Loading />
        ) : resultados.length > 0 ? (
          resultados.map((usuario, idx) => (
            <React.Fragment key={idx}>
              <div
                className="flex my-2 p-4 border-1 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-zinc-700 w-11/12 mx-auto sm:w-4/5"
                onClick={() => {
                  setUsuarioSeleccionado(usuario);
                  onOpen();
                }}
              >
                {theme === "dark" ? (
                  <img
                    src={usuario?.foto ?? NFWhite}
                    alt={usuario?.nombre ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[100px] sm:h-[80px] sm:mr-[20px] my-auto"
                  />
                ) : (
                  <img
                    src={usuario?.foto ?? NFblack}
                    alt={usuario?.nombre ?? ""}
                    className="w-[100px] h-[100px] object-cover mr-[10px] m-0 sm:w-[100px] sm:h-[80px] sm:mr-[20px] my-auto"
                  />
                )}

                <div style={{ textAlign: "left" }}>
                  <div className="font-bold text-[18px]">{usuario?.nombre}</div>
                  <span className="mt-[3px] block">
                    <strong>Nombre de usuario: </strong>
                    {usuario?.username}
                  </span>
                  {/* <span className="mt-[3px] block">
                    <strong>Contraseña: </strong>{" "}
                    <div>
                      {visiblePasswords[usuario?.username] ? (
                        <span className="num">{usuario?.username ?? ""}</span>
                      ) : (
                        <Button
                          className="bg-warning"
                          size="sm"
                          onClick={() => togglePasswordVisibility(usuario?.username)}
                        >
                          Revelar
                        </Button>
                      )}
                    </div>
                  </span> */}
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <h2 className="mx-auto">No hay resultados</h2>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{userSeleccionado?.nombre ?? ""}</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Nombre de la persona"
                  autoComplete="nope"
                  placeholder="Ingrese un nombre de la persona"
                  defaultValue={userSeleccionado?.nombre ?? ""}
                  onChange={(e) => setNombre(e.target.value)}
                ></Input>

                <Input
                  type="text"
                  label="Nombre de usuario"
                  autoComplete="nope"
                  placeholder="Ingrese nombre de usuario"
                  defaultValue={userSeleccionado?.username ?? ""}
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>

                {/* <span className="">
                          <div>
                            {visiblePasswords[userSeleccionado?.username] ? (
                              <div className="num">
                                <Input
                                  type="text"
                                  label="Contraseña"
                                  autoComplete="nope"
                                  placeholder="Ingrese una contraseña"
                                  className="bg-gray-100 w-full p-2 dark:bg-gray-800"
                                  defaultValue={userSeleccionado?.contrasenia}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                            ) : (
                              <Button
                                type="button"
                                className="bg-warning"
                                onClick={() => togglePasswordVisibility(userSeleccionado?.username)}
                              >
                                Revelar contraseña
                              </Button>
                            )}
                          </div>
                        </span> */}

                <p className="font-bold text-[17px] sm:hidden -mb-2 ">Seleccione el rol:</p>
                <Select
                  label="Roles de usuario"
                  variant="bordered"
                  placeholder={userSeleccionado?.rol}
                  selectedKeys={usuarios}
                  className="w-full"
                  onSelectionChange={setUsuarios}
                >
                  {valueUsuario.length > 0 ? (
                    valueUsuario.map((usuario) => (
                      <SelectItem key={usuario?.value} value={usuario?.value} s>
                        {usuario?.label ?? ""}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="cargando" text="Cargando retiroes..." disabled />
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-success" onClick={handleActualizar}>
                  Actualizar
                </Button>
                <Popover placement="top" color="danger" isOpen={popOver}>
                  <PopoverTrigger>
                    <Button color="danger" onClick={() => setPopOver(true)}>
                      Eliminar usuario
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">¿Está seguro de querer eliminar al usuario?</div>
                      <div className="text-tiny">¡Esta acción no se puede deshacer!, ¿Desea continuar?</div>
                      <div className="mx-auto m-2 text-center">
                        <Button color="warning" className="mr-2" onClick={handleEliminar}>
                          Sí, deseo eliminarlo
                        </Button>
                        <Button color="primary" onClick={() => setPopOver(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default U_todos;
