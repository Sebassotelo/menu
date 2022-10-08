import React, { useState, useContext, useEffect } from "react";
import "./menuItem.css";

import { MdAdd, MdRemove } from "react-icons/md";

import CarroContext from "../../context/carro/carroContext";

function MenuItem({ title, precio, id, img }) {
  const [cantidad, setCantidad] = useState(1);
  const [popUp, setPopUp] = useState(false);

  const { addCarrito, actuCarrito } = useContext(CarroContext);
  const contexto = useContext(CarroContext);

  const sumCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const restCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const manejarCarrito = (ped) => {
    if (contexto.carrito.find((e) => e.id === id)) {
      contexto.carrito.find((e) => e.id === id).cant += cantidad;
      setCantidad(1);

      actuCarrito();
    } else {
      if (cantidad > 0) {
        addCarrito(ped);
        setCantidad(1);
        actuCarrito();
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
    if (popUp === false) {
      setPopUp(true);
    } else {
      setPopUp(false);
    }

    if (popUp === true) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      {" "}
      <div className="menu__item">
        <div className="item__info" onClick={showPopUp}>
          <h3>{title}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            explicabo eius nihil facere eos debitis ullam praesentium, unde
          </p>
          <p>
            <span> </span>
          </p>
        </div>

        <div className="item__precio">
          <p className="precio">${precio}</p>
          <div className="cantidad__container">
            <div className="cantidad">
              <MdRemove className="precio__icon" onClick={restCantidad} />
              <p>{cantidad}</p>
              <MdAdd className="precio__icon" onClick={sumCantidad} />
            </div>

            <button className="agregarItem" onClick={manejarPedido}>
              AGREGAR
            </button>
          </div>
        </div>
      </div>
      <div className={popUp ? "popup" : "popup__none"}>
        <div className="popup__img">
          {img ? <img src={img} alt="" /> : <p>Sin foto</p>}
        </div>
        <div className="popup__info">
          <div className="popup__info__container">
            <div className="">
              <h3 className="popup__info__title">{title}</h3>
              <p className="popup__precio">${precio}</p>
            </div>
            <div className=" popup__info__agregar" onClick={showPopUp}>
              <div className="agregarItem" onClick={manejarPedido}>
                AGREGAR
              </div>
            </div>
          </div>
          <p>Descripcion:</p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            explicabo eius nihil facere eos debitis ullam praesentium, unde
          </p>
        </div>
        <div className="popup__close" onClick={showPopUp}>
          <p>Cerrar</p>
        </div>
      </div>
    </>
  );
}

export default MenuItem;
