const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comunidadSchema = new Schema({
  nombre: String,
  ubicacion: String,
  fechacreacion: Date,
  horarios: String,
  fotos: [String],
  tipo: String, // celula o iglesia
  estado: Boolean,
});

module.exports = mongoose.model("Comunidad", comunidadSchema);
