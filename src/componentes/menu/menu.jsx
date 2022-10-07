import React from "react";
import "./menu.css";
import MenuItem from "../menu-item/menuItem";
import { Link, animateScroll as scroll } from "react-scroll";
import { AiOutlineArrowUp } from "react-icons/ai";

function Menu() {
  return (
    <div className="menu">
      <h3 className="menu__h3">MENU</h3>
      <div className="menu__navbar">
        <Link
          className="menu__link"
          to="hambur"
          spy={true}
          smooth={true}
          duration={500}
        >
          Hamburguesas
        </Link>
        <Link
          className="menu__link"
          to="bebidas"
          spy={true}
          smooth={true}
          duration={500}
        >
          Bebidas
        </Link>
        <Link
          className="menu__link"
          to="promos"
          spy={true}
          smooth={true}
          duration={500}
        >
          Promos
        </Link>
      </div>
      <div className="hambur">
        <p className="menu__title" id="burger">
          Hamburguesas:
        </p>
        <MenuItem title={"Cheese"} precio={600} id={0} />
        <MenuItem title={"Bacon"} precio={650} id={1} />
        <MenuItem title={"Classic"} precio={500} id={2} />

        <p className="menu__title" id="bebidas">
          Bebidas:
        </p>
        <MenuItem title={"Coca Cola"} precio={150} id={3} />
        <MenuItem title={"Pepsi"} precio={130} id={4} />

        <p className="menu__title" id="promos">
          Promos:
        </p>
        <MenuItem title={"Cheese + Pepsi"} precio={700} id={5} />
        <MenuItem title={"Bacon + Coca"} precio={750} id={6} />
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
