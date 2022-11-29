import React, { useState, useContext, useEffect, useRef } from "react";
import "./confirmacionView.css";
import CarroContext from "../../context/carro/carroContext";
import toast, { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { BsFillCheckCircleFill, BsArrowReturnLeft } from "react-icons/bs";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import firebaseApp from "../../firebase/firebase";

import Navbar from "../../componentes/navbar/navbar";
import NavbarMobile from "../../componentes/navbarMobile/navbarMobile";
import Loader from "../../componentes/loader/Loader";

function ConfirmacionView() {
  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const {
    setUser,
    setMenuCompleto,
    setUsuario,
    setInfoPublica,
    setEstadoUsuario,
  } = useContext(CarroContext);

  const [array, setArray] = useState(null);
  const [containerSeccion, setContainerSeccion] = useState("");
  const [loader, setLoader] = useState(false);
  const [vence, setVence] = useState("");
  const [newPremium, setNewPremium] = useState(false);

  const firestore = getFirestore(firebaseApp);

  //USE EFFECT
  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
    fetchTareas();
    setearPremium();
  }, [context.user]);

  const fetchTareas = async () => {
    const tareasFetchadas = await buscarOCrearUsuario(context.user.email);
    setMenuCompleto(tareasFetchadas.items);
    setArray(tareasFetchadas.items);
  };

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
      document.title = `Menus | ${context.user.displayName}`;
    } else {
      //en caso de que haya seison iniciada
      navigate("/");
      setUser(null);
    }
  };

  const fake = [];

  const configGenerico = {
    usuarioInstagram: "",
    urlInstagram: "",
    whatsapp: "",
    direccion: "",
    ciudad: "",
    pais: "",
  };
  const buscarOCrearUsuario = async (e) => {
    const docRef = doc(firestore, `users/${e}`);
    const consulta = await getDoc(docRef);
    console.log(consulta);
    if (consulta.exists()) {
      const infoDocu = consulta.data();
      setUsuario(infoDocu.username);
      setEstadoUsuario(2);
      setLoader(true);
      setInfoPublica(infoDocu);
      if (infoDocu.username === "generico") {
        setUsuario(null);
        setEstadoUsuario(1);
      }
      if (context.infoPublica.instagram !== "") {
        setEstadoUsuario(3);
      }

      if (context.infoPublica.premium) {
        setEstadoUsuario(4);
      }
      console.log("estado usuario", context.estadoUsuario);
      return infoDocu;
    } else {
      const fecha = new Date();
      await setDoc(docRef, {
        items: [...fake],
        username: "generico",
        perfil: configGenerico,
        urlFoto: "generico",
        premium: true,
        style: {},
        styleNoPremium: {},
        fechaDeCreacion: `${fecha.getDate()}/${
          fecha.getMonth() + 1
        }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes() + 1}`,
      });
      setUsuario(null);
      setEstadoUsuario(1);
      setLoader(true);
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();
      setInfoPublica(infoDocu);
      return infoDocu;
    }
  };

  const setearPremium = async () => {
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const info = consulta.data();
    if (info.premiumPago === "") {
      const fecha = new Date();
      const pago = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes() + 1}`;
      const fechaVence = `${fecha.getDate()}/${
        fecha.getMonth() + 2
      }/${fecha.getFullYear()}`;
      updateDoc(docRef, {
        premiumPago: pago,
        premium: true,
        premiumVence: fechaVence,
      });
      setVence(
        `${fecha.getDate()}/${fecha.getMonth() + 2}/${fecha.getFullYear()}`
      );
      setNewPremium(true);
    } else {
      // navigate(`/account`);
    }
  };

  if (loader) {
    return (
      <div className="account">
        {context.user ? <Navbar /> : ""}
        {context.user ? <NavbarMobile /> : ""}
        <div className="confirmacion__premium">
          <div className="confirmacion__premium__container">
            <BsFillCheckCircleFill className="confirmacion__premium__icon" />
            <p className="confirmacion__premium__p">
              Gracias por contratar Menus Premium
            </p>
            <p>
              Puede cancelar la subscripcion en cualquier momento desde {""}
              <a
                className="cancelar__suscripcion"
                href="https://www.mercadopago.com.ar/subscriptions"
                target={"_blank"}
              >
                Subscripciones de MercadoPago
              </a>
            </p>
            {newPremium && (
              <>
                <p>Premium vence el {vence}</p>
              </>
            )}
            <div
              className="volver"
              onClick={() => navigate("/account")}
              style={{
                bottom: "-35px",
                backgroundColor: "rgba(0, 0, 0, 0.514)",
              }}
            >
              <BsArrowReturnLeft className="volver__icon" />
              <p>Volver</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ConfirmacionView;
