import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
        state.cart = [...state.cart]; // Create a new array to trigger a state update
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
        state.cart = [...state.cart]; // Create a new array to trigger a state update
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          state.cart = state.cart.filter((item) => item._id !== action.payload._id);
        } else {
          itemInCart.quantity--;
          state.cart = [...state.cart]; // Create a new array to trigger a state update
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
