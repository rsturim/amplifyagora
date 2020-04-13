import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Loading, Tabs, Icon } from "element-react";
import { API, graphqlOperation } from "aws-amplify";

import { getMarket } from "./../graphql/queries";
import NewProduct from "../components/NewProduct";
import Product from "../components/Product";

function MarketPage({ marketId, user }) {
  const [market, setMarket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarketOwner, setIsMarketOwner] = useState(false);

  useEffect(() => {
    fetchMarket(marketId);
  }, [marketId]);

  const fetchMarket = async marketId => {
    const input = {
      id: marketId
    };

    try {
      const result = await API.graphql(graphqlOperation(getMarket, input));
      const market = result.data.getMarket;

      setMarket(market);
      checkMarketOwner(market, user);

      // console.dir(result.data.getMarket);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkMarketOwner = (market, user) => {
    console.log("checking");
    console.log("market: ", market);
    console.log("user: ", user);
    console.log("------------------------------------------");

    if (user) {
      setIsMarketOwner(user.username === market.owner);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading fullscreen={true} />
      ) : (
        <div>
          <h1>Market {market.name}</h1>
          <div>{isMarketOwner ? "owner" : "not owner"}</div>
          <Link className="link" to="/">
            Back to Markets Link
          </Link>
          {/* Markets List */}
          <span className="items-center pt-2">
            <h2 className="mb-mr">{market.name} </h2>- {market.owner}
          </span>
          <div className="items-center pt-2">
            <span
              style={{ color: "var(--lightSquidInk)", paddingBottom: "1em" }}
            >
              <Icon name="date" className="icon" />
              created at: {market.createdAt}
            </span>
          </div>
          <Tabs type="border-card" value={isMarketOwner ? "1" : "2"}>
            {isMarketOwner && (
              <Tabs.Pane
                label={
                  <>
                    <Icon name="plus" className="icon" />
                    Add Product
                  </>
                }
                name="1"
              >
                <NewProduct marketId={marketId} />
              </Tabs.Pane>
            )}

            {!isLoading && (
              <Tabs.Pane
                label={
                  <>
                    <Icon name="menu" className="icon" />
                    Products ({market.products.items.length})
                  </>
                }
                name="2"
              >
                <div className="products-list">
                  {/* {market.products.items.map(product => (
                    <Product product={product} />
                  ))} */}
                </div>
              </Tabs.Pane>
            )}
          </Tabs>
        </div>
      )}
    </>
  );
}

export default MarketPage;
