import { createContext } from "react";

export const Visibility = createContext(false)
export const Coordinates = createContext({})
export const CartValue = createContext({ cartData: [], setCardData: () => {} })