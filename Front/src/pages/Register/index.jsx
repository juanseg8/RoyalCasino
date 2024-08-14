import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AnimatedBackground from "../../components/FondoAnimado";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralUserName, setReferralUserName] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleUserName = (event) => setUserName(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleReferralUserName = (event) =>
    setReferralUserName(event.target.value);
  const handleIsAdultChange = (event) => setIsAdult(event.target.checked);
  const handleAcceptTermsChange = (event) =>
    setAcceptTerms(event.target.checked);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAdult || !acceptTerms) {
      alert("Debes aceptar los términos y confirmar que eres mayor de edad.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        userName: userName,
        phoneNumber: phone,
        password,
        role: "jugador", // Puedes ajustar el rol según tu lógica
        referredBy: referralUserName,
      });
      console.log("Usuario registrado:", response.data);

      // Si el usuario se crea correctamente, procede a iniciar sesión
      const loginResponse = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          phoneNumber: phone,
          password,
        }
      );

      // Manejar la respuesta del backend y almacenar el token JWT en el almacenamiento local
      localStorage.setItem("token", loginResponse.data.token);

      // Redirigir al usuario a la página de minijuegos
      navigate("/minijuegos");

      // Manejar la respuesta del backend según sea necesario
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Manejar el error según sea necesario
    }

    // Restablece los campos después del envío del formulario
    setUserName("");
    setPhone("");
    setPassword("");
    setReferralUserName("");
    setIsAdult(false);
    setAcceptTerms(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("ref");
    if (referrer) {
      setReferralUserName(referrer); // Pre-fill the referral code
    }
  }, []);

  return (
    <>
      <AnimatedBackground />
      <div className="register-page m-5">
        <div>
          <h2 className="text-center">Registro</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName" className="mt-4">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                value={userName}
                onChange={handleUserName}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-4">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formReferralPhone" className="mt-4">
              <Form.Label>Codigo de referido</Form.Label>
              <Form.Control
                type="text"
                placeholder={referralUserName || "Codigo de referido"}
                value={referralUserName}
                onChange={handleReferralUserName}
                readOnly={!!referralUserName}
              />
            </Form.Group>

            <Form.Group controlId="formIsAdult" className="mt-4">
              <Form.Check
                type="checkbox"
                label="Confirmo que soy mayor de edad"
                checked={isAdult}
                onChange={handleIsAdultChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAcceptTerms" className="mt-4">
              <Form.Check
                type="checkbox"
                label="Acepto los términos y condiciones"
                checked={acceptTerms}
                onChange={handleAcceptTermsChange}
                required
              />
            </Form.Group>

            <div className="container d-flex justify-content-center align-items-center mt-4">
              <Button variant="warning" type="submit">
                Registrarse
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
