import React from "react";
import Carrito from "../../componentes/carrito/carrito";
import Perfil from "../../componentes/perfil/perfil";
import Menu from "../../componentes/menu/menu";

function MenuView() {
  return (
    <div className="App" id="app">
      <Carrito />

      <section id="perfil">
        <Perfil />
      </section>

      <section id="menu">
        <Menu />
      </section>
    </div>
  );
}

export default MenuView;
