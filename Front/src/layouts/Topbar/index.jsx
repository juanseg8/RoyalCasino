import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { faDiscord, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function TopBar() {
  const location = useLocation();
  const isRegistroPage = location.pathname === "/register";
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
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
          setBalance(response.data.saldo); // Set initial balance
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      };

      fetchUserData();
    }

    socket.on("balanceUpdate", (data) => {
      console.log("Nuevo saldo recibido del socket:", data); // Depura aquí
      setBalance(data.newBalance);
    });

    return () => {
      socket.off("balanceUpdate");
    };
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          phoneNumber,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const userResponse = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(userResponse.data);
      setBalance(userResponse.data.saldo); // Update balance
      window.location.reload();
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/minijuegos");
    window.location.reload();
  };

  return (
    <Navbar
      style={{ backgroundColor: "#0B0E23" }}
      className="navbar-dark"
      expand="lg"
    >
      <Link to="/afiliados" className="ms-3">
        Afiliados
      </Link>
      <a href="" className="ms-3">
        Contactanos
      </a>
      <FontAwesomeIcon icon={faDiscord} size="m" className="icon-hover ms-4" />
      <FontAwesomeIcon icon={faWhatsapp} size="m" className="icon-hover ms-3" />

      <div className="d-flex justify-content-end w-100">
        {userData ? (
          <div className="d-flex text-white mx-1 mt-2">
            {!isRegistroPage && (
              <Button
                size="sm"
                variant="danger"
                className="mx-1 btn-logout"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faPowerOff} className="me-2" />
              </Button>
            )}

            <div className="d-flex">
              <Button variant="secondary" className="btn-custom mx-1">
                <div className="d-flex text-white align-items-center h-100">
                  {balance} ARS
                </div>
              </Button>

              <Button variant="secondary" className="btn-custom mx-1">
                <div className="d-flex text-white align-items-center h-100">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {userData.userName}
                </div>
              </Button>
            </div>

            {!isRegistroPage && (
              <Link to="/depositos" className="nav-link">
                <Button
                  size="sm"
                  variant="primary"
                  className="mx-1 btn-custom animated-button"
                >
                  Depositar
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <Form inline className="d-flex" onSubmit={handleLogin}>
            <InputGroup className="mx-1">
              <Form.Control
                size="sm"
                placeholder="Teléfono"
                aria-label="Teléfono"
                aria-describedby="basic-addon1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mx-1">
              <Form.Control
                size="sm"
                type="password"
                placeholder="Contraseña"
                aria-label="Contraseña"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button
              size="sm"
              variant="primary"
              className="mx-1 btn-custom"
              type="submit"
            >
              Iniciar sesión
            </Button>
            {!isRegistroPage && (
              <Link to="/register">
                <Button size="sm" variant="warning" className="mx-1 btn-custom">
                  Registrarse
                </Button>
              </Link>
            )}
          </Form>
        )}
      </div>
    </Navbar>
  );
}

export default TopBar;
