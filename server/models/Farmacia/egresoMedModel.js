const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const egresoMedSchema = new Schema({
  idmedicamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicamento",
  },
  cantidad: Number,
  fecha: Date,
  precioVenta: Number,
});

module.exports = mongoose.model("EgresoMedicamento", egresoMedSchema);
