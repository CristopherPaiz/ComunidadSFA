const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beneficiarioSchema = new Schema({
  nombre: String,
  actividadSocial: String,
  dpi: String,
  comunidad: String,
  direccion: String,
  estadocivil: String,
  telefono: String,
  cumpleanios: Date,
  fechainicio: Date,
  fechafinal: Date,
  encargado: String,
  telefonoencargado: String,
  ubicacion: String,
  saldoTotal: Number,
  observaciones: String,
  fotosbeneficiario: [String],
  fotosdocumentos: [String],
  otrosdatos: String,
  estado: Boolean,
});

module.exports = mongoose.model("Beneficiario", beneficiarioSchema);
