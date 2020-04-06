import React, { Component } from "react";

import "./App.css";
import { Auth, Hub } from "aws-amplify";

import { Authenticator, AmplifyTheme } from "aws-amplify-react";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getUserData();

    console.dir(AmplifyTheme);

    Hub.listen("auth", this, "onHubCapsule");
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();

    user
      ? this.setState({
          user,
        })
      : this.setState({
          user: null,
        });
  };

  onHubCapsule = (capsule) => {
    console.log("called");
    debugger;
    switch (capsule.payload.event) {
      case "signIn":
        this.getUserData();
        break;
      case "signUp":
        console.log("signUp");
        break;
      case "signOut":
        console.log("signOut");

        this.setState({
          user: null,
        });
        break;

      default:
        return;
    }
  };

  render() {
    const { user } = this.state;
    return !user ? <Authenticator /> : <div>App</div>;
  }
}

export default App;
