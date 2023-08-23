const express = require("express");
const router = express.Router();
const Retiro = require("../../models/Comunidad/retiroModel.js");

//======= crear nuevo retiro =======
router.post("/retiro/add", async (req, res) => {
  console.log(req.body);
  try {
    const { nombre, fechainicio, fechaFinal, encargados, ubicacion, ofrenda, horario, tipo, tipoPara, estado } =
      req.body;

    const retiro = new Retiro({
      nombre,
      fechainicio,
      fechaFinal,
      encargados,
      ubicacion,
      ofrenda,
      horario,
      tipo,
      tipoPara,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await retiro.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Retiro añadida correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir el retiro",
      messageSys: error.message,
    });
  }
});

// ======= obtener todos los retiros =======
router.get("/retiro/getall", async (req, res) => {
  try {
    const data = await Retiro.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Retiros",
      messageSys: error.message,
    });
  }
});

// ======= obtener un retiro por su id =======
router.get("/retiro/getbyid/:id", async (req, res) => {
  try {
    const data = await Retiro.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener el retiro por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar un retiro por su id =======
router.put("/retiro/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await Retiro.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Retiro actualizado correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar el retiro",
      messageSys: error.message,
    });
  }
});

// ======= eliminar un retiro por su id =======
router.put("/retiro/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await Retiro.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Retiro Eliminado correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el retiro",
      messageSys: error.message,
    });
  }
});

module.exports = router;
