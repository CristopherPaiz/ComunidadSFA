const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    require: true,
  },
  username: {
    require: true,
    type: String,
    unique: true,
  },
  contrasenia: {
    type: String,
    require: true,
  },
  foto: String,
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
