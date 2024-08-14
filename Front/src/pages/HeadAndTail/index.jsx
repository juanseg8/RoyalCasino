import React, { useEffect, useState } from "react";
import HeadAndTail from "../../components/HeadAndTail";
import AnimatedBackground from "../../components/FondoAnimado";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import MediaDisplay from "../../components/MediaDisplay";
import axios from "axios";

const StyledContainer = styled(Container)`
  background-color: #1b1e27; /* Fondo oscuro */
  color: #fff; /* Texto blanco */
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PageHeadAndTail() {
  const [userData, setUserData] = useState(null);
  const [gifSrc, setGifSrc] = useState("./AnimacionHeadTail.gif");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("No se encontró el token en el almacenamiento local");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/user",
          config
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      <AnimatedBackground />
      <StyledContainer>
        <h3>Head and Tail</h3>
        <Row>
          <Col xs={12} md={6}>
            <MediaDisplay src={gifSrc} />
          </Col>
          <CenteredCol xs={12} md={6}>
            <HeadAndTail user={userData} setGifSrc={setGifSrc} />
          </CenteredCol>
        </Row>
      </StyledContainer>
    </>
  );
}

export default PageHeadAndTail;
