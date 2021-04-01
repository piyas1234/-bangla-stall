import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function DarkMode() {
  const [lsData, setlsData] = React.useState(null)
  React.useEffect(() => {
    const Lsdata = localStorage.getItem('DarkMode')
    setlsData(Lsdata)
  },[])
   
  const [checked, setChecked] = React.useState(lsData || false);

  const toggleChecked = () => {
     
    localStorage.setItem("DarkMode",!checked);
    setChecked(!checked);
   
  };
  console.log(localStorage.getItem('DarkMode'))
  return (
    <div className="card p-2 m-3">
      <FormControlLabel
        control={<Switch checked={checked} onClick={toggleChecked} />}
        label={checked ? "DarkMode" : "DayMode"}
      />
    </div>
  );
}
