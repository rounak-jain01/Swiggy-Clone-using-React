import React, {useState } from "react";

function TopRestaurants({data}) {
  const [value, setvalue] = useState(0);


  function moveNext() {
    setvalue((prev) => prev + 500);
  }

  function moveBack() {
    setvalue((prev) => prev - 500);
  }

  return (
    <div>
      <div className="flex justify-between mt-8">
        <div className="font-extrabold text-[16px]">
          <h1>Top restaurant chains in Bangalore</h1>
        </div>
        <div className="flex gap-2">
          <i
            onClick={moveBack}
            className={
              `fi fi-rr-arrow-small-left rounded-full h-7 w-7 flex justify-center items-center ` +
              (value <= 0
                ? "bg-gray-300 cursor-not-allowed text-gray-200"
                : "bg-gray-300 cursor-pointer")
            }
          ></i>
          <i
            onClick={moveNext}
            className={
              `fi fi-rr-arrow-small-right rounded-full h-7 w-7 flex justify-center items-center ` +
              (value >= 1750
                ? "bg-gray-300 text-gray-200 cursor-not-allowed"
                : "bg-gray-300 cursor-pointer")
            }
          ></i>
        </div>
      </div>

      <div className="flex gap-6 mt-3">
        {data.map((item, i) => (
          <div key={i} 
          style={{ translate: `-${value}px` }}
          className="min-w-[224px] relative h-[142px] duration-700">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.info?.cloudinaryImageId}`}
              alt=""
            />
            <p className="bg-gradient-to-t from-black from 10% to-transparent to-40% rounded-2xl absolute h-full w-full top-0"></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRestaurants;
