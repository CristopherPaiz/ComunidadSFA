const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "El nombre de usuario ya existe"],
  },
  password: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
