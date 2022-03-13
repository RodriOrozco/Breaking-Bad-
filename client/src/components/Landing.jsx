import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  return (
    <div>
      <h1>Bienvenidos a Breaking-Bad App</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}

export default Landing;
