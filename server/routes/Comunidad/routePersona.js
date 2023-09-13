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
      fechasubcordi,
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
      fechasubcordi,
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
    const data = await Persona.find().where({ estado: true }).sort({ nombre: 1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener a la persona",
      messageSys: error.message,
    });
  }
});

// ======= obtener todas las actividad comunidades =======
router.get("/persona/getallActivity", async (req, res) => {
  try {
    const data = await Persona.find({ estado: true })
      .select("_id nombre idcomunidad")
      .populate("idcomunidad", "nombreComunidad")
      .sort({ nombre: 1 })
      .exec();

    // Modifica el resultado para tener solo el nombre de la comunidad
    const result = data.map((item) => {
      return {
        idPersona: item._id,
        nombrePersona: item.nombre,
        nombreComunidad: item.idcomunidad.nombreComunidad,
      };
    });

    res.status(200).json(result);
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

// ======= obtener una actividad comunidad por su id =======
router.post("/persona/getbycomunidad", async (req, res) => {
  try {
    const { idcomunidad } = req.body;

    const personas = await Persona.find({ idcomunidad }).where({ estado: true }).sort({ nombre: 1 }).exec();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
      messageSys: error.message,
    });
  }
});

// ======= obtener una persona por retiro por su id =======
router.post("/persona/getrbyretiro", async (req, res) => {
  try {
    const { idretiro } = req.body;

    // Asumiendo que idretiro es una cadena (si es ObjectId, convierte adecuadamente)
    const personas = await Persona.find({ "retiros.idretiro": idretiro })
      .populate("retiros.idretiro", "nombreRetiro")
      .populate("crecimientos.idcursocreci", "nombreCursoCreci") // Cargar datos relacionados del retiro
      .where({ estado: true })
      .sort({ nombre: 1 })
      .exec();

    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
      messageSys: error.message,
    });
  }
});

// ======= obtener una persona por retiro por su id mejorado=======
router.post("/persona/getrbyretiroComunidad", async (req, res) => {
  try {
    const { idretiro } = req.body;

    // Asumiendo que idretiro es una cadena (si es ObjectId, convierte adecuadamente)
    const personas = await Persona.find({ "retiros.idretiro": idretiro })
      .populate("crecimientos.idcursocreci", "nombreCursoCreci")
      .populate("idcomunidad", "nombreComunidad")
      .where({ estado: true })
      .sort({ nombre: 1 })
      .exec();

    // Filtrar el retiro específico dentro del array retiros
    const personasFiltradas = personas.map((persona) => {
      const retiroEspecifico = persona.retiros.find((retiro) => retiro.idretiro.equals(idretiro));
      if (retiroEspecifico) {
        persona.retiros = [retiroEspecifico];
      } else {
        persona.retiros = [];
      }
      return persona;
    });

    res.status(200).json(personasFiltradas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
      messageSys: error.message,
    });
  }
});

// ======= obtener una persona por curso/creci por su id =======
router.post("/persona/getrbycursocreci", async (req, res) => {
  try {
    const { idCursoCreci } = req.body;

    // Asumiendo que idretiro es una cadena (si es ObjectId, convierte adecuadamente)
    const personas = await Persona.find({ "crecimientos.idcursocreci": idCursoCreci })
      .populate("retiros.idretiro", "nombreRetiro")
      .populate("crecimientos.idcursocreci", "nombreCursoCreci") // Cargar datos relacionados del retiro
      .where({ estado: true })
      .sort({ nombre: 1 })
      .exec();

    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
      messageSys: error.message,
    });
  }
});

// ======= obtener una persona por curso/creci por su id =======
router.post("/persona/getbycomunidad", async (req, res) => {
  try {
    const { idcomunidad } = req.body;

    // Asumiendo que idretiro es una cadena (si es ObjectId, convierte adecuadamente)
    const personas = await Persona.find({ "comunidad.idcomunidad": idcomunidad })
      .populate("retiros.idretiro", "nombreRetiro")
      .populate("crecimientos.idcursocreci", "nombreCursoCreci") // Cargar datos relacionados del retiro
      .where({ estado: true })
      .sort({ nombre: 1 })
      .exec();

    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
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

// Agrega esta ruta al final del archivo de rutas
router.post("/persona/filtrar", async (req, res) => {
  try {
    const { nombre, telefono, direccion, dones } = req.body;

    let query = {};

    if (nombre) {
      query.nombre = { $regex: nombre, $options: "i" };
    }

    if (telefono) {
      query.telefono = { $regex: telefono, $options: "i" };
    }

    if (direccion) {
      query.direccion = { $regex: direccion, $options: "i" };
    }

    if (dones && dones.length > 0) {
      query.dones = { $in: dones };
    }

    const personas = await Persona.find(query)
      .populate("idcomunidad", "nombreComunidad")
      .populate("retiros.idretiro", "nombreRetiro")
      .populate("crecimientos.idcursocreci", "nombreCursoCreci")
      .where({ estado: true })
      .sort({ nombre: 1 })
      .exec();

    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo realizar la búsqueda de personas",
      messageSys: error.message,
    });
  }
});

//////////////////////////////////////////////////////////
router.post("/persona/addretiro/:id", async (req, res) => {
  try {
    const personaId = req.params.id;
    const { nuevoRetiro } = req.body;

    const updatedPersona = await Persona.findByIdAndUpdate(
      personaId,
      { $push: { retiros: nuevoRetiro } },
      { new: true }
    );

    res.status(200).json({ message: "Nuevo retiro añadido a la persona", persona: updatedPersona });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir el retiro a la persona",
      messageSys: error.message,
    });
  }
});

router.post("/persona/addcursocreci/:id", async (req, res) => {
  try {
    const personaId = req.params.id;
    const { nuevoCrecimiento } = req.body;

    const updatedPersona = await Persona.findByIdAndUpdate(
      personaId,
      { $push: { crecimientos: nuevoCrecimiento } },
      { new: true }
    );

    res.status(200).json({ message: "Nuevo crecimiento añadido a la persona", persona: updatedPersona });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir el crecimiento a la persona",
      messageSys: error.message,
    });
  }
});

router.put("/persona/deleteretiro/:id", async (req, res) => {
  try {
    const personaId = req.params.id;
    const retiroId = req.body.retiroId;

    const updatedPersona = await Persona.findByIdAndUpdate(
      personaId,
      { $pull: { retiros: { idretiro: retiroId } } },
      { new: true }
    );

    res.status(200).json({ message: "Retiro eliminado de la persona", persona: updatedPersona });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el retiro de la persona",
      messageSys: error.message,
    });
  }
});

router.put("/persona/deletecursocreci/:id", async (req, res) => {
  try {
    const personaId = req.params.id;
    const crecimientoId = req.body.crecimientoId;

    const updatedPersona = await Persona.findByIdAndUpdate(
      personaId,
      { $pull: { crecimientos: { idcursocreci: crecimientoId } } },
      { new: true }
    );

    res.status(200).json({ message: "Crecimiento eliminado de la persona", persona: updatedPersona });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el crecimiento de la persona",
      messageSys: error.message,
    });
  }
});

router.post("/persona/addpermiso/:id", async (req, res) => {
  try {
    const personaId = req.params.id;
    const { nuevoPermiso } = req.body;

    const updatedPersona = await Persona.findByIdAndUpdate(
      personaId,
      { $push: { permisos: nuevoRetiro } },
      { new: true }
    );

    res.status(200).json({ message: "Nuevo permiso añadido a la persona", persona: updatedPersona });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir el permiso a la persona",
      messageSys: error.message,
    });
  }
});

module.exports = router;
