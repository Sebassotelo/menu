import React, { useState, useContext, useEffect, useRef } from "react";
import "./homeView.css";
import CarroContext from "../../context/carro/carroContext";

function HomeView() {
  const { handleOnClick } = useContext(CarroContext);
  const context = useContext(CarroContext);

  return (
    <div className="home">
      <button onClick={handleOnClick}>Iniciar Sesion</button>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <h1>En Desarrollo</h1>
    </div>
  );
}

export default HomeView;
