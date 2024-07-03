import "./App.css";
import MyNavbar from "./layouts/Navbar";
import MiniJuegos from "./pages/MiniJuegos";
import TopBar from "./layouts/Topbar";
import Footer from "./layouts/Footer";
import AnimatedBackground from "./components/FondoAnimado";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Depositos from "./pages/Depositos";
import Retiros from "./pages/Retiros";
import Referidos from "./pages/Referidos";
import CargaFichas from "./pages/CargaFichas";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopBar />
        <MyNavbar />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/minijuegos",
        element: <MiniJuegos />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/depositos",
        element: <Depositos/>,
      },
      {
        path: "/Retiros",
        element: <Retiros/>,
      },
      {
        path: "/Referidos",
        element: <Referidos/>,
      },
      {
        path: "/CargaFichas",
        element: <CargaFichas/>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
