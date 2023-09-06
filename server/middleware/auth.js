const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const validPayload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(validPayload);
    // Llamar a next solo si el token es válido
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido, no estás autorizado" });
  }
};

module.exports = authenticateToken;
