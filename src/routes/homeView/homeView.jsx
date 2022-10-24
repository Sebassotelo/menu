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
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../componentes/navbar/navbar";
import Tarjeta from "../../componentes/tarjeta/tarjeta";
import Cliente from "../../componentes/cliente/cliente";

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
    document.title = "Menus | Tu menu online";
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
      if (context.usuario !== "generico") {
        setEstadoUsuario(2);
      }
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
          <ul className="nabvar__ul">
            <Link
              className="navbar__item"
              to={"header"}
              spy={true}
              smooth={true}
              duration={500}
            >
              Home
            </Link>
            <Link
              className="navbar__item"
              to={"about"}
              spy={true}
              smooth={true}
              duration={500}
            >
              ¿Como funciona?
            </Link>
            <Link
              className="navbar__item"
              to={"clientes"}
              spy={true}
              smooth={true}
              duration={500}
            >
              Clientes
            </Link>
          </ul>
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
        <div className="header__container">
          <div className="header__title">
            <h1 className="title__h1">Menus</h1>
            <h3 className="title__h3">Tu menu online</h3>
            <p className="title__p"> Encargate de la comida </p>
            <p className="title__p"> Nosotros nos encargamos de los pedidos</p>
          </div>
          <div className="header__img">
            <img src="https://i.imgur.com/DYPel8f.png" alt="" />
          </div>
        </div>
      </section>

      <section id="about" className="home__about">
        <h3 className="about__h3">¿Como Funciona Menus?</h3>
        <div className="about__tarjeta">
          <Tarjeta
            numero={1}
            title={"Accede con Google"}
            desc={"Accede con cualquier cuenta de Google"}
            extra={
              <div
                onClick={() => signInWithPopup(context.auth, googleProvider)}
                className="loggin"
                style={{ border: "1px solid black", margin: "0 8px 0 8px" }}
              >
                <FcGoogle className="loggin__google" />
                <p>Acceder con Google</p>
              </div>
            }
          />
          <Tarjeta
            numero={2}
            title={"Configura tu Usuario y Perfil"}
            desc={
              "El nombre de usuario va a ser tu direccion url (menus.com.ar/usuario). Completa tu perfil con numeros, direccion y logo."
            }
          />
          <Tarjeta
            numero={3}
            title={"Agrega las Comidas"}
            desc={
              "Crea las secciones que necesites, y dentro te va a dejar agregar las comidas"
            }
          />
          <Tarjeta
            numero={4}
            title={"Listo! Recibe los pedidos"}
            desc={
              "Tus clientes al terminar, les va a copiar el pedido y les va a aparecer un link a tu WhatsApp. Solo tienen que entrar y pegar el pedido"
            }
          />
        </div>
      </section>

      <section id="clientes" className="home__clientes">
        <h3 className="about__h3">Algunos de nuestros menus</h3>
        <Cliente />
      </section>
    </div>
  );
}

export default HomeView;
