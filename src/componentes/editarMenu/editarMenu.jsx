import React, { useState, useContext, useEffect, useRef } from "react";
import "./editarMenu.css";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import CarroContext from "../../context/carro/carroContext";
import firebaseApp from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
function EditarMenu() {
  const context = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const { setStyle, setLetraCarrito, setLetraCompMayor } =
    useContext(CarroContext);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fondo, setFondo] = useState(true);

  const [colorFondo, setColorFondo] = useState("");
  const [url, setUrl] = useState("");
  const [carga, setCarga] = useState(true);

  const [colorCompMayor, setColorCompMayor] = useState("");
  const [colorFontCompMayor, setColorFontCompMayor] = useState("");
  const [borderCompMayor, setBorderCompMayor] = useState("");

  const [colorCompProd, setColorCompProd] = useState("");
  const [colorFont, setColorFont] = useState("");
  const [borderCompProd, setBorderCompProd] = useState("");

  const [fondoCarrito, setFondoCarrito] = useState("");
  const [colorCarrito, setColorCarrito] = useState("");
  const [borderCarrito, setBorderCarrito] = useState("");

  const [colorFontPerfil, setColorFontPerfil] = useState("");

  const style = {
    perfil: {
      color: `${colorFontPerfil}`,
    },
    fondo: {
      backgroundColor: `${colorFondo}`,
      backgroundImage: `${url}`,
      repeat: "none",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    compMayor: {
      backgroundColor: `${colorCompMayor}`,
      color: `${context.letraCompMayor}`,
      borderRadius: `${borderCompMayor}`,
    },
    compProd: {
      backgroundColor: `${colorCompProd}`,
      color: `${colorFont}`,
      borderRadius: `${borderCompProd}`,
    },
    carrito: {
      backgroundColor: `${fondoCarrito}`,
      color: `${context.letraCarrito}`,
      borderRadius: `${borderCarrito}`,
    },
  };

  //Styles Fondo General
  const fondoColor = (e) => {
    setColorFondo(e.target.value);
    setStyle(style);
  };
  const fileHandler = async (e) => {
    setCarga(null);
    //detectar el archivo
    const archivoLocal = e.target.files[0];
    //cargarlo a firebase storage
    const archivoRef = ref(
      storage,
      `${context.user.email}/${archivoLocal.name}`
    );
    await uploadBytes(archivoRef, archivoLocal);
    //obtener URL
    const urlImg = await getDownloadURL(archivoRef);
    setUrl(`url(${urlImg})`);
    setCarga(true);
  };

  //Styles Componentes Mayor

  const fondoCompMayor = (e) => {
    setColorCompMayor(e.target.value);
    setStyle(style);
  };
  const colorLetraCompMayor = (e) => {
    setLetraCompMayor(e.target.value);
    setStyle(style);
  };

  const bordeCompMayor = (e) => {
    setBorderCompMayor(`${e.target.value}px`);
    setStyle(style);
  };

  //Styles Componentes Productos

  const fondoCompProd = (e) => {
    setColorCompProd(e.target.value);
    setStyle(style);
  };
  const colorLetraCompProd = (e) => {
    setColorFont(e.target.value);
    setStyle(style);
  };
  const bordeCompProd = (e) => {
    setBorderCompProd(`${e.target.value}px`);
    setStyle(style);
  };

  //Styles Carrito
  const colorFondoCarrito = (e) => {
    setFondoCarrito(e.target.value);
    setStyle(style);
  };
  const colorLetraCarrito = (e) => {
    setLetraCarrito(e.target.value);
    setStyle(style);
  };
  const bordeCarrito = (e) => {
    setBorderCarrito(`${e.target.value}px`);
    setStyle(style);
  };

  //Styles Perfil
  const colorPerfil = (e) => {
    setColorFontPerfil(e.target.value);
    setStyle(style);
  };

  const llamadoBD = async () => {
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const info = consulta.data();
      setColorFondo(info.style.fondo.backgroundColor);
      setUrl(info.style.fondo.backgroundImage);
      setColorCompMayor(info.style.compMayor.backgroundColor);
      setLetraCompMayor(info.style.compMayor.color);
      setBorderCompMayor(info.style.compMayor.borderRadius);
      setColorCompProd(info.style.compProd.backgroundColor);
      setColorFont(info.style.compProd.color);
      setBorderCompProd(info.style.compProd.borderRadius);
      setFondoCarrito(info.style.carrito.backgroundColor);
      setBorderCarrito(info.style.carrito.borderRadius);
      setLetraCarrito(info.style.carrito.color);
      setColorFontPerfil(info.style.perfil.color);
      console.log(colorFondo);
      setLoader(true);
    } else {
      updateDoc(docRef, { style: style });
      setLoader(true);
    }
  };

  const actualizarStyle = async () => {
    const docRef = doc(firestore, `users/${context.user.email}`);
    updateDoc(docRef, { style: style });
    setShow(!show);
    toast.success("Configuracion Guardada");
  };

  if (show) {
    return (
      <div className="editar__menu">
        <div className="editar__menu__container">
          <h3
            className="editar__menu__h3"
            onClick={() => {
              setShow(!show);
            }}
          >
            Editar Menu
          </h3>
          <div>
            <h3 className="editar__menu__h3">Perfil</h3>
            <p className="editar__p">Color fuente Perfil</p>
            <input type="color" id="colorFondo" onChange={colorPerfil} />
          </div>
          <div>
            <h3 className="editar__menu__h3">Fondos</h3>
            <div className="editar__menu__fondoColor">
              <button onClick={() => setFondo(true)} className="edit__close">
                Imagen
              </button>
              <button onClick={() => setFondo(false)} className="edit__close">
                Color
              </button>
            </div>

            {fondo ? (
              <>
                <p className="editar__p">Imagen de Fondo</p>
                <input
                  type="file"
                  onChange={fileHandler}
                  id="inputFile"
                  className="input__fondo_color"
                />
              </>
            ) : (
              <>
                <p className="editar__p">Color de Fondo</p>
                <input type="color" id="colorFondo" onChange={fondoColor} />
              </>
            )}
          </div>
          <div className="contenedores__edit">
            <h3 className="editar__menu__h3">Contenedores</h3>
            <div>
              <h4 className="editar__menu__h4">Contenedor Mayor</h4>
              <p className="editar__p">Color de Fondo</p>
              <input type="color" onChange={fondoCompMayor} />
              <p className="editar__p">Color de letra</p>
              <input type="color" onChange={colorLetraCompMayor} />
              <p className="editar__p">Borde redondeado</p>
              <input type="range" min={0} max={40} onChange={bordeCompMayor} />
            </div>
            <div>
              <h4 className="editar__menu__h4">Contenedor de Producto</h4>
              <p className="editar__p">Color de Fondo de Productos</p>
              <input type="color" onChange={fondoCompProd} />
              <p className="editar__p">Color de letra</p>
              <input type="color" onChange={colorLetraCompProd} />
              <p className="editar__p">Borde redondeado</p>
              <input type="range" min={0} max={40} onChange={bordeCompProd} />
            </div>
            <div>
              <h4 className="editar__menu__h4">Carrito</h4>
              <p className="editar__p">Color de Fondo del Carrito</p>
              <input type="color" onChange={colorFondoCarrito} />
              <p className="editar__p">Color de letra</p>
              <input type="color" onChange={colorLetraCarrito} />
              <p className="editar__p">Borde redondeado</p>
              <input type="range" onChange={bordeCarrito} />
            </div>

            <div className="edit__buttons">
              {carga && (
                <button className="edit__save" onClick={actualizarStyle}>
                  Guardar
                </button>
              )}
              <button className="edit__close" onClick={() => setShow(!show)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
        <Toaster position="top-center" className="notificacion" />
      </div>
    );
  } else {
    return (
      <div
        className="boton__editar__menu"
        onClick={() => {
          setShow(!show);
          llamadoBD();
        }}
      >
        {" "}
        <FiEdit2 />{" "}
      </div>
    );
  }
}

export default EditarMenu;
