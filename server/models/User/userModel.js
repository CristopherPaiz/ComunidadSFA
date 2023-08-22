const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: String,
  rol: String,
  username: String,
  contrasenia: String,
  foto: String,
  estado: { type: Boolean, default: true },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
