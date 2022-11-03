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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import firebaseApp from "../../firebase/firebase";

import Navbar from "../../componentes/navbar/navbar";
import NavbarMobile from "../../componentes/navbarMobile/navbarMobile";
import Perfil from "../../componentes/perfil/perfil";

function AccountConfigView() {
  const navigate = useNavigate();
  const storage = getStorage();
  const context = useContext(CarroContext);
  const { setUser, setMenuCompleto, setUsuario, setEstadoUsuario } =
    useContext(CarroContext);

  const [array, setArray] = useState(null);
  const [url, setUrl] = useState(null);
  const [carga, setCarga] = useState(true);

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
    setCarga(false);
    const docRef = collection(firestore, `users`);
    const q = query(docRef, where("username", "==", context.usuario));
    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => (existe = doc.data()));
    usernameContinue();
    setCarga(true);
  };

  const usernameContinue = async (e) => {
    if (existe) {
      toast.error("Ya existe este nombre de usuario, selecione otro");
    } else {
      const docRefer = doc(firestore, `users/${context.user.email}`);
      await updateDoc(docRefer, { username: context.usuario });
      toast.success("Nombre de usuario Actualizado");
      setEstadoUsuario(2);
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
    setEstadoUsuario(3);
    await updateDoc(docRefer, { perfil: configNueva });
    toast.success("Perfil Actualizado");
  };

  const subirFoto = async (e) => {
    e.preventDefault();
    if (url) {
      const docRefer = doc(firestore, `users/${context.user.email}`);
      await updateDoc(docRefer, { urlFoto: url });
      toast.success("Foto de Perfil Subida");
    } else {
      toast.error("Seleccione una Foto para subir");
    }
  };

  const fileHandler = async (e) => {
    setCarga(null);
    //detectar el archivo
    const archivoLocal = e.target.files[0];
    //cargarlo a firebase storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    //obtener URL
    const urlImg = await getDownloadURL(archivoRef);
    setUrl(urlImg);
    setCarga(true);
  };

  return (
    <div className="account">
      <Navbar />
      {context.user ? <NavbarMobile /> : ""}
      <div className="account__config">
        <Perfil />
        <form action="" className="account__form__edit" onSubmit={subirFoto}>
          <p>Suba su foto de perfil:</p>
          <input
            type="file"
            className="account__form__input__edit"
            onChange={fileHandler}
            id="inputFile"
          />
          {carga ? (
            <button type="submit" className="button__editPerfil">
              Guardar
            </button>
          ) : (
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </form>
        <form
          action=""
          className="account__form__edit"
          onSubmit={usuarioExiste}
        >
          <p>Ingrese su nombre de usuario:</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="Nombre de Usuario"
            onChange={inputUsername}
            defaultValue={context.usuario}
          />
          {carga ? (
            <button type="submit" className="button__editPerfil">
              Guardar
            </button>
          ) : (
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </form>

        <form action="" className="account__form__edit" onSubmit={setearPerfil}>
          <p>Usuario Instagram:</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="Perfil de Instagram"
            id="inputInstagram"
            defaultValue={context.infoPublica.perfil.usuarioInstagram}
          />
          <p>Numero de WhatsApp: (ej: 3794215489)</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="WhatsApp"
            id="inputWhatsapp"
            defaultValue={context.infoPublica.perfil.whatsapp}
          />
          <p>Direccion:</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="Direccion"
            id="inputDireccion"
            defaultValue={context.infoPublica.perfil.direccion}
          />
          <p>Ciudad:</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="Ciudad"
            id="inputCiudad"
            defaultValue={context.infoPublica.perfil.ciudad}
          />
          <p>Pais:</p>
          <input
            type="text"
            className="account__form__input__edit"
            placeholder="Pais"
            id="inputPais"
            defaultValue={context.infoPublica.perfil.pais}
          />

          {carga ? (
            <button type="submit" className="button__editPerfil">
              Guardar
            </button>
          ) : (
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </form>
      </div>
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default AccountConfigView;
