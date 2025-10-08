import React, { useContext } from 'react'
import { CartValue } from '../context/contextAPI'

function Cart() {

    const {cartData, setCartData} = useContext(CartValue)
    console.log(cartData)
  return (
    <div>Cart</div>
  )
}

export default Cart