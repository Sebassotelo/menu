import React, { useContext, useEffect, useState } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./carrito.css";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

function Carrito() {
  const context = useContext(CarroContext);

  const [cuenta, setCuenta] = useState(context.carrito);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [realizarPedido, setRealizarPedido] = useState(true);
  const [confirmacion, setConfirmacion] = useState(false);

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

    if (totalUnidades === 0) {
      setConfirmacion(false);
    }
  }, [context.actualizacion]);

  const reset = () => {
    setTotal(0);
    setCarrito([]);
    setCuenta([]);
    setUnidades(0);
    setConfirmacion(false);
    setShow(false);
  };

  const eliminar = (id) => {
    setCarrito(context.carrito.filter((e, i) => e.id !== id));
    actuCarrito();
  };

  const mostrarCarrito = () => {
    setShow(!show);

    if (show === true) {
      document.body.style.overflow = "";
    } else {
      if (window.innerWidth < 900) {
        document.body.style.overflow = "hidden";
      }
    }
  };

  let pedidoCopy = "";
  const copiarAlPortapapeles = () => {
    setRealizarPedido(false);
  };

  const confirmarPedido = () => {
    if (unidades > 0) {
      pedidoCopy = "";
      context.carrito.map(
        (e) =>
          (pedidoCopy =
            pedidoCopy +
            `${e.cant}X ${e.titulo} ----- $${e.precio * e.cant}  \n`)
      );
      pedidoCopy = `Hola, te pido esto:\n\n${pedidoCopy} \nTotal: $${total}`;

      navigator.clipboard.writeText(pedidoCopy);

      toast.success("Pedido copiado al portapapeles");
      console.log(pedidoCopy);

      if (unidades > 0) {
        setConfirmacion(true);
      }

      setRealizarPedido(true);
    } else {
      setRealizarPedido(true);
      toast.error("Agrege items al carrito");
    }
  };

  return (
    <div className="carr">
      {show ? (
        <div className={show ? "carrito hidden" : "carrito"}>
          <div className="close" onClick={mostrarCarrito}>
            <p>Seguir Pidiendo</p>
          </div>
          <h3 className="carrito__title">Carrito</h3>

          <div className="carrito__container" id="cuenta">
            {cuenta
              .filter((e) => e.cant != 0)
              .map((e, i) => (
                <div className="carrito__item">
                  <p className="carrito__name">
                    {e.cant}x {e.titulo}
                  </p>
                  <p className="carrito__name">----</p>
                  <p className="carrito__precio">${e.precio * e.cant}</p>
                  <AiOutlineClose
                    className="carrito__eliminar"
                    onClick={() => eliminar(e.id)}
                  />
                </div>
              ))}
          </div>

          <div className="total__container">
            <button onClick={reset} className="total__reset">
              BORRAR
            </button>
            <h4 className="total">TOTAL: ${total}</h4>

            {realizarPedido ? (
              <button
                className="realizar__pedido"
                onClick={copiarAlPortapapeles}
              >
                Realizar Pedido
              </button>
            ) : (
              <button
                className="realizar__pedido confirmar"
                onClick={confirmarPedido}
              >
                {" "}
                Confirmar{" "}
              </button>
            )}

            {confirmacion ? (
              <div className="realizar__pedido wpp">
                <a href="" target={"_blank"}>
                  Ir a Whatsapp
                </a>
              </div>
            ) : (
              ""
            )}
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

      <Toaster position="bottom-center" className="notificacion" />
    </div>
  );
}

export default Carrito;
