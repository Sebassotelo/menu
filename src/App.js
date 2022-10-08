import "./App.css";
import Perfil from "./componentes/perfil/perfil";
import Menu from "./componentes/menu/menu";

//CONTEXT
import CarroState from "./context/carro/carroState";
import Carrito from "./componentes/carrito/carrito";

function App() {
  return (
    <CarroState>
      <div className="App" id="app">
        <Carrito />

        <section id="perfil">
          <Perfil />
        </section>

        <section id="menu">
          <Menu />
        </section>

        <section id="footer">
          <p className="footer">
            Creado por{" "}
            <a href="https://portfolio-tan-delta.vercel.app/" target={"_blank"}>
              <span>Sebas Sotelo</span>
            </a>{" "}
          </p>
        </section>
      </div>
    </CarroState>
  );
}

export default App;
