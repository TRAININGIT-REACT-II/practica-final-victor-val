import { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Status from "./components/Status";
import Notes from "./components/Notes";
import User from "./contexts/user";
import Login from "./views/Login";
import Registro from "./views/Registro";
import './App.css';
import Home from "./views/Home";

const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const [signedIn, setSignedIn] = useState(false);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  // Mostramos la aplicación
  return (
    <User.Provider value={{ signedIn, updateUser: setSignedIn }}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Registro/>}></Route>
          {signedIn && <Route path="/notes" element={<Notes/>} /> }
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
      <p>
        Estado del servidor:
        {loading ? " Cargando..." : <Status status={status} />}
      </p>
    </User.Provider>
  );
};

export default App;
