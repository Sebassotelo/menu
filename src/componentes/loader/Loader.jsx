import React from "react";
import "./loader.css";
function Loader() {
  return (
    <div className="cargando">
      <div className="loader">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
