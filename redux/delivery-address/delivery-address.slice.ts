// selectedDeliverySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedDeliveryTypes } from '../selected-delivery-data/selecteddelivery.types';

interface ChooseTime {
    [key: string]: any;
}

interface DeliveryState {
    choosetime: ChooseTime;
    pickupordelivery: string;
    selecteddeliveryaddress: Record<string, any> | null;
    tempDeliveryAddress?: Record<string, any> | null;
}

const initialState: DeliveryState = {
    choosetime: {},
    pickupordelivery: '',
    selecteddeliveryaddress: {},
};

const selectedDeliverySlice = createSlice({
    name: 'selectedDelivery',
    initialState,
    reducers: {
        [SelectedDeliveryTypes.SAVE_CHOOSE_TIME]: (state, action: PayloadAction<ChooseTime>) => {
            state.choosetime = action.payload;
        },
        [SelectedDeliveryTypes.SET_PICKUP_OR_DELIVERY]: (state, action: PayloadAction<string>) => {
            state.pickupordelivery = action.payload;
        },
        [SelectedDeliveryTypes.SELECTED_DELIVERY_ADDRESS]: (state, action: PayloadAction<Record<string, any> | null>) => {
            state.selecteddeliveryaddress = action.payload;
        },
        [SelectedDeliveryTypes.CLEAR_DELIVERY_ADDRESS]: (state) => {
            state.choosetime = {};
            state.pickupordelivery = '';
            state.selecteddeliveryaddress = {};
        },
        [SelectedDeliveryTypes.RESET_SELECTDELIVERY]: (state) => {
            state.pickupordelivery = '';
            state.selecteddeliveryaddress = null;
        },
    },
});

export const {
    SAVE_CHOOSE_TIME,
    SET_PICKUP_OR_DELIVERY,
    SELECTED_DELIVERY_ADDRESS,
    CLEAR_DELIVERY_ADDRESS,
    RESET_SELECTDELIVERY
} = selectedDeliverySlice.actions;

export default selectedDeliverySlice.reducer;
