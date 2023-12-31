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
    const data = await CursoCreci.find().where({ estado: true }).sort({ nombreCursoCreci: 1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los Cursos o crecimientos",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas los cursos o crecimientos por año actual=======

router.get("/cursocreci/getallbyyear", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Obtener el año actual

    // Crear una fecha para el último día del año actual
    const lastDayOfYear = new Date(currentYear, 11, 31); // 11 representa diciembre (los meses van de 0 a 11)

    const data = await CursoCreci.find({
      estado: true,
      fechainicio: {
        $gte: new Date(currentYear, 0, 1), // 1 de enero del año actual
        $lte: lastDayOfYear, // Último día del año actual
      },
    })
      .sort({ nombreCursoCreci: 1 })
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
router.post("/cursocreci/getbyname", async (req, res) => {
  try {
    const { nombreCursoCreci } = req.body;
    const data = await CursoCreci.find({
      nombreCursoCreci: { $regex: nombreCursoCreci, $options: "i" },
    })
      .where({ estado: true })
      .sort({ nombreCursoCreci: 1 })
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
router.get("/cursocreci/getallname", async (req, res) => {
  try {
    const data = await CursoCreci.find()
      .select("nombreCursoCreci _id")
      .where({ estado: true })
      .sort({ nombreCursoCreci: 1 })
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los cursos o retiros",
      messageSys: error.message,
    });
  }
});

// ======= obtener todos los retiros solo nombrey ID =======
router.get("/cursocreci/getallnamelabel", async (req, res) => {
  try {
    const data = await CursoCreci.find()
      .select("nombreCursoCreci _id")
      .where({ estado: true })
      .sort({ nombreCursoCreci: 1 })
      .exec();

    // Mapear los resultados para cambiar el nombre de la propiedad
    const formattedData = data.map((item) => ({
      label: item.nombreCursoCreci,
      _id: item._id,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los cursos o retiros",
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
