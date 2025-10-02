import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RestaurantMenu() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  // const [rMenu, setrMenu] = useState([]);

  async function fetchRestData() {
    const data = await fetch(
      `/api/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.97530&lng=77.59100&restaurantId=${id
        .split("-")
        .at(-1)
        .split("t")
        .at(-1)}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await data.json();
    console.log(result?.data?.cards[2]?.card?.card?.info);
    setOrderData(result?.data?.cards[2]?.card?.card?.info);
    // setrMenu(result?.data?.cards[0]?.card?.card?.text);
  }

  useEffect(() => {
    fetchRestData();
  }, []);

  return (
    <div className="w-full mt-4">
      <div className="w-[53%] mx-auto">
        <div className="text-[8px] p-1 font-bold">
          <p className="text-slate-500 flex gap-1">
            <Link to={"/"}>
              <span className="hover:text-black">Home</span>
            </Link>
            /
            <Link to={"/"}>
              <span className=" hover:text-black">{orderData.city}</span>
            </Link>
            / <span className="text-black">{orderData.name}</span>
          </p>
        </div>

        <div className="">
          <div className="mt-4 mx-3 text-[22px] font-bold">
            <h1>{orderData?.name}</h1>
          </div>

          <div className="flex mt-2 ml-3 gap-3 text-sm font-bold">
            <p className="p-[7px]  border-b-3 border-[#fe5200]">Order Online</p>
            <p className="p-[7px]">Dineout</p>
          </div>
          <hr className="text-slate-300" />

          <div>
            <div className="p-3 mt-2 rounded-3xl h-[144px] bg-gradient-to-t from-slate-300 from 0% to-transparent to-90% relative">
              <div className="h-full rounded-2xl border border-slate-400 bg-white p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5 font-bold text-[13px]">
                    <i className="fi fi-sr-circle-star text-green-600"></i>
                    <p>{orderData?.avgRating}</p>
                    <p>({orderData?.totalRatingsString})</p>
                    <p>-</p>
                    <p>{orderData?.costForTwoMessage}</p>
                  </div>
                  <p className="underline text-[#fe5200] font-bold text-[12px]">
                    {orderData?.cuisines?.join(", ")}
                  </p>

                  <div className="flex gap-3">
                    <div className="mt-[5px] flex flex-col items-center w-[6px]">
                      <div className="h-[6px] w-[6px] rounded-full bg-slate-300"></div>
                      <div className="h-[17px] w-[2px] rounded-full bg-slate-300"></div>
                      <div className="h-[6px] w-[6px] rounded-full bg-slate-300"></div>
                    </div>
                    <div className="text-[11px] flex flex-col font-extrabold gap-[6px]">
                      <p>
                        Outlet{" "}
                        <span className="font-normal">
                          {orderData.areaName}
                        </span>
                      </p>
                      <p>{orderData?.sla?.slaString}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
