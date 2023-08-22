const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const egresoSaldoSocialSchema = new Schema({
  idbeneficiario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beneficiario",
  },
  fecha: Date,
  monto: Number,
  fotos: [String],
  observaciones: String,
});

module.exports = mongoose.model("EgresoSaldoSocial", egresoSaldoSocialSchema);
