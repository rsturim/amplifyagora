import React, { Component } from "react";

/* == node modules */
import { Auth, Hub } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

/* == components */
import HomePage from "./pages/HomePage";
import MarketPage from "./pages/MarketPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";

/* == styles*/
import "./App.css";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getUserData();
    // console.dir(AmplifyTheme);

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
    switch (capsule.payload.event) {
      case "signIn":
        console.log("signIn");
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

  handleSignout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out user ", error);
    }
  };

  render() {
    const { user } = this.state;

    return !user ? (
      <Authenticator />
    ) : (
      <Router>
        <>
          <Navbar user={user} handleSignout={this.handleSignout} />
          <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route
              path="/markets/:marketId"
              component={({ match }) => (
                <MarketPage marketId={match.params.marketId} />
              )}
            />
          </div>
        </>
      </Router>
    );
  }
}

export default App;
