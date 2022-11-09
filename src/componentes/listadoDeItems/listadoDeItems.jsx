import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./listadoDeItems.css";
import firebaseApp from "../../firebase/firebase";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import MenuItem from "../menu-item/menuItem";
import AgregarItem from "../agregarItem/agregarItem";
import toast, { Toaster } from "react-hot-toast";
import Secciones from "./secciones/secciones";

function ListadoDeItems({ arrayItems, setArray }) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);
  useEffect(() => {}, []);

  return (
    <div className="arrayContainer">
      {/*Mapeamos el items entero */}

      <div className="navbar__secciones">
        <h3>Secciones</h3>
        <div className="menu__navbar secciones">
          {arrayItems &&
            arrayItems.map((a, i) => {
              return (
                <Link
                  className="menu__link"
                  style={{ backgroundColor: "white" }}
                  to={a.seccion}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {a.seccion}
                </Link>
              );
            })}
        </div>
      </div>

      {arrayItems &&
        arrayItems.map((item, i) => {
          return (
            <>
              <Secciones
                item={item}
                setArray={setArray}
                arrayItems={arrayItems}
              />
            </>
          );
        })}
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default ListadoDeItems;
