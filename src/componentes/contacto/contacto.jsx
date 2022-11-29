import React, { useState, useContext, useEffect } from "react";
import "./contacto.css";
import CarroContext from "../../context/carro/carroContext";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

function Contacto() {
  const context = useContext(CarroContext);
  const [show, setShow] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_kl6yrj9",
        "template_ivb177r",
        e.target,
        "3v7W1-5pYl5Q_8HJz"
      )
      .then(() => toast.success("Mensaje Enviado"))
      .catch((err) => toast.error("Mensaje no Enviado"));
    e.target.formContainerAsunto.value = "";
    e.target.formContainerMensaje.value = "";
    setShow(false);
  };

  return (
    <div className="contacto__form">
      {show ? (
        <>
          <h3 className="contacto__h3">Contactanos</h3>
          <form action="" className="form__container" onSubmit={sendEmail}>
            <p className="form__container__subtitle">Email:</p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form__container__input"
              value={context.user.email}
              readOnly
            />

            <p className="form__container__subtitle">Asunto:</p>
            <input
              type="text"
              name="asunto"
              id="formContainerAsunto"
              placeholder="Asunto"
              className="form__container__input"
              required
            />
            <p className="form__container__subtitle">Mensaje:</p>
            <textarea
              type="text"
              name="mensaje"
              id="formContainerMensaje"
              placeholder="Mensaje"
              className="form__container__input msj"
              minLength={20}
              required
            />
            <button type="submit" className="form__container__submit">
              Enviar
            </button>
            <AiOutlineClose
              className="form__container__close"
              onClick={() => setShow(false)}
            />
          </form>{" "}
        </>
      ) : (
        <div className="btn__form__contact">
          {" "}
          <h3>Tenes alguna duda o problema?</h3>
          <p className="btn__form__p" onClick={() => setShow(true)}>
            Mandanos un Mensaje
          </p>
          <p>Te responderemos lo mas pronto posible</p>
        </div>
      )}
      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default Contacto;
