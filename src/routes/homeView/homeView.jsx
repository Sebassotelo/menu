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
import NavbarMobile from "../../componentes/navbarMobile/navbarMobile";
import Tarjeta from "../../componentes/tarjeta/tarjeta";
import Cliente from "../../componentes/cliente/cliente";
import CartPremium from "../../componentes/cartPremium/cartPremium";
import NavbarNoAuth from "../../componentes/navbarNoAuth/navbarNoAuth";

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

    if (window.location.href === "https://www.jstore.com.ar/") {
      navigate("/SrasMedias");
    }
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

  const premiumDesc = [
    { text: "Poder subir la foto del Producto" },
    { text: "Personalizacion de Fondo de menu" },
    { text: "Personalizacion de Colores del Menu" },
  ];

  /*

  ESTADO CLIENTE
  0 = No esta Auth
  1 = Authenticado pero no creo nombre de usuario
  2 = Auth y creo nombre de usuario
  3 = Todo el 2 y completo la seccion perfil.
  4 = Usuario Premium
  */

  return (
    <div className="home">
      {/* {context.estadoUsuario > 0 ?  : ""} */}

      {context.estadoUsuario === 0 ? (
        <NavbarNoAuth />
      ) : (
        <>
          <Navbar />
          <NavbarMobile />
        </>
      )}

      <section id="header" className="home__header">
        <div className="header__container">
          <div className="header__title">
            <div className="title__div">
              <h1 className="title__h1">Menus</h1>
              <div className="title__beta">
                <img
                  src="https://www.keyshapeapp.com/images/blog/2017-02-12-beta.png"
                  alt=""
                />
              </div>
            </div>

            <h3 className="title__h3">Tu menu online</h3>
            <p className="title__p"> Encargate de la comida </p>
            <p className="title__p"> Nosotros nos encargamos de los pedidos</p>
          </div>
          {/* <div className="header__img">
            <img src="https://i.imgur.com/DYPel8f.png" alt="" />
          </div> */}
        </div>
      </section>

      <section id="about" className="home__about">
        <h3
          className="about__h3"
          style={{ color: "white", borderColor: "white" }}
        >
          ¿Como Funciona Menus?
        </h3>
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
              "Una vez terminado el pedido, hacen click en el Link a WhatsApp, y mandan el pedido ya hecho."
            }
          />
        </div>
      </section>

      <section id="precio" className="precio">
        <h3 className="about__h3">Precios</h3>
        <div className="precio__cart">
          <CartPremium
            title={"FREE"}
            precio={"0"}
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

          <CartPremium title={"PREMIUM"} precio={"0"} premium={true} />
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
