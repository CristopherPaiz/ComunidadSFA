import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import es from "date-fns/locale/es";
import { Typography } from "@mui/material";
import API_URL from "../../../config.js";
import Loading from "../../../components/Loading.jsx";

const defaultDatos = [{ id: 123456, text: "Ninguno", value: 123456 }];

const A_nueva = () => {
  const [events, setEvents] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [lastAddedEventDate, setLastAddedEventDate] = useState(new Date());
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);

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
        start: new Date(event.start),
        end: new Date(event.end),
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
    const addedEvent = { ...newEvent, event_id: (Date.now() + Math.random()).toFixed(0) };
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Scheduler
        selectedDate={lastAddedEventDate}
        editable={false}
        key={forceUpdate}
        events={events}
        onConfirm={handleConfirm}
        onDelete={(eventId, eventStart) => handleDelete(eventId, eventStart)}
        view="month"
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
    </div>
  );
};

export default A_nueva;
