import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import restaurantsReducer from "./restaurants/restaurantSlice"; // <-- Import the reducer here

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger"; // optional for debugging

// export const store = configureStore({
//   reducer: {
//     restaurants: restaurantsReducer, // ✅ key name: "restaurants"
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(logger),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger"; // optional: only for logging

// export const store = configureStore({
//   reducer: {
//     restaurants: restaurantsReducer, // ✅ added here
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(logger),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
