import React, { useState, useContext, useEffect } from "react";
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
        <MenuItem
          title={"Cheese"}
          precio={600}
          id={0}
          img={
            "https://laopinion.com/wp-content/uploads/sites/3/2021/09/Hamburguesa-Jonathan-Borba-en-Pexels.jpg?quality=80&strip=all&w=1200"
          }
        />
        <MenuItem
          title={"Bacon"}
          precio={650}
          id={1}
          img={
            "https://i.pinimg.com/736x/10/b7/70/10b770b563cd3d43f90b4cc6d82edae8.jpg"
          }
        />
        <MenuItem
          title={"Classic"}
          precio={500}
          id={2}
          img={
            "https://media-cdn.tripadvisor.com/media/photo-s/22/1e/fb/58/streat-burger.jpg"
          }
        />

        <p className="menu__title" id="bebidas">
          Bebidas:
        </p>
        <MenuItem
          title={"Coca Cola"}
          precio={150}
          id={3}
          img={
            "https://laopinion.com/wp-content/uploads/sites/3/2019/10/coca-cola-sabor-botella-vidrio.jpg?quality=60&strip=all&w=768&h=512&crop=1"
          }
        />
        <MenuItem
          title={"Pepsi"}
          precio={130}
          id={4}
          img={
            "https://st3.depositphotos.com/1063437/18649/i/450/depositphotos_186494780-stock-photo-plastic-bottles-of-carbonated-soft.jpg"
          }
        />

        <p className="menu__title" id="promos">
          Promos:
        </p>
        <MenuItem
          title={"Cheese + Pepsi"}
          precio={700}
          id={5}
          img={"https://i.imgur.com/YbaXTqU.jpg"}
        />
        <MenuItem
          title={"Bacon + Coca"}
          precio={750}
          id={6}
          img={"https://i.imgur.com/ehKJ5NV.jpg"}
        />
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
