import { Link, useRouteMatch } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  //const { url, path } = useRouteMatch();
  const history = useHistory();
  const routeToShop = () => {
    console.log("finished fetching items...");
    history.push("/pizza");
  };

  return (
    <div className="home-wrapper" onClick={routeToShop}>
      <img className="home-image" src="Assets\Pizza.jpg" alt="" />
      <button
        onClick={routeToShop}
        className="md-button shop-button"
        id="order-pizza"
      >
        I Want Pizza!
      </button>
    </div>
  );
}