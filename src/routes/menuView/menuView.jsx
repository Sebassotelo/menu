import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CarroContext from "../../context/carro/carroContext";
import Carrito from "../../componentes/carrito/carrito";
import Perfil from "../../componentes/perfil/perfil";
import Menu from "../../componentes/menu/menu";
import Navbar from "../../componentes/navbar/navbar";
import { onAuthStateChanged } from "firebase/auth";

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
import { useNavigate } from "react-router-dom";

function MenuView() {
  const navigate = useNavigate();
  const { username } = useParams();
  const context = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const { setMenuCompleto, setPerfilPublico, setUser, setInfoPublica } =
    useContext(CarroContext);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
    llamada();
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      if (username === "null") {
        navigate("/account");
      }
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
    }
  };

  const llamada = async () => {
    const docRef = collection(firestore, `users`);

    const q = query(docRef, where("username", "==", username));

    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => setInfoPublica(doc.data()));
    setLoader(true);
  };

  if (loader) {
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
