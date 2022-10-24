import React from "react";
import "./tarjeta.css";

function Tarjeta({ numero, title, desc, extra }) {
  return (
    <div className="tarjeta">
      <div className="tarjeta__numero__container">
        <p>{numero}</p>
      </div>
      <div className="tarjeta__title">
        <h3>{title}</h3>
      </div>

      <p className="tarjeta__text">{desc}</p>

      <div>{extra}</div>
    </div>
  );
}

export default Tarjeta;
