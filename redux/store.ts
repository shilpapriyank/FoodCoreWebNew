// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
// import restaurantsReducer from "./restaurants/restaurants.slice";
// import { createWrapper } from "next-redux-wrapper";

// // Combine reducers
// const rootReducer = combineReducers({
//   restaurant: restaurantsReducer,
//   // Add more reducers here
// });

// // Persist config
// const persistConfig = {
//   key: "root",
//   storage,
//   // whitelist: ["restaurant"], // Optional: specify what to persist
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Store creation
// const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(process.env.NODE_ENV === "development" ? [logger] : []),
//     devTools: process.env.NODE_ENV === "development",
//   });
// };

// // Wrapper for Next.js
// export const wrapper = createWrapper(makeStore, {
//   debug: process.env.NODE_ENV === "development",
// });

// // Types
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppDispatch = ReturnType<AppStore["dispatch"]>;
// export type RootState = ReturnType<AppStore["getState"]>;

// // Persistor
// export const store = makeStore();
// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { combineReducers } from "redux";
import restaurantsReducer from "./restaurants/restaurants.slice";

// Combine reducers
const rootReducer = combineReducers({
  restaurant: restaurantsReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware setup with logger only in development
const middleware = (
  getDefaultMiddleware: typeof configureStore.prototype.middleware
) => {
  const middlewares = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  return middlewares;
};

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
