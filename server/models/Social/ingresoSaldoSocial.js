const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingresoSaldoSocialSchema = new Schema({
  idbeneficiario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beneficiario",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  nombredonante: String,
  monto: Number,
  observaciones: String,
});

module.exports = mongoose.model("IngresoSaldoSocial", ingresoSaldoSocialSchema);
