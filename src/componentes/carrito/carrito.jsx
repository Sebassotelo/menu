import React, { useContext, useEffect, useState } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./carrito.css";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";

function Carrito() {
  const context = useContext(CarroContext);

  const [cuenta, setCuenta] = useState(context.carrito);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [unidades, setUnidades] = useState(0);

  const { setCarrito, actuCarrito } = useContext(CarroContext);

  let totalPrecio = 0;
  let totalUnidades = 0;

  useEffect(() => {
    context.carrito.map((e, i) => {
      totalPrecio = totalPrecio + e.precio * e.cant;
      totalUnidades = totalUnidades + e.cant;
    });
    setTotal(totalPrecio);
    setUnidades(totalUnidades);
    setCuenta(context.carrito);
    console.log(cuenta);
  }, [context.actualizacion]);

  const reset = () => {
    setTotal(0);
    setCarrito([]);
    setCuenta([]);
    setUnidades(0);
    setShow(false);
  };

  const eliminar = (id) => {
    setCarrito(context.carrito.filter((e, i) => e.id !== id));
    actuCarrito();
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
            {cuenta
              .filter((e) => e.cant != 0)
              .map((e, i) => (
                <div className="carrito__item">
                  <p className="carrito__name">
                    {e.cant}X {e.titulo}
                  </p>
                  <p>-------</p>
                  <p className="carrito__precio">${e.precio * e.cant}</p>
                  <AiFillCloseCircle
                    className="carrito__eliminar"
                    onClick={() => eliminar(e.id)}
                  />
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
          {unidades > 0 ? (
            <div className="show__unidades">
              <p>{unidades}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default Carrito;
