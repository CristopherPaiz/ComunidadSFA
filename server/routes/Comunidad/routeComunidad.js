const express = require("express");
const router = express.Router();
const ComunidadModel = require("../../models/Comunidad/ComunidadModel.js");

//======= crear nueva comunidad =======
router.post("/comunidad/add", async (req, res) => {
  try {
    const { nombre, ubicacion, fechacreacion, horarios, fotos, tipo, ofrenda, estado } = req.body;

    const comunidad = new ComunidadModel({
      nombre,
      ubicacion,
      fechacreacion,
      horarios,
      fotos,
      tipo,
      ofrenda,
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

/////////////////////////////////////////////////////////////
router.post("/comunidad/addofrenda/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nuevoAnio, nuevaOfrenda } = req.body;

    const updatedComunidad = await ComunidadModel.findByIdAndUpdate(
      id,
      { $push: { ofrenda: { anio: nuevoAnio, ofrenda: nuevaOfrenda } } },
      { new: true }
    );

    res.status(200).json({ message: "Nuevo año de ofrenda añadido a la comunidad", comunidad: updatedComunidad });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir nuevo año de ofrendas a la comunidad",
      messageSys: error.message,
    });
  }
});

router.put("/comunidad/updateofrenda/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { anio, nuevaOfrenda } = req.body;

    const updatedComunidad = await ComunidadModel.findOneAndUpdate(
      { _id: id, "ofrenda.anio": anio },
      { $set: { "ofrenda.$.ofrenda": nuevaOfrenda } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Valores de ofrenda actualizados para el año especificado", comunidad: updatedComunidad });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar los valores de  ofrendas para el año especificado",
      messageSys: error.message,
    });
  }
});

// //ejemplos
// {
//   "nuevoAnio": "2022",
//   "nuevaOfrenda": [130, 160, 140, 150, 170, 190, 180, 200, 220, 230, 250, 260]
// }

// /////
// {
//   "anio": "2021",
//   "nuevaOfrenda": [125, 155, 135, 145, 165, 185, 175, 195, 205, 215, 235, 245]
// }

module.exports = router;
