const express = require("express");
const router = express.Router();
const ActividadSocial = require("../../models/Social/ActividadSocial.js");

//======= crear nueva actividad Social =======
router.post("/ActividadSocial/add", async (req, res) => {
  try {
    const {
      nombre,
      fechainicio,
      fechafinal,
      ubicacion,
      comunidad,
      encargado,
      saldoTotal,
      descripcion,
      fotos,
      observaciones,
      estado,
    } = req.body;

    const actividad = new ActividadSocial({
      nombre,
      fechainicio,
      fechafinal,
      ubicacion,
      comunidad,
      encargado,
      saldoTotal,
      descripcion,
      fotos,
      observaciones,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await actividad.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Actividad Social añadida correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir la Actividad Social",
      messageSys: error.message,
    });
  }
});

// ======= obtener una Actividad Social por su id =======
router.get("/ActividadSocial/getbyid/:id", async (req, res) => {
  try {
    const data = await ActividadSocial.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener la Actividad Social por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una actividad social por su id =======
router.put("/ActividadSocial/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ActividadSocial.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad Social actualizada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar la actividad Social",
      messageSys: error.message,
    });
  }
});

// ======= eliminar una actividad social por su id =======
router.put("/ActividadSocial/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ActividadSocial.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad Social Eliminada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar la Actividad Social",
      messageSys: error.message,
    });
  }
});

module.exports = router;
