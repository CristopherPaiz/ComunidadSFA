const express = require("express");
const router = express.Router();
const BeneficiarioSocial = require("../../models/Social/beneficiarioSocial.js");

//======= crear nueva actividad Social =======
router.post("/BeneficiarioSocial/add", async (req, res) => {
  console.log(req.body);
  try {
    const {
      nombre,
      actividadSocial,
      dpi,
      comunidad,
      direccion,
      estadocivil,
      telefono,
      cumpleanios,
      fechainicio,
      fechafinal,
      encargado,
      telefonoencargado,
      ubicacion,
      saldoTotal,
      observaciones,
      fotosbeneficiario,
      fotosdocumentos,
      otrosdatos,
      estado,
    } = req.body;

    const beneficiario = new BeneficiarioSocial({
      nombre,
      actividadSocial,
      dpi,
      comunidad,
      direccion,
      estadocivil,
      telefono,
      cumpleanios,
      fechainicio,
      fechafinal,
      encargado,
      telefonoencargado,
      ubicacion,
      saldoTotal,
      observaciones,
      fotosbeneficiario,
      fotosdocumentos,
      otrosdatos,
      estado,
    });

    // Guardar el objeto user en la base de datos u otras operaciones necesarias
    const resultado = await beneficiario.save();

    //mandamos estado 200 de OK y el resultado de la operacion
    res.status(200).json({ message: "Beneficiario añadido correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir al beneficiario Social",
      messageSys: error.message,
    });
  }
});

// ======= obtener una Actividad Social por su id =======
router.get("/BeneficiarioSocial/getbyid/:id", async (req, res) => {
  try {
    const data = await BeneficiarioSocial.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener al beneficiario por el id: " + req.params.id,
      messageSys: error.message,
    });
  }
});

// ======= actualizar una actividad social por su id =======
router.put("/BeneficiarioSocial/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await BeneficiarioSocial.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Beneficiario actualizado correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo actualizar al beneficiario",
      messageSys: error.message,
    });
  }
});

// ======= eliminar una actividad social por su id =======
router.put("/BeneficiarioSocial/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const resultado = await BeneficiarioSocial.findByIdAndUpdate(id, data, options);
    res.status(200).json({ message: "Beneficiario eliminado correctamente", resultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar al beneficiario",
      messageSys: error.message,
    });
  }
});

module.exports = router;
