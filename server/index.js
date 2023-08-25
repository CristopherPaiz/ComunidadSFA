const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const connect = require("./database/connection");
const cookieParser = require("cookie-parser");
const routesUser = require("./routes/User/routeUser");
const ActividadSocial = require("./routes/Social/routeActividadSocial.js");
const BeneficiarioSocial = require("./routes/Social/routeBeneficiarioSocial.js");
const Farmacia = require("./routes/Farmacia/routesMedicamento.js");
const Comunidad = require("./routes/Comunidad/routeComunidad.js");
const CursoCreci = require("./routes/Comunidad/routeCursoCreci.js");
const Retiro = require("./routes/Comunidad/routeRetiro.js");
const Persona = require("./routes/Comunidad/routePersona.js");
const Actividad = require("./routes/Comunidad/routeActividadComu.js");

// TOKEN
const authenticateToken = require("./middleware/auth");

//Conectamos a la BD
connect();

//Creamos el enrutador
const app = express();

//usamos cors para evitar errores de CORS
app.use(
  cors({
    origin: [
      "*",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "127.0.0.1:3000",
      "https://inquisitive-uniform-foal.cyclic.app",
      "https://leathershopxela.netlify.app",
      "https://*.netlify.app",
      "*.netlify.app",
      "*.netlify.*",
      "*.app",
      ".app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//importamos cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api Comunidad SFA!");
});

//usamos siempre el formato de JSON
app.use(express.json());

//Definimons las rutas
app.use("/api", routesUser);
app.use("/api", ActividadSocial);
app.use("/api", BeneficiarioSocial);
app.use("/api", Farmacia);
app.use("/api", Comunidad);
app.use("/api", CursoCreci);
app.use("/api", Retiro);
app.use("/api", Persona);
app.use("/api", Actividad);

//Iniciamos el servidor
app.listen(port, () => {
  console.log(`Server corriendo en: http://localhost:${port}`);
});
