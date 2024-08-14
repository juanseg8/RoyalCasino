// Importa el modelo de usuario

const bcrypt = require("bcrypt");
const User = require("../models/User");

// Traer todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Traer un usuario por su número de teléfono
const getUserByPhoneNumber = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByToken = async (req, res) => {
  const userId = req.user._id; // Obtener el ID de usuario del middleware de autenticación
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario por su número de teléfono
const deleteUserByPhoneNumber = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const deletedUser = await User.findOneAndDelete({ phoneNumber });
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar el saldo de un usuario (solo para usuarios cajeros)
const depositBalance = async (req, res) => {
  const cajero = req.user; // Se supone que el middleware de autenticación almacena al usuario actual en req.user
  const jugadorPhoneNumber = req.params.phoneNumber;
  const { newBalance } = req.body;

  try {
    // Verificar si el usuario que realiza la solicitud es un cajero
    if (cajero.role !== "cajero") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    // Convertir newBalance a número y verificar que sea positivo
    const newBalanceNumber = parseFloat(newBalance);
    if (isNaN(newBalanceNumber) || newBalanceNumber <= 0) {
      return res
        .status(400)
        .json({ message: "El saldo debe ser un número positivo" });
    }

    // Buscar al usuario jugador por su número de teléfono
    const user = await User.findOne({ phoneNumber: jugadorPhoneNumber });

    if (!user) {
      return res.status(404).json({ message: "Usuario jugador no encontrado" });
    }

    // Modificar el saldo del usuario jugador
    user.saldo = user.saldo + newBalanceNumber;
    await user.save();

    // Verificar si el usuario fue referido por alguien
    if (user.referredBy) {
      // Buscar al usuario referidor por su nombre de usuario
      const referrer = await User.findOne({ userName: user.referredBy });

      if (referrer) {
        // Actualizar el saldo referido del referidor con el 10% del nuevo saldo depositado
        referrer.saldoReferido =
          (referrer.saldoReferido || 0) + newBalanceNumber * 0.1;
        await referrer.save();
      }
    }

    res.json({ message: "Saldo del usuario modificado exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const retiroBalance = async (req, res) => {
  const cajero = req.user; // Se supone que el middleware de autenticación almacena al usuario actual en req.user
  const jugadorPhoneNumber = req.params.phoneNumber;
  const { newBalance } = req.body;

  try {
    // Verificar si el usuario que realiza la solicitud es un cajero
    if (cajero.role !== "cajero") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    // Convertir newBalance a número y verificar que sea positivo
    const newBalanceNumber = parseFloat(newBalance);
    if (isNaN(newBalanceNumber) || newBalanceNumber <= 0) {
      return res
        .status(400)
        .json({ message: "El saldo debe ser un número positivo" });
    }

    // Buscar al usuario jugador por su número de teléfono
    const user = await User.findOne({ phoneNumber: jugadorPhoneNumber });

    if (!user) {
      return res.status(404).json({ message: "Usuario jugador no encontrado" });
    }

    // Modificar el saldo del usuario jugador
    user.saldo = user.saldo - newBalanceNumber;
    await user.save();

    // Verificar si el usuario fue referido por alguien
    if (user.referredBy) {
      // Buscar al usuario referidor por su nombre de usuario
      const referrer = await User.findOne({ userName: user.referredBy });

      if (referrer) {
        // Actualizar el saldo referido del referidor con el 10% del nuevo saldo depositado
        referrer.saldoReferido =
          (referrer.saldoReferido || 0) + newBalanceNumber * 0.1;
        await referrer.save();
      }
    }

    res.json({ message: "Saldo del usuario modificado exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReferralsByUser = async (req, res) => {
  // Asegúrate de extraer el nombre de usuario del objeto recibido en el cuerpo de la solicitud
  const { referrerUserName } = req.body;

  try {
    // Buscar todos los usuarios cuyo campo 'referredBy' coincida con el nombre de usuario del referente
    const referrals = await User.find({ referredBy: referrerUserName });
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo usuario con la opción de referido
const createUserWithReferral = async (req, res) => {
  const { userName, phoneNumber, password, role, referredBy } = req.body;
  try {
    // Verificar si el usuario referente existe
    let referrer;
    if (referredBy) {
      referrer = await User.findOne({ userName: referredBy });
      if (!referrer) {
        return res
          .status(404)
          .json({ message: "El usuario referente no existe" });
      }
    }

    // Crear el nuevo usuario
    const saltRounds = 10; // Número de rondas de sal para generar el hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      userName,
      phoneNumber,
      password: hashedPassword,
      role,
      referredBy,
    });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const transferSaldoReferido = async (req, res) => {
  const cajero = req.user; // Se supone que el middleware de autenticación almacena al usuario actual en req.user
  const { phoneNumber } = req.params;

  try {
    // Verificar si el usuario que realiza la solicitud es un cajero
    if (cajero.role !== "cajero") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    // Buscar al usuario por su número de teléfono
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Transfiere el saldoReferido al saldo y resetea saldoReferido a 0
    user.saldo += user.saldoReferido;
    user.saldoReferido = 0;

    // Guarda los cambios
    await user.save();

    res.json({
      message: "Saldo transferido exitosamente",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByPhoneNumber,
  deleteUserByPhoneNumber,
  depositBalance,
  retiroBalance,
  getReferralsByUser,
  createUserWithReferral,
  getUserByToken,
  transferSaldoReferido,
};
