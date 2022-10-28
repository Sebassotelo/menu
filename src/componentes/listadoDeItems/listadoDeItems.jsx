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

function ListadoDeItems({ arrayItems, setArray }) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);

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
          const deleteItem = async (e) => {
            //traemos los datos de base de datos
            const docRef = doc(firestore, `users/${context.user.email}`);
            const consulta = await getDoc(docRef);
            const infoDocu = consulta.data();

            const deleteItem = item.seccionItems.filter((item) => item.id != e);

            const pepe = infoDocu.items.filter(
              (a, i) => a.seccion !== item.seccion
            );

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
            console.log("obd eliminado", newArray);
          };

          const deleteSeccion = async () => {
            //traemos los datos de base de datos
            const docRef = doc(firestore, `users/${context.user.email}`);
            const consulta = await getDoc(docRef);
            const infoDocu = consulta.data();

            //filtramos las secciones que no son esta
            const pepee = infoDocu.items.filter(
              (e, i) => e.seccion !== item.seccion
            );

            //Updateamos base de datos y estado
            updateDoc(docRef, { items: [...pepee] });
            setArray(pepee);
          };

          {
            /* Mapeamos los items individuales */
          }
          return (
            <div className="arrayitem" id={item.seccion}>
              <h2 className="arrayitem__title">{item.seccion}:</h2>
              {item.seccionItems &&
                item.seccionItems.map((item, i) => {
                  return (
                    <>
                      <MenuItem
                        title={item.title}
                        precio={item.precio}
                        desc={item.desc}
                        img={item.img}
                        id={item.id}
                      />
                      <button
                        className="delete__item"
                        onClick={() => deleteItem(item.id)}
                      >
                        Eliminar Producto
                      </button>
                    </>
                  );
                })}
              <div className="agregar__item">
                <AgregarItem array={item} setArray={setArray} />
              </div>
              <div>
                <button className="delete__seccion" onClick={deleteSeccion}>
                  Eliminar Seccion
                </button>
              </div>
            </div>
          );
        })}
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default ListadoDeItems;
