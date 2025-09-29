import React, { useEffect, useState } from "react";

function Dishes() {
  const [Data, setData] = useState([]);
  const [value, setvalue] = useState(0);



  async function fetchDishesData() {
    const response = await fetch(
      "/api/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const result = await response.json();
    console.log(result.data.cards[0].card.card);
    setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }

  useEffect(() => {
    fetchDishesData();
  }, []);


  function moveNext(){
    value >= 1750 ? "" : setvalue((prev) => prev + 350)
  }


  function moveBack(){
    setvalue((prev) => prev - 350)
  }

  console.log(value);
  return (
    <>
      <div className="w-full">
        <div className="w-[79%] p-2 px-4 mx-auto overflow-hidden mt-4 gap-20">
          <div className="flex justify-between">
            <div className="font-bold text-[16px]">
              <h1>What's on your mind?</h1>
            </div>
            <div className="flex gap-2">
              <i onClick={moveBack} className={`fi fi-rr-arrow-small-left cursor-pointer rounded-full h-7 w-7 flex justify-center items-center ` + (value <= 0 ? "bg-gray-300 text-gray-200" : "bg-gray-300")}></i>
              <i onClick={moveNext} className={`fi fi-rr-arrow-small-right cursor-pointer rounded-full h-7 w-7 flex justify-center items-center ` + (value >= 1750 ? "bg-gray-300 text-gray-200" : "bg-gray-300")}></i>
            </div>
          </div>

          <div
          style={{translate:`-${value}px`}}
          className={`flex gap-5 mt-2 mb-1 duration-700`}>
            {Data.map((item) => (
              <img
                className="w-29 "
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dishes;
