import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import DashBoard from "./dashBoard/DashBoard";
import history from "../history";
import LogIn from "./auth/LogInPage";
import SignUp from "./auth/SignUpPage";
import NavBar from "./NavBar";
import SongsInPlayer from "./dashBoard/SongsInPlayer";
import LikedSongs from "./dashBoard/LikedSongs";
import { Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <div>
      <CssBaseline />
      <Router history={history}>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/logIn" exact component={LogIn} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/likedSong" exact component={LikedSongs} />
            <Route
              path="/songsInPlayer/:singerName/:realName"
              exact
              component={SongsInPlayer}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
