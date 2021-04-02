import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Navbody from "./body/navigatoin/Navbody";
import Navlink from "./body/navigatoin/Navlink";
import React, { createContext, useState } from "react";
export const UserContext = createContext();
export const CheckoutContext = createContext();
export const darkModeContext = createContext();

function App() {
  const [loggedinUser, setloggedinUser] = useState({});
  const [checkout, setcheckout] = useState([]);
  const [mode, setmode] = useState(true);

  const bgColor = mode
    ? { backgroundColor: "black" }
    : { backgroundColor: "white" };
  console.log(bgColor);
  return (
    <UserContext.Provider
      className="App"
      value={[loggedinUser, setloggedinUser]}
    >
      <CheckoutContext.Provider value={[checkout, setcheckout]}>
        <darkModeContext.Provider value={[mode, setmode]}>
          <div style={bgColor}>
            <BrowserRouter>
              <Navbody></Navbody>
              <Navlink></Navlink>
            </BrowserRouter>
          </div>
        </darkModeContext.Provider>
      </CheckoutContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
