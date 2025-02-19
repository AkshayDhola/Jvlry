import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let findItem = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (findItem >= 0) {
        state.items[findItem].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const findIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (findIndex >= 0) {
        const item = state.items[findIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalPrice -= item.price;
        } else {
          state.items.splice(findIndex, 1);
          state.totalPrice -= item.price;

        }
      }
      state.totalQuantity -= 1;
    },

    addQuantity: (state, action) => {
      const findIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (findIndex >= 0) {
        const item = state.items[findIndex];
        item.quantity += 1;
        state.totalPrice += item.price;
      }
      state.totalQuantity += 1;
    },
  },
});

export const { addToCart, removeFromCart, addQuantity } = cartSlice.actions;

export default cartSlice.reducer;
