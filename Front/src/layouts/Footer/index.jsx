import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faWhatsapp,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./styles.css";

function Footer() {
  return (
    <footer className="text-white p-4">
      <Container>
        <Row>
          <Col md="3" className="mb-3">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://discord.com" className="text-white">
                  <FontAwesomeIcon
                    icon={faDiscord}
                    size="lg"
                    className="icon-hover mx-2"
                  />
                  Discord
                </a>
              </li>
              <li>
                <a href="https://wa.me/" className="text-white">
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    size="lg"
                    className="icon-hover mx-2"
                  />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://facebook.com" className="text-white">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="lg"
                    className="icon-hover mx-2"
                  />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-white">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="lg"
                    className="icon-hover mx-2"
                  />
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-white">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="lg"
                    className="icon-hover mx-2"
                  />
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
          <Col md="3" className="mb-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Teléfono: +123 456 7890</li>
              <li>Dirección: Calle Falsa 123, Ciudad, País</li>
            </ul>
          </Col>
          <Col md="3" className="mb-3">
            <h5>Enlaces Útiles</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-white">
                  Acerca de Nosotros
                </a>
              </li>
              <li>
                <a href="/services" className="text-white">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/privacidaddatospersonales" className="text-white">
                  Privacidad y gestion de datos personales
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </Col>
          <Col md="3" className="text-right">
            <select className="form-select form-select-sm me-2">
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
            <select className="form-select form-select-sm mt-5">
              <option value="ars">ARS</option>
              <option value="usd">USD</option>
            </select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
              reservados.
            </p>
          </Col>
        </Row>
      </Container>
      <div className="d-flex w-100 justify-content-center align-items-center mt-5 mb-5">
        <img
          className="logo-mercado-pago"
          src="https://spurgeon.ar/wp-content/uploads/2023/01/version-horizontal-large-logo-mercado-pago-1024x267.webp"
          alt=""
        />
        <img
          className="logo-usdt mx-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tether_Logo.svg/2560px-Tether_Logo.svg.png"
          alt=""
        />
        <img
          className="logo-astropay"
          src="https://seeklogo.com/images/A/astropay-direct-logo-F6A070DDF1-seeklogo.com.png"
          alt=""
        />
      </div>
    </footer>
  );
}

export default Footer;
