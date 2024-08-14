import React, { useState } from "react";
import { playRockPaperScissors } from "../../api";
import styled, { keyframes } from "styled-components";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ConfigApuesta from "../ConfigApuesta";

const StyledContainer = styled(Container)`
  background-color: #1b1e27;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
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

  &:focus {
    background-color: transparent;
  }

  &:hover {
    background-color: transparent;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
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

const RockPaperScissors = ({ user, setGifSrc }) => {
  const [choice, setChoice] = useState("rock");
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
      const { data } = await playRockPaperScissors(token, gameData);

      // Determinar el GIF basado en el resultado y la elección del usuario
      let gifSrc = "";
      let soundSrc = "";

      if (choice === data.result) {
        // Empate
        gifSrc = `./${choice}Lose.gif`;
      } else if (
        (choice === "rock" && data.result === "scissors") ||
        (choice === "paper" && data.result === "rock") ||
        (choice === "scissors" && data.result === "paper")
      ) {
        // Ganar
        gifSrc = `./${data.result}Win.gif`;
        soundSrc = "./win.mp3";
      } else {
        // Perder
        gifSrc = `./${choice}Lose.gif`;
        soundSrc = "./lose.mp3";
      }

      // Llamar a setGifSrc con el GIF del resultado
      setGifSrc(gifSrc);

      // Reproducir sonido
      const audio = new Audio(soundSrc);
      audio.play();

      // Opcional: Limpiar el resultado después de un tiempo
      setTimeout(() => {
        setGifSrc("./AnimacionRPS.gif");
      }, 3000); // Pausa de 3 segundos antes de ocultar la imagen
    } catch (error) {
      console.error("Game failed", error);
    }
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <StyledButtonGroup>
          <Col>
            <ImageButton
              active={choice === "rock"}
              onClick={() => setChoice("rock")}
            >
              <img src={"./rock.png"} alt="rock" />
            </ImageButton>
          </Col>
          <Col>
            <ImageButton
              active={choice === "paper"}
              onClick={() => setChoice("paper")}
            >
              <img src={"./paper.png"} alt="paper" />
            </ImageButton>
          </Col>
          <Col>
            <ImageButton
              active={choice === "scissors"}
              onClick={() => setChoice("scissors")}
            >
              <img src={"./scissors.png"} alt="scissors" />
            </ImageButton>
          </Col>
        </StyledButtonGroup>
        <StyledBetContainer>
          <ConfigApuesta betAmount={betAmount} setBetAmount={setBetAmount} />
        </StyledBetContainer>
      </Form>
    </StyledContainer>
  );
};

export default RockPaperScissors;
