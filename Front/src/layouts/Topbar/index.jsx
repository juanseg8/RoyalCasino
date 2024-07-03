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

function TopBar() {
  const location = useLocation();
  const isRegistroPage = location.pathname === "/register";

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log(phoneNumber, password);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          phoneNumber,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUserData(
        await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      window.location.reload();
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Cambia "token" por el nombre del item que usas
    navigate("/minijuegos");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <a href="" className="ms-3">
        Afiliados
      </a>
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
                  {userData.saldo} ARS
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
