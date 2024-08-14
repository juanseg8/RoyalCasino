import React from "react";
import styled from "styled-components";
import { Facebook, Twitter, Instagram, Email } from "@mui/icons-material";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";

// Estilo del contenedor de los botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;
`;

// Estilo para los botones
const IconButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  background-color: #eee;
  border-radius: 50%;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  svg {
    font-size: 30px;
  }
`;

const SocialMediaButtons = () => {
  return (
    <ButtonContainer>
      <IconButton href="mailto:example@example.com" aria-label="Email">
        <Email />
      </IconButton>
      <IconButton
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </IconButton>
      <IconButton
        href="https://discord.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
      >
        <FaDiscord />
      </IconButton>
    </ButtonContainer>
  );
};

export default SocialMediaButtons;
