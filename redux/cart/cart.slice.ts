import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartServices } from "./cart.services";
import {
  CartDetails,
  CartTotal,
  GetCartItems,
  GetCartItemsList,
} from "@/types/cart-types/cartservice.type";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";
import { CartTypes } from "./cart.type";
import { checkIntegerValue } from "@/components/common/utility";
import { ORDER_TYPE } from "@/components/nt/common/utility";
import { checkOrderTime, setDeliveryRequestId } from "../order/order.slice";

// Define the cart item shape
interface CartState {
  // cartitemdetail: {
  //   cartDetails: CartDetails | null;
  // };
  cartitemdetail: GetCartItems | null;
  cartitemcount: any | null;
  carttotal: CartTotal | null;
  deliverycharges: any;
  rewardpoints: any;
  transactionid: string;
  grandtotal: number;
  paymentintentid: string;
  orderinfo: any;
}

const initialState: CartState = {
  // cartitemdetail: {
  //   cartDetails: null,
  // },
  cartitemdetail: null,
  cartitemcount: null,
  carttotal: null,
  deliverycharges: {},
  rewardpoints: {},
  transactionid: "",
  grandtotal: 0,
  paymentintentid: "",
  orderinfo: {},
};

// Example async thunk
export const getCartItem = createAsyncThunk(
  //"cart/getCartItem",
  CartTypes.CART_DATA,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      cartId,
      customerId,
      rewardpoints,
      redeemamount,
      deliveryaddressId,
      tipPercentage,
      tipAmount,
      ordertype,
      selectedTime,
      requestId,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      cartId: number;
      customerId: number;
      rewardpoints?: number;
      redeemamount?: number;
      deliveryaddressId?: number;
      tipPercentage?: number;
      tipAmount?: number;
      ordertype?: number;
      selectedTime: string;
      requestId: string;
    },
    { dispatch }
  ) => {
    const tippercent = tipPercentage && tipPercentage > 0 ? tipPercentage : 0;
    const tip = tipAmount ?? 0;
    const response = await CartServices.getCartItemList({
      cartsessionId,
      locationId,
      restaurantId,
      cartId,
      customerId,
      rewardpoints,
      redeemamount,
      deliveryaddressId,
      // tippercent,
      tipAmount,
      tipPercentage,
      ordertype,
      selectedTime,
      requestId,
    });
    return response as GetCartItems;
  }
);

// export const getCartItemCount = createAsyncThunk(
//   CartTypes.CART_ITEM_COUNT,
//   async (
//     {
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//     }: {
//       cartsessionId?: string;
//       locationId: number;
//       restaurantId: number;
//       customerId: number;
//     },
//     thunkAPI
//   ) => {
//     debugger;
//     const response = await CartServices.getCartItemCount(
//       cartsessionId ?? "",
//       locationId,
//       restaurantId,
//       customerId
//     );
//     console.log("response of getCartItemCount from cart slice", response);
//     return response;
//   }
// );

