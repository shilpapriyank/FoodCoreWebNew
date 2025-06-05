// redux/deliveryAddress/deliveryAddressSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { DeliveryAddressServices } from './delivery-address.services'
import { DeliveryAddressInput, DeliveryAddressState, GetAddressResponse } from './delivery-address.types'

const initialState: DeliveryAddressState = {
    deliveryaddressdata: null,
    updatedAddress: false,
    choosetime: {},
    registeraddress: {} as DeliveryAddressInput,
    addressId: {} as DeliveryAddressInput,
    tempDeliveryAddress: null,
    pickupordelivery: 'delivery'
}

//Thunks (Async)
export const getAddress = createAsyncThunk(
    'deliveryAddress/getAddress',
    async ({
        customerId,
        restaurantId,
        locationId,
    }: {
        customerId: string;
        restaurantId: string;
        locationId: string;
    }) => {
        const response = await DeliveryAddressServices.getDeliveryAddress(
            customerId,
            restaurantId,
            locationId
        );

        if (
            response &&
            typeof response === 'object' &&
            'AddressLists' in response &&
            Array.isArray((response as any).AddressLists)
        ) {
            return (response as GetAddressResponse).AddressLists;
        } else {
            console.warn('Unexpected address response:', response);
            return [];
        }
    }
);


export const deleteAddress = createAsyncThunk(
    'deliveryAddress/deleteAddress',
    async ({ deliveryaddressId, restaurantId }: { deliveryaddressId: string; restaurantId: string }) => {
        const response = await DeliveryAddressServices.deleteDeliveryAddress(deliveryaddressId, restaurantId)
        return response as DeliveryAddressInput
    }
)

export const addAddress = createAsyncThunk(
    'deliveryAddress/addAddress',
    async ({ obj, restaurantId, locationId }: { obj: DeliveryAddressInput; restaurantId: string; locationId: string }) => {
        const response = await DeliveryAddressServices.addDeliveryAddress(obj, restaurantId, locationId)
        return response as DeliveryAddressInput
    }
)

// Slice
const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState,
    reducers: {
        updateAddressCheck: (state, action: PayloadAction<boolean>) => {
            state.updatedAddress = { isAddressUpdated: action.payload }
        },
        registerAddress: (state, action: PayloadAction<DeliveryAddressInput>) => {
            state.tempDeliveryAddress = null
            state.registeraddress = action.payload
        },
        insertAddressId: (state, action: PayloadAction<DeliveryAddressInput>) => {
            state.addressId = action.payload
        },
        addTempDeliveryAddress: (state, action: PayloadAction<DeliveryAddressInput>) => {
            state.tempDeliveryAddress = action.payload
        },
        deleteTempDeliveryAddress: (state) => {
            state.tempDeliveryAddress = null
        },
        resetDeliveryAddress: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAddress.fulfilled, (state, action) => {
                state.deliveryaddressdata = action.payload
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addressId = action.payload
            })
    },
})

// Exports
export const {
    updateAddressCheck,
    registerAddress,
    insertAddressId,
    addTempDeliveryAddress,
    deleteTempDeliveryAddress,
    resetDeliveryAddress,
} = deliveryAddressSlice.actions

export default deliveryAddressSlice.reducer
