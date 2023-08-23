const express = require("express");
const router = express.Router();
const ComunidadModel = require("../../models/Comunidad/ComunidadModel.js");

//======= crear nueva comunidad =======
router.post("/comunidad/add", async (req, res) => {
  try {
    const { nombre, ubicacion, fechacreacion, horarios, fotos, tipo, estado } = req.body;

    const comunidad = new ComunidadModel({
      nombre,
      ubicacion,
      fechacreacion,
      horarios,
      fotos,
      tipo,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await comunidad.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Comunidad o célula añadida correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir la Comunidad o célula",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas las comunidades =======
router.get("/comunidad/getall", async (req, res) => {
  try {
    const data = await ComunidadModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener las Comunidades o Células",
      messageSys: error.message,
    });
  }
});

// ======= obtener una comunidad por su id =======
router.get("/comunidad/getbyid/:id", async (req, res) => {
  try {
    const data = await ComunidadModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener la Actividad Social por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una comunidad por su id =======
router.put("/comunidad/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ComunidadModel.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad Social actualizada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar la actividad Social",
      messageSys: error.message,
    });
  }
});

// ======= eliminar una comunidad por su id =======
router.put("/comunidad/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await ComunidadModel.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Actividad Social Eliminada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar la Actividad Social",
      messageSys: error.message,
    });
  }
});

module.exports = router;
