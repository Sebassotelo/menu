import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../../context/carro/carroContext";
import "./secciones.css";
import firebaseApp from "../../../firebase/firebase";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import MenuItem from "../../menu-item/menuItem";
import AgregarItem from "../../agregarItem/agregarItem";
import toast, { Toaster } from "react-hot-toast";
import ItemSeccion from "./itemSeccion/itemSeccion";

function Secciones({ item, setArray, arrayItems }) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);
  const [editarPrecio, setEditarPrecio] = useState(false);
  const [precioNuevo, setPrecioNuevo] = useState(null);
  const [urlNueva, setUrlNueva] = useState(null);

  const editPrecio = async (e) => {
    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    //Filtrado del item a editar y el resto de items
    const itemFiltrado = item.seccionItems.filter((item, i) => item.id === e);
    const indexItemFiltrado = item.seccionItems.findIndex(
      (item, i) => item.id === e
    );
    const otrosItems = item.seccionItems.filter((item, i) => item.id !== e);

    //Verificamos si hay cambios que hacer
    if (precioNuevo) {
      itemFiltrado[0].precio = precioNuevo;
    }
    if (urlNueva) {
      itemFiltrado[0].img = urlNueva;
    }

    //creamos el nuevo array con el item ya editado y traemos las otras secciones
    otrosItems.splice(indexItemFiltrado, 0, itemFiltrado[0]);

    const otraSecciones = infoDocu.items.filter(
      (a, i) => a.seccion !== item.seccion
    );

    //Vemos que index es la seccion actual
    const lugarArray = infoDocu.items.findIndex(
      (e) => e.seccion === item.seccion
    );

    //Creamos el array completo de las secciones
    otraSecciones.splice(lugarArray, 0, {
      seccion: item.seccion,
      seccionItems: otrosItems,
      id: item.id,
    });

    //Actualizamos la base de datos
    if (precioNuevo || urlNueva) {
      updateDoc(docRef, { items: [...otraSecciones] });

      setArray(otraSecciones);
      setPrecioNuevo(null);
      setUrlNueva(null);
      toast.success("Item Actualizado");
    } else {
      setPrecioNuevo(null);
      setUrlNueva(null);
      toast.error("Ingrese un Valor valido");
    }
  };

  const deleteItem = async (e) => {
    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const deleteItem = item.seccionItems.filter((item) => item.id != e);

    const newArray = infoDocu.items.filter(
      (a, i) => a.seccion !== item.seccion
    );
    const lugarArray = infoDocu.items.findIndex(
      (a) => a.seccion === item.seccion
    );

    newArray.splice(lugarArray, 0, {
      seccion: item.seccion,
      seccionItems: deleteItem,
      id: +new Date(),
    });

    updateDoc(docRef, { items: [...newArray] });
    setArray(newArray);
    toast.success("Item Eliminado");
  };

  const deleteSeccion = async () => {
    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    //filtramos las secciones que no son esta
    const pepee = infoDocu.items.filter((e, i) => e.seccion !== item.seccion);

    //Updateamos base de datos y estado
    updateDoc(docRef, { items: [...pepee] });
    setArray(pepee);
  };

  const showArray = () => {
    setShow(!show);
  };

  const cambioPrecio = (e) => {
    setPrecioNuevo(e.target.value);
    console.log(precioNuevo);
  };

  {
    /* Mapeamos los items individuales */
  }

  return (
    <div className="arrayitem" id={item.seccion}>
      <h2 className="arrayitem__title">{item.seccion}:</h2>
      <div className="array__verMas" onClick={showArray}>
        {show ? (
          <>
            <IoIosArrowUp className="array__arrow" />
            <h3>Ocultar Productos</h3>
          </>
        ) : (
          <>
            <IoIosArrowDown className="array__arrow" />
            <h3>Ver Productos</h3>
          </>
        )}
      </div>
      {show &&
        item.seccionItems.map((item, i) => {
          return (
            <ItemSeccion
              item={item}
              setArray={setArray}
              deleteItem={deleteItem}
              editPrecio={editPrecio}
              setPrecioNuevo={setPrecioNuevo}
              setUrlNueva={setUrlNueva}
            />
          );
        })}
      <div className="agregar__item">
        <button className="delete__seccion" onClick={deleteSeccion}>
          Eliminar Seccion
        </button>
        <AgregarItem array={item} setArray={setArray} />
      </div>

      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default Secciones;
