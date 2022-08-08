import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import Register from "./Register";
import Principal from "./Principal";
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import Redirect from "react-dom"
import Navbar from "./Navbar";
import CreateAcoutnPage from "./CreateAcoutnPage";
import Login from "./Login";
import Coment from "./Coment";
import { useNavigate } from "react-router-dom";
import GetPerfil from "./GetPerfil";
import GetCuentas from "./GetCuentas";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/principal" element={<Principal />}></Route>
        <Route path="/createAcount" element={<CreateAcoutnPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/perfil" element={<GetPerfil />}></Route>
        <Route path="/comentCreate" element={<Coment />}></Route>
        <Route path="/getcuenta" element={<GetCuentas />}></Route>
        <Route exact path="/" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
