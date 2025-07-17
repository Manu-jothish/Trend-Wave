import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { CardTitle: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {},
});

export default cartSlice.reducer;
