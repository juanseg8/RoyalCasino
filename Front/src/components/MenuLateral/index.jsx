import React from "react";
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBillAlt,
  FaHistory,
  FaCheckCircle,
  FaGift,
  FaCode,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-full bg-dark text-white"
      style={{ width: "250px" }}
    >
      <div className="p-3">
        <h4>Menu de cuenta</h4>
      </div>
      <Nav className="flex-column p-3">
        <Link to="/referidos" className="text-white nav-link">
          <FaUser className="me-2" /> Sistemas de referidos
        </Link>
        <Link to="/depositos" className="text-white nav-link">
          <FaMoneyBillAlt className="me-2" /> Depositos
        </Link>
        <Link to="/retiros" className="text-white nav-link">
          <FaMoneyBillAlt className="me-2" /> Retiros
        </Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
