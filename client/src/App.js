import { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, NavLink } from "react-router-dom";
import Status from "./components/Status";
import Notes from "./components/Notes";
import User from "./contexts/user";
import Login from "./views/Login";
import Registro from "./views/Registro";
import './App.css';

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
          <Route path="/" exact element={
            <main>
              <h1>Training notes</h1>
              {!signedIn && <p>Debe iniciar sesión o registrarse</p>}
              <nav className="secondary">
                {signedIn && (
                  <NavLink to="/notes">
                    Ir a notas
                  </NavLink>
                )}{" "}
                {!signedIn && (
                  <NavLink to="/login">
                    Iniciar sesión
                  </NavLink>
                )}{" "}
                {!signedIn && (
                  <NavLink to="/register">
                    Registrarse
                  </NavLink>
                )}
              </nav>
              <p>
                Estado del servidor:
                {loading ? " Cargando..." : <Status status={status} />}
              </p>
            </main>
          }>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Registro/>}></Route>

          {signedIn && <Route path="/notes" element={<Notes/>} /> }
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </User.Provider>
  );
};

export default App;
