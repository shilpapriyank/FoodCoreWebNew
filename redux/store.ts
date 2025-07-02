import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
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
import selecteddeliveryReducer from "./selected-delivery-data/selecteddelivery.slice";
import menuItemReducer from "./menu-item/menu-item.slice";
import categoryReducer from "./category/category.slice";
import loginReducer from "./login/login.slice";
import orderReducer from "./order/order.slice";
import cartReducer from "./cart/cart.slice";
import sessionReducer from "./session/session.slice";
import metadataReducer from "./metadata/metadata.slice";
import mainReducer from "./main/main.slice"
import tableOrderReducer from "./tableorder/tableorder.slice";
import rewardpointReducer from "./rewardpoint/rewardpoint.slice";
import deliveryaddressReducer from "./delivery-address/delivery-address.slice";
import studentReducer from "../redux/student/student.slice";
import registerReducer from "./register/register.slice";
import timmingReducer from "./restaurant-hour/restaurant-hour.slice"
// Combine reducers
const rootReducer = combineReducers({
  restaurant: restaurantsReducer,
  main: mainReducer,
  category: categoryReducer,
  menuitem: menuItemReducer,
  cart: cartReducer,
  register: registerReducer,
  userdetail: loginReducer,
  // location: locationReducer,
  todaytimming: timmingReducer,
  selecteddelivery: selecteddeliveryReducer,
  order: orderReducer,
  deliveryaddress: deliveryaddressReducer,
  session: sessionReducer,
  studentname: studentReducer,
  rewardpoints: rewardpointReducer,
  metadata: metadataReducer,
  tableorder: tableOrderReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "userdetail",
    "selecteddelivery",
    "cart",
    "order",
    "menuitem",
    "main",
    "restaurantWindowTime",
    "deliveryaddress",
    "session",
    "studentname",
    "rewardpoints",
    "restaurant",
    "tableorder",
  ],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
    }

    return middlewares;
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;