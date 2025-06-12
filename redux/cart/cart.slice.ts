import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartServices } from "./cart.services";
import { CartDetails } from "@/types/cart-types/cartservice.type";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

// Define the cart item shape
interface CartState {
  cartitemdetail: {
    cartDetails: CartDetails;
  };
  cartitemcount: number;
  carttotal: string; // Can be CartTotal again depending on how you're storing it
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
  cartitemdetail: {
    cartDetails: {
      cartItemDetails: [],
      cartOptionParams: [],
      cartTotal: {
        PromotionData: null,
        cartCount: 0,
        cartTaxList: null,
        currencySymbol: "$",
        customerOrderCount: 0,
        deliveryAmount: 0,
        deliveryCharges: null,
        discountAmount: 0,
        discountPercentage: "0",
        discountType: "%",
        grandTotal: 0,
        hstTotal: 0,
        isDiscountApplied: false,
        minOrderAmountForRewardPoint: null,
        reedemAmount: 0,
        reedemPoints: 0,
        subTotal: 0,
        subTotalWithDiscount: 0,
        systemAccessFee: 0,
        taxPercentage: 0,
        tipAmount: 0,
        tipPercentage: 0,
        totalTip: 0,
      },
    },
  },
  cartitemcount: 0,
  carttotal: "",
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
      ordertype?: string;
      selectedTime: string;
      requestId: string;
    },
    { dispatch }
  ) => {
    const tippercent = tipPercentage && tipPercentage > 0 ? tipPercentage : 0;
    const tip = tipAmount ?? 0;
    const response = await CartServices.getCartItemList(
      cartsessionId,
      locationId,
      restaurantId,
      cartId,
      customerId,
      rewardpoints,
      redeemamount,
      deliveryaddressId,
      tippercent,
      tip,
      ordertype,
      selectedTime,
      requestId
    );
    return response;
  }
);

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
    builder.addCase(getCartItem.fulfilled, (state, action) => {
      if (action.payload?.cartDetails?.cartTotal) {
        state.cartitemdetail = action.payload;
      }
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
  setOrderInstruction,
  setOrderDeliveryInstruction,
  clearRewardPoint,
  cartEmpty,
  resetCart,
  setOrderInfo,
  emptyOrderInfo,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { CartServices } from "./cart.services";
// import { CartTypes } from "./cart.type";

// interface CartState {
//   cartData: any;
//   cartitemcount: number;
//   cartTotal: any;
//   deliveryCharges: any;
//   rewardPoint: number | null;
//   grandTotal: any;
//   transactionId: string;
//   orderInstruction: string;
//   orderDeliveryInstruction: string;
//   paymentIntentId: string;
// }
// interface CartItemCountParams {
//   sessionid: string;
//   locationId: any;
//   restaurantId: number;
//   customerId: any;
// }

// const initialState: CartState = {
//   cartData: {},
//   cartitemcount: 0,
//   cartTotal: {},
//   deliveryCharges: {},
//   rewardPoint: null,
//   grandTotal: {},
//   transactionId: "",
//   orderInstruction: "",
//   orderDeliveryInstruction: "",
//   paymentIntentId: "",
// };

// export const getCartItem = createAsyncThunk(
//   CartTypes.CART_DATA,
//   async (params: any, { dispatch }) => {
//     const response = await CartServices.getCartItemList(
//       params.cartsessionId,
//       params.locationId,
//       params.restaurantId,
//       params.cartId,
//       params.customerId,
//       params.rewardpoints,
//       params.redeemamount,
//       params.deliveryaddressId,
//       params.tipPercentage > 0 ? params.tipPercentage : 0,
//       params.tipAmount ?? 0,
//       params.ordertype,
//       params.selectedtime,
//       params.deliveryRequestId
//     );
//     if (response?.cartDetails?.cartTotal) {
//       return response;
//     }
//     return {};
//   }
// );

// export const getCartItemCount = createAsyncThunk<number, CartItemCountParams>(
//   CartTypes.CART_ITEM_COUNT,
//   async (params) => {
//     const response = await CartServices.getCartItemCount(
//       params.sessionid ?? "",
//       params.locationId,
//       params.restaurantId,
//       params.customerId
//     );
//     return response;
//   }
// );

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

// export const updatequantity = createAsyncThunk(
//   "cart/updatequantity",
//   async (params: any) => {
//     const response = await CartServices.updatequantity(
//       params.cartsessionId,
//       params.cartId,
//       params.qty,
//       params.price,
//       params.locationId,
//       params.restaurantId
//     );
//     return response;
//   }
// );

// export const cartcheckout = createAsyncThunk(
//   "cart/cartcheckout",
//   async ({ obj, restaurantId }: any) => {
//     const response = await CartServices.cartcheckout(obj, restaurantId);
//     return response;
//   }
// );

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

// export const emptycart = () => {
//   return (dispatch: any) => {
//     dispatch({
//       type: CartTypes.CART_EMPTY,
//       payload: null,
//     });
//   };
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     updateCartItemCount(state) {
//       state.cartitemcount = 0;
//     },
//     updateCartItem(state) {
//       state.cartData = {};
//     },
//     setCartItem(state, action: PayloadAction<any>) {
//       state.cartData = action.payload;
//     },
//     setCartTotal(state, action: PayloadAction<any>) {
//       state.cartTotal = action.payload;
//     },
//     updateCartTotalData(state) {
//       state.cartTotal = {};
//     },
//     setRewardPoint(state, action: PayloadAction<number | null>) {
//       state.rewardPoint = action.payload;
//     },
//     setGrandTotal(state, action: PayloadAction<any>) {
//       state.grandTotal = action.payload;
//     },
//     setTransactionId(state, action: PayloadAction<string>) {
//       state.transactionId = action.payload;
//     },
//     setOrderInstruction(state, action: PayloadAction<string>) {
//       state.orderInstruction = action.payload;
//     },
//     setOrderDeliveryInstruction(state, action: PayloadAction<string>) {
//       state.orderDeliveryInstruction = action.payload;
//     },
//     emptyCart(state) {
//       state.cartData = {};
//     },
//     resetCart(state) {
//       return initialState;
//     },
//     setPaymentIntentId(state, action: PayloadAction<string>) {
//       state.paymentIntentId = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCartItem.fulfilled, (state, action) => {
//         state.cartData = action.payload;
//       })
//       .addCase(getCartItemCount.fulfilled, (state, action) => {
//         state.cartitemcount = action.payload;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action) => {
//         // implement if needed
//       })
//       .addCase(updatequantity.fulfilled, (state, action) => {
//         // implement if needed
//       })
//       .addCase(cartcheckout.fulfilled, (state, action) => {
//         // implement if needed
//       });
//   },
// });

// export const {
//   updateCartItemCount,
//   updateCartItem,
//   setCartItem,
//   setCartTotal,
//   updateCartTotalData,
//   setRewardPoint,
//   setGrandTotal,
//   setTransactionId,
//   setOrderInstruction,
//   setOrderDeliveryInstruction,
//   emptyCart,
//   resetCart,
//   setPaymentIntentId,
// } = cartSlice.actions;

// export default cartSlice.reducer;
