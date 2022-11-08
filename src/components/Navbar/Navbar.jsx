import React from "react";
import "./Navbar.css";
import { useLocation, Link } from "react-router-dom";

const NavbarComponent = () => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <div className="navbar">
      <div className="logoDiv">
        <div className="logo">comment_it</div>
      </div>
      <div className="navLinks">
        <Link
          className="navLink"
          style={{ color: `${location.pathname === "/" ? "#ed6110" : "#000"}` }}
          to="/"
        >
          Home
        </Link>

        <Link
          className="navLink"
          style={{
            color: `${location.pathname === "/About" ? "#ed6110" : "#000"}`,
          }}
          to="/About"
        >
          About
        </Link>

        <Link
          className="navLink"
          style={{
            color: `${location.pathname === "/Help" ? "#ed6110" : "#000"}`,
          }}
          to="/Help"
        >
          Help
        </Link>
      </div>
    </div>
  );
};

export default NavbarComponent;
