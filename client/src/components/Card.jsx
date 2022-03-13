import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, nickname }) {
  return (
    <div className="container">
      <h3>{name}</h3>
      <h5>{nickname}</h5>
      <img src={image} alt="" width="200px" height="250px" />
    </div>
  );
}
