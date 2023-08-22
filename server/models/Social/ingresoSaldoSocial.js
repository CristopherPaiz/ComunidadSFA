const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingresoSaldoSocialSchema = new Schema({
  nombredonante: String,
  nombrebeneficiario: String,
  monto: Number,
  observaciones: String,
});

module.exports = mongoose.model("IngresoSaldoSocial", ingresoSaldoSocialSchema);