export const getCartItemCount = createAsyncThunk(
  CartTypes.CART_ITEM_COUNT,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
    }: {
      cartsessionId?: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
    },
    thunkAPI
  ) => {
    //debugger;
    const response = await CartServices.getCartItemCount(
      cartsessionId ?? "",
      locationId,
      restaurantId,
      customerId
    );

    if (response && typeof response.cartCount === "number") {
      return response.cartCount;
    } else {
      return 0;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({
    cartsessionId,
    cartId,
    restaurantId,
    locationId,
  }: {
    cartsessionId: string;
    cartId: number;
    restaurantId: number;
    locationId: number;
  }) => {
    const response = await CartServices.deleteCartItem(
      cartsessionId,
      cartId,
      restaurantId,
      locationId
    );
    return response;
  }
);

// export const deleteCartItem = createAsyncThunk(
//   "cart/deleteCartItem",
//   async (params: any) => {
//     const response = await CartServices.deleteCartItem(
//       params.cartsessionId,
//       params.cartId,
//       params.restaurantId,
//       params.locationId
//     );
//     return response;
//   }
// );

export const updatequantity = createAsyncThunk(
  //"cart/updatequantity",
  CartTypes.UPDATE_QUANTITY,
  async ({
    cartsessionId,
    cartId,
    qty,
    price,
    locationId,
    restaurantId,
  }: {
    cartsessionId: string;
    cartId: number;
    qty: number;
    price: string;
    locationId: number;
    restaurantId: number;
  }) => {
    const response = await CartServices.updatequantity(
      cartsessionId,
      cartId,
      qty,
      price,
      locationId,
      restaurantId
    );
    return response;
  }
);

export const checkCustomerRewardPoints = createAsyncThunk(
  CartTypes.CHECK_CUSTOMER_REWARD_POINTS,
  async (
    {
      restaurantId,
      customerId,
      rewardpoints,
      amount,
    }: {
      restaurantId: number;
      customerId: number;
      rewardpoints: number;
      amount: string;
    },
    thunkAPI
  ) => {
    await CartServices.checkCustomerRewardPoints(
      restaurantId,
      customerId,
      rewardpoints,
      amount
    ).then((response) => {
      if (response) {
        return response;
      }
    });
  }
);

export const cartcheckout = createAsyncThunk(
  "cart/cartcheckout",
  async ({ obj, restaurantId }: any) => {
    const response = await CartServices.cartcheckout(obj, restaurantId);
    return response;
  }
);

export const deleteCartItemFromSessionId = createAsyncThunk(
  CartTypes.DELETE_CART_ITEM_FROM_SESSIONID,
  async (
    {
      cartsessionId,
      restaurantId,
      locationId,
    }: {
      cartsessionId: string;
      restaurantId: number;
      locationId: number;
    },
    thunkAPI
  ) => {
    await CartServices.deleteCartItemFromSessionId(
      cartsessionId,
      restaurantId,
      locationId
    ).then((response) => {
      if (response) {
        return response;
      }
    });
  }
);

// export const deleteCartItemFromSessionId = (
//   cartsessionId: any,
//   restaurantId: any,
//   locationId: any
// ) => {
//   // return (dispatch) => {
//   if (cartsessionId) {
//     let response = CartServices.deleteCartItemFromSessionId(
//       cartsessionId,
//       restaurantId,
//       locationId
//     );
//   }
// };

export const carttotaldata = createAsyncThunk(
  "cart/cartTotalData",
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      ordertimetype,
      recievingDate,
      enableTimeSlot,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
      cartId: number;
      rewardpoints?: string;
      redeemamount?: string;
      tipPercentage?: string;
      tipAmount?: string;
      deliveryaddressId?: any;
      ordertype?: number;
      requestId?: string;
      recievingTime: string;
      recievingMeridian: string;
      ordertimetype: number;
      recievingDate: string;
      enableTimeSlot: boolean;
    },
    { dispatch }
  ) => {
    await CartServices.carttotal(
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      checkIntegerValue(tipAmount),
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      ordertimetype,
      recievingDate,
      enableTimeSlot
    ).then((response) => {
      if (response) {
        if (
          ordertype === ORDER_TYPE.DELIVERY.value &&
          response?.deliveryCharges
        ) {
          let dcharges = JSON.parse(response?.deliveryCharges);
          let dropofTime =
            dcharges != undefined &&
            dcharges?.dropofTime &&
            dcharges.dropofTime;
          let responseRequestId =
            dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
          //check requesting id and incoming id and time not same then update
          if (dcharges && dropofTime && dcharges?.returnMessage === "") {
            if (!enableTimeSlot) {
              // dispatch({
              //   type: OrderTypes.CHECK_ORDER_TIME,
              //   payload: dropofTime,
              // });
              dispatch(checkOrderTime(dropofTime));
            }
            // dispatch({
            //   type: OrderTypes.DELIVERY_REQUEST_ID,
            //   payload: responseRequestId,
            // });
            dispatch(setDeliveryRequestId(responseRequestId));
          }
        }

        // dispatch({
        //   type: CartTypes.CART_TOTAL,
        //   payload: response.cartDetails,
        // });
      }
      return response;
    });
  }
);

