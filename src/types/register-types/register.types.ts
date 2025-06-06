export interface RegisterModel {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    countrycode: string;
    isVerifiedPhone: boolean;
    businessName?: string;
}

export interface AddressModel {
    address1?: string;
    address2?: string;
    landmark?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    addresstype?: number;
    businessname?: string;
}