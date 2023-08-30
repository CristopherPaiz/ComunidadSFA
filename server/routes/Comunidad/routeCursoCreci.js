const express = require("express");
const router = express.Router();
const CursoCreci = require("../../models/Comunidad/cursoCreciModel.js");

//======= crear nuevo curso o crecimiento =======
router.post("/cursocreci/add", async (req, res) => {
  try {
    const {
      nombreCursoCreci,
      fechainicio,
      fechaFinal,
      ofrenda,
      horario,
      ubicacion,
      dirigidoA,
      dirigidoPor,
      tipo,
      estado,
    } = req.body;

    const cursoCreci = new CursoCreci({
      nombreCursoCreci,
      fechainicio,
      fechaFinal,
      ofrenda,
      horario,
      ubicacion,
      dirigidoA,
      dirigidoPor,
      tipo,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await cursoCreci.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Curso o crecimiento añadido correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir el curso o crecimiento",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas los cursos o crecimientos =======
router.get("/cursocreci/getall", async (req, res) => {
  try {
    const data = await CursoCreci.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Cursos o crecimientos",
      messageSys: error.message,
    });
  }
});

// ======= obtener todos los retiros =======
router.get("/cursocreci/getallname", async (req, res) => {
  try {
    const data = await CursoCreci.find().sort({ nombreCursoCreci: 1 }).select("nombreCursoCreci _id");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Crecimientos",
      messageSys: error.message,
    });
  }
});

// ======= obtener un curso o crecimiento por su id =======
router.get("/cursocreci/getbyid/:id", async (req, res) => {
  try {
    const data = await CursoCreci.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener el curso o crecimiento por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una curso o crecimiento por su id =======
router.put("/cursocreci/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await CursoCreci.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Curso o crecimiento actualizado correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar el curso o crecimiento",
      messageSys: error.message,
    });
  }
});

// ======= eliminar un curso o crecimiento por su id =======
router.put("/cursocreci/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await CursoCreci.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Curso o crecimiento Eliminada correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el curso o crecimiento",
      messageSys: error.message,
    });
  }
});

module.exports = router;
