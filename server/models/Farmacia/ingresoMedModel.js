const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingresoMedSchema = new Schema({
  nombre: String,
  cantidad: Number,
  fecha: Date,
  precioCompra: Number,
  precioVenta: Number,
  proveedor: String,
  observaciones: String,
});

module.exports = mongoose.model("IngresoMedicamento", ingresoMedSchema);
