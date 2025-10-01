import React from "react";
import RestaurantCards from "./RestaurantCards";

function DeliverFood({ rdata }) {
  return (
    <div>
      <h1>Restaurants with online food delivery in Bangalore</h1>
      <div className="grid grid-cols-4 gap-8">
        {rdata.map(({ info }) => (
          <div className="hover:scale-95 duration-200">
            <RestaurantCards info={info} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliverFood;
