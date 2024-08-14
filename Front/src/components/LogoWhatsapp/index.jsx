import React from "react";
import "./styles.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-icon"
    >
      <img src="/logoWS.png" alt="Logo de WhatsApp" />
    </a>
  );
};

export default WhatsAppButton;
