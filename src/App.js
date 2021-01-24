import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import { UserContext } from "./context/context";

import Navbar from "./components/framework/Navbar";
import Landing from "./components/framework/Landing";
import Weekly from "./components/Requests/Weekly";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userContext: {
        username: "",
        userKey: "",
        name: "אורח",
        loggedIn: false,
      },
    };
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: { ...this.state.userContext },
          updateUser: (newUser) => {
            this.setState({
              userContext: newUser,
            });
          },
        }}
      >
        <div dir="rtl">
          <Navbar />
          <Switch>
            <Route exact path="/">
              {this.state.loggedIn ? <Redirect to="/dashboard" /> : <Landing />}
            </Route>
            <Route path="/WeeklyRequest/:date_code" component={Weekly}></Route>
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}
