const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actividadComunidadSchema = new Schema({
  actividades: [
    {
      event_id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      description: {
        type: String,
      },
      idPersona: {
        type: String,
      },
    },
  ],
  estado: Boolean,
});

module.exports = mongoose.model("ActividadComunidad", actividadComunidadSchema);
