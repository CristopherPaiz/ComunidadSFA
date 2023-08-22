const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const egresoMedSchema = new Schema({
  nombre: String,
  cantidad: Number,
  fecha: Date,
  precioVenta: Number,
});

module.exports = mongoose.model("EgresoMedicamento", egresoMedSchema);
