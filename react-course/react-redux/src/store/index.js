import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import counterReducer from './counter';

// const counterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         ...state,
//         counter: state.counter + 1,
//       };

//     case 'INCREASE':
//       return {
//         ...state,
//         counter: state.counter + action.amount,
//       };

//     case 'DECREMENT':
//       return {
//         ...state,
//         counter: state.counter - 1,
//       };
//     case 'RESET':
//       return {
//         ...state,
//         counter: 0,
//       };
//     case 'TOGGLE':
//       return {
//         ...state,
//         showCounter: !state.showCounter,
//       };
//     default:
//       return state;
//   }
// };

const store = configureStore({ reducer: { counter: counterReducer, auth: authReducer } });

export default store;
