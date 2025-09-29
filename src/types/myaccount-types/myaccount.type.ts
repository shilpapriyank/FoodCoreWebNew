export type FormValues = {
  emailId?: string;
  firstname?: string;
  lastname?: string;
  businessname?: undefined;
  newpassword?: string;
  confirmpassword?: string;
  validatePassword?: boolean;
  phone?: string;
  email?: string;
  zipcode?: number;
  cardnumber?: string;
  expiremonthyear?: string;
  cvv?: number;
  cardname?: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export interface UpdateUserInfoObjTypes {
  firstname: string;
  lastname: string;
  email: string;
  phone: string; // In case values?.phone is undefined
  picture: string; // Assuming base64 or cropped image is a base64 string
  imgname: string;
  imgtype: string;
  pass: string;
  restaurantId: number;
  locationId: number;
  customerId: number;
  businessname?: string;
  dialcode: string;
}
