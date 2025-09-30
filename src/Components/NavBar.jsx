import React from "react";

function NavBar() {

    const navItems = [
        {
            "Name": "Swiggy Corporate",
            "Icon": "fi-rs-shopping-bag",
        },
        {
            "Name": "Search",
            "Icon": "fi-br-search",
        },
        {
            "Name": "Offers",
            "Icon": "fi-rr-badge-percent",
        },
        {
            "Name": "Help",
            "Icon": "fi-sr-life-ring",
        },
        {
            "Name": "Sign in",
            "Icon": "fi-rs-user",
        },
        {
            "Name": "Cart",
            "Icon": "fi-br-shopping-cart",
        }
        
    ]

    return (
        <>
            <div className="w-full h-[65px] shadow-md flex justify-center ">
                <div className="w-[81%] flex justify-between items-center">

                    <div className="flex items-center">
                        <div>
                            <img
                                className="w-[62px] hover:scale-110 duration-200"
                                src="https://static.vecteezy.com/system/resources/previews/050/816/833/non_2x/swiggy-transparent-icon-free-png.png"
                                alt="Swiggy Logo"
                            />
                        </div>
                        <div className="font-bold flex text-[11px] ml-6 border-b-2 hover:text-[#fe5200]">
                            <p className="mb-[2px]">Other</p>
                        </div>
                        <div className="text-[#fe5200] ml-3 ">
                            <i className="fi fi-ss-angle-small-down "></i>
                        </div>
                    </div>


                    <div className="flex  h-[100%] items-center w-[63%] justify-between font-bold text-[13px] " >

                        {
                            navItems.map((item) => (
                                <div className='flex gap-2 items-center hover:text-[#fe5200]'>
                                    <i className={`fi ${item.Icon}`}></i>
                                    <p className="mb-[2px]">{item.Name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
