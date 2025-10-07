import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Visibility } from "../context/contextAPI";

function NavBar() {
  const { visible, setVisible } = useContext(Visibility);
  const [locData, setLocData] = useState([]);

  const navItems = [
    {
      Name: "Swiggy Corporate",
      Icon: "fi-rs-shopping-bag",
    },
    {
      Name: "Search",
      Icon: "fi-br-search",
    },
    {
      Name: "Offers",
      Icon: "fi-rr-badge-percent",
    },
    {
      Name: "Help",
      Icon: "fi-sr-life-ring",
    },
    {
      Name: "Sign in",
      Icon: "fi-rs-user",
    },
    {
      Name: "Cart",
      Icon: "fi-br-shopping-cart",
    },
  ];

  function handlesearchfun() {
    setVisible((prev) => !prev);
  }

  function handleVisibility() {
    setVisible((prev) => !prev);
  }

  async function getLocation(value) {
    if (value == ""){
      return
    }
    const response = await fetch(
      `/api/dapi/misc/place-autocomplete?input=${value}`
    );
    const result = await response.json();
    setLocData(result.data);
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
          className={`bg-white w-[35%] h-full z-40 duration-400 absolute ${
            visible ? "left-0" : "-left-[100%]"
          }`}
        >
          <p>
            <i className="fi fi-br-cross-small" onClick={handleVisibility}></i>
          </p>
          <input
            className="focus:font-bold py-3 text-sm px-4 w-[60%] border border-slate-300 focus:outline-none focus:shadow-lg "
            type="text"
            placeholder="Search for area, street name..."
            onChange={(e) => getLocation(e.target.value)}
          />
          <div>
            <ul>
              {locData.map((data) => (
                  <li>
                    <p>{data?.structured_formatting?.main_text}</p>
                    <p>{data?.structured_formatting?.secondary_text}</p>
                  </li>
              ))}
            </ul>
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
              className="cursor-pointer font-bold flex text-[11px] ml-6 border-b-2 hover:text-[#fe5200]"
              onClick={handlesearchfun}
            >
              <p className="mb-[2px] ">Other</p>
            </div>
            <div className="text-[#fe5200] ml-3 ">
              <i className="fi fi-ss-angle-small-down "></i>
            </div>
          </div>

          <div className="flex  h-[100%] items-center w-[63%] justify-between font-bold text-[13px] ">
            {navItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-2 items-center hover:text-[#fe5200]"
              >
                <i className={`fi ${item.Icon}`}></i>
                <p className="mb-[2px]">{item.Name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
