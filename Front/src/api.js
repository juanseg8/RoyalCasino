import axios from "axios";

const API_URL = "http://localhost:5000/api/games"; // Cambia esto si tu back-end está en otra URL

export const playHeadAndTail = (token, gameData) =>
  axios.post(`http://localhost:5000/api/games/headtail`, gameData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const playDiceRolling = (token, gameData) =>
  axios.post(`${API_URL}/dicerolling`, gameData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const playRockPaperScissors = (token, gameData) =>
  axios.post(`${API_URL}/rps`, gameData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateGameProbability = (token, probabilityData) =>
  axios.put(`${API_URL}/update_probability`, probabilityData, {
    headers: { Authorization: `Bearer ${token}` },
  });
