// components/HelpChat.js
import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import supportImage from "../../../public/logoSoporte.png";

const HelpChatWrapper = styled.div`
  position: absolute;
  bottom: 70px;
  right: 22px;
  width: ${(props) =>
    props.isOpen ? "300px" : "60px"}; /* Adjust width for open/closed state */
  height: ${(props) =>
    props.isOpen ? "400px" : "60px"}; /* Adjust height for open/closed state */
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: ${(props) =>
    props.isOpen ? "10px" : "50%"}; /* Rounded when closed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 2000; /* Ensure it stays on top */
  transition: all 0.3s ease;
  overflow: hidden;
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(100%)"};
`;

const HelpChatHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: ${(props) =>
    props.isOpen ? "10px" : "15px"}; /* Adjust padding based on state */
  border-radius: ${(props) =>
    props.isOpen ? "10px" : "50%"}; /* Rounded when closed */
  cursor: pointer;
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: #fff;
`;

const SupportImage = styled.img`
  width: 30px; /* Adjust as needed */
  height: auto;
  border-radius: 50%;
`;

const HelpChatBody = styled.div`
  padding: 10px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  flex-grow: 1;
`;

const Bubble = styled.div`
  background-color: ${(props) => (props.isQuestion ? "#d1e7dd" : "#f8d7da")};
  color: ${(props) => (props.isQuestion ? "#0f5132" : "#842029")};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  max-width: 80%;
  align-self: ${(props) => (props.isQuestion ? "flex-start" : "flex-end")};
  cursor: ${(props) => (props.isQuestion ? "pointer" : "default")};
`;

const HelpChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Define your questions and answers here
  const qas = [
    {
      text: "¿Cómo deposito fondos en mi cuenta?",
      answer:
        "Para depositar fondos, navegue hasta la sección Depósito del panel de su cuenta. Desde allí, puede seleccionar su método preferid y seguir las instrucciones proporcionadas para generar una dirección de depósito o escanear un código QR.",
      isQuestion: true,
    },
    {
      text: "¿Existe un límite máximo de retiro?",
      answer:
        "Sí, puede haber límites máximos de retiro según el estado de su cuenta y el método de retiro que elija. Estos límites existen para garantizar la seguridad de nuestra plataforma y pueden variar según varios factores. Consulte nuestros términos y condiciones o comuníquese con el servicio de atención al cliente para obtener más información.",
      isQuestion: true,
    },
    {
      text: "¿Cuál es el monto mínimo de depósito?",
      answer:
        "El monto mínimo de depósito varía según la criptomoneda que esté utilizando y las condiciones actuales del mercado. Puede encontrar el requisito de depósito mínimo en la sección de depósito del panel de su cuenta.",
      isQuestion: true,
    },
    {
      text: "¿Cómo puedo retirar mis ganancias?",
      answer:
        "Para retirar sus ganancias, navegue hasta la sección Retirar del panel de su cuenta. Desde allí, puede seleccionar su criptomoneda preferida e ingresar el monto del retiro. Las solicitudes de retiro generalmente se procesan instantáneamente.",
      isQuestion: true,
    },
    {
      text: "¿Cuánto tiempo tardan los depósitos en acreditarse en mi cuenta?",
      answer:
        "Los depósitos generalmente se acreditan en su cuenta segundos después de la cantidad requerida de confirmaciones en la red blockchain. Sin embargo, esto puede variar según la congestión de la red y la criptomoneda específica que esté utilizando.",
      isQuestion: true,
    },
    {
      text: "¿Hay alguna tarifa por depósitos o retiros?",
      answer:
        "Ninguna. Tenga en cuenta que algunos procesadores de pagos de terceros o redes blockchain pueden cobrar tarifas por las transacciones. Estas tarifas normalmente están fuera de nuestro control y están sujetas a cambios.",
      isQuestion: true,
    },
    {
      text: "¿Cómo puedo comunicarme con atención al cliente?",
      answer:
        "Puede ponerse en contacto con nuestro equipo de atención al cliente a través de nuestro Mail de contacto o redes sociales. Nuestros agentes de soporte están disponibles las 24 horas del día, los 7 días de la semana para ayudarlo con cualquier pregunta o inquietud que pueda tener.",
      isQuestion: true,
    },
    {
      text: "¿Cómo registrarse?",
      answer:
        "Para registrar una cuenta, simplemente haga clic en el botón Registrarse y complete la información requerida. Una vez que haya completado el formulario de registro y haya aceptado nuestros términos y condiciones, se creará su cuenta y podrá comenzar a jugar de inmediato. Este proceso no demora más de 30 segundos.",
      isQuestion: true,
    },
    {
      text: "Información del programa VIP",
      answer: "Pronto.",
      isQuestion: true,
    },
    // Agrega más preguntas y respuestas aquí
  ];

  const handleQuestionClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <HelpChatWrapper isOpen={isOpen}>
      <HelpChatHeader isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <>
            <SupportImage src={supportImage} alt="Support" />
            <CloseButton>
              <FaTimes />
            </CloseButton>
          </>
        ) : (
          <SupportImage src={supportImage} alt="Support" />
        )}
      </HelpChatHeader>
      <HelpChatBody isOpen={isOpen}>
        {qas.map((qa, index) => (
          <div key={index}>
            <Bubble isQuestion onClick={() => handleQuestionClick(index)}>
              {qa.text}
            </Bubble>
            {expandedIndex === index && (
              <Bubble isQuestion={false}>{qa.answer}</Bubble>
            )}
          </div>
        ))}
      </HelpChatBody>
    </HelpChatWrapper>
  );
};

export default HelpChat;
