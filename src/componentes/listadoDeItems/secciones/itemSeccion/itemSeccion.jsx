import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../../../context/carro/carroContext";
import "./itemSeccion.css";
import firebaseApp from "../../../../firebase/firebase";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import MenuItem from "../../../menu-item/menuItem";
import AgregarItem from "../../../agregarItem/agregarItem";
import toast, { Toaster } from "react-hot-toast";

function ItemSeccion({
  item,
  setArray,
  deleteItem,
  editPrecio,
  setPrecioNuevo,
}) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);
  const [editarPrecio, setEditarPrecio] = useState(false);

  const cambioPrecio = (e) => {
    setPrecioNuevo(e.target.value);
  };

  return (
    <>
      <MenuItem
        title={item.title}
        precio={item.precio}
        desc={item.desc}
        img={item.img}
        id={item.id}
      />

      {editarPrecio ? (
        <div className="edit__delete__item">
          <div className="edit__item__container">
            <form
              className="edit__precio"
              onSubmit={() => {
                editPrecio(item.id);
                setEditarPrecio(!editarPrecio);
              }}
            >
              {" "}
              <input
                type="number"
                placeholder="Precio"
                onChange={cambioPrecio}
              />
              <button type="submit" className="guardar__edit">
                Guardar
              </button>
            </form>

            <button
              className="cancelar__edit"
              onClick={() => setEditarPrecio(!editarPrecio)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="edit__delete__item">
          <button className="delete__item" onClick={() => deleteItem(item.id)}>
            Eliminar Producto
          </button>
          <button
            className="delete__item"
            onClick={() => setEditarPrecio(!editarPrecio)}
          >
            Editar Precio
          </button>
        </div>
      )}
    </>
  );
}

export default ItemSeccion;
