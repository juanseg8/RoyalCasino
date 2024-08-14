import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function MyNavbar() {
  const [userData, setUserData] = useState(null);
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
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [token]);

  // Función para forzar la actualización de la barra de navegación
  const forceUpdateNavbar = () => {
    setUserData(null); // Esto disparará el efecto useEffect nuevamente
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#0B0E23" }}
        className="navbar-dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src="./logo.png" alt="logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/minijuegos" className="nav-link">
                Minijuegos
              </Link>
              {userData && userData.role === "cajero" && (
                <>
                  <Link to="/cargafichas" className="nav-link">
                    Depositar saldo
                  </Link>
                  <Link to="/retirarsaldo" className="nav-link">
                    Retirar saldo
                  </Link>
                </>
              )}
              {userData && userData.role === "admin" && (
                <Link to="/administrador" className="nav-link">
                  Panel de administración
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default MyNavbar;
