import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import User from "./contexts/user";
import Theme from "./contexts/theme";
import { THEMES } from "./constants/themes";
import Login from "./views/Login";
import Registro from "./views/Registro";
import './App.css';
import Home from "./views/Home";

const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const [signedIn, setSignedIn] = useState(false);

  const [theme, setTheme] = useState(THEMES.light);

  useEffect(() => {    
    if (document.body.classList.value == "") {
      document.body.classList.add(theme);
    } else {
      document.body.classList.replace(
        document.body.classList.value,
        theme
      );
    }
  }, [theme]);

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
      <Theme.Provider value={{ current: theme, update: setTheme}}>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" exact element={<Home/>}>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Registro/>}></Route>
            {signedIn && <Route path="/notes" element={<Notes/>} /> }
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
        <Footer loading={loading} status={status}/>
      </Theme.Provider>
    </User.Provider>
  );
};

export default App;