export const getCartTotalData = createAsyncThunk(
  CartTypes.CART_TOTAL,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      enableTimeSlot,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
      cartId: number;
      rewardpoints: string;
      redeemamount: string;
      tipPercentage: string;
      tipAmount: string;
      deliveryaddressId: number;
      ordertype: number;
      requestId: string;
      recievingTime: string;
      recievingMeridian: string;
      enableTimeSlot: any;
    },
    { dispatch }
  ) => {
    await CartServices.carttotal(
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      enableTimeSlot
    ).then((response) => {
      if (response) {
        if (
          ordertype === ORDER_TYPE.DELIVERY.value &&
          response?.deliveryCharges
        ) {
          let dcharges = JSON.parse(response?.deliveryCharges);
          let dropofTime =
            dcharges != undefined &&
            dcharges?.dropofTime &&
            dcharges.dropofTime;
          let responseRequestId =
            dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
          //check requesting id and incoming id and time not same then update
          if (dcharges && dropofTime && dcharges?.returnMessage === "") {
            if (!enableTimeSlot) {
              // dispatch({
              //   type: OrderTypes.CHECK_ORDER_TIME,
              //   payload: dropofTime,
              // });
              dispatch(checkOrderTime(dropofTime));
            }
            // dispatch({
            //   type: OrderTypes.DELIVERY_REQUEST_ID,
            //   payload: responseRequestId,
            // });
            dispatch(setDeliveryRequestId(responseRequestId));
          }
        }

        // dispatch({
        //   type: CartTypes.CART_TOTAL,
        //   payload: response.cartDetails,
        // });
      }
      return response;
    });
  }
);

export const afterPaymentSuccess = (
  restaurantId: any,
  orderId: any,
  source: any
) => {
  // return (dispatch) => {
  if (orderId > 0) {
    CartServices.afterPaymentSuccess(restaurantId, orderId, source);
  }
};

export const emptycart = () => {
  return (dispatch: any) => {
    dispatch({
      type: CartTypes.CART_EMPTY,
      payload: null,
    });
  };
};

export const orderinstruction = (message: any) => {
  return (dispatch: any) => {
    dispatch({
      type: CartTypes.SET_ORDER_INSTRUCTION,
      payload: message,
    });
  };
};
export const orderdeliveryinstruction = (message: any) => {
  return (dispatch: any) => {
    dispatch({
      type: CartTypes.SET_ORDER_DELIVERY_INSTRUCTION,
      payload: message,
    });
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<GetCartItems>) => {
      state.cartitemdetail = action.payload;
    },
    updateCartItemCount: (state) => {
      state.cartitemcount = 0;
    },
    updateCartItem: (state) => {
      state.cartitemdetail = null;
    },
    setTransactionId: (state, action: PayloadAction<string>) => {
      state.transactionid = action.payload;
    },
    setGrandTotal: (state, action: PayloadAction<number>) => {
      state.grandtotal = action.payload;
    },
    setPaymentIntentId: (state, action: PayloadAction<string>) => {
      state.paymentintentid = action.payload;
    },
    // setOrderInstruction: (state, action: PayloadAction<string>) => {
    //   state.orderinstruction = action.payload;
    // },
    // setOrderDeliveryInstruction: (state, action) => {
    //   state.orderdeliveryinstruction = action.payload;
    // },
    clearRewardPoint: (state) => {
      state.rewardpoints = {};
    },
    cartEmpty: (state) => {
      Object.assign(state, initialState);
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
    setOrderInfo: (state, action: PayloadAction<any>) => {
      state.orderinfo = action.payload;
    },
    emptyOrderInfo: (state) => {
      state.orderinfo = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     getCartItem.fulfilled,
  //     (state, action: PayloadAction<GetCartItemsList>) => {
  //       state.cartitemdetail = action.payload;
  //     }
  //   );
  //   // builder.addCase(
  //   //   getCartItem.fulfilled,
  //   //   (state, action: PayloadAction<CartDetails | null>) => {
  //   //     if (action.payload) {
  //   //       state.cartitemdetail.cartDetails = action.payload;
  //   //     } else {
  //   //       state.cartitemdetail.cartDetails = null;
  //   //     }
  //   //   }
  //   // );
  // },

  extraReducers: (builder) => {
    builder.addCase(
      getCartItem.fulfilled,
      (state, action: PayloadAction<GetCartItems | null>) => {
        state.cartitemdetail = action.payload;
      }
    );

    // builder.addCase(
    //   getCartItemCount.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //     state.cartitemcount = action.payload;
    //   }
    // );

    builder.addCase(
      getCartItemCount.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.cartitemcount = action.payload;
      }
    );

    // builder.addCase(
    //   deleteCartItem.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //     // Optional: You can modify this if response structure is different
    //     state.cartitemdetail = action.payload;
    //   }
    // );

    builder.addCase(
      updatequantity.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cartitemcount = action.payload;
      }
    );

    builder.addCase(
      carttotaldata.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.carttotal = action.payload.cartDetails;
          try {
            state.deliverycharges = JSON.parse(
              action.payload?.deliveryCharges || "{}"
            );
          } catch {
            state.deliverycharges = {};
          }
        }
      }
    );

    builder.addCase(deleteCartItemFromSessionId.fulfilled, (state) => {
      // Clear cart item detail and count
      state.cartitemdetail = null;
      state.cartitemcount = 0;
    });
  },
});

