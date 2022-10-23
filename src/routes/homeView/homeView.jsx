import React, { useState, useContext, useEffect, useRef } from "react";
import "./homeView.css";
import CarroContext from "../../context/carro/carroContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Navbar from "../../componentes/navbar/navbar";

function HomeView() {
  const navigate = useNavigate();
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  const context = useContext(CarroContext);
  const { setUser } = useContext(CarroContext);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      console.log(usuarioFirebase);
      setUser(usuarioFirebase);
      navigate("/account");
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
    }
  };

  return (
    <div className="home">
      {context.user ? <Navbar /> : ""}

      {context.user ? (
        ""
      ) : (
        <button
          type="submit"
          onClick={() => signInWithPopup(context.auth, googleProvider)}
          className="loggin"
        >
          Acceder con Google
        </button>
      )}

      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <h1>
        {context.user
          ? `Bienvenido ${context.user.displayName}`
          : "No esta logueado"}
      </h1>
    </div>
  );
}

export default HomeView;
