import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//CONTEXT
import CarroState from "./context/carro/carroState";

//Rutas
import MenuView from "./routes/menuView/menuView";
import HomeView from "./routes/homeView/homeView";
import AccountView from "./routes/accountView/accountView";
import AccountConfigView from "./routes/accountConfigView/accountConfigView";

function App() {
  return (
    <CarroState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path=":username" element={<MenuView />} />
          <Route path="account" element={<AccountView />} />
          <Route path="account/config" element={<AccountConfigView />} />
        </Routes>
      </BrowserRouter>
      <section id="footer">
        <p className="footer">
          Creado por{" "}
          <a href="https://www.sebassotelo.com.ar/" target={"_blank"}>
            <span>Sebas Sotelo</span>
          </a>{" "}
        </p>
      </section>
    </CarroState>
  );
}

export default App;
