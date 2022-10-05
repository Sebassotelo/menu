import React, { useContext, useEffect, useState } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./carrito.css";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";

function Carrito() {
  const context = useContext(CarroContext);

  const [cuenta, setCuenta] = useState(context.carrito);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);

  const { setCarrito, actuCarrito } = useContext(CarroContext);

  useEffect(() => {
    var totalPrecio = 0;
    context.carrito.map((e, i) => {
      totalPrecio = totalPrecio + e.precio * e.cant;
    });
    setTotal(totalPrecio);
    setCuenta(context.carrito);
    console.log(cuenta);
  }, [context.actualizacion]);

  const reset = () => {
    setTotal(0);
    setCarrito([]);
    setCuenta([]);
  };

  const mostrarCarrito = () => {
    setShow(!show);
  };

  return (
    <div className="carr">
      {show ? (
        <div className="carrito">
          <AiFillCloseCircle
            className="show__icon close"
            onClick={mostrarCarrito}
          />
          <h3 className="carrito__title">Carrito</h3>

          <div className="carrito__container">
            {cuenta.map((e, i) => (
              <div className="carrito__item">
                <p className="carrito__name">
                  {e.cant}X {e.titulo}
                </p>
                <p>-------</p>
                <p className="carrito__precio">${e.precio * e.cant}</p>
              </div>
            ))}
          </div>

          <div className="total__container">
            <button onClick={reset} className="total__reset">
              RESET
            </button>
            <h4 className="total">TOTAL: ${total}</h4>
            <button className="realizar__pedido">Realizar Pedido</button>
          </div>
        </div>
      ) : (
        <div onClick={mostrarCarrito} className="show__carrito">
          <AiOutlineShoppingCart className="show__icon" />
        </div>
      )}
    </div>
  );
}

export default Carrito;
