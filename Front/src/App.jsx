import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MyNavbar from "./layouts/Navbar";
import TopBar from "./layouts/Topbar";
import Footer from "./layouts/Footer";
import MiniJuegos from "./pages/MiniJuegos";
import RegisterPage from "./pages/Register";
import Depositos from "./pages/Depositos";
import Retiros from "./pages/Retiros";
import Referidos from "./pages/Referidos";
import CargaFichas from "./pages/CargaFichas";
import RetiroFichas from "./pages/RetiroFichas";
import WhatsAppButton from "./components/LogoWhatsapp";
import "./App.css";
import PageHeadAndTail from "./pages/HeadAndTail";
import HelpChat from "./components/ChatAyuda";
import PageDiceRolling from "./pages/DiceRolling";
import PageRockPaperScissors from "./pages/RockPaperScissors";
import Administrador from "./pages/Administrador";
import Afiliados from "./pages/Afiliados";
import { UserProvider } from "./contexts/UserContext";
import PrivacidadDatosPersonales from "./pages/PrivacidadDatosPersonales";

const AppLayout = ({ children, includeFooter = true }) => (
  <>
    <TopBar />
    <MyNavbar />
    <div id="main-content">
      {children}
      <HelpChat />
      {/* <WhatsAppButton /> */}
    </div>
    {includeFooter && <Footer />}
  </>
);

const AppContent = () => {
  const location = useLocation();
  const excludedPaths = ["/headandtail", "/dicerolling", "/rockpaperscissors"];
  const includeFooter = !excludedPaths.includes(location.pathname);

  return (
    <AppLayout includeFooter={includeFooter}>
      <Routes>
        <Route path="/" element={<MiniJuegos />} />
        <Route path="/minijuegos" element={<MiniJuegos />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/depositos" element={<Depositos />} />
        <Route path="/retiros" element={<Retiros />} />
        <Route path="/referidos" element={<Referidos />} />
        <Route path="/cargafichas" element={<CargaFichas />} />
        <Route path="/retirarsaldo" element={<RetiroFichas />} />
        <Route path="/headandtail" element={<PageHeadAndTail />} />
        <Route path="/dicerolling" element={<PageDiceRolling />} />
        <Route path="/rockpaperscissors" element={<PageRockPaperScissors />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/afiliados" element={<Afiliados />} />
        <Route
          path="/privacidaddatospersonales"
          element={<PrivacidadDatosPersonales />}
        />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
