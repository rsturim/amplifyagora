import React from "react";
import NewMarket from "../components/NewMarket";
import MarketList from "../components/MarketList";

class HomePage extends React.Component {
  state = {
    searchTerm: "",
    searchResults: [],
    isSearching: false,
  };

  handleSearchChange = (searchTerm) =>
    this.setState({
      searchTerm,
    });

  handleClearSearch = () =>
    this.setState({
      searchTerm: "",
      searchResults: [],
    });

  handleSearch = (event) => {
    event.preventDefault();

    this.setState({
      isSearching: true,
    });

    console.log(this.state.searchTerm);
  };

  render() {
    return (
      <>
        <NewMarket
          isSearching={this.state.isSearching}
          searchTerm={this.state.searchTerm}
          handleSearchChange={this.handleSearchChange}
          handleClearSearch={this.handleClearSearch}
          handleSearch={this.handleSearch}
        />

        <MarketList />
      </>
    );
  }
}

export default HomePage;
