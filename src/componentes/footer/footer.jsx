import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./footer.css";

function Footer() {
  const context = useContext(CarroContext);

  const [padding, setPadding] = useState("10px");

  useEffect(() => {
    if (context.estadoUsuario > 0) {
      if (window.innerWidth < 900) {
        setPadding("70px");
      }
    }
  }, [context.estadoUsuario]);
  return (
    <p className="footer" style={{ paddingBottom: padding }}>
      Creado por{" "}
      <a href="https://www.sebassotelo.com.ar/" target={"_blank"}>
        <span>Sebas Sotelo</span>
      </a>{" "}
    </p>
  );
}

export default Footer;
