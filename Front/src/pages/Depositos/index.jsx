import React from "react";
import AnimatedBackground from "../../components/FondoAnimado";
import styled from "styled-components";
import AcordeonDepositos from "../../components/AcordeonDepositos";
import Sidebar from "../../components/MenuLateral";

// Estilos para el contenedor del acordeón
const AcordeonContainer = styled.div`
  position: relative; /* Asegura que el acordeón esté posicionado relativo a este contenedor */
  z-index: 1; /* Asegura que el acordeón esté por encima del fondo animado */
`;

function Depositos() {
  return (
    <>
      <AnimatedBackground />
      <AcordeonContainer className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <AcordeonDepositos />
        </div>
      </AcordeonContainer>
    </>
  );
}

export default Depositos;
