import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Notfound from "../Notfound";
import PrivateRoute from "./PrivateRoute";
import About from "../About";
import Blog from "../Blog";
import AdminNav from "../Admin/AdminNav";
import Checkout from "../Checkout/Checkout";
import Order from "../Order/Order";

const Navlink = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/about">
          <About></About>
        </Route>
        <Route exact path="/blog">
          <Blog></Blog>
        </Route>
        <PrivateRoute exact path="/admin">
          <AdminNav></AdminNav>
        </PrivateRoute>
        <PrivateRoute exact path="/checkout">
          <Checkout></Checkout>
        </PrivateRoute>
        <PrivateRoute exact path="/checkout/:id">
          <Checkout></Checkout>
        </PrivateRoute>
        <PrivateRoute exact path="/order">
          <Order></Order>
        </PrivateRoute>
        
        <Route>
          <Notfound></Notfound>
        </Route>
      </Switch>
    </div>
  );
};

export default Navlink;
