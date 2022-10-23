import React, { useState, useContext, useEffect } from "react";
import "./menu.css";
import CarroContext from "../../context/carro/carroContext";
import MenuItem from "../menu-item/menuItem";
import { Link, animateScroll as scroll } from "react-scroll";
import { AiOutlineArrowUp } from "react-icons/ai";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase/firebase";

function Menu() {
  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const { setUser, setMenuCompleto } = useContext(CarroContext);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    console.log("menu", context.infoPublica.items);
    setMenu(context.infoPublica.items);
  }, [context]);

  return (
    <div className="menu">
      <h3 className="menu__h3">MENU</h3>
      <div className="menu__navbar">
        {menu &&
          menu.map((a, i) => {
            return (
              <Link
                className="menu__link"
                to={a.seccion}
                spy={true}
                smooth={true}
                duration={500}
              >
                {a.seccion}
              </Link>
            );
          })}
      </div>
      <div className="hambur">
        {menu &&
          menu.map((item, i) => {
            return (
              <div id={item.seccion}>
                <p className="menu__title" id="burger">
                  {item.seccion}:
                </p>
                <div className="menu__seccionItems">
                  {item.seccionItems &&
                    item.seccionItems.map((item, i) => {
                      return (
                        <>
                          <MenuItem
                            title={item.title}
                            precio={item.precio}
                            desc={item.desc}
                            img={item.img}
                            id={item.id}
                          />
                        </>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>

      <Link
        className="menu__top"
        to="perfil"
        spy={true}
        smooth={true}
        duration={500}
      >
        <AiOutlineArrowUp className="menu__top__item" />
      </Link>
    </div>
  );
}

export default Menu;
