import React, { useState } from "react";
import AnimatedBackground from "../../components/FondoAnimado";
import styled from "styled-components";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./styles.css";

const MySwal = withReactContent(Swal);

// Estilos para el contenedor del acordeón
const AcordeonContainer = styled.div`
  position: relative; /* Asegura que el acordeón esté posicionado relativo a este contenedor */
  z-index: 1; /* Asegura que el acordeón esté por encima del fondo animado */
`;

function CargaFichas() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${phoneNumber}/balance/deposito`,
        {
          newBalance: newBalance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userResponse = await axios.get(
        `http://localhost:5000/api/users/${phoneNumber}`
      );

      const user = userResponse.data;

      MySwal.fire({
        icon: "success",
        title: "Éxito",
        html: `
        <p>Nombre de usuario: ${user.userName}</p>
        <p>Número de teléfono: ${user.phoneNumber}</p>
        <p>Saldo actual: ${user.saldo}</p>
      `,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <AnimatedBackground />
      <AcordeonContainer className="m-5">
        <div className="container form-carga">
          <h2 className="text-center text-white">Depositar saldo</h2>
          <Form onSubmit={handleSubmit} className="w-25">
            <Form.Group controlId="phoneNumber" className="mt-4">
              <Form.Label className="text-white">
                Número de teléfono:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newBalance" className="mt-4">
              <Form.Label className="text-white">Saldo a depositar:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el saldo a depositar"
                value={newBalance}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setNewBalance(value);
                  }
                }}
              />
            </Form.Group>
            <div className="container d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" className="mt-4">
                Depositar saldo
              </Button>
            </div>
          </Form>
        </div>
      </AcordeonContainer>
    </>
  );
}

export default CargaFichas;
