import React from "react";
import "./card.css";
import { NavLink } from "react-router-dom";

export default function Card({ name, image, nickname, id }) {
  return (
    <div className="card">
      <NavLink to={`/characters/${id}`}>
        <img src={image} alt="" width="200px" height="250px" />
        <div className="container">
          <h3>{name}</h3>
          <h4>{nickname}</h4>
        </div>
      </NavLink>
    </div>
  );
}
