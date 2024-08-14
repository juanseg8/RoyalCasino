import Accordion from "react-bootstrap/Accordion";
import QRCode from "qrcode.react";
import "./styles.css";

function AcordeonDepositos() {
  // Función para copiar texto al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texto copiado al portapapeles:", text);
        alert("¡Dirección copiada al portapapeles!");
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles:", error);
        alert("Error al copiar al portapapeles. Por favor, copia manualmente.");
      });
  };

  const direccionBilletera = "0xf6f90e501ec968f9bc64878998adde374eccd5b7";

  return (
    <Accordion
      defaultActiveKey={["0"]}
      // alwaysOpen
      className="acordeon-depositos m-4"
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
            <p>Depósito con transferencia</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Tarifa de la transacción</p>
            <p>0%</p>
          </div>
          <div className="flex-fill p-2 w-25">
            <p className="text-muted">Límite</p>
            <p>Min : 2.200 ARS Max : 1.000.000 ARS</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <p>
            Para realizar un depósito con transferencia bancaria, sigue estos
            pasos:
          </p>
          <ol>
            <li>
              Dirígete a tu banco y realiza una transferencia a la siguiente
              cuenta:
            </li>
            <p>Número de cuenta: 1234567890</p>
            <p>Titular: Royal Casino S.A.</p>
            <li>
              Envía un comprobante de tu transferencia a
              depositos@royalcasino.com
            </li>
            <li>
              Una vez verificado tu depósito, tu saldo se actualizará
              automáticamente.
            </li>
          </ol>
          <p>
            Puedes copiar el CBU:
            <input
              type="text"
              value="xxxxxxxxxxxxxxxx"
              readOnly
              className="m-2"
            />
            <button onClick={() => copyToClipboard("xxxxxxxxxxxxxxxx")}>
              Copiar
            </button>
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
            <p>Depósito con USDT</p>
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
        <Accordion.Body className="d-flex">
          <div className="w-75">
            <p>
              Para realizar un depósito con criptomoneda, sigue estos pasos:
            </p>
            <ol>
              <li>
                Transfiere la cantidad deseada de USDT a la siguiente dirección:
              </li>
              <p>Dirección USDT: xxxxxxxxxxxxxxxx</p>
              <li>
                Una vez realizada la transferencia, envía un correo a
                depositos@royalcasino.com con el hash de la transacción.
              </li>
              <li>
                Una vez verificado tu depósito, tu saldo se actualizará
                automáticamente.
              </li>
            </ol>
            <p>
              Recuerda que las transacciones de criptomonedas pueden tardar unos
              minutos en confirmarse.
            </p>
            <p>
              Puedes copiar la dirección de USDT:
              <input
                type="text"
                value="xxxxxxxxxxxxxxxx"
                readOnly
                className="m-2"
              />
              <button onClick={() => copyToClipboard("xxxxxxxxxxxxxxxx")}>
                Copiar
              </button>
            </p>
          </div>
          <div className="d-flex w-25 justify-content-center align-items-center">
            <QRCode value={direccionBilletera} />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AcordeonDepositos;
