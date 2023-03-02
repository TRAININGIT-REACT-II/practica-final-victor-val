import { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Status from "./components/Status";
import FormAuthentication from "./components/FormAuthentication";
import Notes from "./components/Notes";
import PrivateRoute from "./components/PrivateRoute";
import User from "./contexts/user";

// Componente principal de la aplicación.
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
              <h1>Curso de React de TrainingIT</h1>
              <FormAuthentication />
              <p>
                Estado del servidor:
                {loading ? " Cargando..." : <Status status={status} />}
              </p>
            </main>
          }>
          </Route>
          <Route path="/notes" element={<PrivateRoute/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </User.Provider>
  );
};

export default App;
