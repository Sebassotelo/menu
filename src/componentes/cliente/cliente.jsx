import React from "react";
import "./cliente.css";
import { useNavigate } from "react-router-dom";

function Cliente() {
  const navigate = useNavigate();
  return (
    <div className="cliente">
      <a
        href="https://www.menus.com.ar/menu"
        className="cliente__title"
        target={"_blank"}
      >
        <p>www.menus.com.ar/menu</p>
      </a>

      <div className="cliente__img">
        <img src="https://i.imgur.com/ldjkKuf.jpg" alt="" />
      </div>

      <div className="cliente__info">
        <h3>Menu de Ejemplo</h3>
      </div>
    </div>
  );
}

export default Cliente;
