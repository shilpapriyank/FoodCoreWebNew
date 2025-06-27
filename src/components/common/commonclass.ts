// export class ResponseModel {
//   result: any = '';
//   status: number = 0;;
//   message: string = "";
// }

export class ResponseModel<T = any> {
  result: T | null = null;
  status: number = 0;
  message: string = "";
}

export class RestaurantCustomModel {
  restaurantId: number = 0;
  restaurantName: string = "";
  locationId: number = 0;
}
