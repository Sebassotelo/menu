import React, { useReducer, useState } from "react";
import carroReducer from "./carroReducer";
import CarroContext from "./carroContext";

function CarroState(props) {
  const [carrito, setCarrito] = useState([]);
  const [actu, setActu] = useState(false);

  const addCarrito = (e) => {
    setCarrito((prev) => [...prev, e]);
  };

  const actuCarrito = () => {
    setActu(!actu);
  };

  const delCarrito = (e) => {};

  const getCarrito = () => {};

  const getTotal = () => {};

  return (
    <CarroContext.Provider
      value={{
        carrito: carrito,
        actualizacion: actu,
        addCarrito,
        delCarrito,
        getCarrito,
        getTotal,
        actuCarrito,
        setCarrito,
      }}
    >
      {props.children}
    </CarroContext.Provider>
  );
}

export default CarroState;
