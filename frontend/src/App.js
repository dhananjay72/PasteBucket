import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login/Login";
import DumpForm from "./components/DumpForm/DumpForm";

function App() {
  return (
    <>
      <Navbar></Navbar>
      {/* <Login></Login> */}
      <DumpForm />
    </>
  );
}

export default App;
