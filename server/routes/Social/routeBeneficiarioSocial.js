const express = require("express");
const router = express.Router();
const BeneficiarioSocial = require("../../models/Social/beneficiarioSocial.js");
const IngresoSaldo = require("../../models/Social/ingresoSaldoSocial.js");
const egresoSaldo = require("../../models/Social/egresoSaldoSocial.js");

//======= crear nuevo beneficiario Social =======
router.post("/BeneficiarioSocial/add", async (req, res) => {
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

// ======= obtener todas los beneficiarios =======
router.get("/BeneficiarioSocial/getall", async (req, res) => {
  try {
    const data = await BeneficiarioSocial.find().where({ estado: true }).sort({ nombre: 1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los beneficiarios",
      messageSys: error.message,
    });
  }
});

//obtener y cambiar nombre
router.get("/BeneficiarioSocial/getallname", async (req, res) => {
  try {
    const data = await BeneficiarioSocial.find().where({ estado: true }).sort({ nombre: 1 }).exec();

    // Mapear los documentos para cambiar el nombre de la propiedad
    const modifiedData = data.map((beneficiario) => {
      return {
        ...beneficiario._doc,
        label: beneficiario._doc.nombre,
      };
    });

    res.status(200).json(modifiedData);
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo obtener los beneficiarios",
      messageSys: error.message,
    });
  }
});

// ======= obtener una Actividad por su id =======
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

// ======= actualizar un beneficiario por su id =======
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

// ======= eliminar un beneficiario por su id =======
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

/////////////////////////////////////////////////////////////////////////////////////////
// ============================= Añadir saldo beneficiario =========================== //
/////////////////////////////////////////////////////////////////////////////////////////

// Agregar una nueva ruta GET para obtener todos los ingresos de un beneficiario por su ID
router.get("/IngresoSaldo/:idbeneficiario", async (req, res) => {
  try {
    const idbeneficiario = req.params.idbeneficiario;

    // Buscar todos los ingresosSaldo asociados al ID del beneficiario
    const ingresos = await IngresoSaldo.find({ idbeneficiario });

    // Devolver los ingresos encontrados
    res.status(200).json({ message: "Ingresos del beneficiario obtenidos correctamente", ingresos });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudieron obtener los ingresos del beneficiario",
      messageSys: error.message,
    });
  }
});

router.post("/IngresoSaldo/add", async (req, res) => {
  try {
    const { idbeneficiario, nombredonante, monto, observaciones } = req.body;

    const beneficiario = new IngresoSaldo({
      idbeneficiario,
      nombredonante,
      monto,
      observaciones,
    });

    // Guardar el objeto IngresoSaldo en la base de datos
    const ingresoSaldoResultado = await beneficiario.save();

    // Actualizar el saldoTotal del beneficiario
    await BeneficiarioSocial.findByIdAndUpdate(
      idbeneficiario,
      { $inc: { saldoTotal: monto } } // Incrementa el saldoTotal en el valor de monto
    );

    // Mandamos estado 200 de OK y el resultado de la operación
    res.status(200).json({ message: "Saldo a Beneficiario añadido correctamente", ingresoSaldoResultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir un nuevo saldo al beneficiario Social",
      messageSys: error.message,
    });
  }
});

router.delete("/IngresoSaldo/delete/:id", async (req, res) => {
  try {
    await IngresoSaldo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el registro",
      messageSys: error.message,
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////
// ============================ Añadir egreso beneficiario =========================== //
/////////////////////////////////////////////////////////////////////////////////////////

// Agregar una nueva ruta GET para obtener todos los egresos de un beneficiario por su ID
router.get("/egresoSaldo/:idbeneficiario", async (req, res) => {
  try {
    const idbeneficiario = req.params.idbeneficiario;

    // Buscar todos los egresosSaldo asociados al ID del beneficiario
    const egresos = await egresoSaldo.find({ idbeneficiario });

    // Devolver los egresos encontrados
    res.status(200).json({ message: "Egresos del beneficiario obtenidos correctamente", egresos });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudieron obtener los egresos del beneficiario",
      messageSys: error.message,
    });
  }
});

router.post("/egresoSaldo/add", async (req, res) => {
  try {
    const { idbeneficiario, fecha, monto, fotos, observaciones } = req.body;

    const beneficiario = new egresoSaldo({
      idbeneficiario,
      fecha,
      monto,
      fotos,
      observaciones,
    });

    // Guardar el objeto IngresoSaldo en la base de datos
    const ingresoSaldoResultado = await beneficiario.save();

    // Actualizar el saldoTotal del beneficiario
    await BeneficiarioSocial.findByIdAndUpdate(
      idbeneficiario,
      { $inc: { saldoTotal: -monto } } // Incrementa el saldoTotal en el valor de monto
    );

    // Mandamos estado 200 de OK y el resultado de la operación
    res.status(200).json({ message: "Egreso de Beneficiario añadido correctamente", ingresoSaldoResultado });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo añadir un nuevo egreso al beneficiario Social",
      messageSys: error.message,
    });
  }
});

router.delete("/egresoSaldo/delete/:id", async (req, res) => {
  try {
    await egresoSaldo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      messageDev: "No se pudo eliminar el registro",
      messageSys: error.message,
    });
  }
});

module.exports = router;
