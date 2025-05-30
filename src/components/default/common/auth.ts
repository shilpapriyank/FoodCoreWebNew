// export const getAuthKey = (restaurantId: number) => {
//   //const md5File = require("md5");
//   // let seckey = md5File("F0Dm@_" + restaurantId);
//   // return seckey;
// };
import md5File from "md5";

export const getAuthKey = (restaurantId: number) => {
  let seckey = md5File("F0Dm@_" + restaurantId);
  return seckey;
};

export const getSessionKey = (
  restaurantId: number,
  customerId: number,
  locationId: number
) => {
  // const md5File = require('md5');
  // let seckey = md5File('F0Dm@_'+ restaurantId+ "_" +locationId  + '_' + customerId);
  // return seckey;
  return;
};
