const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actividadSocialSchema = new Schema({
  nombre: String,
  fechainicio: Date,
  fechafinal: Date,
  ubicacion: String,
  comunidad: String,
  encargado: [String],
  saldoTotal: Number,
  descripcion: String,
  fotos: [String],
  observaciones: String,
  estado: Boolean,
});

module.exports = mongoose.model("ACtividadSocial", actividadSocialSchema);
