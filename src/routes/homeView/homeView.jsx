import React, { useState, useContext, useEffect, useRef } from "react";
import "./homeView.css";
import CarroContext from "../../context/carro/carroContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../componentes/navbar/navbar";

function HomeView() {
  const navigate = useNavigate();
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  const context = useContext(CarroContext);
  const { setUser, setEstadoUsuario } = useContext(CarroContext);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    setEstadoUsuario(0);
    onAuthStateChanged(context.auth, inspectorSesion);
    console.log("estado usuario", context.estadoUsuario);
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };

  /*

  ESTADO CLIENTE
  0 = No esta Auth
  1 = Authenticado pero no creo nombre de usuario
  2 = Auth y creo nombre de usuario
  3 = Todo el 2 y completo la seccion perfil.
  */

  return (
    <div className="home">
      {/* {context.estadoUsuario > 0 ?  : ""} */}

      {context.estadoUsuario === 0 ? (
        <div className="navbar__noAuth">
          <div
            onClick={() => signInWithPopup(context.auth, googleProvider)}
            className="loggin"
          >
            {" "}
            <FcGoogle className="loggin__google" />
            <p>Acceder con Google</p>
          </div>
        </div>
      ) : (
        <Navbar />
      )}

      <section id="header" className="home__header">
        <h1>En desarrollo</h1>
      </section>
    </div>
  );
}

export default HomeView;
