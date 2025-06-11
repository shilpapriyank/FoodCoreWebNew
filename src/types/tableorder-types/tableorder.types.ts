export interface CartTotal {
  subTotal: string;
  tipamount: string;
  nettotal?: string;
  [key: string]: any;
}

export interface TableOrderState {
  ishowtoorder: boolean;
  tablenumber: number;
  cartcount: number;
  customer: any;
  cartitems: any;
  firebasetablename: string;
  carttotal: CartTotal | {};
  tabledetail: any;
  printerdetails: any;
  kitchencomment: string;
  serverid: number;
}