import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  number: 0, // Initial value of the number
};

const numberReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NUMBER':
      return { ...state, number: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    number: numberReducer,
  },
});

export const setNumber = (number) => store.dispatch({ type: 'SET_NUMBER', payload: number });
export const selectNumber = () => store.getState().number;
