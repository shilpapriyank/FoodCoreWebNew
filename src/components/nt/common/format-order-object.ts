import {
  GetMenuItemDetail,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

interface FormatOrderParams {
  objrestaurant: GetAllRestaurantInfo;
  objselectedItem: Menuitems;
  menuItemDetail: GetMenuItemDetail;
  customerId: number;
  total: number;
  quantity: number;
  sessionid: string;
  orderType: number;
  selectedtime: string;
  studentname?: string;
}

export const FormatOrderObject = ({
  objrestaurant,
  objselectedItem,
  menuItemDetail,
  //customerId,
  total,
  quantity,
  sessionid,
  orderType,
  selectedtime,
  studentname,
}: {
  objrestaurant: GetAllRestaurantInfo;
  objselectedItem: Menuitems;
  menuItemDetail: GetMenuItemDetail;
  //customerId: number;
  total: number;
  quantity: number;
  sessionid: string;
  orderType: number;
  selectedtime: string;
  studentname?: string;
}) => {
  const selectedsize = menuItemDetail?.size?.find(
    (x) => x.sizeselected === true
  );

  const selectedtopping = menuItemDetail?.topping?.find(
    (x) => x.subparameterId == selectedsize?.subparameterId
  );

  const currentdate = new Date().toLocaleDateString("en-CA");

  const lstcarttopping: any[] = [];

  if (selectedtopping && selectedtopping?.list?.length > 0) {
    selectedtopping.list.forEach((lsttop) => {
      lsttop.type?.forEach((type) => {
        if (type.subOptionselected) {
          const isHalfPrice = type.pizzaside === "L" || type.pizzaside === "R";
          const price =
            lsttop.freeToppingsCount > 0 && lsttop.multipleSelectStatus
              ? type.paidQty > 0
                ? isHalfPrice
                  ? type.price * 0.5
                  : type.price
                : 0
              : type.price;

          lstcarttopping.push({
            Title: type.name,
            optionId: lsttop.optionId,
            optiontitle: lsttop.name,
            price,
            suboptionId: type.suboptionId,
            toppingquantity: type.subOptionToppingQuantity - type.paidQty,
            paidQty: type.paidQty,
            pizzaside: type.pizzaside,
          });
        }
      });
    });
  }
  const objorder = {
    cart: [
      {
        menuid:
          objselectedItem && objselectedItem.menuitemId !== undefined
            ? objselectedItem.menuitemId
            : objselectedItem.menuitemId,
        restaurantId: objrestaurant?.restaurantId,
        locationId: objrestaurant?.defaultlocationId,
        cartId:
          objselectedItem.cartid !== undefined && objselectedItem.cartid !== 0
            ? objselectedItem.cartid
            : 0,
        OrderItemType: 0,
        orderitemId: 0,
        qty: quantity,
        price: selectedsize?.price ? selectedsize.price : 0,
        itemname:
          objselectedItem.menuItemName ??
          objselectedItem.menuItemName ??
          "Unknown Item",
        netprice: total !== 0 ? total : 0,
        subparameterid: selectedsize?.subparameterId ?? 0,
        subparametername: selectedsize?.type ?? "",
        topsubparaid: selectedtopping?.subparameterId ?? 0,
        topsubparaname: null,
        topprice: null,
        dependentmenuitemid: objselectedItem?.dependedItemId ?? 0,
        sessionid,
        rewardpoints: 0,
        Toppings: [],
        OptionParameter: lstcarttopping,
        studentname,
      },
    ],
    restaurantId: objrestaurant.restaurantId,
    locationId: objrestaurant.defaultlocationId,
    removecart: "",
    cartsessionId: sessionid,
    orderType,
    selectedTime: selectedtime,
    selectedDate: currentdate,
  };

  return objorder;
};

// export const FormatOrderObject = ({
//   objrestaurant,
//   objselectedItem,
//   menuItemDetail,
//   customerId,
//   total,
//   quantity,
//   sessionid,
//   orderType,
//   selectedtime,
//   studentname = "",
// }: any) => {
//   // let sessionid = useSelector(({ session }) => session?.sessionid);
//   let selectedsize =
//     menuItemDetail &&
//     menuItemDetail.size.length > 0 &&
//     menuItemDetail.size.find((x: any) => x.sizeselected === true);
//   let selectedtopping =
//     menuItemDetail != undefined &&
//     menuItemDetail.topping != undefined &&
//     menuItemDetail.topping.length > 0 &&
//     menuItemDetail.topping.find(
//       (x: any) => x.subparameterId == selectedsize.subparameterId
//     );

//   let currentdate = new Date().toLocaleDateString("en-CA");

//   let lstcarttopping: any = [];
//   selectedtopping.list != undefined &&
//     selectedtopping.list.length > 0 &&
//     selectedtopping.list.map((lsttop: any) => {
//       lsttop.type != undefined &&
//         lsttop.type.length > 0 &&
//         lsttop.type.map((type: any) => {
//           if (type.subOptionselected === true) {
//             lstcarttopping.push({
//               Title: type.name,
//               optionId: lsttop.optionId,
//               optiontitle: lsttop.name,
//               price:
//                 lsttop?.freeToppingsCount > 0 && lsttop?.multipleSelectStatus
//                   ? type.paidQty > 0
//                     ? type.pizzaside === "L" || type.pizzaside === "R"
//                       ? type.price * 0.5
//                       : type.price
//                     : 0
//                   : type.price,
//               suboptionId: type.suboptionId,
//               toppingquantity: type.subOptionToppingQuantity - type.paidQty,
//               paidQty: type.paidQty,
//               pizzaside: type.pizzaside,
//             });
//           }
//         });
//     });

//   let objorder = {
//     cart: [
//       {
//         menuid: parseInt(
//           objselectedItem.menuitemId != undefined
//             ? objselectedItem.menuitemId
//             : objselectedItem.menuitemid
//         ),
//         restaurantId: objrestaurant?.restaurantId,
//         locationId: objrestaurant?.defaultlocationId,
//         cartId:
//           objselectedItem.cartid != undefined && objselectedItem.cartid != 0
//             ? parseInt(objselectedItem.cartid)
//             : 0,
//         OrderItemType: 0,
//         orderitemId: 0,
//         qty: parseInt(quantity),
//         price: selectedsize.price != 0 ? parseFloat(selectedsize.price) : 0,
//         itemname:
//           objselectedItem.menuItemName != undefined
//             ? objselectedItem.menuItemName
//             : objselectedItem.itemname,
//         netprice: total != 0 ? parseFloat(total) : 0,
//         subparameterid: parseInt(selectedsize.subparameterId),
//         subparametername: selectedsize.type,
//         topsubparaid: selectedtopping.subparameterId,
//         topsubparaname: null,
//         topprice: null,
//         dependentmenuitemid: objselectedItem?.dependedItemId ?? 0,
//         // "sessionid": getSessionKey(objrestaurant.restaurantId, customerId,objrestaurant.defaultlocationId),
//         sessionid: sessionid,
//         rewardpoints: 0,
//         Toppings: [],
//         OptionParameter: lstcarttopping,
//         studentname: studentname,
//       },
//     ],
//     restaurantId: parseInt(objrestaurant.restaurantId),
//     locationId: parseInt(objrestaurant.defaultlocationId),
//     removecart: "",
//     // "cartsessionId": getSessionKey(objrestaurant.restaurantId, customerId,objrestaurant.defaultlocationId)
//     cartsessionId: sessionid,
//     orderType: orderType,
//     selectedTime: selectedtime,
//     selectedDate: currentdate,
//   };

//   return objorder;
// };