export const {
  setCartItem,
  updateCartItemCount,
  updateCartItem,
  setTransactionId,
  setGrandTotal,
  setPaymentIntentId,
  // setOrderInstruction,
  // setOrderDeliveryInstruction,
  clearRewardPoint,
  cartEmpty,
  resetCart,
  setOrderInfo,
  emptyOrderInfo,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { CartServices } from "./cart.services";
// import { RootState } from "../store"; // Adjust according to your store location
// import { CartDetails, CartTotal } from "@/types/cart-types/cartservice.type";
// import { CartTypes } from "./cart.type";
// import {
//   checkIntegerValue,
//   ORDER_TIME_TYPE,
// } from "@/components/common/utility";
// import { ORDER_TYPE } from "@/components/nt/common/utility";
// import { checkOrderTime, setDeliveryRequestId } from "../order/order.slice";
// import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

// // Define state interface
// interface CartState {
//   cartitemdetail: CartDetails | {};
//   cartitemcount: any;
//   carttotal: any | {};
//   deliverycharges: number;
//   rewardpoints: number;
//   transactionid: string;
//   grandtotal: number;
//   paymentintentid: string;
//   orderinfo: any;
//   orderinstruction?: string;
//   orderdeliveryinstruction?: string;
// }

// const initialState: CartState = {
//   cartitemdetail: {},
//   cartitemcount: 0,
//   carttotal: {},
//   deliverycharges: 0,
//   rewardpoints: 0,
//   transactionid: "",
//   grandtotal: 0,
//   paymentintentid: "",
//   orderinfo: {},
// };

// // Example async thunk: getCartItem
// export const getCartItem = createAsyncThunk(
//   "cart/getCartItem",
//   async (
//     {
//       cartsessionId,
//       locationId,
//       restaurantId,
//       cartId,
//       customerId,
//       rewardpoints,
//       redeemamount,
//       deliveryaddressId,
//       tipPercentage,
//       tipAmount,
//       ordertype,
//       selectedTime,
//       requestId,
//     }: {
//       cartsessionId: string;
//       locationId: number;
//       restaurantId: number;
//       cartId: number;
//       customerId: number;
//       rewardpoints: number;
//       redeemamount: number;
//       deliveryaddressId: number;
//       tipPercentage: number;
//       tipAmount: number;
//       ordertype: number;
//       selectedTime: string;
//       requestId?: string;
//     },
//     thunkAPI
//   ) => {
//     const tippercent = tipPercentage > 0 ? tipPercentage : 0;
//     const tip = tipAmount ? tipAmount : 0;
//     const response = await CartServices.getCartItemList({
//       cartsessionId: cartsessionId,
//       locationId: locationId,
//       restaurantId: restaurantId,
//       cartId: cartId,
//       customerId: customerId,
//       rewardpoints: rewardpoints,
//       redeemamount: redeemamount,
//       deliveryaddressId: deliveryaddressId,
//       tipPercentage: tippercent,
//       tipAmount: tip,
//       ordertype: ordertype,
//       selectedTime: selectedTime,
//       requestId: String(requestId),
//     });
//     return response;
//   }
// );

// // Example async thunk: getCartItemCount
// export const getCartItemCount = createAsyncThunk(
//   "cart/getCartItemCount",
//   async (
//     {
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//     }: {
//       cartsessionId?: string;
//       locationId: number;
//       restaurantId: number;
//       customerId: number;
//     },
//     thunkAPI
//   ) => {
//     const response = await CartServices.getCartItemCount(
//       cartsessionId ?? "",
//       locationId,
//       restaurantId,
//       customerId
//     );
//     return response ?? 0;
//   }
// );

// export const deleteCartItem = createAsyncThunk(
//   CartTypes.DELETE_CART_ITEM,
//   async (
//     {
//       cartsessionId,
//       cartId,
//       restaurantId,
//       locationId,
//     }: {
//       cartsessionId: string;
//       cartId: number;
//       restaurantId: number;
//       locationId: number;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.deleteCartItem(
//       cartsessionId,
//       cartId,
//       restaurantId,
//       locationId
//     ).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const updatequantity = createAsyncThunk(
//   CartTypes.UPDATE_QUANTITY,
//   async (
//     {
//       cartsessionId,
//       cartId,
//       qty,
//       price,
//       locationId,
//       restaurantId,
//     }: {
//       cartsessionId: string;
//       cartId: number;
//       qty: number;
//       price: string;
//       locationId: number;
//       restaurantId: number;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.updatequantity(
//       cartsessionId,
//       cartId,
//       qty,
//       price,
//       locationId,
//       restaurantId
//     ).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const checkCustomerRewardPoints = createAsyncThunk(
//   CartTypes.CHECK_CUSTOMER_REWARD_POINTS,
//   async (
//     {
//       restaurantId,
//       customerId,
//       rewardpoints,
//       amount,
//     }: {
//       restaurantId: number;
//       customerId: number;
//       rewardpoints: number;
//       amount: string;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.checkCustomerRewardPoints(
//       restaurantId,
//       customerId,
//       rewardpoints,
//       amount
//     ).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const carttotaldata = createAsyncThunk(
//   "cart/cartTotalData",
//   async (
//     {
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//       cartId,
//       rewardpoints,
//       redeemamount,
//       tipPercentage,
//       tipAmount,
//       deliveryaddressId,
//       ordertype,
//       requestId,
//       recievingTime,
//       recievingMeridian,
//       ordertimetype,
//       recievingDate,
//       enableTimeSlot,
//     }: {
//       cartsessionId: string;
//       locationId: number;
//       restaurantId: number;
//       customerId: number;
//       cartId: number;
//       rewardpoints?: string;
//       redeemamount?: string;
//       tipPercentage?: string;
//       tipAmount?: string;
//       deliveryaddressId?: any;
//       ordertype?: number;
//       requestId?: string;
//       recievingTime: string;
//       recievingMeridian: string;
//       ordertimetype: number;
//       recievingDate: string;
//       enableTimeSlot: boolean;
//     },
//     { dispatch }
//   ) => {
//     await CartServices.carttotal(
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//       cartId,
//       rewardpoints,
//       redeemamount,
//       tipPercentage,
//       checkIntegerValue(tipAmount),
//       deliveryaddressId,
//       ordertype,
//       requestId,
//       recievingTime,
//       recievingMeridian,
//       ordertimetype,
//       recievingDate,
//       enableTimeSlot
//     ).then((response) => {
//       if (response) {
//         if (
//           ordertype === ORDER_TYPE.DELIVERY.value &&
//           response?.deliveryCharges
//         ) {
//           let dcharges = JSON.parse(response?.deliveryCharges);
//           let dropofTime =
//             dcharges != undefined &&
//             dcharges?.dropofTime &&
//             dcharges.dropofTime;
//           let responseRequestId =
//             dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
//           //check requesting id and incoming id and time not same then update
//           if (dcharges && dropofTime && dcharges?.returnMessage === "") {
//             if (!enableTimeSlot) {
//               // dispatch({
//               //   type: OrderTypes.CHECK_ORDER_TIME,
//               //   payload: dropofTime,
//               // });
//               dispatch(checkOrderTime(dropofTime));
//             }
//             // dispatch({
//             //   type: OrderTypes.DELIVERY_REQUEST_ID,
//             //   payload: responseRequestId,
//             // });
//             dispatch(setDeliveryRequestId(responseRequestId));
//           }
//         }

//         // dispatch({
//         //   type: CartTypes.CART_TOTAL,
//         //   payload: response.cartDetails,
//         // });
//       }
//       return response;
//     });
//   }
// );

// export const getCartTotalData = createAsyncThunk(
//   CartTypes.CART_TOTAL,
//   async (
//     {
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//       cartId,
//       rewardpoints,
//       redeemamount,
//       tipPercentage,
//       tipAmount,
//       deliveryaddressId,
//       ordertype,
//       requestId,
//       recievingTime,
//       recievingMeridian,
//       enableTimeSlot,
//     }: {
//       cartsessionId: string;
//       locationId: number;
//       restaurantId: number;
//       customerId: number;
//       cartId: number;
//       rewardpoints: string;
//       redeemamount: string;
//       tipPercentage: string;
//       tipAmount: string;
//       deliveryaddressId: number;
//       ordertype: number;
//       requestId: string;
//       recievingTime: string;
//       recievingMeridian: string;
//       enableTimeSlot: any;
//     },
//     { dispatch }
//   ) => {
//     await CartServices.carttotal(
//       cartsessionId,
//       locationId,
//       restaurantId,
//       customerId,
//       cartId,
//       rewardpoints,
//       redeemamount,
//       tipPercentage,
//       tipAmount,
//       deliveryaddressId,
//       ordertype,
//       requestId,
//       recievingTime,
//       recievingMeridian,
//       enableTimeSlot
//     ).then((response) => {
//       if (response) {
//         if (
//           ordertype === ORDER_TYPE.DELIVERY.value &&
//           response?.deliveryCharges
//         ) {
//           let dcharges = JSON.parse(response?.deliveryCharges);
//           let dropofTime =
//             dcharges != undefined &&
//             dcharges?.dropofTime &&
//             dcharges.dropofTime;
//           let responseRequestId =
//             dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
//           //check requesting id and incoming id and time not same then update
//           if (dcharges && dropofTime && dcharges?.returnMessage === "") {
//             if (!enableTimeSlot) {
//               // dispatch({
//               //   type: OrderTypes.CHECK_ORDER_TIME,
//               //   payload: dropofTime,
//               // });
//               dispatch(checkOrderTime(dropofTime));
//             }
//             // dispatch({
//             //   type: OrderTypes.DELIVERY_REQUEST_ID,
//             //   payload: responseRequestId,
//             // });
//             dispatch(setDeliveryRequestId(responseRequestId));
//           }
//         }

//         // dispatch({
//         //   type: CartTypes.CART_TOTAL,
//         //   payload: response.cartDetails,
//         // });
//       }
//       return response;
//     });
//   }
// );

// export const deliverycharges = createAsyncThunk(
//   CartTypes.DELIVERY_CHARGES,
//   async (
//     {
//       restaurantId,
//       locationId,
//       isGeoFancing,
//     }: {
//       restaurantId: number;
//       locationId: number;
//       isGeoFancing: boolean;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.deliverycharges(
//       restaurantId,
//       locationId,
//       isGeoFancing
//     ).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const cartcheckout = createAsyncThunk(
//   CartTypes.CART_CHECKOUT,
//   async (
//     {
//       obj,
//       restaurantId,
//     }: {
//       obj: any;
//       restaurantId: number;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.cartcheckout(obj, restaurantId).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const clearCartItems = createAsyncThunk(
//   CartTypes.DELETE_CART_ITEM,
//   async (
//     {
//       cartsessionid,
//       restaurantinfo,
//       rewardpoints,
//       customerId,
//       deliveryaddressId,
//     }: {
//       cartsessionid: string;
//       restaurantinfo: GetAllRestaurantInfo;
//       rewardpoints: any;
//       customerId: number;
//       deliveryaddressId: number;
//     },
//     { dispatch }
//   ) => {
//     await CartServices.deleteCartItemFromSessionId(
//       cartsessionid,
//       restaurantinfo.restaurantId,
//       restaurantinfo.defaultlocationId
//     ).then((response) => {
//       if (response) {
//         dispatch(deleteCartItem(response));
//         dispatch(updateCartItem());
//         dispatch(updateCartItemCount(0));

//         let redeemPoint =
//           rewardpoints.redeemPoint > 0 ? parseInt(rewardpoints.redeemPoint) : 0;
//         let redeemAmount = 0;
//         if (redeemPoint > 0) {
//           redeemAmount = rewardpoints.redeemPoint / rewardpoints.rewardvalue;
//         }

//         dispatch(
//           getCartItem({
//             cartsessionId: cartsessionid,
//             locationId: restaurantinfo.defaultlocationId,
//             restaurantId: restaurantinfo.restaurantId,
//             cartId: 0,
//             customerId: customerId,
//             rewardpoints: redeemPoint,
//             redeemamount: redeemAmount,
//             deliveryaddressId: deliveryaddressId > 0 ? deliveryaddressId : 0,
//             tipAmount: 0,
//             tipPercentage: 0,
//             ordertype: 0,
//             selectedTime: "",
//             requestId: "",
//           })
//         );
//         dispatch(
//           getCartItemCount({
//             cartsessionId: cartsessionid,
//             locationId: restaurantinfo.defaultlocationId,
//             restaurantId: restaurantinfo.restaurantId,
//             customerId: customerId,
//           })
//         );
//       }
//     });
//   }
// );

// export const deleteCartItemFromSessionId = createAsyncThunk(
//   CartTypes.DELETE_CART_ITEM_FROM_SESSIONID,
//   async (
//     {
//       cartsessionId,
//       restaurantId,
//       locationId,
//     }: {
//       cartsessionId: string;
//       restaurantId: number;
//       locationId: number;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.deleteCartItemFromSessionId(
//       cartsessionId,
//       restaurantId,
//       locationId
//     ).then((response) => {
//       if (response) {
//         return response;
//       }
//     });
//   }
// );

// export const afterPaymentSuccess = createAsyncThunk(
//   CartTypes.DELETE_CART_ITEM_FROM_SESSIONID,
//   async (
//     {
//       restaurantId,
//       orderId,
//       source,
//     }: {
//       restaurantId: number;
//       orderId: number;
//       source: any;
//     },
//     thunkAPI
//   ) => {
//     await CartServices.afterPaymentSuccess(restaurantId, orderId, source).then(
//       (response) => {
//         if (response) {
//           return response;
//         }
//       }
//     );
//   }
// );

// // Create slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     updateCartItemCount(state, action: PayloadAction<any>) {
//       state.cartitemcount = action.payload;
//     },
//     updateCartItem(state) {
//       state.cartitemdetail = {};
//     },
//     setCartItem(state, action: PayloadAction<any>) {
//       state.cartitemdetail = action.payload;
//     },
//     setCartTotal(state, action: PayloadAction<any>) {
//       state.carttotal = action.payload;
//     },
//     setRewardPoints(state, action: PayloadAction<any>) {
//       state.rewardpoints = action.payload;
//     },
//     setTransactionId(state, action: PayloadAction<string>) {
//       state.transactionid = action.payload;
//     },
//     setGrandTotal(state, action: PayloadAction<number>) {
//       state.grandtotal = action.payload;
//     },
//     setPaymentIntentId(state, action: PayloadAction<string>) {
//       state.paymentintentid = action.payload;
//     },
//     setOrderInstruction(state, action: PayloadAction<string>) {
//       state.orderinstruction = action.payload;
//     },
//     setOrderDeliveryInstruction(state, action: PayloadAction<string>) {
//       state.orderdeliveryinstruction = action.payload;
//     },
//     setOrderInfo(state, action: PayloadAction<any>) {
//       state.orderinfo = action.payload;
//     },
//     emptyCart(state) {
//       state.cartitemdetail = {};
//       state.cartitemcount = 0;
//       state.carttotal = {};
//       state.deliverycharges = 0;
//       state.transactionid = "";
//       state.grandtotal = 0;
//       state.paymentintentid = "";
//     },
//     resetCart(state) {
//       state.cartitemdetail = {};
//       state.cartitemcount = 0;
//       state.carttotal = {};
//       state.deliverycharges = 0;
//       state.transactionid = "";
//       state.grandtotal = 0;
//       state.paymentintentid = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getCartItem.fulfilled, (state, action) => {
//       if (action.payload?.cartDetails?.cartTotal) {
//         state.cartitemdetail = action.payload;
//         state.carttotal = action.payload.cartDetails;
//       }
//     });
//     builder.addCase(getCartItemCount.fulfilled, (state, action) => {
//       state.cartitemcount = action.payload;
//     });

//     builder.addCase(deleteCartItem.fulfilled, (state) => {
//       state.cartitemdetail = {};
//     });
//   },
// });

// export const {
//   updateCartItemCount,
//   updateCartItem,
//   setCartItem,
//   setCartTotal,
//   setRewardPoints,
//   setTransactionId,
//   setGrandTotal,
//   setPaymentIntentId,
//   setOrderInstruction,
//   setOrderDeliveryInstruction,
//   setOrderInfo,
//   emptyCart,
//   resetCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// // Selectors
// export const selectCart = (state: RootState) => state.cart;
// export const selectCartItemCount = (state: RootState) =>
//   state.cart.cartitemcount;
