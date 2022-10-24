import React, { useEffect, useReducer, useState } from "react";
import carroReducer from "./carroReducer";
import CarroContext from "./carroContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/firebase";

function CarroState(props) {
  const [carrito, setCarrito] = useState([]);
  const [actu, setActu] = useState(false);
  const [user, setUser] = useState(null);
  const [menuCompleto, setMenuCompleto] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [perfilPublico, setPerfilPublico] = useState("");
  const [infoPublica, setInfoPublica] = useState([]);
  const [estadoUsuario, setEstadoUsuario] = useState(0);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const addCarrito = (e) => {
    setCarrito((prev) => [...prev, e]);
  };

  const actuCarrito = () => {
    setActu(!actu);
  };

  return (
    <CarroContext.Provider
      value={{
        auth: auth,
        firestore: firestore,
        user: user,
        usuario: usuario,
        perfilPublico: perfilPublico,
        menuCompleto: menuCompleto,
        infoPublica: infoPublica,
        estadoUsuario: estadoUsuario,
        carrito: carrito,
        actualizacion: actu,
        addCarrito,
        actuCarrito,
        setCarrito,
        setUser,
        setMenuCompleto,
        setUsuario,
        setPerfilPublico,
        setInfoPublica,
        setEstadoUsuario,
      }}
    >
      {props.children}
    </CarroContext.Provider>
  );
}

export default CarroState;
