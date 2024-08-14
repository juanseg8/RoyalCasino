const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    // Buscar al usuario por su número de teléfono
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign({ _id: user._id }, "tu_secreto_jwt");

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "No se proporcionó el encabezado de autorización" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "tu_secreto_jwt");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Autenticación inválida" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { login, authMiddleware, adminMiddleware };
