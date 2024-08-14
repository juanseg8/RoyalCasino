import React, { useState } from "react";
import { playDiceRolling } from "../../api";
import styled, { keyframes } from "styled-components";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import ConfigApuesta from "../../components/ConfigApuesta";

const StyledContainer = styled(Container)`
  background-color: #1b1e27; /* Fondo oscuro */
  color: #fff; /* Texto blanco */
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center; /* Centra el texto */
`;

const StyledButtonGroup = styled(Row)`
  margin: 20px 0;
  justify-content: center;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const ImageButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
  outline: none; /* Elimina el borde azul al enfocarse */

  &:hover {
    background-color: transparent;
  }

  &:focus {
    background-color: transparent;
  }

  img {
    width: 150px; /* Ajusta el tamaño según sea necesario */
    height: 150px; /* Ajusta el tamaño según sea necesario */
    border-radius: 100%;
    transition: border 0.3s ease;
    animation: ${(props) => (props.active ? shakeAnimation : "none")} 0.5s
      infinite;
  }
`;

const StyledBetContainer = styled(Row)`
  margin: 20px 0;
  justify-content: center;
  align-items: center;
`;

const DiceRolling = ({ user, setGifSrc }) => {
  const [choice, setChoice] = useState("1"); // Default choice for dice
  const [betAmount, setBetAmount] = useState(20);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const gameData = {
        phoneNumber: user.phoneNumber,
        choice,
        amount: betAmount,
      };
      const { data } = await playDiceRolling(token, gameData);
      const { result, win } = data;

      let gifSrc = "";
      let soundSrc = "";

      if (win) {
        gifSrc = `./dice${choice}Win.gif`;
        soundSrc = "./win.mp3";
      } else {
        gifSrc = `./dice${result}Lose.gif`;
        soundSrc = "./lose.mp3";
      }

      setGifSrc(gifSrc);

      // Reproducir el sonido correspondiente
      const audio = new Audio(soundSrc);
      audio.play();

      setTimeout(() => {
        setGifSrc("./AnimacionDiceRolling.gif");
      }, 3000); // Cambia esto al tiempo de duración de tu GIF
    } catch (error) {
      console.error("Game failed", error);
    }
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <StyledButtonGroup>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <Col key={number}>
              <ImageButton
                active={choice === number.toString()}
                onClick={() => setChoice(number.toString())}
              >
                <img src={`./dice${number}.png`} alt={`Dice ${number}`} />
              </ImageButton>
            </Col>
          ))}
        </StyledButtonGroup>
        <StyledBetContainer>
          <ConfigApuesta betAmount={betAmount} setBetAmount={setBetAmount} />
        </StyledBetContainer>
      </Form>
    </StyledContainer>
  );
};

export default DiceRolling;
