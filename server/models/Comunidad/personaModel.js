const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personaSchema = new Schema({
  nuevo: Boolean,
  tipo: {
    type: String,
    default: "Pueblo",
  },
  nombre: String,
  telefono: String,
  trabajaen: String,
  direccion: String,
  idcomunidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comunidad",
  },
  dones: [String],
  retiros: [
    {
      idretiro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retiro",
      },
      finalizado: Boolean,
      fecha: Date,
      cuota: [Number],
    },
  ],
  crecimientos: [
    {
      idcursocreci: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CursoCreci",
      },
      finalizado: Boolean,
      fecha: Date,
      cuota: [Number],
    },
  ],
  fechainicio: Date,
  fechacreci: Date,
  fechaservi: Date,
  fechasubcordi: Date,
  fechacordi: Date,
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
