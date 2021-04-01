import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Navbody from "./body/navigatoin/Navbody";
import Navlink from "./body/navigatoin/Navlink";
import React, { createContext, useState } from "react";
export const UserContext = createContext();
export const CheckoutContext = createContext();

function App() {
  const [loggedinUser, setloggedinUser] = useState({});
  const [checkout, setcheckout] = useState([]);

  return (
    <UserContext.Provider
      className="App"
      value={[loggedinUser, setloggedinUser]}
    >
      <CheckoutContext.Provider value={[checkout, setcheckout]}>
        <div >
          <BrowserRouter>
            <Navbody></Navbody>
            <Navlink></Navlink>
          </BrowserRouter>
        </div>
      </CheckoutContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
