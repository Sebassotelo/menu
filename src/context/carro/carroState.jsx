import React, { useEffect, useReducer, useState } from "react";
import carroReducer from "./carroReducer";
import CarroContext from "./carroContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

function CarroState(props) {
  const [carrito, setCarrito] = useState([]);
  const [actu, setActu] = useState(false);

  const addCarrito = (e) => {
    setCarrito((prev) => [...prev, e]);
  };

  const actuCarrito = () => {
    setActu(!actu);
  };

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CarroContext.Provider
      value={{
        carrito: carrito,
        actualizacion: actu,
        addCarrito,
        actuCarrito,
        setCarrito,
        handleOnClick,
      }}
    >
      {props.children}
    </CarroContext.Provider>
  );
}

export default CarroState;
