import React from "react";
import styled from "styled-components";

// Importa la imagen desde la carpeta public
import BACK from "../../../public/BACK.png";

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(${BACK}) no-repeat center center;
  background-size: cover; /* Asegura que la imagen cubra todo el fondo */
  z-index: -1;
`;

const AnimatedBackground = () => {
  return <Background />;
};

export default AnimatedBackground;
