export type OrderAddress = {
    deliveryaddressId?: number;
    address1?: string;
    address2?: string;
    landmark?: string;
    city?: string;
    zipcode?: string;
    state?: string;
    country?: string;
};

export type CardPayment = {
    restaurantId: number;
    locationId: number;
    paymentIntentId: string;
    orderId: number;
    paymentMethodId: string;
    totalAmount: number;
    customerId: number;
    cardname: string;
    emailId: string;
    cardnumber: string;
    expmonth: number;
    expyear: number;
    cvv: string;
    zipcode: string;
    countryId: number;
    cartsessionid: string;
};

export interface OrderState {
    checktime: any;
    isasap: boolean;
    orderId: number;
    isRedirectToCheckout: boolean;
    calculatedTotal: number;
    cardShowMessage: string;
    deliveryRequestId: string;
    futureOrderDay: string;
}
