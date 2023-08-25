const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retiroSchema = new Schema({
  nombreRetiro: String,
  fechainicio: Date,
  fechaFinal: Date,
  encargados: [String],
  ubicacion: String,
  ofrenda: Number,
  horario: String,
  tipo: String, //primer retiro, otros
  tipoPara: String, //servidores, pueblo....
  estado: Boolean,
});

module.exports = mongoose.model("Retiro", retiroSchema);
