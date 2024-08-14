import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./styles.css";

function AcordeonRetiros() {
  return (
    <Accordion
      defaultActiveKey={["0"]}
      className=" acordeon-retiros m-4"
      data-bs-theme="dark"
    >
      <Accordion.Item eventKey="1">
        <Accordion.Header className="d-flex">
          <div className="flex-fill p-2 w-25 d-flex justify-content-center align-items-center">
            <img
              className="mercado-pago"
              src="https://static.inpcdn.com/66,11d87e8f121b1a.webp"
              alt=""
            />
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Transferencia Bancaria</p>
            <p>Retiro con transferencia bancaria</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Tarifa de la transacción</p>
            <p>0%</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Límite</p>
            <p>Min : 15.000 ARS Max : 1.000.000 ARS</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <p>Para hacer el retiro, enviamos:</p>
          <ul>
            <li>Nombre completo</li>
            <li>DNI</li>
            <li>Monto a retirar</li>
            <li>CBU</li>
          </ul>
          <p>
            Tomaremos el numero desde el cual nos estas contactando como el
            numero con el que te gas registrado en nuestro casino.
          </p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header className="d-flex">
          <div className="flex-fill p-2 w-25 d-flex justify-content-center align-items-center">
            <img
              className="usdt"
              src="https://static.inpcdn.com/44,0d393269d727c2.webp"
              alt=""
            />
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">USDT</p>
            <p>Retiro con USDT</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Tarifa de la transacción</p>
            <p>0%</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Límite</p>
            <p>Min : 5 USDT Max : 1500 USDT</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <p>Para hacer el retiro, enviamos:</p>
          <ul>
            <li>Nombre completo</li>
            <li>DNI</li>
            <li>Monto a retirar</li>
            <li>Direccion de tu billetera de USDT</li>
          </ul>
          <p>
            Tomaremos el numero desde el cual nos estas contactando como el
            numero con el que te gas registrado en nuestro casino.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AcordeonRetiros;
