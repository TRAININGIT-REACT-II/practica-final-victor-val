import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import User from "../contexts/user";

/**
 * Pagina principal
 */
const Home = () => {
  const user = useContext(User);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    user.updateUser(true);
  }, [token]);

  return (
    <main>
      <h1>Training notes</h1>
      {!user.signedIn && <p>Debe iniciar sesión o registrarse</p>}
      <nav className="secondary">
        {user.signedIn && 
        (
          <NavLink to="/notes">
            Ir a notas
          </NavLink>
        )}{" "}
        {!user.signedIn && (
          <NavLink to="/login">
            Iniciar sesión
          </NavLink>
        )}{" "}
        {!user.signedIn && (
          <NavLink to="/register">
            Registrarse
          </NavLink>
        )}
      </nav>
    </main>
  );
}

export default Home;
