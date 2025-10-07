import { useState } from "react";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Visibility } from "./context/contextAPI";

function App() {
  const [visible, setVisible] = useState(false);



  return (
    <Visibility.Provider value={{visible, setVisible}}>
      <div className={`${visible ? "overflow-hidden max-h-screen" : " "}`}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Body />} />
            <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
          </Route>
        </Routes>
      </div>
    </Visibility.Provider>
  );
}

export default App;
