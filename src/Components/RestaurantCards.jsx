import React from "react";

function RestaurantCards({ info, value, i }) {
  return (
    <>
        <div
          key={i}
          style={{ translate: `-${value}px` }}
          className="min-w-[224px] h-[142px] duration-700 cursor-pointer"
        >
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${info?.cloudinaryImageId}`}
            alt=""
          />
          <p className="bg-gradient-to-t from-black from 10% to-transparent to-40% rounded-2xl absolute h-full w-full top-0"></p>
          <p className="absolute bottom-0 text-white font-bold ml-3 mb-1">{`${info?.aggregatedDiscountInfoV3?.header} ${info?.aggregatedDiscountInfoV3?.subHeader}`}</p>
          <div className="mt-2 ml-3 ">
            <p className=" text-sm font-bold">{`${info?.name}`}</p>
            <span className="text-[13px]">
              <i className="fi fi-sr-circle-star text-green-600"></i>
              {`${info?.avgRating} ${info?.sla?.slaString}`}
            </span>
            <p className="line-clamp-1 text-[12px] text-black/50">{`${info?.cuisines.join(
              ", "
            )}`}</p>
            <p className="line-clamp-1 text-[12px] text-black/50">{`${info?.areaName}`}</p>
          </div>
        </div>
    </>
  );
}

export default RestaurantCards;
