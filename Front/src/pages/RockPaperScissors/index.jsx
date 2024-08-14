import React, { useEffect, useState } from "react";
import AnimatedBackground from "../../components/FondoAnimado";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import MediaDisplay from "../../components/MediaDisplay";
import axios from "axios";
import RockPaperScissors from "../../components/RockPaperScissors";

const StyledContainer = styled(Container)`
  background-color: #1b1e27;
  color: #fff;
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

function PageRockPaperScissors() {
  const [userData, setUserData] = useState(null);
  const [gifSrc, setGifSrc] = useState("./AnimacionRPS.gif");
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
        <h3>Rock Paper Scissors</h3>
        <Row>
          <CenteredCol xs={12} md={6}>
            <MediaDisplay src={gifSrc} />
          </CenteredCol>
          <CenteredCol xs={12} md={6}>
            <RockPaperScissors user={userData} setGifSrc={setGifSrc} />
          </CenteredCol>
        </Row>
      </StyledContainer>
    </>
  );
}

export default PageRockPaperScissors;
