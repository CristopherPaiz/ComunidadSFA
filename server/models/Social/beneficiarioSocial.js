const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beneficiarioSchema = new Schema({
  nombre: String,
  dpi: String,
  comunidad: String,
  direccion: String,
  estadocivil: String,
  telefono: String,
  fechainicio: Date,
  fechafinal: Date,
  encargado: String,
  ubicacion: String,
  saldoTotal: Number,
  observaciones: String,
  fotosbeneficiario: [String],
  fotosdocumentos: [String],
  otrosdatos: String,
  estado: Boolean,
});

module.exports = mongoose.model("Beneficiario", beneficiarioSchema);
