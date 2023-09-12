const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicamentoSchema = new Schema({
  label: String,
  cantidadTotal: Number,
  tipo: String,
  precio: Number,
  fotos: [String],
  descripcion: String,
  observaciones: String,
  antibiotico: Boolean,
  estado: Boolean,
});

module.exports = mongoose.model("Medicamento", medicamentoSchema);
