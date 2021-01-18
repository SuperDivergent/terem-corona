import React, { Component } from "react";

import "./App.css";
import Navbar from "./components/framework/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";

import Landing from "./components/framework/Landing";
import UserContext from "./dependencies/Context";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      userContext: {
        username: "GuestUser",
        userKey: "",
        name: "אורח",
      },
    };
  }

  updateUserContext = (userContext) => {
    this.setState({
      userContext: {
        ...userContext,
      },
    });
  };

  render() {
    return (
      <div dir="rtl">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {this.state.loggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <UserContext.Provider value={this.state.userContext}>
                <Landing updateUser={this.updateUserContext} />
              </UserContext.Provider>
            )}
          </Route>
        </Switch>
      </div>
    );
  }
}
