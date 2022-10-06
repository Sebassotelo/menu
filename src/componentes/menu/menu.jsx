import React from "react";
import "./menu.css";
import MenuItem from "../menu-item/menuItem";

function Menu() {
  return (
    <div className="menu">
      <div className="hambur">
        <p className="menu__title">Hamburguesas:</p>
        <MenuItem title={"Cheese"} precio={600} id={0} />
        <MenuItem title={"Bacon"} precio={650} id={1} />
        <MenuItem title={"Classic"} precio={500} id={2} />
        <p className="menu__title">Bebidas:</p>
        <MenuItem title={"Coca Cola"} precio={150} id={3} />
        <MenuItem title={"Pepsi"} precio={130} id={4} />
      </div>
    </div>
  );
}

export default Menu;
