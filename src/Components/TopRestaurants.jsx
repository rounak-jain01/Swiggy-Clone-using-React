import React, { useState } from "react";
import RestaurantCards from "./RestaurantCards";

function TopRestaurants({data}) {
  const [value, setvalue] = useState(0);
  function moveNext() {
    setvalue((prev) => prev + 500);
  }

  function moveBack() {
    setvalue((prev) => prev - 500);
  }

  return (
    <>
      <div className="flex justify-between mt-8 h-full ">
        <div className="font-extrabold text-[16px]">
          <h1>Top restaurant chains in Bangalore</h1>
        </div>
        <div className="flex gap-2">
          <i
            onClick={moveBack}
            className={
              `fi fi-rr-arrow-small-left rounded-full h-7 w-7 flex justify-center items-center ` +
              (value <= 0
                ? "bg-gray-200 cursor-not-allowed text-black/50"
                : "bg-gray-300 cursor-pointer")
            }
          ></i>
          <i
            onClick={moveNext}
            className={
              `fi fi-rr-arrow-small-right rounded-full h-7 w-7 flex justify-center items-center ` +
              (value >= 1750
                ? "bg-gray-300 text-black/50 cursor-not-allowed"
                : "bg-gray-300 cursor-pointer")
            }
          ></i>
        </div>
      </div>

      <div className="flex gap-6 mt-3 w-full duration-700"
      style={{ translate: `-${value}px` }}>
        {data.map(({ info, cta : {link}}) => (
          <div className="hover:scale-95 duration-200">
            <RestaurantCards info={info} link={link} />
          </div>
        ))}
      </div>
      <hr className="mt-10 border-gray-300" />
    </>
  );
}

export default TopRestaurants;
