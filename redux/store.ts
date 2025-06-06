import { configureStore, applyMiddleware  } from "@reduxjs/toolkit";
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
import deliveryaddressReducer from './delivery-address/delivery-address.slice';
import menuItemReducer from './menu-item/menu-item.slice';
import categoryReducer from './category/category.slice';
import loginReducer from './login/login.slice';
import orderReducer from './order/order.slice';
import locationReducer from './location/location.slice'
import cartReducer from './cart/cart.slice';

// Combine reducers
const rootReducer = combineReducers({
  restaurant: restaurantsReducer,
  deliveryaddress: deliveryaddressReducer,
  menuitem: menuItemReducer,
  category: categoryReducer,
  userdetail: loginReducer,
  order: orderReducer,
  location: locationReducer,
  cart: cartReducer,

});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['userdetail', 'selecteddelivery', 'cart', 'order', 'menuitem', 'main', 'restaurantWindowTime',
    'deliveryaddress', 'session', 'studentname', 'rewardpoints', 'restaurant', 'tableorder'],
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
