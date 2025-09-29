import React from "react";

function NavBar() {
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

                        <div className="flex gap-2 items-center">

                            <i className="fi fi-rs-shopping-bag"></i>
                            <p className="mb-[2px] hover:text-[#fe5200]">Swiggy Corporate</p>

                        </div>

                        <div className='flex gap-2 items-center hover:text-[#fe5200]'>

                            <i className="fi fi-br-search"></i>
                            <p className="mb-[2px]">Search</p>

                        </div>

                        <div className='flex gap-2 items-center hover:text-[#fe5200]'>

                            <i className="fi fi-rr-badge-percent"></i>
                            <p className="mb-[2px]">Offers</p>

                        </div>

                        <div className='flex gap-2 items-center hover:text-[#fe5200]'>

                            <i className="fi fi-sr-life-ring"></i>
                            <p className="mb-[2px]">Help</p>

                        </div>

                        <div className='flex gap-2 items-center hover:text-[#fe5200]'>

                            <i className="fi fi-rs-user"></i>
                            <p className="mb-[2px]">Sign In</p>

                        </div>

                        <div className='flex gap-2 items-center hover:text-[#fe5200]'>
                            <i className="fi fi-br-shopping-cart"></i>
                            <p className="mb-[2px]">Cart</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
