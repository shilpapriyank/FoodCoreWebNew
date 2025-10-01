export interface UpdateCustomerInfoResponseModalType {
  result: UpdateCustomerInfoType
  message: string
  status: number
}

export interface UpdateCustomerInfoType {
  Customer: Customer;
  isRegisterRequired: boolean;
  SocialMediaFlag: number;
}

export interface Customer {
  restaurantId: number;
  customerId: number;
  firstname: string;
  lastname: string;
  phone: string;
  loyaltynumber: string;
  mobile: string;
  emailId: string;
  password: string;
  isNewCustomer: boolean;
  isVerified: boolean;
  totalRewardPoints: number;
  badgCount: number;
  SocialMediaId: string;
  picture: any;
  imgtype: any;
  imgname: any;
  Address: any;
  othercustomer: any;
  SocialMediaFlag: number;
  isregisteredbypos: number;
  isVerifiedPhone: boolean;
  countryCode: string;
  isDeleted: boolean;
  customerType: number;
}
