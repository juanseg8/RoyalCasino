const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByPhoneNumber,
  getReferralsByUser,
  deleteUserByPhoneNumber,
  depositBalance,
  retiroBalance,
  createUserWithReferral,
  getUserByToken,
  transferSaldoReferido,
} = require("../controllers/user.js");
const { login, authMiddleware } = require("../middleware/auth.js");
const User = require("../models/User.js");

// Rutas para usuarios
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:phoneNumber", getUserByPhoneNumber);
userRouter.get("/user", authMiddleware, getUserByToken);
userRouter.post("/users", createUserWithReferral);
userRouter.delete("/users/:phoneNumber", deleteUserByPhoneNumber);
userRouter.post(
  "/users/:phoneNumber/balance/deposito",
  authMiddleware,
  depositBalance
);
userRouter.post(
  "/users/:phoneNumber/balance/retiro",
  authMiddleware,
  retiroBalance
);

// Ruta para obtener todas las personas referidas por un usuario
userRouter.post("/users/referrals", getReferralsByUser);

// Iniciar Sesion
userRouter.post("/users/login", login);

//Mostrar link de referido
const generateReferralLink = (userName) => {
  return `http://localhost:5173/register?ref=${userName}`;
};

// Ruta para transferir saldoReferido a saldo
userRouter.put(
  "/users/:phoneNumber/transferSaldoReferido",
  authMiddleware,
  transferSaldoReferido
);

// Ruta para obtener el enlace de referencia de un usuario
userRouter.get("/users/:userName/referral-link", async (req, res) => {
  const { userName } = req.params;

  try {
    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ userName });

    // Si el usuario no existe, devuelve un error
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Genera el enlace de referencia si el usuario existe
    const referralLink = generateReferralLink(userName);
    res.json({ referralLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
