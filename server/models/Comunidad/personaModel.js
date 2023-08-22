const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personaSchema = new Schema({
  nuevo: Boolean,
  tipo: String,
  nombre: String,
  telefono: String,
  trabajaen: String,
  direccion: String,
  comunidad: String,
  dones: [String],
  retiros: [
    {
      nombre: String,
      finalizado: Boolean,
      fecha: Date,
    },
  ],
  crecimientos: [
    {
      nombre: String,
      finalizado: Boolean,
      fecha: Date,
    },
  ],
  fechainicio: Date,
  fechacreci: Date,
  fechaservi: Date,
  fechacordi: Date,
  ofrendas: [
    {
      nombre: String,
      fecha: Date,
      cantidad: Number,
    },
  ],
  permisos: [
    {
      descripcion: String,
      fecha: Date,
      foto: String,
    },
  ],
  evaluacionEspiritual: Number,
  observaciones: String,
  estado: Boolean,
});

module.exports = mongoose.model("Persona", personaSchema);
