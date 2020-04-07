import React from "react";
import NewMarket from "../components/NewMarket";
import MarketList from "../components/MarketList";

class HomePage extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <NewMarket />

        <MarketList />
      </div>
    );
  }
}

export default HomePage;
