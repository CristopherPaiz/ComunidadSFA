const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cursoCreciSchema = new Schema({
  nombreCursoCreci: String,
  fechainicio: Date,
  fechaFinal: Date,
  ofrenda: Number,
  horario: String,
  ubicacion: String,
  dirigidoA: {
    type: String,
    default: "Pueblo",
  },
  dirigidoPor: String,
  tipo: String,
  estado: Boolean,
});

module.exports = mongoose.model("CursoCreci", cursoCreciSchema);
