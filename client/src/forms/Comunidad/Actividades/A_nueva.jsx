import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import es from "date-fns/locale/es";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Typography } from "@mui/material";
import API_URL from "../../../config.js";
import Loading from "../../../components/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { format, parseISO, subHours } from "date-fns";

const A_nueva = () => {
  const [events, setEvents] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [lastAddedEventDate, setLastAddedEventDate] = useState(new Date());
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popOver, setPopOver] = useState(false);
  const [popOver2, setPopOver2] = useState(false);

  //fetch para cargar las personas
  const CargarPersonas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/persona/getallActivity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Error al obtener la lista de cursos");
        throw new Error("Error al filtrar las cursos", {});
      }

      const data = await response.json();
      setPersonas(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CargarPersonas();
  }, []);
  // Cargar datos del localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);

      const eventsWithDateObjects = parsedEvents.map((event) => ({
        ...event,
        start: parseISO(event.start),
        end: parseISO(event.end),
      }));

      setEvents(eventsWithDateObjects);
      setForceUpdate((prevForceUpdate) => prevForceUpdate + 1);
    }
  }, []);

  // Esto guarda en el localStorage
  useEffect(() => {
    if (events.length === 0) return;
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  // Eventos de agregar
  const handleConfirm = async (newEvent) => {
    // Formatear la fecha de inicio y fin
    console.log(newEvent.start);
    console.log(newEvent.end);

    const fechaInicioLocal = new Date(newEvent.start);
    const fechaFinLocal = new Date(newEvent.end);

    // Convierte las fechas de inicio y finalización a UTC utilizando el método toISOString()
    const fechaInicioUTC = fechaInicioLocal.toISOString();
    const fechaFinUTC = fechaFinLocal.toISOString();

    // Crear un nuevo objeto con las fechas formateadas
    const addedEvent = {
      ...newEvent,
      start: fechaInicioUTC,
      end: fechaFinUTC,
      event_id: (Date.now() + Math.random()).toFixed(0),
    };

    setEvents((prevEvents) => [...prevEvents, addedEvent]);
    setForceUpdate((prevForceUpdate) => prevForceUpdate + 1);
    setLastAddedEventDate(addedEvent.start);

    return addedEvent;
  };

  // Eventos de borrar
  const handleDelete = async (deletedEventId) => {
    const deletedEvent = events.find((event) => event.event_id === deletedEventId);
    if (deletedEvent) {
      const { start } = deletedEvent;
      setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== deletedEventId));
      setForceUpdate((prevForceUpdate) => prevForceUpdate + 1);
      setLastAddedEventDate(start);
    }
  };

  //subir datos a la nube
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/actividadComunidad/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actividades: events,
          estado: true,
        }),
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al añadir las actividades", {});
        throw new Error("Error al añadir las actividades", {});
      }
      const data = await response.json();
      toast.success("Se agregaron las actividades correctamente", {});
      await new Promise((resolve) => setTimeout(resolve, 1300));
      setPopOver(false);
    } catch (error) {
      toast.error("Error al añadir las actividades: " + error);
    }
  };

  const handleDescargar = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/actividadComunidad/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Asegúrate de incluir esta opción
      });
      if (!response.ok) {
        toast.error("Error al obtener las actividades", {});
        throw new Error("Error al obtener las actividades", {});
      }
      const data = await response.json();

      // Parsear las fechas en cada actividad
      const actividadesParseadas = data.actividades.map((actividad) => {
        return {
          ...actividad,
          start: new Date(actividad.start), // Parsear la fecha de inicio
          end: new Date(actividad.end), // Parsear la fecha de fin
        };
      });

      setEvents(actividadesParseadas);
      toast.success("Se actualizaron las actividades correctamente", {});
      await new Promise((resolve) => setTimeout(resolve, 1300));
      setPopOver2(false);
      setLoading(false);
    } catch (error) {
      toast.error("Error al obtener las actividades: " + error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <div className="flex gap-2 text-center justify-end m-2">
        <Popover placement="top" color="success" isOpen={popOver}>
          <PopoverTrigger>
            <Button color="success" className="mx-auto text-center text-white" onClick={() => setPopOver(true)}>
              Guardar en la nube
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">
                Esta acción, tomará todos los datos locales y los subirá a la nube, esto reemplazará los datos que
                puedan existir.
              </div>
              <div className="text-tiny">¡Esta acción no se puede deshacer!, ¿Desea continuar?</div>
              <div className="mx-auto m-2 text-center">
                <Button color="warning" className="mr-2" onClick={handleSubmit}>
                  Sí, deseo subir los cambios
                </Button>
                <Button color="danger" onClick={() => setPopOver(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover placement="top" color="warning" isOpen={popOver2}>
          <PopoverTrigger>
            <Button
              color="warning"
              variant="bordered"
              className="mx-auto text-center"
              onClick={() => setPopOver2(true)}
            >
              Descargar datos de la nube
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">
                Esta acción, tomará todos los datos de la nube y reemplazará los datos locales, esto reemplazará los
                datos que puedan existir.
              </div>
              <div className="text-tiny">¡Esta acción no se puede deshacer!, ¿Desea continuar?</div>
              <div className="mx-auto m-2 text-center">
                <Button color="success" className="mr-2" onClick={handleDescargar}>
                  Sí, descargar los datos de la nube
                </Button>
                <Button color="danger" onClick={() => setPopOver2(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Scheduler
        selectedDate={lastAddedEventDate}
        editable={false}
        key={forceUpdate}
        events={events}
        onConfirm={handleConfirm}
        onDelete={(eventId, eventStart) => handleDelete(eventId, eventStart)}
        view="month"
        hourFormat="12"
        navigation={true}
        fields={[
          {
            name: "idPersona",
            type: "select",
            options: personas.map((res, idx) => {
              return {
                id: idx,
                text: `${res.nombrePersona} (${res.nombreComunidad})`,
                value: res.idPersona,
              };
            }),
            config: { label: "A quién se le asigna", required: true },
          },
          {
            name: "description",
            type: "input",

            config: {
              label: "Descripción",
              required: false,
              multiline: true,
              rows: 4,
            },
          },
        ]}
        resourceFields={[
          {
            name: "description",
          },
        ]}
        locale={es}
        dialogMaxWidth="xs"
        timeZone="GMT"
        translations={{
          navigation: {
            month: "Mes",
            week: "Semana",
            day: "Día",
            today: "Hoy",
          },
          form: {
            addTitle: "Añadir Evento",
            editTitle: "Editar Evento",
            confirm: "Confirmar",
            delete: "Eliminar",
            cancel: "Cancelar",
          },
          event: {
            title: "Título",
            start: "Empieza",
            end: "Finaliza",
            allDay: "Todo el día",
          },
          moreEvents: "Más...",
          loading: "Cargando...",
        }}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p style={{ fontWeight: "800" }}>Descripción: </p>
              <Typography key={event.event_id} style={{ display: "flex", fontSize: "15px", alignItems: "center" }}>
                {event.description}
              </Typography>
              <p style={{ fontWeight: "800" }}>Encargado: </p>
              <Typography
                key={event.event_id + "1"}
                style={{ display: "flex", color: "black", fontSize: "15px", alignItems: "center" }}
              >
                {personas.find((resource) => resource.idPersona === event.idPersona)?.nombrePersona}
              </Typography>
            </div>
          );
        }}
      />
    </>
  );
};

export default A_nueva;
