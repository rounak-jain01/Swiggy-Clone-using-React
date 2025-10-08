import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Visibility, Coordinates, CartValue } from "../context/contextAPI";

function NavBar() {
  const { visible, setVisible } = useContext(Visibility);
  const [locData, setLocData] = useState([]);
  const { setcords } = useContext(Coordinates);
  const [address, setAddress] = useState("");
  const {cartData, setCardData} = useContext(CartValue);

  const navItems = [
    {
      Name: "Swiggy Corporate",
      Icon: "fi-rs-shopping-bag",
      path: "/Corporate"
    },
    {
      Name: "Search",
      Icon: "fi-br-search",
      path: "/Search"
    },
    {
      Name: "Offers",
      Icon: "fi-rr-badge-percent",
      path: "/Offers"
    },
    {
      Name: "Help",
      Icon: "fi-sr-life-ring",
      path: "/Help"
    },
    {
      Name: "Sign in",
      Icon: "fi-rs-user",
      path: "/SignIn"
    },
    {
      Name: "Cart",
      Icon: "fi-br-shopping-cart",
      path: "/Cart"
    },
  ];

  function handlesearchfun() {
    setVisible((prev) => !prev);
  }

  function handleVisibility() {
    setVisible((prev) => !prev);
  }

  async function getLocation(value) {
    if (value == "") {
      return;
    }
    const response = await fetch(
      `/api/dapi/misc/place-autocomplete?input=${value}`
    );
    const result = await response.json();
    setLocData(result.data);
  }

  async function getGeoData(placeId) {
    if (placeId == "") {
      return;
    }
    const response = await fetch(
      `/api/dapi/misc/address-recommend?place_id=${placeId}`
    );
    const result = await response.json();
    setcords({
      lat: result.data[0].geometry.location.lat,
      lng: result.data[0].geometry.location.lng,
    });
    // console.log(result.data[0]);
    setAddress(result.data[0].formatted_address);
  }

  return (
    <div className="relative w-full">
      <div className="w-full">
        <div
          onClick={handleVisibility}
          className={`absolute h-full z-30  w-full bg-black/50 ${
            visible ? "visible" : "invisible"
          }`}
        ></div>
        <div
          className={`flex flex-col  items-end  bg-white w-[38%] h-full z-40 duration-400 absolute ${
            visible ? "left-0" : "-left-[100%]"
          }`}
        >
          <div className="mt-5 flex flex-col gap-5  w-[65%] mr-10 ">
            <p>
              <i
                className="fi fi-br-cross-small text-xl"
                onClick={handleVisibility}
              ></i>
            </p>
            <input
              className="focus:font-bold py-3 text-sm px-4 border border-slate-300 focus:outline-none focus:shadow-lg "
              type="text"
              placeholder="Search for area, street name..."
              onChange={(e) => getLocation(e.target.value)}
            />
            <div>
              <ul>
                {locData.map((data) => (
                  <div className="flex  px-2 gap-2 cursor-pointer">
                    <div>
                      <i className="fi fi-rs-marker text-xl"></i>
                    </div>
                    <div className="w-full ">
                      <li
                        onClick={() => (
                          getGeoData(data.place_id), handleVisibility()
                        )}
                        className="flex flex-col gap-0.5 justify-center "
                      >
                        <p className="text-xs font-bold hover:text-[#fe5200]">
                          {data?.structured_formatting?.main_text}
                        </p>
                        <p className="text-[9px] text-slate-500">
                          {data?.structured_formatting?.secondary_text}
                        </p>
                      </li>
                        <hr className="my-3" />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[65px] sticky top-0 bg-white z-20 shadow-md flex justify-center ">
        <div className="w-[81%] flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <img
                  className="w-[62px] hover:scale-110 duration-200"
                  src="https://static.vecteezy.com/system/resources/previews/050/816/833/non_2x/swiggy-transparent-icon-free-png.png"
                  alt="Swiggy Logo"
                />
              </Link>
            </div>
            <div
              className="flex gap-2 items-center w-[50%]"
              onClick={handlesearchfun}
            >
              <p>
                <span className="mb-[2px] font-bold flex text-[11px] ml-6 border-b-2 hover:text-[#fe5200]">
                  Other{" "}
                </span>
              </p>
              <p className="text-xs line-clamp-2">{address}</p>
            </div>
            <div className="text-[#fe5200]">
              <i className="fi fi-ss-angle-small-down "></i>
            </div>
          </div>

          <div className="flex  h-[100%] items-center w-[63%] justify-between font-bold text-[13px] ">
            {navItems.map((item, i) => (
              <Link to={item.path}>
              <div
                key={i}
                className="flex gap-2 items-center hover:text-[#fe5200]"
              >
                <i className={`fi ${item.Icon}`}></i>
                <p className="mb-[2px]">{item.Name}</p>
                {
                  item.Name == "Cart" && <p>{cartData.length}</p>
                }
                
              </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
