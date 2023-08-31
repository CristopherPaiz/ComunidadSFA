const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retiroSchema = new Schema({
  nombreRetiro: {
    type: String,
    required: [true, "El nombre del retiro es necesario"],
  },
  fechainicio: {
    type: Date,
    default: Date.now,
  },
  fechaFinal: Date,
  encargados: [String],
  ubicacion: String,
  ofrenda: Number,
  horario: String,
  tipo: {
    type: String,
    default: "Ninguno",
  },
  tipoPara: {
    type: String,
    default: "Para todo público",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Retiro", retiroSchema);
