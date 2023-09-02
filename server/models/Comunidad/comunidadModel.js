const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comunidadSchema = new Schema({
  nombreComunidad: String,
  ubicacion: String,
  fechacreacion: Date,
  horarios: String,
  fotos: [String],
  tipo: {
    type: String,
    default: "Comunidad",
  },
  ofrenda: [
    {
      anio: String,
      ofrenda: [Number],
    },
  ],
  estado: Boolean,
});

module.exports = mongoose.model("Comunidad", comunidadSchema);
