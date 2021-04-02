import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBody from "./NavBody";
import NavLink from "./NavLink";
import "./style.css";
const AdminNav = () => {
  return (
    <BrowserRouter>
      <div className="row">
        <div className="col-md-2 sideBar">
          <NavBody></NavBody>
        </div>
        <div  className="col-md-10">
          <NavLink></NavLink>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AdminNav;
