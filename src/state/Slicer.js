import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  item: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //items
    setItem: (state, action) => {
      state.item = action.payload;
    },
    //cart
    addToCart: (state, action) => {
      state.cart = [...state.cart , action.payload.item];
    },
    //duplicate items
    removeDuplicate: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    //increase count
    increaseCount: (state, action) => {
      state.cart = state.cart.map((items) => {
        if (items.id === action.payload.id) {
          items.count++;
        }
        return items;
      });
    },
    //decrease count
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((items) => {
        if (items.id !== action.payload.id) {
          items.count--;
        }
        return items;
      });
    },
    //open cart
    setCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItem,
  addToCart,
  removeDuplicate,
  increaseCount,
  decreaseCount,
  setCartOpen,
} = cartSlice.actions;
export default cartSlice.reducer;
