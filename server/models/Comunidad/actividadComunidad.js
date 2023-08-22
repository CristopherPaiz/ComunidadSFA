const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actividadComunidadSchema = new Schema({
  nombre: String,
  fechayhorainicial: Date,
  fechayhorafinal: Date,
  comunidad: String,
  ubicacion: String,
  horario: String,
  encargados: [String],
  predicador: [String],
  alabanzas: [String],
  avivador: [String],
  orador: [String],
  fotos: [String],
  tipo: String,
  especificaciones: String,
  observaciones: String,
  estado: Boolean,
});

module.exports = mongoose.model("ActividadComunidad", actividadComunidadSchema);
