const express = require("express");
const router = express.Router();
const Persona = require("../../models/Comunidad/personaModel.js");

router.post("/persona/add", async (req, res) => {
  try {
    const {
      nuevo,
      tipo,
      nombre,
      telefono,
      trabajaen,
      direccion,
      idcomunidad,
      dones,
      retiros,
      crecimientos,
      fechainicio,
      fechacreci,
      fechaservi,
      fechacordi,
      permisos,
      evaluacionEspiritual,
      observaciones,
      estado,
    } = req.body;

    const persona = new Persona({
      nuevo,
      tipo,
      nombre,
      telefono,
      trabajaen,
      direccion,
      idcomunidad,
      dones,
      retiros,
      crecimientos,
      fechainicio,
      fechacreci,
      fechaservi,
      fechacordi,
      permisos,
      evaluacionEspiritual,
      observaciones,
      estado,
    });

    // Guardar la persona en la base de datos u otras operaciones necesarias
    const resultado = await persona.save();

    // Mandamos estado 200 de OK y el resultado de la operación
    res.status(200).json({ message: "Persona añadida correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir a la persona",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas las actividad comunidades =======
router.get("/persona/getall", async (req, res) => {
  try {
    const data = await Persona.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener a la persona",
      messageSys: error.message,
    });
  }
});

// ======= obtener una actividad comunidad por su id =======
router.get("/persona/getbyid/:id", async (req, res) => {
  try {
    const data = await Persona.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener a la persona por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una actividad comunidad por su id =======
router.put("/persona/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await Persona.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Persona actualizada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar la persona",
      messageSys: error.message,
    });
  }
});

// ======= eliminar una actividad comunidad por su id =======
router.put("/persona/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await Persona.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Persona Eliminada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar la persona",
      messageSys: error.message,
    });
  }
});

module.exports = router;
