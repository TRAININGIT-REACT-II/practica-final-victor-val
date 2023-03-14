import { createContext } from "react";
import { THEMES } from "../constants/themes";

const Theme = createContext({
  current: THEMES.light,
  update: () => {}
});

export default Theme;