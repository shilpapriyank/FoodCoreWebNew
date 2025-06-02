import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { combineReducers } from "redux";
import restaurantsReducer from "./restaurants/restaurantSlice";

// Combine reducers
const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["restaurants"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware setup with logger only in development
const middleware = (getDefaultMiddleware: typeof configureStore.prototype.middleware) => {
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


// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
// import { combineReducers } from "redux";
// import restaurantsReducer from "./restaurants/restaurantSlice";

// const rootReducer = combineReducers({
//   restaurants: restaurantsReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(logger),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

