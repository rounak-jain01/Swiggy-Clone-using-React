import React from "react";
import RestaurantCards from "./RestaurantCards";

function DeliverFood({ rdata }) {
  return (
    <div>
      <div className="mt-8">
        <div className="font-extrabold text-[16px]">
          <h1>Restaurants with online food delivery in Bangalore</h1>
        </div>
        <div className="grid grid-cols-4 gap-8  mt-5">
          {rdata.map(({ info, cta : {link}}) => (
          <div className="hover:scale-95 duration-200">
                <RestaurantCards info={info} link={link} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default DeliverFood;
