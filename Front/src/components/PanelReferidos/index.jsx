import { React, useState, useEffect } from "react";
import axios from "axios";
import PanelAdmin from "../PanelAdmin";

function PanelReferidos() {
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [usersReferral, setUserReferral] = useState(null);
  const [referralLinkUser, setReferralLinkUser] = useState(null);

  const token = localStorage.getItem("token");

  // Función para copiar el enlace al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLinkUser);
    setCopied(true); // Actualizar estado para indicar que se ha copiado
  };

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

  useEffect(() => {
    const fetchReferralByUser = async () => {
      try {
        if (!userData) return; // Asegurarse de que userData esté definido antes de hacer la solicitud

        const response = await axios.post(
          "http://localhost:5000/api/users/referrals",
          {
            referrerUserName: userData.userName,
          }
        );

        setUserReferral(response.data);

        const referralResponse = await axios.get(
          `http://localhost:5000/api/users/${userData.userName}/referral-link`
        );

        setReferralLinkUser(referralResponse.data.referralLink);
      } catch (error) {
        console.log("Error al obtener los referidos del usuario:", error);
      }
    };

    fetchReferralByUser();
  }, [userData]);

  return (
    <>
      <div data-bs-theme="dark" className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">Referidos</h2>
                <p className="card-text">
                  {usersReferral ? usersReferral.length : "cargando referidos"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">Saldo de Referidos</h2>
                <p className="card-text">
                  $ {userData ? userData.saldoReferido : "cargando saldo"}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">Tu link para referir</h2>
                <p
                  className="card-text"
                  style={{ cursor: "pointer" }}
                  onClick={copyToClipboard}
                >
                  {copied ? "¡Copiado!" : "Haz clic para copiar"}
                </p>
                <p className="card-text">
                  {referralLinkUser
                    ? referralLinkUser
                    : "cargando link de referidos"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanelReferidos;
