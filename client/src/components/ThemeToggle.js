import { useContext } from "react";
import { THEMES } from "../constants/themes";
import Theme from "../contexts/theme";
import "./ThemeToggle.css";

// Toggle para cambiar el tema actual
const ThemeToggle = () => {
  const theme = useContext(Theme);
  const currentName = theme.current === THEMES.light ? "Tema claro" : "Tema oscuro";

  const onChange = () => {
    if (theme.current === THEMES.light) {
      theme.update(THEMES.dark);
    } else {
      theme.update(THEMES.light);
    }
  };

  return <label htmlFor="theme-toggle" aria-label="Click para cambiar entre modo claro y oscuro" className="theme-toggle">
    <span className="theme-toggle_option" aria-label="Tema claro">☀️</span>
    <div className="theme-toggle_controls" aria-current={currentName}>
      <input id="theme-toggle" type="checkbox" onChange={onChange}/>
      <span className="theme-toggle_slider" />
    </div>
    <span className="theme-toggle_option" aria-label="Tema oscuro">🌙</span>
  </label>
};

export default ThemeToggle;