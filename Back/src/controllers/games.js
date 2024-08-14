const User = require("../models/User");
const GameSettings = require("../models/GameSettings");
const { io } = require("../app");

const headAndTail = async (req, res) => {
  const { phoneNumber, amount, choice } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.saldo < amount) {
      return res
        .status(400)
        .json({ message: "Saldo insuficiente para realizar la apuesta" });
    }

    // Obtener la probabilidad desde la base de datos
    const settings = await GameSettings.findOne({ gameName: "HeadAndTail" });
    if (!settings) {
      return res
        .status(500)
        .json({ message: "Configuración del juego no encontrada" });
    }

    // Lógica del juego usando la probabilidad
    // Probabilidad de ganar en la opción elegida
    const isWinning = Math.random() < settings.winProbability;

    // Determina el resultado basado en la opción elegida y la probabilidad de ganar
    const result = isWinning ? choice : choice === "head" ? "tail" : "head";

    const win = result === choice;

    // Actualiza el saldo
    user.saldo += win ? amount : -amount;
    await user.save();

    // Emite el saldo actualizado
    io.emit("balanceUpdate", { phoneNumber, newBalance: user.saldo });

    res.json({
      result,
      win,
      newBalance: user.saldo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para generar un número aleatorio con incrementos fraccionarios
const getRandomFraction = (increment) => {
  // Calcula el número máximo posible para el incremento
  const max = 1 / increment;

  // Genera un número aleatorio y lo redondea al incremento más cercano
  return Math.round(Math.random() * max) * increment;
};

const diceRolling = async (req, res) => {
  const { phoneNumber, amount, choice } = req.body; // choice debe ser un número del 1 al 6

  try {
    // Validar la opción del dado
    if (choice < 1 || choice > 6) {
      return res.status(400).json({ message: "Opción de dado inválida" });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.saldo < amount) {
      return res
        .status(400)
        .json({ message: "Saldo insuficiente para realizar la apuesta" });
    }

    // Obtener la probabilidad desde la base de datos
    const settings = await GameSettings.findOne({ gameName: "DiceRolling" });
    if (!settings) {
      return res
        .status(500)
        .json({ message: "Configuración del juego no encontrada" });
    }

    // Supongamos que settings.winProbability es una probabilidad general en formato fraccionario
    const winProbability = settings.winProbability; // Por ejemplo, 0.5 para 50%

    // Lógica del juego usando la probabilidad
    // Calcula el resultado basado en la probabilidad
    const randomFraction = getRandomFraction(0.1); // Ajusta el incremento según tus necesidades

    let result;
    if (randomFraction < winProbability) {
      result = choice; // El usuario gana si el número es el elegido
    } else {
      // Selecciona un número aleatorio diferente al elegido
      do {
        result = Math.floor(Math.random() * 6) + 1;
      } while (result === choice);
    }

    const win = result === choice;

    // Actualiza el saldo
    user.saldo += win ? amount * 6 : -amount;
    await user.save();

    // Emite el saldo actualizado
    io.emit("balanceUpdate", { phoneNumber, newBalance: user.saldo });

    res.json({
      result,
      win,
      newBalance: user.saldo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rockPaperScissors = async (req, res) => {
  const { phoneNumber, amount, choice } = req.body; // choice debe ser 'rock', 'paper' o 'scissors'

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.saldo < amount) {
      return res
        .status(400)
        .json({ message: "Saldo insuficiente para realizar la apuesta" });
    }

    // Obtener la probabilidad desde la base de datos
    const settings = await GameSettings.findOne({
      gameName: "RPS",
    });
    if (!settings) {
      return res
        .status(500)
        .json({ message: "Configuración del juego no encontrada" });
    }

    const winProbability = settings.winProbability; // Por ejemplo, 0.5 para 50%

    const randomFraction = getRandomFraction(0.1); // Ajusta el incremento según tus necesidades

    // Lógica del juego usando la probabilidad
    let result;
    if (randomFraction < winProbability) {
      result = choice; // El usuario tiene una probabilidad de ganar si el resultado es su elección
    } else {
      // Seleccionar una opción aleatoria que no sea la elección del usuario
      const options = ["rock", "paper", "scissors"];
      result = options[Math.floor(Math.random() * options.length)];
      // Asegurarse de que el resultado no sea la elección del usuario para evitar que gane por probabilidad
      while (result === choice) {
        result = options[Math.floor(Math.random() * options.length)];
      }
    }

    // Determinar el resultado del juego
    let win = null; // Inicializa como null para empates
    if (choice === result) {
      win = null; // Empate
    } else if (
      (choice === "rock" && result === "scissors") ||
      (choice === "scissors" && result === "paper") ||
      (choice === "paper" && result === "rock")
    ) {
      win = true; // Ganó
    } else {
      win = false; // Perdió
    }

    // Actualiza el saldo solo si no es empate
    if (win !== null) {
      user.saldo += win ? amount : -amount;
      await user.save();
    }

    // Emite el saldo actualizado
    io.emit("balanceUpdate", { phoneNumber, newBalance: user.saldo });

    res.json({
      result,
      win,
      newBalance: user.saldo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGameProbability = async (req, res) => {
  const { gameName, winProbability } = req.body;

  try {
    // Encuentra el registro existente
    const settings = await GameSettings.findOne({ gameName });

    if (!settings) {
      // Si no existe, responde con un error
      return res
        .status(404)
        .json({ message: "Configuración del juego no encontrada" });
    }

    // Actualiza la probabilidad de ganancia
    settings.winProbability = winProbability;

    // Guarda los cambios
    await settings.save();
    res.json({ message: "Probabilidad actualizada correctamente", settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  headAndTail,
  diceRolling,
  rockPaperScissors,
  updateGameProbability,
};
