import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartServices } from "./cart.services";
import {
  CartDetails,
  CartTotal,
  GetCartItemsList,
} from "@/types/cart-types/cartservice.type";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";
import { CartTypes } from "./cart.type";

// Define the cart item shape
interface CartState {
  // cartitemdetail: {
  //   cartDetails: CartDetails | null;
  // };
  cartitemdetail: GetCartItemsList | null;
  cartitemcount: number;
  carttotal: CartTotal | null; // Can be CartTotal again depending on how you're storing it
  deliverycharges: any;
  rewardpoints: any;
  transactionid: string | null;
  grandtotal: number;
  paymentintentid: string;
  orderinstruction?: string;
  orderdeliveryinstruction?: string;
  orderinfo?: any;
}

const initialState: CartState = {
  // cartitemdetail: {
  //   cartDetails: null,
  // },
  cartitemdetail: null,
  cartitemcount: 0,
  carttotal: null,
  deliverycharges: {},
  rewardpoints: {},
  transactionid: null,
  grandtotal: 0,
  paymentintentid: "",
  orderinstruction: "",
  orderdeliveryinstruction: "",
  orderinfo: {},
};

// Example async thunk
export const getCartItem = createAsyncThunk(
  "cart/getCartItem",
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
    return response as GetCartItemsList;
  }
);

// export const getCartItemCount = createAsyncThunk<number, CartItemCountParams>(
//     CartTypes.CART_ITEM_COUNT,
//     async (params) => {
//         const response = await CartServices.getCartItemCount(
//             params.sessionid ?? '',
//             params.locationId,
//             params.restaurantId,
//             params.customerId
//         );
//         return response;
//     }
// );

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (params: any) => {
    const response = await CartServices.deleteCartItem(
      params.cartsessionId,
      params.cartId,
      params.restaurantId,
      params.locationId
    );
    return response;
  }
);

export const updatequantity = createAsyncThunk(
  "cart/updatequantity",
  async (params: any) => {
    const response = await CartServices.updatequantity(
      params.cartsessionId,
      params.cartId,
      params.qty,
      params.price,
      params.locationId,
      params.restaurantId
    );
    return response;
  }
);

export const cartcheckout = createAsyncThunk(
  "cart/cartcheckout",
  async ({ obj, restaurantId }: any) => {
    const response = await CartServices.cartcheckout(obj, restaurantId);
    return response;
  }
);

export const deleteCartItemFromSessionId = (
  cartsessionId: any,
  restaurantId: any,
  locationId: any
) => {
  // return (dispatch) => {
  if (cartsessionId) {
    let response = CartServices.deleteCartItemFromSessionId(
      cartsessionId,
      restaurantId,
      locationId
    );
  }
};

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
    setCartItem: (state, action: PayloadAction<any>) => {
      state.cartitemdetail = action.payload;
    },
    updateCartItemCount: (state) => {
      state.cartitemcount = 0;
    },
    updateCartItem: (state, action: PayloadAction<any>) => {
      state.cartitemdetail = action.payload;
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
    setOrderInstruction: (state, action: PayloadAction<string>) => {
      state.orderinstruction = action.payload;
    },
    setOrderDeliveryInstruction: (state, action: PayloadAction<string>) => {
      state.orderdeliveryinstruction = action.payload;
    },
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
  extraReducers: (builder) => {
    builder.addCase(
      getCartItem.fulfilled,
      (state, action: PayloadAction<GetCartItemsList>) => {
        state.cartitemdetail = action.payload;
      }
    );
    // builder.addCase(
    //   getCartItem.fulfilled,
    //   (state, action: PayloadAction<CartDetails | null>) => {
    //     if (action.payload) {
    //       state.cartitemdetail.cartDetails = action.payload;
    //     } else {
    //       state.cartitemdetail.cartDetails = null;
    //     }
    //   }
    // );
  },
});

export const {
  setCartItem,
  updateCartItemCount,
  updateCartItem,
  setTransactionId,
  setGrandTotal,
  setPaymentIntentId,
  setOrderInstruction,
  setOrderDeliveryInstruction,
  clearRewardPoint,
  cartEmpty,
  resetCart,
  setOrderInfo,
  emptyOrderInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
