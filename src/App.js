import React, { useState, useEffect } from "react";

import "./App.css";
import { Auth, Hub } from "aws-amplify";

import { Authenticator, AmplifyTheme } from "aws-amplify-react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // getUserData();
    Hub.listen("auth", this, "onHubCapsule");
  }, []);

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const onHubCapsule = (capsule) => {
    console.log("capsule: ", capsule);
    debugger;
    switch (capsule.payload.event) {
      case "signIn":
        console.log("signed in");
        getUserData();
        break;
      case "signOut":
        console.log("signed out");
        setUser(null);
        break;

      default:
        return;
    }
  };

  return !user ? (
    <Authenticator theme={theme} />
  ) : (
    <div>{user ? `Hello ${user.username}` : "no one found"}</div>
  );
};

export default App;

const theme = {
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)",
    color: "white",
  },
};
