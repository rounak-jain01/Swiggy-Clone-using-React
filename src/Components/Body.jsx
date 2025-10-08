import React, { useContext, useEffect, useState } from "react";
import Dishes from "./Dishes";
import TopRestaurants from "./TopRestaurants";
import DeliverFood from "./DeliverFood";
import { Coordinates } from "../context/contextAPI";

function Body() {
  const [DishesData, setDishesData] = useState([]);

  const [restaurantData, setRestaurantData] = useState([]);
  const {cords:{lat, lng}} = useContext(Coordinates);
  const [Loc, setLoc] = useState("");
  const [cityLoc, setCityLoc] = useState("");

  async function fetchData() { 
    const response = await fetch(
      `/api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const result = await response.json();

    // console.log(result?.data?.cards[1]?.card?.card?.header?.title);
    // console.log(result?.data?.cards[2]?.card?.card?.title);
    setLoc(result?.data?.cards[1]?.card?.card?.header?.title)
    setCityLoc(result?.data?.cards[2]?.card?.card?.title)
    setDishesData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setRestaurantData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }


  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return (
    <div className="w-full">
      <div className="w-[80%] h-full p-2 px-4 mx-auto overflow-x-hidden gap-20">
        <Dishes Data={DishesData} />
        <TopRestaurants data={restaurantData} Loc={Loc} />
        <DeliverFood rdata={restaurantData} cityLoc={cityLoc}/>
      </div>  
    </div>
    
  );
}

export default Body;
