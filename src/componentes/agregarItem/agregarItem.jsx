import React, { useState, useContext, useEffect, useRef } from "react";
import "./agregarItem.css";
import CarroContext from "../../context/carro/carroContext";
import firebaseApp from "../../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function AgregarItem({ array, id, setArray }) {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const context = useContext(CarroContext);
  const { setMenuCompleto, setAgregarItem } = useContext(CarroContext);

  const [url, setUrl] = useState(null);
  const [carga, setCarga] = useState(true);
  const [add, setAdd] = useState(false);

  const addItem = async (e) => {
    e.preventDefault(e);
    const title = e.target.inputTitle.value;
    const desc = e.target.inputDesc.value;
    const precio = e.target.inputPrecio.value;

    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    //filtramos la propiedad .items y creamos un array nuevo

    const pepe = infoDocu.items.filter((it) => it.seccion != array.seccion);
    console.log(array.seccion);
    const newArray = [
      ...pepe,
      {
        seccion: array.seccion,
        seccionItems: [
          ...array.seccionItems,
          {
            title: title,
            desc: desc,
            precio: precio,
            id: +new Date(),
            img: url,
          },
        ],
        id: +new Date(),
      },
    ];

    const arrayOrdenado = newArray.sort((a, b) => {
      if (a.seccion < b.seccion) {
        return -1;
      } else if (a.seccion > b.seccion) {
        return 1;
      } else {
        return 0;
      }
    });

    //seteamos el estado y updateamos la base de datos
    setArray(arrayOrdenado);
    updateDoc(docRef, { items: [...newArray] });
    toast.success("Item Agregado");
    popup();
    //limpiar Form
    setUrl(null);
    e.target.inputTitle.value = "";
    e.target.inputDesc.value = "";
    e.target.inputPrecio.value = "";
    e.target.inputFile.value = null;
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
    setUrl(urlImg);
    setCarga(true);
  };

  const popup = () => {
    setAdd(!add);
    if (add) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    setCarga(true);
  }, [array]);
  return (
    <div className="add__item__form">
      {add ? (
        <>
          <div className="add__item__container">
            <form action="" className="account__form" onSubmit={addItem}>
              <h2 className="account__form__h2">Agregar Producto</h2>
              <p className="account__form__p">Titulo:</p>
              <input
                type="text"
                placeholder="Titulo"
                className="account__form__input"
                id="inputTitle"
                required
              />
              <p className="account__form__p">Descripcion:</p>
              <input
                type="text"
                placeholder="Descripcion"
                className="account__form__input input__desc"
                id="inputDesc"
                required
              />
              <div className="input__precio">
                <div>
                  <p className="account__form__p">Precio:</p>
                  <input
                    type="number"
                    placeholder="Precio"
                    className="account__form__input"
                    id="inputPrecio"
                    required
                  />
                </div>

                <div>
                  <p className="account__form__p">Foto del Producto:</p>
                  <input
                    type="file"
                    className="account__form__input"
                    onChange={fileHandler}
                    id="inputFile"
                  />
                </div>
              </div>

              {carga ? (
                <button type="submit" className="form__agregar">
                  Agregar
                </button>
              ) : (
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}

              <div className="add__item__close" onClick={popup}>
                <p>Cerrar</p>
              </div>
              <Toaster position="top-center" className="notificacion" />
            </form>
          </div>
          <div className="add__item__popup">
            <p>Agregar Producto</p>
          </div>
        </>
      ) : (
        <div className="add__item__popup" onClick={popup}>
          <p>Agregar Producto</p>
        </div>
      )}
    </div>
  );
}

export default AgregarItem;
