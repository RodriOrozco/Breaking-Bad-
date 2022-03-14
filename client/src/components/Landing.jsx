import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  return (
    <div className="container">
      <img
        src="https://i.imgur.com/5mOTPG4.png"
        alt="logo"
        width="500px"
        height="400px"
      />
      <div>
        <Link to="/home">
          <button className="button">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
