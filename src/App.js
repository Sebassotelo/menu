import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//CONTEXT
import CarroState from "./context/carro/carroState";

//Rutas
import MenuView from "./routes/menuView/menuView";
import HomeView from "./routes/homeView/homeView";
import AccountView from "./routes/accountView/accountView";

function App() {
  return (
    <CarroState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="menu" element={<MenuView />} />
          <Route path="account" element={<AccountView />} />
        </Routes>
      </BrowserRouter>
      <section id="footer">
        <p className="footer">
          Creado por{" "}
          <a href="https://portfolio-tan-delta.vercel.app/" target={"_blank"}>
            <span>Sebas Sotelo</span>
          </a>{" "}
        </p>
      </section>
    </CarroState>
  );
}

export default App;
