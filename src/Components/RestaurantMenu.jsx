import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RestaurantMenu() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [rData, setrData] = useState([]);
  const [value, setvalue] = useState(0);
  const [arrowId, setarrowId] = useState(true);

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

    let actualrData =
      (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (item) => item?.card?.card?.itemCards
      );

    setrData(actualrData);
    setOrderData(result?.data?.cards[2]?.card?.card?.info);
    setOfferData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
  }

  useEffect(() => {
    fetchRestData();
  }, []);

  function moveNext() {}

  function moveBack() {}

  function togglearrow() {
    setarrowId((prev) => !prev);
  }

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

        <div className="border">
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

          <div>
            <div className="flex justify-between mt-5 h-full ">
              <div className="font-bold text-[16px] pl-3">
                <h1>Deals for you</h1>
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
            <div className="flex gap-2 p-2 overflow-x-hidden">
              {offerData.map((item, idx) => (
                <OfferCard item={item} key={idx} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center mt-7 gap-4 w-full">
            <h1 className="font-bold text-[11px] text-slate-700">M E N U</h1>
            <div className="bg-slate-100 rounded-lg text-[14px] text-slate-800 items-center p-2 w-full flex justify-center cursor-pointer">
              Search for dishes
            </div>
          </div>

          <hr className="text-slate-300 my-5" />

          {/* <div className="">
            {rData.map(
              (
                {
                  card: {
                    card: { title, itemCards },
                  },
                },
                i
              ) => (
                <div key={i}>
                  <div>
                    <div className="flex justify-between">
                      {title} ({itemCards.length})
                      <i
                        class="fi fi-br-angle-small-up"
                        onClick={togglearrow}
                      ></i>
                    </div>
                    <div className="duration-5000 ease-in">
                      {arrowId && (
                        <div className="m-3 ">
                          {itemCards.map(({ card: { info } }) => (
                            <p>{info?.name}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div> */}

          <div>
            {rData.map(
              ({
                card: {
                  card: { title, itemCards },
                },
              }) => (
                <MenuCard title={title} itemCards={itemCards} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, itemCards }) {

  const [arrowId, setarrowId] = useState(true);


  function togglearrow(){
    setarrowId((prev) => !prev)
  }
  return (
    <>
      <div>
        <div>
          <h1>
            {title} ({itemCards?.length})
          </h1>
          <i className="fi fi-br-angle-small-up" onClick={togglearrow}></i>
        </div>
        {arrowId && <Menu itemCards={itemCards} />
        }
      </div>
    </>
  );
}

function Menu({itemCards}){
  return (
    <>
    {
      itemCards.map(({card : {info}}) => (
        <div>
          <p>{info?.name}</p>
        </div>
      ))
    }
    </>
  )
}

function OfferCard({ item: { info } }) {
  return (
    <>
      <div className="text-[12px] pl-1">
        <div className="flex gap-2 border border-slate-300 rounded-2xl min-w-[260px] p-3">
          <div>
            <img
              className="w-[38px]"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${info?.offerLogo}`}
            />
          </div>
          <div>
            <h3 className="font-extrabold text-[13px]">{info?.header}</h3>
            <p className="text-slate-500 font-bold">{info?.couponCode}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantMenu;
