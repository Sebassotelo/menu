import React, { useContext, useEffect, useState } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./carrito.css";

function Carrito() {
  const context = useContext(CarroContext);

  const [cuenta, setCuenta] = useState(context.carrito);
  const [actu, setActu] = useState(false);
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

  return (
    <div className="carrito">
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
  );
}

export default Carrito;
