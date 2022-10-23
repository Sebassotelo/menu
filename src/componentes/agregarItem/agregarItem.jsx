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

function AgregarItem({ array, id, setArray, setAddShow }) {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const context = useContext(CarroContext);
  const { setMenuCompleto, setAgregarItem } = useContext(CarroContext);

  const [url, setUrl] = useState(null);
  const [carga, setCarga] = useState(true);

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
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    //obtener URL
    const urlImg = await getDownloadURL(archivoRef);
    setUrl(urlImg);
    setCarga(true);
  };

  useEffect(() => {
    setCarga(true);
  }, [array]);
  return (
    <div className="add__item__form">
      <form action="" className="account__form" onSubmit={addItem}>
        <h2 className="account__form__h2">Agregar items</h2>
        <input
          type="text"
          placeholder="Titulo"
          className="account__form__input"
          id="inputTitle"
          required
        />
        <input
          type="text"
          placeholder="Descripcion"
          className="account__form__input input__desc"
          id="inputDesc"
          required
        />
        <div className="input__precio">
          <input
            type="number"
            placeholder="Precio"
            className="account__form__input"
            id="inputPrecio"
            required
          />
          <input
            type="file"
            className="account__form__input"
            onChange={fileHandler}
            id="inputFile"
          />
        </div>

        {carga ? (
          <button type="submit" className="form__agregar">
            Agregar
          </button>
        ) : (
          ""
        )}

        <Toaster position="top-center" className="notificacion" />
      </form>
    </div>
  );
}

export default AgregarItem;
