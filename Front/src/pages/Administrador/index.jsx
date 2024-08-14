import { React, useEffect, useState } from "react";
import AnimatedBackground from "../../components/FondoAnimado";
import PanelAdmin from "../../components/PanelAdmin";
import axios from "axios";

function Administrador() {
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
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      <AnimatedBackground />
      <PanelAdmin user={userData} />
    </>
  );
}

export default Administrador;
