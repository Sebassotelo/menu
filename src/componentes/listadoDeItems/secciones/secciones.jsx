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
  const [showPosicion, setShowPosicion] = useState(false);

  const editPrecio = async (e) => {
    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const itemFiltrado = item.seccionItems.filter((item, i) => item.id === e);
    const otrosItems = item.seccionItems.filter((item, i) => item.id !== e);

    if (precioNuevo) {
      itemFiltrado[0].precio = precioNuevo;
    }

    console.log(itemFiltrado);

    const newArray = [...otrosItems, itemFiltrado[0]];
    const otraSecciones = infoDocu.items.filter(
      (a, i) => a.seccion !== item.seccion
    );

    const newSeccion = [
      ...otraSecciones,
      {
        seccion: item.seccion,
        seccionItems: newArray,
        id: item.id,
      },
    ];
    if (precioNuevo) {
      updateDoc(docRef, { items: [...newSeccion] });
      const arrayOrdenado = newSeccion.sort((a, b) => {
        if (a.seccion < b.seccion) {
          return -1;
        } else if (a.seccion > b.seccion) {
          return 1;
        } else {
          return 0;
        }
      });
      setPrecioNuevo(null);
      setArray(arrayOrdenado);
      toast.success("Precio Actualizado");
    } else {
      setPrecioNuevo(null);
      console.log(precioNuevo);
      toast.error("Ingrese un Precio valido");
    }
  };

  const deleteItem = async (e) => {
    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    const deleteItem = item.seccionItems.filter((item) => item.id != e);

    const pepe = infoDocu.items.filter((a, i) => a.seccion !== item.seccion);

    const newArray = [
      ...pepe,
      {
        seccion: item.seccion,
        seccionItems: deleteItem,
        id: +new Date(),
      },
    ];

    updateDoc(docRef, { items: [...newArray] });
    const arrayOrdenado = newArray.sort((a, b) => {
      if (a.seccion < b.seccion) {
        return -1;
      } else if (a.seccion > b.seccion) {
        return 1;
      } else {
        return 0;
      }
    });
    setArray(arrayOrdenado);
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

  const reorderPrimerLugar = () => {
    const itemFiltrado = arrayItems.filter((e) => e.seccion === item.seccion);

    if (itemFiltrado[0].seccion !== arrayItems[0].seccion) {
      const seccFiltrada = arrayItems.filter(
        (e, i) => e.seccion !== item.seccion
      );

      seccFiltrada.splice(0, 0, itemFiltrado[0]);

      setArray(seccFiltrada);
      const docRef = doc(firestore, `users/${context.user.email}`);
      updateDoc(docRef, { items: [...seccFiltrada] });
      toast.success("Seccion Guardada");
    } else {
      toast.error("Ya se encuentra en ese lugar");
    }
  };
  const reorderSegundoLugar = () => {
    const itemFiltrado = arrayItems.filter((e) => e.seccion === item.seccion);

    if (itemFiltrado[0].seccion !== arrayItems[1].seccion) {
      const seccFiltrada = arrayItems.filter(
        (e, i) => e.seccion !== item.seccion
      );

      seccFiltrada.splice(1, 0, itemFiltrado[0]);

      setArray(seccFiltrada);
      const docRef = doc(firestore, `users/${context.user.email}`);
      updateDoc(docRef, { items: [...seccFiltrada] });
      toast.success("Seccion Guardada");
    } else {
      toast.error("Ya se encuentra en ese lugar");
    }
  };
  const reorderTercerLugar = () => {
    const itemFiltrado = arrayItems.filter((e) => e.seccion === item.seccion);
    if (itemFiltrado[0].seccion !== arrayItems[2].seccion) {
      const seccFiltrada = arrayItems.filter(
        (e, i) => e.seccion !== item.seccion
      );

      seccFiltrada.splice(2, 0, itemFiltrado[0]);

      setArray(seccFiltrada);
      const docRef = doc(firestore, `users/${context.user.email}`);
      updateDoc(docRef, { items: [...seccFiltrada] });
      toast.success("Seccion Guardada");
    } else {
      toast.error("Ya se encuentra en ese lugar");
    }
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
            />
          );
        })}
      <div className="agregar__item">
        <button className="delete__seccion" onClick={deleteSeccion}>
          Eliminar Seccion
        </button>
        <AgregarItem array={item} setArray={setArray} />
      </div>
      <div className="ordenar__seccions">
        {!showPosicion && (
          <p onClick={() => setShowPosicion(true)}>Cambiar de Posicion</p>
        )}
        {showPosicion && (
          <>
            <div className="ordenar__p">
              <p
                onClick={() => {
                  setShowPosicion(false);
                  reorderPrimerLugar();
                }}
              >
                1ero
              </p>
              <p
                onClick={() => {
                  setShowPosicion(false);
                  reorderSegundoLugar();
                }}
              >
                2do
              </p>
              <p
                onClick={() => {
                  setShowPosicion(false);
                  reorderTercerLugar();
                }}
              >
                3ero
              </p>
            </div>
            <p onClick={() => setShowPosicion(false)}>Cancelar</p>{" "}
          </>
        )}
      </div>
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default Secciones;
