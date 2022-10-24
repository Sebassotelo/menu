import React, { useState, useContext, useEffect, useRef } from "react";
import "./accountView.css";
import CarroContext from "../../context/carro/carroContext";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
import ListadoDeItems from "../../componentes/listadoDeItems/listadoDeItems";
import AgregarItem from "../../componentes/agregarItem/agregarItem";
import Perfil from "../../componentes/perfil/perfil";

function AccountView() {
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

  const firestore = getFirestore(firebaseApp);

  //USE EFFECT
  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
    fetchTareas();
    console.log(context.estadoCliente);
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
    } else {
      //en caso de que haya seison iniciada
      navigate("/");
      setUser(null);
    }
  };

  const fake = [
    {
      seccion: "Seccion Titulo",
      seccionItems: [
        {
          title: "Item de Ejemplo",
          desc: " aasdasfagasgxczxc",
          precio: "630",
          id: 1,
          img: "",
        },
      ],
      id: 0,
    },
  ];

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
      if (context.infoPublica.instagram !== "") {
        setEstadoUsuario(3);
      }
      if (infoDocu.username === "generico") {
        setUsuario(null);
        setEstadoUsuario(1);
      }
      return infoDocu;
    } else {
      await setDoc(docRef, {
        items: [...fake],
        username: "generico",
        perfil: configGenerico,
        urlFoto: "generico",
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

  const manejarSeccion = (e) => {
    setContainerSeccion(e.target.value);
  };

  const agregarSeccion = async (e) => {
    e.preventDefault();
    if (containerSeccion != "") {
      const docRef = doc(firestore, `users/${context.user.email}`);

      const newArray = [
        ...array,
        { seccion: containerSeccion, seccionItems: [], id: +new Date() },
      ];

      setArray(newArray);
      updateDoc(docRef, { items: [...newArray] });
      toast.success(`Seccion ${containerSeccion} agregada correctamente`);
    } else {
      toast.error(`Escriba un nombre para la seccion`);
    }
  };

  if (loader) {
    return (
      <div className="account">
        {context.user ? <Navbar /> : ""}
        {context.estadoUsuario > 2 ? <Perfil /> : ""}
        <div className="account__container">
          {context.estadoUsuario > 0 ? (
            <>
              {context.usuario ? (
                <div className="account__info">
                  <div></div>
                  <h2>Informacion:</h2>
                  <p>
                    <span>Correo de inicio de Sesion: </span>{" "}
                    {context.user.email}
                  </p>
                  <p>
                    <span>Usuario:</span> {context.usuario}
                  </p>
                  <p>
                    <span>Instagram:</span>{" "}
                    {context.infoPublica.perfil.usuarioInstagram}
                  </p>
                  <p>
                    <span>WhatsApp:</span> {context.infoPublica.perfil.whatsapp}
                  </p>
                  <p>
                    <span>Direccion:</span>{" "}
                    {context.infoPublica.perfil.direccion}
                  </p>
                  <p>
                    <span>Ciudad:</span> {context.infoPublica.perfil.ciudad}
                  </p>
                  <p>
                    <span>Pais:</span> {context.infoPublica.perfil.pais}
                  </p>
                  <button
                    className="account__info__button"
                    onClick={() => {
                      navigate("/account/config");
                    }}
                  >
                    Editar
                  </button>
                </div>
              ) : (
                <div className="seccion__container">
                  <h2>Configure su Perfil</h2>
                  <button
                    className="seccion__button"
                    onClick={() => {
                      navigate("/account/config");
                    }}
                  >
                    Configurar Perfil
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>"CARGANDO"</p>
          )}

          {context.user ? (
            <>
              <div className="seccion__container">
                <h2>Agregar Seccion</h2>
                <form
                  action=""
                  className="seccion__form"
                  onSubmit={agregarSeccion}
                >
                  <input
                    className="account__form__input"
                    type="text"
                    placeholder="Nombre de Seccion"
                    onChange={manejarSeccion}
                  />
                  <button className="seccion__button">Agregar Seccion</button>
                </form>
              </div>
              <ListadoDeItems arrayItems={array} setArray={setArray} />
            </>
          ) : (
            <div className="loader">
              <div class="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <Toaster position="top-center" className="notificacion" />
        </div>
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

export default AccountView;
