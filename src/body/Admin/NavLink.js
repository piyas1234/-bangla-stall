import React from "react";
import { Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import DeshBoard from "./DeshBoard";
import EditProduct from "./EditProduct";

const NavLink = () => {
  return (
    <div>
      <Route exact path="/admin">
        <DeshBoard></DeshBoard>
      </Route>
      <Route path="/addproduct">
        <AddProduct></AddProduct>
      </Route>
      <Route path="/editproduct">
        <EditProduct></EditProduct>
      </Route>
    </div>
  );
};

export default NavLink;
