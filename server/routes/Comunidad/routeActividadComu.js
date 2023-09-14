const express = require("express");
const router = express.Router();
const ActividadComu = require("../../models/Comunidad/actividadComunidad.js");

// ======= crear nueva actividad comunidad =======
router.post("/actividadComunidad/add", async (req, res) => {
  try {
    const { actividades, estado } = req.body;

    // Verificar si ya existe una entrada
    const existingActividadComu = await ActividadComu.findOne();

    if (existingActividadComu) {
      // Si existe, reemplázala con los nuevos datos
      existingActividadComu.actividades = actividades;
      existingActividadComu.estado = estado;
      await existingActividadComu.save();
      res.status(200).json({ message: "Actividad actualizada correctamente", resultado: existingActividadComu });
    } else {
      // Si no existe, crea una nueva entrada
      const newActividadComu = new ActividadComu({
        actividades,
        estado,
      });
      const resultado = await newActividadComu.save();
      res.status(200).json({ message: "Actividad añadida correctamente", resultado });
    }
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir o actualizar la actividad",
      messageSys: error.message,
    });
  }
});

// ======= obtener una actividad comunidad por su id =======
router.post("/actividadComunidad/getbyidActividad", async (req, res) => {
  try {
    // Extrae el id de la solicitud POST
    const id = req.body.id;

    const actividadComunidad = await ActividadComu.findOne();

    if (!actividadComunidad) {
      return res.status(404).json({ message: "Actividad Comunidad no encontrada" });
    }

    // Extrae el idPersona del cuerpo de la solicitud POST
    const idPersona = req.body.idPersona;

    // Filtra los objetos en el array 'actividades' por idPersona
    const actividadesConIdPersona = actividadComunidad.actividades.filter(
      (actividad) => actividad.idPersona === idPersona
    );

    res.status(200).json(actividadesConIdPersona);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener la Actividad por el id",
      messageSys: error.message,
    });
  }
});

// ======= obtener una actividad comunidad por su id =======
router.get("/actividadComunidad/getbyid/:id", async (req, res) => {
  try {
    const data = await ActividadComu.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener la Actividad por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una actividad comunidad por su id =======
router.put("/actividadComunidad/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ActividadComu.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad actualizada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar la actividad",
      messageSys: error.message,
    });
  }
});

// ======= eliminar una actividad comunidad por su id =======
router.put("/actividadComunidad/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ActividadComu.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad Eliminada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar la Actividad",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas las actividad comunidades =======
router.get("/actividadComunidad/getall", async (req, res) => {
  try {
    const data = await ActividadComu.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener las actividades",
      messageSys: error.message,
    });
  }
});

module.exports = router;
