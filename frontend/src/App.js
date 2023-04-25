import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login/Login";
import DumpForm from "./components/DumpForm/DumpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard";
import Dump from "./components/Dump/Dump";
import Register from "./components/Login/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<DumpForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/d/:id" element={<Dump />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
