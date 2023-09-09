const express = require("express");
const router = express.Router();
const Retiro = require("../../models/Comunidad/retiroModel.js");

//======= crear nuevo retiro =======
router.post("/retiro/add", async (req, res) => {
  try {
    const {
      nombreRetiro,
      fechainicio,
      fechaFinal,
      encargados,
      ubicacion,
      ofrenda,
      horario,
      tipo,
      tipoPara,
      estado,
    } = req.body;

    const retiro = new Retiro({
      nombreRetiro,
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
    const data = await Retiro.find().where({ estado: true }).sort({ nombreRetiro: 1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Retiros",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas los cursos o crecimientos por año actual=======

router.get("/retiro/getallbyyear", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Obtener el año actual

    // Crear una fecha para el último día del año actual
    const lastDayOfYear = new Date(currentYear, 11, 31); // 11 representa diciembre (los meses van de 0 a 11)

    const data = await Retiro.find({
      estado: true,
      fechainicio: {
        $gte: new Date(currentYear, 0, 1), // 1 de enero del año actual
        $lte: lastDayOfYear, // Último día del año actual
      },
    })
      .sort({ nombreRetiro: 1 })
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Cursos o crecimientos",
      messageSys: error.message,
    });
  }
});

// ======= obtener todos los retiros por nombre =======
router.post("/retiro/getbyname", async (req, res) => {
  try {
    const { nombreRetiro } = req.body;
    const data = await Retiro.find({ nombreRetiro: { $regex: nombreRetiro, $options: "i" } })
      .where({ estado: true })
      .sort({ nombreRetiro: 1 })
      .exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Retiros",
      messageSys: error.message,
    });
  }
});

// ======= obtener todos los retiros solo nombrey ID =======
router.get("/retiro/getallname", async (req, res) => {
  try {
    const data = await Retiro.find()
      .select("nombreRetiro _id")
      .where({ estado: true })
      .sort({ nombreRetiro: 1 })
      .exec();

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
