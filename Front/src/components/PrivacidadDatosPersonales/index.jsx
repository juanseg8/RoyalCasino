import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 200px;
  padding-left: 20px;
  padding-right: 20px;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const PrivacyContent = () => {
  return (
    <Container>
      <Title className="mb-5">PRIVACIDAD Y GESTIÓN DE DATOS PERSONALES</Title>
      <Paragraph>
        Royal Casino se compromete a proteger la información personal de sus
        clientes registrados y garantiza que cumple con las normas de privacidad
        en los países en los que presta servicios.
      </Paragraph>
      <Paragraph>
        Su información personal no puede ser compartida ni publicada en Internet
        por ningún tercero, institución o entidad a menos que la empresa y sus
        socios estén bajo una obligación legal externa.
      </Paragraph>
      <Paragraph>
        Toda la información registrada en el sitio está alojada en servidores
        altamente seguros.
      </Paragraph>
      <Paragraph>
        Al convertirse en miembro de Royal Casino, permite que el sitio se
        comunique con usted sobre nuevos productos y servicios, promociones y
        actualizaciones técnicas.
      </Paragraph>
      <Paragraph>
        Cada usuario está obligado a demostrar la exactitud de la información
        que proporcionará al convertirse en miembro.
      </Paragraph>
      <Paragraph>
        Si lo considera necesario, Royal Casino se reserva el derecho de
        solicitar todo tipo de documentos a sus miembros.
      </Paragraph>
      <Paragraph>
        Royal Casino se reserva el derecho de compartir información del cliente
        con las agencias autorizadas sobre todos los asuntos relacionados con el
        uso de cuentas, como mala conducta, fraude y lavado de dinero.
      </Paragraph>
    </Container>
  );
};

export default PrivacyContent;
