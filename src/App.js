import "./App.css";
import Perfil from "./componentes/perfil/perfil";
import Menu from "./componentes/menu/menu";

//CONTEXT
import CarroState from "./context/carro/carroState";
import Carrito from "./componentes/carrito/carrito";

function App() {
  return (
    <div className="App">
      <CarroState>
        <Carrito />

        <section id="perfil">
          <Perfil />
        </section>

        <section id="menu">
          <h2>Menu</h2>
          <Menu />
        </section>
      </CarroState>
      <section id="footer"></section>
    </div>
  );
}

export default App;
