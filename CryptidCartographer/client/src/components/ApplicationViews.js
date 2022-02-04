import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CryptidMap from "./cryptid/CryptidMap";
import CryptidList from "./cryptid/StateCryptidList";
import StateCryptidList from "./cryptid/StateCryptidList";



export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <CryptidMap /> : <Redirect to="/login" />}
        </Route>

        <Route path="/stateCryptidList/:stateName" exact>
          {isLoggedIn ? <StateCryptidList useparams/> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
