import React from "react";

import { Switch, Route } from "react-router-dom";
import Login from "./Containers/auth/Login/Login";
import Register from "./Containers/auth/Register/Register";
import Dashboard from "./Containers/Dash/Dashboard";

import Home from "./Containers/Home";
import 'antd/dist/antd.css';

const App = () => {
  
    return (
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/auth/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard/>
        </Route>
      </Switch>
    )
  
};

export default App;
