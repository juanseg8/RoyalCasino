const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['jugador', 'admin', 'cajero'],
    default: 'jugador'
  },
  referredBy: {
    type: String // Almacena el nombre de usuario que refirió a este usuario
  },
  saldo: {
    type: Number,
    default: function() {
      if (this.role === 'jugador') {
        return 100; // Saldo inicial para nuevos usuarios jugadores
      }
      return 0; // Sin saldo para otros roles
    }
  },
  saldoReferido: {
    type: Number,
  }
});

module.exports = mongoose.model('User', UserSchema);
