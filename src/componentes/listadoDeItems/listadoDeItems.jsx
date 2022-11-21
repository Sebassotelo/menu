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

import { FaGripVertical } from "react-icons/fa";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ListadoDeItems({ arrayItems, setArray }) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);
  useEffect(() => {}, []);

  const reordenarArray = (result) => {
    if (!result.destination) return;
    if (result.destination === result.source) {
      return;
    } else {
      const newArray = arrayItems;
      const [reorder] = newArray.splice(result.source.index, 1);
      newArray.splice(result.destination.index, 0, reorder);
      setArray(newArray);
      const docRef = doc(firestore, `users/${context.user.email}`);
      updateDoc(docRef, { items: newArray });
    }
  };

  return (
    <div className="arrayContainer">
      {/*Mapeamos el items entero */}

      <div className="navbar__secciones">
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
      <DragDropContext onDragEnd={reordenarArray}>
        <Droppable droppableId="lista">
          {(provider) => (
            <>
              <div {...provider.droppableProps} ref={provider.innerRef}>
                {arrayItems &&
                  arrayItems.map((item, i) => {
                    return (
                      <>
                        <Draggable
                          key={item.id.toString()}
                          draggableId={item.id.toString()}
                          {...provider.dragHandleProps}
                          index={i}
                        >
                          {(provider) => (
                            <div
                              ref={provider.innerRef}
                              {...provider.draggableProps}
                            >
                              <div
                                className="reordenar__icon"
                                {...provider.dragHandleProps}
                              >
                                <FaGripVertical />
                              </div>

                              <Secciones
                                item={item}
                                setArray={setArray}
                                arrayItems={arrayItems}
                              />
                            </div>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
              </div>
              {provider.placeholder}
            </>
          )}
        </Droppable>
        <Toaster position="top-center" className="notificacion" />
      </DragDropContext>
    </div>
  );
}

export default ListadoDeItems;
