import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)`
  position: relative;
  margin: 1rem;
  overflow: hidden;
  transition: transform 0.3s;
  background: transparent;
  border-radius: 40px;
  width: 200px;
  height: 300px;
  transform: ${({ tiltX, tiltY }) =>
    `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`};
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: scale(1.05);
  }

  .card-img-top {
    transition: opacity 0.3s;
  }

  &:hover .card-img-top {
    opacity: 0.8;
  }
`;

const CardImg = styled(Card.Img)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que la imagen cubra el área del contenedor */
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;

  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const CartaJuego = ({ title, imgSrc, link }) => {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    setTiltX((offsetY / rect.height) * -10); // Ajusta el valor máximo según sea necesario
    setTiltY((offsetX / rect.width) * 10); // Ajusta el valor máximo según sea necesario
  };

  return (
    <Link to={link}>
      <StyledCard
        ref={cardRef}
        tiltX={tiltX}
        tiltY={tiltY}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setTiltX(0);
          setTiltY(0);
        }}
      >
        <CardImg variant="top" src={imgSrc} alt={title} />
        <PlayOverlay>
          <Button variant="primary">JUEGA</Button>
        </PlayOverlay>
      </StyledCard>
    </Link>
  );
};

export default CartaJuego;
