import { useState } from "react";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="/" element={<Body />} />
        <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
      </Route>
    </Routes>
  );
}

export default App;
