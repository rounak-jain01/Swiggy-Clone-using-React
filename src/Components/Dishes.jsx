import React, {useState } from "react";

function Dishes({Data}) {
  const [value, setvalue] = useState(0);

  function moveNext() {
    value >= 1750 ? "" : setvalue((prev) => prev + 350);
  }

  function moveBack() {
    setvalue((prev) => prev - 350);
  }
  return (
    <>
      <div className="flex justify-between">
        <div className="font-bold text-[16px]">
          <h1>What's on your mind?</h1>
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

      <div
        style={{ translate: `-${value}px` }}
        className={`flex gap-5 mt-2 mb-1 duration-700`}
      >
        {Data.map((item, i) => (
          <img
            key={i}
            className="w-29 cursor-pointer"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
          />
        ))}
      </div>
      <hr className="mt-10 border-gray-300" />
    </>
  );
}

export default Dishes;
