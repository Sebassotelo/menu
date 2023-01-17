import React from "react";
import "./cartPremium.css";

function CartPremium({ title, precio, premium, extra }) {
  return (
    <div className="cart__premium">
      <div className="cart__title">
        <h3 className="cart__h3">{title}</h3>
        <p className="cart__p">${precio}ARS Por mes</p>
      </div>

      <div className="body__cart">
        <p className="body__cart__item">
          <span>✓</span> Menu Publico
        </p>
        <p className="body__cart__item">
          <span>✓</span> Usuario Personalizado
        </p>
        <p className="body__cart__item">
          <span>✓</span> Secciones ilimitadas
        </p>
        <p className="body__cart__item">
          <span>✓</span> Productos ilimitados
        </p>
        <p className="body__cart__item">
          <span>✓</span> Link a WhatsApp con pedido copiado y pegado en el chat
        </p>
        {premium ? (
          <>
            <p className="body__cart__item">
              <span>✓</span> Poder subir la foto del Producto
            </p>
            <p className="body__cart__item">
              <span>✓</span> Personalizacion de Fondo de menu
            </p>
            <p className="body__cart__item">
              <span>✓</span> Personalizacion de Colores del Menu
            </p>
          </>
        ) : (
          ""
        )}

        {extra && <div className="loggin__cart">{extra}</div>}
      </div>
      {premium && (
        <div className="cart__descripcion__premium">
          <p>
            Al contratar premium se usa el servicio de suscripcion de
            MercadoPago. Este se puede cancelar en cualquier momento a travez de
            esta misma aplicacion.
          </p>
        </div>
      )}
    </div>
  );
}

export default CartPremium;
