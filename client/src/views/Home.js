import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import User from "../contexts/user";
import store from "../store";
import * as identificacionActions from "../actions/identificacion";

/**
 * Pagina principal
 */
const Home = () => {
  const user = useContext(User);
  
  let token;
  const unsubscribe = store.subscribe(() => {
    if (store.getState().token != null) {
      console.log(
        `${store.getState().token}`
      );
      token = store.getState().token;
    } else {
      console.log(store.getState());
    }
  });
  
  store.dispatch(identificacionActions.getToken());

  useEffect(() => {
    if(token)
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
