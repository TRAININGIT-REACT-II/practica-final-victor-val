import React, { useContext } from "react";
import { Route, redirect, Routes } from "react-router-dom";
import User from "../contexts/user";

// Obtenemos el componente a renderizar y cualquier otro parámetro
const PrivateRoute = ({ children, ...others }) => {
  // Obtenemos el contexto para saber si el usuario ha hecho login.
  const { signedIn } = useContext(User);

  // Si el usuario está registrado, cargamos el componente de la ruta.
  // Si no, hacemos un redirect a pagina inicio
  return (
    <Routes>
        <Route
        {...others}
        render={() =>
            signedIn ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/",
                state: { msg: "Por favor, haz login primero" },
                }}
            />
            )
        }
        />
    </Routes>
  );
};

export default PrivateRoute;
