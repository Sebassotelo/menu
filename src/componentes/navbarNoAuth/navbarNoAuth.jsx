import React, { useState, useContext, useEffect, useRef } from "react";
import "./navbarNoAuth.css";
import CarroContext from "../../context/carro/carroContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";

function NavbarNoAuth() {
  const context = useContext(CarroContext);
  const googleProvider = new GoogleAuthProvider();
  const { setUser, setEstadoUsuario } = useContext(CarroContext);

  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (show === false) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }

    if (window.innerWidth < 900) {
      setMobile(false);
    } else {
      setMobile(true);
    }
    console.log(window.innerWidth);
  }, [show, window.innerWidth]);

  return (
    <>
      <div className="navbar__noAuth">
        <ul className="nabvar__ul">
          <Link
            className="navbar__item"
            to={"header"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Home
          </Link>
          <Link
            className="navbar__item"
            to={"about"}
            spy={true}
            smooth={true}
            duration={500}
          >
            ¿Como funciona?
          </Link>
          <Link
            className="navbar__item"
            to={"precio"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Precios
          </Link>
          <Link
            className="navbar__item"
            to={"clientes"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Clientes
          </Link>
        </ul>
        <div
          onClick={() => signInWithPopup(context.auth, googleProvider)}
          className="loggin"
        >
          {" "}
          <FcGoogle className="loggin__google" />
          <p>Acceder con Google</p>
        </div>
      </div>

      {show ? (
        <div className="navbar__noAuth__mobile__container">
          <div className="navbar__noAuth__mobile">
            <ul className="nabvar__ul__mobile">
              <Link
                className="navbar__item__mobile"
                to={"header"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Home
              </Link>
              <Link
                className="navbar__item__mobile"
                to={"about"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                ¿Como funciona?
              </Link>
              <Link
                className="navbar__item__mobile"
                to={"precio"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Precios
              </Link>
              <Link
                className="navbar__item__mobile"
                to={"clientes"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Clientes
              </Link>
            </ul>
            <div
              onClick={() => {
                signInWithPopup(context.auth, googleProvider);
                setShow(false);
              }}
              className="loggin__mobile"
            >
              {" "}
              <FcGoogle className="loggin__google" />
              <p>Acceder con Google</p>
            </div>
            <VscClose
              className="navNoAuthClose"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
      ) : (
        <div className="navNoAuth">
          <BiMenu className="noAuth__icon" onClick={() => setShow(true)} />
        </div>
      )}
    </>
  );
}

export default NavbarNoAuth;
