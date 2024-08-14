import React, { useState } from "react";
import { playHeadAndTail } from "../../api";
import styled, { keyframes } from "styled-components";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import ConfigApuesta from "../../components/ConfigApuesta";
import MediaDisplay from "../../components/MediaDisplay";

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
    width: 200px; /* Ajusta el tamaño según sea necesario */
    height: 200px; /* Ajusta el tamaño según sea necesario */
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

const HeadAndTail = ({ user, setGifSrc }) => {
  const [choice, setChoice] = useState("head");
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
      const { data } = await playHeadAndTail(token, gameData);
      const { result, win } = data;

      let gifSrc = "";
      let soundSrc = "";

      if (win && result === "head") {
        gifSrc = "./HeadWin.gif";
        soundSrc = "./win.mp3";
      } else if (win && result === "tail") {
        gifSrc = "./TailWin.gif";
        soundSrc = "./win.mp3";
      } else if (!win && result === "head") {
        gifSrc = "./HeadLose.gif";
        soundSrc = "./lose.mp3";
      } else {
        gifSrc = "./TailLose.gif";
        soundSrc = "./lose.mp3";
      }

      setGifSrc(gifSrc);

      // Reproducir el sonido correspondiente
      const audio = new Audio(soundSrc);
      audio.play();

      setTimeout(() => {
        setGifSrc("./AnimacionHeadTail.gif");
      }, 3000); // Cambia esto al tiempo de duración de tu GIF

      // alert(`Result: ${data.result} ${data.win}`);
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
              active={choice === "head"}
              onClick={() => setChoice("head")}
            >
              <img src={"./head.png"} alt="Head" />
            </ImageButton>
          </Col>
          <Col>
            <ImageButton
              active={choice === "tail"}
              onClick={() => setChoice("tail")}
            >
              <img src={"./tails.png"} alt="Tail" />
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

export default HeadAndTail;
