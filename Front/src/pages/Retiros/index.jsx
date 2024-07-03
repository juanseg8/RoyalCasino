import React from "react";
import AnimatedBackground from "../../components/FondoAnimado";
import AcordeonRetiros from "../../components/AcordeonRetiros";
import styled from "styled-components";
import Sidebar from "../../components/MenuLateral";

// Estilos para el contenedor del acordeón
const AcordeonContainer = styled.div`
  position: relative; /* Asegura que el acordeón esté posicionado relativo a este contenedor */
  z-index: 1; /* Asegura que el acordeón esté por encima del fondo animado */
`;

function Retiros() {
  return (
    <>
      <AnimatedBackground />
      <AcordeonContainer className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <AcordeonRetiros />
        </div>
      </AcordeonContainer>
    </>
  );
}

export default Retiros;
