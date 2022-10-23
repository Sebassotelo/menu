import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../context/carro/carroContext";
import { onAuthStateChanged } from "firebase/auth";
import "./accountConfigView.css";
import toast, { Toaster } from "react-hot-toast";
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

function AccountConfigView() {
  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const { setUser, setMenuCompleto, setUsuario } = useContext(CarroContext);

  const [array, setArray] = useState(null);

  const firestore = getFirestore(firebaseApp);
  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
  }, [context.user]);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      //en caso de que haya seison iniciada
      navigate("/");
      setUser(null);
    }
  };

  const inputUsername = (e) => {
    setUsuario(e.target.value);
  };

  let existe;
  const usuarioExiste = async (e) => {
    e.preventDefault();
    const docRef = collection(firestore, `users`);
    const q = query(docRef, where("username", "==", context.usuario));
    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => (existe = doc.data()));
    console.log("existe", existe);
    usernameContinue();
  };

  const usernameContinue = async (e) => {
    if (existe) {
      toast.error("Ya existe este nombre de usuario, selecione otro");
    } else {
      const docRefer = doc(firestore, `users/${context.user.email}`);
      await updateDoc(docRefer, { username: context.usuario });
      toast.success("Nombre de usuario Actualizado");
    }
  };

  const setearPerfil = async (e) => {
    e.preventDefault();

    const instagram = e.target.inputInstagram.value;
    const whatsapp = e.target.inputWhatsapp.value;
    const direccion = e.target.inputDireccion.value;
    const ciudad = e.target.inputCiudad.value;
    const pais = e.target.inputPais.value;
    //Creamos el array

    const configNueva = {
      usuarioInstagram: instagram,
      urlInstagram: `www.instagram.com/${instagram}`,
      whatsapp: whatsapp,
      direccion: direccion,
      ciudad: ciudad,
      pais: pais,
    };
    //updateamos la base de datos
    const docRefer = doc(firestore, `users/${context.user.email}`);

    await updateDoc(docRefer, { perfil: configNueva });
    toast.success("Perfil Actualizado");
  };

  return (
    <div className="account">
      <Navbar />
      <div className="account__config">
        <form action="" className="account__form" onSubmit={usuarioExiste}>
          <p>Ingrese su nombre de usuario:</p>
          <input
            type="text"
            className="account__form__input"
            onChange={inputUsername}
            defaultValue={context.usuario}
          />
          <button type="submit">Guardar</button>
        </form>

        <form action="" className="account__form" onSubmit={setearPerfil}>
          <input
            type="text"
            className="account__form__input"
            placeholder="Perfil de Instagram"
            id="inputInstagram"
          />
          <input
            type="text"
            className="account__form__input"
            placeholder="WhatsApp"
            id="inputWhatsapp"
          />
          <input
            type="text"
            className="account__form__input"
            placeholder="Direccion"
            id="inputDireccion"
          />
          <input
            type="text"
            className="account__form__input"
            placeholder="Ciudad"
            id="inputCiudad"
          />
          <input
            type="text"
            className="account__form__input"
            placeholder="Pais"
            id="inputPais"
          />
          <button type="submit">Guardar</button>
        </form>
      </div>
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default AccountConfigView;
