import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { updateGameProbability } from "../../api";

const PanelAdmin = ({ user }) => {
  const [gameName, setGameName] = useState("HeadAndTail");
  const [winProbability, setWinProbability] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const probabilityData = {
        gameName,
        winProbability: parseFloat(winProbability),
      };
      await updateGameProbability(token, probabilityData);
      alert("Probabilidad actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  return (
    <Card
      className="my-4 bg-dark text-light"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <Card.Body>
        <h2 className="text-center mb-4">Actualizar Probabilidad del Juego</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGameName">
            <Form.Label>Nombre del Juego</Form.Label>
            <Form.Control
              as="select"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            >
              <option value="HeadAndTail">Cara o Cruz</option>
              <option value="DiceRolling">Lanzamiento de Dados</option>
              <option value="RPS">Piedra Papel o Tijera</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formWinProbability" className="mt-3">
            <Form.Label>Probabilidad de Ganar</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              placeholder="Ingrese la probabilidad"
              value={winProbability}
              onChange={(e) => setWinProbability(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit">
              Actualizar Probabilidad
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PanelAdmin;
