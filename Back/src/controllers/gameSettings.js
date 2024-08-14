const GameSettings = require("../models/GameSettings");

// Obtener configuraciones de todos los juegos
const getAllGameSettings = async (req, res) => {
  try {
    const settings = await GameSettings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar la configuración de un juego (solo para admin)
const updateGameSettings = async (req, res) => {
  const { gameName, winProbability } = req.body;

  try {
    // Verificar si el usuario que realiza la solicitud es un admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    // Actualizar la configuración del juego
    const settings = await GameSettings.findOneAndUpdate(
      { gameName },
      { winProbability },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGameSettings,
  updateGameSettings,
};
