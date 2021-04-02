import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { darkModeContext } from "../../App";

export default function DarkMode() {
  const [mode, setmode] = useContext(darkModeContext);
  const btnClass = mode
    ? "btn-sm btn-dark text-white shadow-lg pr-4 text-bold"
    : "btn-sm btn-white text-white shadow-lg pr-4 text-bold";
  const toggleChecked = () => {
    localStorage.setItem("DarkMode", !mode);
    setmode(!mode);
  };
  console.log(localStorage.getItem("DarkMode"));
  return (
    <FormControlLabel
      className={btnClass}
      control={<Switch checked={mode} onClick={toggleChecked} />}
      label={mode ? "Night" : "Day"}
    />
  );
}
