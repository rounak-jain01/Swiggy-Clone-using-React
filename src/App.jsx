import { useState } from "react";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { CartValue, Coordinates, Visibility } from "./context/contextAPI";
import Cart from "./Components/Cart";

function App() {
  const [visible, setVisible] = useState(false);
  const [cords, setcords] = useState({ lat: 12.9753, lng: 77.591 });
  const [cartData, setCartData] = useState([]);

  return (
    <CartValue.Provider value={{ cartData, setCartData }}>
      <Coordinates.Provider value={{ cords, setcords }}>
        <Visibility.Provider value={{ visible, setVisible }}>
          <div className={`${visible ? "overflow-hidden max-h-screen" : " "}`}>
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route path="/" element={<Body />} />
                <Route
                  path="/restaurantMenu/:id"
                  element={<RestaurantMenu />}
                />
                <Route
                  path="/Cart"
                  element={<Cart />}
                />
              </Route>
            </Routes>
          </div>
        </Visibility.Provider>
      </Coordinates.Provider>
    </CartValue.Provider>
  );
}

export default App;
