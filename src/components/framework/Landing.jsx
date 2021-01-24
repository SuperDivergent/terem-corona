import React, { Component } from "react";
import { UserContext } from "../../context/context";
import "../../App.css";

import Auth from "../auth/Auth";
import Welcome from "../Welcome Page/Welcome";

export default class Landing extends Component {
  render() {
    const { user } = this.context;
    return <>{user.loggedIn ? <Welcome /> : <Auth />}</>;
  }
}
Landing.contextType = UserContext;
