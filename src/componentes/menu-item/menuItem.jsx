import React, { useState, useContext, useEffect } from "react";
import "./menuItem.css";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import CarroContext from "../../context/carro/carroContext";

function MenuItem({ title, precio, id }) {
  const [cantidad, setCantidad] = useState(1);

  const { addCarrito, actuCarrito } = useContext(CarroContext);
  const contexto = useContext(CarroContext);

  const sumCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const restCantidad = () => {
    if (cantidad > 0) {
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

  return (
    <div className="menu__item">
      <div className="item__info">
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
            <IoIosRemoveCircleOutline
              className="precio__icon"
              onClick={restCantidad}
            />
            <p>{cantidad}</p>
            <IoIosAddCircleOutline
              className="precio__icon"
              onClick={sumCantidad}
            />
          </div>

          <button className="agregarItem" onClick={manejarPedido}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
