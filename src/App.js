import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//CONTEXT
import CarroState from "./context/carro/carroState";

//Rutas
import MenuView from "./routes/menuView/menuView";
import HomeView from "./routes/homeView/homeView";
import AccountView from "./routes/accountView/accountView";
import AccountConfigView from "./routes/accountConfigView/accountConfigView";
import ConfirmacionView from "./routes/confirmacionView/confirmacionView";
import { useEffect } from "react";
import Footer from "./componentes/footer/footer";

function App() {
  return (
    <CarroState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path=":username" element={<MenuView />} />
          <Route path="account" element={<AccountView />} />
          <Route path="account/config" element={<AccountConfigView />} />
          <Route
            path="account/confirmacion-de-pago-0521"
            element={<ConfirmacionView />}
          />
        </Routes>
      </BrowserRouter>
      <section id="footer">
        <Footer />
      </section>
    </CarroState>
  );
}

export default App;
