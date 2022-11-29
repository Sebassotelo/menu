import React, { useState, useContext, useEffect, useRef } from "react";
import "./menuItem.css";

import { MdAdd, MdRemove } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import CarroContext from "../../context/carro/carroContext";
import toast, { Toaster } from "react-hot-toast";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

function MenuItem({ title, precio, id, img, desc }) {
  const firestore = getFirestore();
  const [cantidad, setCantidad] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [cerrarPop, setCerrarPop] = useState(false);
  const [showImg, setShowImg] = useState(null);

  const { addCarrito, actuCarrito } = useContext(CarroContext);
  const context = useContext(CarroContext);

  const refOne = useRef(null);

  const sumCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const restCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const manejarCarrito = (ped) => {
    if (context.carrito.find((e) => e.id === id)) {
      context.carrito.find((e) => e.id === id).cant += cantidad;
      setCantidad(1);
      toast(`${cantidad} ${title} agregado al carrito`, {
        icon: "🛒",
      });
      actuCarrito();
    } else {
      if (cantidad > 0) {
        addCarrito(ped);
        setCantidad(1);
        actuCarrito();
        toast(`${cantidad} ${title} agregado al carrito`, {
          icon: "🛒",
        });
      }
    }
  };

  const manejarPedido = () => {
    const ped = {
      titulo: title,
      precio: precio,
      cant: cantidad,
      id: id,
    };
    manejarCarrito(ped);
  };

  const showPopUp = () => {
    setCerrarPop(!cerrarPop);
    if (popUp === false) {
      setPopUp(true);
    } else {
      setPopUp(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickoutside, true);
    if (popUp === false) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    mostrarImg();
  }, [popUp]);

  const clickoutside = (e) => {
    if (!refOne?.current.contains(e.target)) {
      setPopUp(false);
    }
  };

  let mostrar;

  const mostrarImg = async () => {
    const docRef = collection(firestore, `users`);
    const q = query(
      docRef,
      where("username", "==", context.infoPublica.username)
    );
    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => (mostrar = doc.data()));
    if (img) {
      if (mostrar.premium) {
        setShowImg(true);
      }
    }
  };

  return (
    <>
      {" "}
      <div className="menu__item" style={context.style.compProd}>
        {showImg ? (
          <div
            onClick={showPopUp}
            className="item__img"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ) : null}
        <div
          className="item__info"
          onClick={showPopUp}
          id="itemInfo"
          style={!showImg ? { gridColumn: "1/3" } : { gridColumn: "2/3" }}
        >
          <h3>{title}</h3>
          <p>{desc}</p>
          <p>
            <span> </span>
          </p>
        </div>

        <div className="item__precio">
          <div className="cantidad__container">
            <div className="cantidad">
              <MdRemove className="precio__icon" onClick={restCantidad} />
              <p>{cantidad}</p>
              <MdAdd className="precio__icon" onClick={sumCantidad} />
            </div>
            <button className="agregarItem" onClick={manejarPedido}>
              <BsCartPlus className="precio__icon" />
              <p>${precio}</p>
            </button>
          </div>
        </div>
      </div>
      <div className={popUp ? "popup__container" : "popup__container_none"}>
        <div
          className={showImg ? "popup" : "popup__sinFoto"}
          id="popup"
          ref={refOne}
        >
          {showImg ? (
            <div className="popup__img">
              <img src={img} alt="" />
            </div>
          ) : (
            ""
          )}
          <div className="popup__info">
            <div className="popup__info__container">
              <div className="">
                <h3 className="popup__info__title">{title}</h3>
                <p className="popup__precio">${precio}</p>
              </div>
              <div className=" popup__info__agregar" onClick={showPopUp}>
                <button className="agregarItem" onClick={manejarPedido}>
                  <BsCartPlus className="precio__icon" />
                  <p>${precio}</p>
                </button>
              </div>
            </div>
            <p>Descripcion:</p>
            <p> {desc}</p>
          </div>
          <div className="popup__close" onClick={showPopUp}>
            <AiOutlineClose />
          </div>
        </div>
      </div>
      <Toaster position="top-center" className="notificacion" />
    </>
  );
}

export default MenuItem;
