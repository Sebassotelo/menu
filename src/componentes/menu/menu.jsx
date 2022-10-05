import React from "react";
import "./menu.css";
import MenuItem from "../menu-item/menuItem";

function Menu() {
  return (
    <div className="menu">
      <div className="hambur">
        <p className="menu__title">Hamburguesas:</p>
        <MenuItem title={"cheese"} precio={600} id={1} />
        <MenuItem title={"bacon"} precio={650} id={2} />
        <MenuItem title={"clasic"} precio={500} id={3} />
      </div>
    </div>
  );
}

export default Menu;
