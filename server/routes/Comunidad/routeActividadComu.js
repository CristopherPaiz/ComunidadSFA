const express = require("express");
const router = express.Router();
const ActividadComu = require("../../models/Comunidad/actividadComunidad.js");

//======= crear nueva actividad comunidad =======
router.post("/actividadComunidad/add", async (req, res) => {
  try {
    const {
      nombre,
      fechayhorainicial,
      fechayhorafinal,
      comunidad,
      ubicacion,
      horario,
      encargados,
      predicador,
      alabanzas,
      avivador,
      orador,
      fotos,
      tipo,
      especificaciones,
      observaciones,
      estado,
    } = req.body;

    const ActiComunidad = new ActividadComu({
      nombre,
      fechayhorainicial,
      fechayhorafinal,
      comunidad,
      ubicacion,
      horario,
      encargados,
      predicador,
      alabanzas,
      avivador,
      orador,
      fotos,
      tipo,
      especificaciones,
      observaciones,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await ActiComunidad.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Actividad añadida correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir la actividad",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas las actividad comunidades =======
router.get("/actividadComunidad/getall", async (req, res) => {
  try {
    const data = await ActividadComu.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener las actividades",
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

module.exports = router;
