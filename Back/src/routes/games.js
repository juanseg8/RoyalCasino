const express = require("express");
const {
  headAndTail,
  diceRolling,
  rockPaperScissors,
  updateGameProbability,
} = require("../controllers/games");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const gamesRouter = express.Router();

// Rutas para jugar
gamesRouter.post("/headtail", authMiddleware, headAndTail);
gamesRouter.post("/dicerolling", authMiddleware, diceRolling);
gamesRouter.post("/rps", authMiddleware, rockPaperScissors);

// Ruta para actualizar la probabilidad de ganar (solo administradores)
gamesRouter.put(
  "/update_probability",
  authMiddleware,
  adminMiddleware,
  updateGameProbability
);

module.exports = gamesRouter;
