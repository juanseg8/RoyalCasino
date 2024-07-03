import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const randomMovement = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: translate(${() => Math.random() * 50 - 25}px, ${() => Math.random() * 50 - 25}px);
  }
  75% {
    transform: translate(${() => Math.random() * 100 - 50}px, ${() => Math.random() * 100 - 50}px);
  }
  100% {
    transform: translate(${() => Math.random() * 150 - 75}px, ${() => Math.random() * 150 - 75}px);
    opacity: 0;
  }
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
`;

const Square = styled.div`
  position: absolute;
  width: ${(props) => props.size || '10px'};
  height: ${(props) => props.size || '10px'};
  background: ${(props) => props.color || '#fff'};
  top: ${(props) => props.top || '0%'};
  left: ${(props) => props.left || '0%'};
  animation: ${randomMovement} ${(props) => props.duration || '10s'} linear infinite;
`;

const generateSquares = () => {
  const squares = [];
  for (let i = 0; i < 50; i++) {
    const size = Math.random() * 20 + 10 + 'px';
    const top = Math.random() * 100 + '%';
    const left = Math.random() * 100 + '%';
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const duration = Math.random() * 10 + 5 + 's';
    squares.push(<Square key={i} top={top} left={left} color={color} size={size} duration={duration} />);
  }
  return squares;
};

const AnimatedBackground = () => {
  const squares = useMemo(generateSquares, []);
  return <Background>{squares}</Background>;
};

export default AnimatedBackground;
