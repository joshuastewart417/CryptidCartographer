import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CryptidMap from "./map/CryptidMap";
import CryptidDetails from "./cryptid/CryptidDetails";
import StateCryptidList from "./state/StateCryptidList";
import MyCryptidList from "./cryptid/MyCryptidList";
import AddCryptid from "./cryptid/AddCryptid";
import DeleteCryptid from "./cryptid/DeleteCryptid";
import EditCryptid from "./cryptid/EditCryptid";
import TrackedCryptidList from "./track/TrackedCryptidList"
import AddTrackCryptid from "./track/AddTrackCryptid";
import RemoveTrackCryptid from "./track/RemoveTrackCryptid";



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

        <Route path="/myCryptidList" exact>
          {isLoggedIn ? <MyCryptidList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/addCryptid">
                    <AddCryptid />
        </Route>

        <Route path="/editCryptid/:id">
                    <EditCryptid useparams />
        </Route>

        <Route path="/deleteCryptid/:id">
                    <DeleteCryptid useparams/>
        </Route>
     
        <Route path="/cryptid/:id">
                    {isLoggedIn ? (
                        <CryptidDetails useparams />
                    ) : (
                        <Redirect to="/login" />
                    )}
        </Route>

        <Route path="/trackedCryptidList" exact>
          {isLoggedIn ? <TrackedCryptidList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/addTrackCryptid/:cryptidId">
                    <AddTrackCryptid useparams/>
        </Route>

        <Route path="/removeTrackCryptid/:cryptidId">
                    <RemoveTrackCryptid useparams/>
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
