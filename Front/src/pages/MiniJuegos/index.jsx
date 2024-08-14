import React from "react";
import styled from "styled-components";
import AnimatedBackground from "../../components/FondoAnimado";
import CartaJuego from "../../components/CartaJuego";
import ConfigApuesta from "../../components/ConfigApuesta";

// Definición del contenedor de cartas
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra las cartas horizontalmente */
  align-items: center;
  gap: 1rem; /* Espacio entre las cartas */
  margin-top: 2rem; /* Espacio superior para separar del fondo animado */
  height: 70vh;
`;

const games = [
  {
    imgSrc: "./headTail.png",
    link: "/headandtail",
  },
  {
    imgSrc: "./dice.png",
    link: "/dicerolling",
  },
  {
    imgSrc: "./RPS.jpg",
    link: "/rockpaperscissors",
  },
];

export default function MiniJuegos() {
  return (
    <div>
      <AnimatedBackground />
      <CardContainer>
        {games.map((game, index) => (
          <CartaJuego key={index} imgSrc={game.imgSrc} link={game.link} />
        ))}
      </CardContainer>
      {/* <ConfigApuesta /> */}
    </div>
  );
}
