import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RestaurantMenu() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [rData, setrData] = useState([]);
  const [TopPicks, setTopPicks] = useState(null);
  const [value, setvalue] = useState(0);

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
        (item) => item?.card?.card?.itemCards || item?.card?.card?.categories
      );
    setrData(actualrData);
    setOrderData(result?.data?.cards[2]?.card?.card?.info);
    setOfferData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setTopPicks(
      result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (item) => item?.card?.card?.title == "Top Picks"
      )[0]
    );
  }
  useEffect(() => {
    fetchRestData();
  }, []);

  function moveNext() {}

  function moveBack() {}

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

          {/* Deals for You section */}
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

          {/* Search Section */}
          <div className="flex flex-col items-center mt-7 gap-4 w-full">
            <h1 className="font-bold text-[11px] text-slate-700">M E N U</h1>
            <div className="bg-slate-100 rounded-lg text-[14px] text-slate-800 items-center p-2 w-full flex justify-center cursor-pointer">
              Search for dishes
            </div>
          </div>

          <hr className="text-slate-300 my-5" />

          {/* Top picks Section */}

          {TopPicks && (
            <div className="w-full overflow-hidden">
              <div className="flex  justify-between mt-5 h-full ">
                <div className="font-bold text-[16px] pl-3">
                  <h1>{TopPicks?.card?.card?.title}</h1>
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
              <div className="flex gap-3 mt-5">
                {TopPicks?.card?.card?.carousel.map(
                  ({
                    creativeId,
                    dish: {
                      info: { defaultPrice },
                    },
                  }) => (
                    <div className="min-w-[240px] relative">
                      <img
                        className=""
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}/>

                      <div className="absolute bottom-5 text-white font-bold left-2 text-sm ">
                        <p>₹ {defaultPrice / 100}</p>
                      </div>
                      <div className="">
                        <button className="absolute bottom-4 right-5 bg-white text-green-600 px-7 py-1 rounded font-bold text-sm shadow-md hover:bg-slate-200">
                          ADD
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="px-4">
            {rData.map(({ card: { card } }) => (
              <MenuCard card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function MenuCard({ card }) {
  let isOpen = false;
  if (card["@type"]) {
    isOpen = true;
  }

  const [arrowId, setarrowId] = useState(isOpen);

  function togglearrow() {
    setarrowId((prev) => !prev);
  }

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <div className="mb-6">
        <div
          className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
          onClick={togglearrow}
        >
          <h1 className="font-bold text-lg text-gray-800">
            {title} ({itemCards?.length})
          </h1>
          <i
            className={`fi fi-br-angle-small-${
              arrowId ? "up" : "down"
            } text-gray-600 transition-transform duration-200`}
          ></i>
        </div>
        {arrowId && (
          <div className="mt-2">
            <Menu itemCards={itemCards} />
          </div>
        )}
        <hr className="border-t border-gray-200 my-4" />
      </div>
    );
  } else {
    const { title, categories } = card;
    return (
      <div className="mb-6">
        <h1 className="font-bold text-lg text-gray-800 mb-4">{title}</h1>
        <div className="space-y-2">
          {categories.map((data, index) => (
            <MenuCard card={data} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

function Menu({ itemCards }) {
  return (
    <>
      {itemCards.map(
        (
          {
            card: {
              info: {
                name,
                imageId,
                description,
                itemAttribute: { vegClassifier },
                price,
                defaultPrice,
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
              },
            },
          },
          index
        ) => (
          <div
            className="border-b border-gray-200 flex justify-between py-6 last:border-b-0"
            key={index}
          >
            <div className="w-[70%] pr-4">
              <div className="mb-2">
                {vegClassifier === "VEG" ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/800px-Veg_symbol.svg.png"
                    className="w-4 h-4"
                    alt="Veg"
                  />
                ) : (
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.w6vZA1LU2oGl4vbu1Q2BxQHaH0?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Non-Veg"
                    className="w-4 h-4"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {name}
              </h3>
              <p className="text-lg font-medium text-gray-900 mb-2">
                ₹{price / 100 || defaultPrice / 100}
              </p>
              {rating && (
                <div className="flex items-center gap-1 text-sm mb-2">
                  <i className="fi fi-ss-star text-green-600"></i>
                  <span className="text-green-600 font-medium">{rating}</span>
                  <span className="text-gray-500">({ratingCountV2})</span>
                </div>
              )}
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="w-[30%] flex justify-center">
              <div className="relative w-40 h-35">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                  alt={name}
                />
                <div className="flex justify-center">
                  <button className="absolute bottom-[-15px] bg-white text-green-600 px-7 py-1.5 rounded font-bold text-md shadow-md hover:bg-slate-200">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
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
