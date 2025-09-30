import React from "react";
import Dishes from "./Dishes";
import TopRestaurants from "./TopRestaurants";

function Body() {
  return (
    <div className="w-full">
      <div className="w-[80%] p-2 px-4 mx-auto overflow-hidden gap-20">
        <Dishes />
        <TopRestaurants/>
      </div>
    </div>
  );
}

export default Body;
