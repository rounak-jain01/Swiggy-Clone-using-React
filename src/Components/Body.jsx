import React, { useEffect, useState } from "react";
import Dishes from "./Dishes";
import TopRestaurants from "./TopRestaurants";

function Body() {
  const [DishesData, setDishesData] = useState([]);

  const [restaurantData, setRestaurantData] = useState([]);

  async function fetchData() {
    const response = await fetch(
      "/api/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const result = await response.json();
    console.log(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setDishesData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setRestaurantData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-[80%] h-[100%] p-2 px-4 mx-auto overflow-hidden gap-20">
        <Dishes Data={DishesData} />
        <TopRestaurants data={restaurantData} />
      </div>
    </div>
  );
}

export default Body;
