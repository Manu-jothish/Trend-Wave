import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existingItem = state.cartItems.find((x) => x._id === item._id);

      if (existingItem) {
        state.cartItem = state.cartItems.map((x) => {
          return x._id === existingItem._id ? item : x;
        });
      } else {
        state.cartItem = [state.cartItems , item];
      }

      state.itemPrice = addDecimal(
        state.cartItems.reduce((acc, item) =>  acc + item.price * item.qty),
        0
      );

      state.shippingPrice = addDecimal(state.itemPrice > 100 ? 100 : 10);

      state.taxPrice = addDecimal(Number(0.15 * state.itemPrice));

      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
