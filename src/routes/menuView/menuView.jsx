import React, { useState, useContext, useEffect, useRef } from "react";
import "./menuView.css";
import { useParams } from "react-router-dom";
import CarroContext from "../../context/carro/carroContext";
import Carrito from "../../componentes/carrito/carrito";
import Perfil from "../../componentes/perfil/perfil";
import Menu from "../../componentes/menu/menu";
import Navbar from "../../componentes/navbar/navbar";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import firebaseApp from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function MenuView() {
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { username } = useParams();
  const context = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const {
    setMenuCompleto,
    setPerfilPublico,
    setUser,
    setInfoPublica,
    setEstadoUsuario,
  } = useContext(CarroContext);

  const [loader, setLoader] = useState(false);
  const [existe, setExiste] = useState(null);
  let busqueda;

  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
    document.title = `Menus | ${username}`;
    llamada();
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
      if (username === "null") {
        navigate("/account");
      }
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };

  const llamada = async () => {
    const docRef = collection(firestore, `users`);

    const q = query(docRef, where("username", "==", username));
    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => setInfoPublica(doc.data()));
    comoQuieras.forEach((doc) => (busqueda = doc.data()));
    if (busqueda) {
      setExiste(true);
      setLoader(true);
    } else {
      setExiste(false);
      setLoader(true);
    }
  };

  if (loader) {
    if (existe) {
      return (
        <div className="App" id="app">
          {context.user ? <Navbar /> : ""}

          <Carrito />

          <section id="perfil">
            <Perfil />
          </section>

          <section id="menu">
            <Menu />
          </section>
        </div>
      );
    } else {
      return (
        <div className="App" id="app">
          {context.user ? <Navbar /> : ""}
          {console.log("esisteee", existe)}
          {context.estadoUsuario === 0 && (
            <>
              <div className="navbar__noAuth">
                <ul className="navbar__home">
                  <p
                    className="navbar__home__item"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </p>
                </ul>
                <div
                  onClick={() => {
                    signInWithPopup(context.auth, googleProvider);
                  }}
                  className="loggin"
                >
                  {" "}
                  <FcGoogle className="loggin__google" />
                  <p>Acceder con Google</p>
                </div>
              </div>
            </>
          )}
          <div className="usuario_no_encontrado">
            <div className="loader">
              <div class="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
            <h1>Usuario no encontrado</h1>
          </div>
        </div>
      );
    }
  } else {
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
}

export default MenuView;
