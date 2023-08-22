const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const egresoSaldoSocialSchema = new Schema({
  nombredonante: String, // de quién debita
  fecha: Date,
  monto: Number,
  fotos: [String],
  observaciones: String,
});

module.exports = mongoose.model("EgresoSaldoSocial", egresoSaldoSocialSchema);
