import React, { useState, useContext, useEffect, useRef } from "react";
import "./navbarMobile.css";
import CarroContext from "../../context/carro/carroContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { VscAccount, VscSignOut } from "react-icons/vsc";

import { FaHome } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function NavbarMobile() {
  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const { setUser } = useContext(CarroContext);
  const [show, setShow] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const usuarioCreado = () => {
    console.log(context.estadoUsuario);
    if (context.estadoUsuario > 1) {
      navigate(`/${context.usuario}`);
    }
  };
  // <div className="navbar__img">
  //   {/* <img src={context.user.photoURL} alt="" /> */}
  //   <p>{context.user ? context.user.displayName : ""}</p>
  // </div>;

  useEffect(() => {}, []);

  if (context.estadoUsuario > 0) {
    return (
      <div className={context.user ? "navbar__mobile" : "navbar__none"}>
        <ul className="botonera__mobile" style={{ top: show ? "0" : "-400px" }}>
          <div className="botonera__mobile__container">
            {" "}
            <AiOutlineHome
              onClick={() => navigate("/")}
              className="botonera__icon"
            />
          </div>
          <div className="botonera__mobile__container">
            <BiFoodMenu onClick={usuarioCreado} className="botonera__icon" />
          </div>
          <div className="botonera__mobile__container">
            <VscAccount
              onClick={() => navigate("/account")}
              className="botonera__icon"
            />
          </div>
          <div className="botonera__mobile__container">
            <VscSignOut
              onClick={() => signOut(context.auth)}
              className="botonera__icon"
            />
          </div>
        </ul>
      </div>
    );
  }
}

export default NavbarMobile;
