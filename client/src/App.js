import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Status from "./components/Status";
import FormAuthentication from "./components/FormAuthentication";
import Notes from "./components/Notes";

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  // Mostramos la aplicación
  return (
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
        <Route path="/notes" element={<Notes/>} />
      </Routes>
    </Router>
  );
};

export default App;
