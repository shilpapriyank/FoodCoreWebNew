export interface MenuItemRequest {
    restaurantId: string;
    categories: string[];
    customerId: string;
    locationId: string;
}

export interface POSRequest {
    restaurantId: string;
    ispos: boolean;
    categories: string[];
    customerId: string;
    locationId: string;
}

export interface RelativeItemRequest {
    sessionId: string;
    locationId: string;
    restaurantId: string;
}

export interface AllCategoryRequest {
    restaurantId: string;
    locationId: string;
    customerId: string;
    categories: string[];
}
