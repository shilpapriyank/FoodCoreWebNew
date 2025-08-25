import { PIZZA_SIDE_ENUM } from "@/components/common/enums";
import {
  CartItem,
  CartOptionParams,
  OrderObjType,
} from "@/types/cart-types/cartservice.type";
import {
  GetMenuItemDetail,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

export const FormatOrderObject = ({
  objrestaurant,
  objselectedItem,
  menuItemDetail,
  customerId,
  total,
  quantity,
  sessionid,
  orderType,
  selectedtime,
  studentname = "",
}: {
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
}) => {
  let selectedsize =
    menuItemDetail != undefined &&
    menuItemDetail.size != undefined &&
    menuItemDetail.size.length > 0 &&
    menuItemDetail.size.find((x) => x.sizeselected === true);
  // let selectedtopping =
  //   selectedsize &&
  //   menuItemDetail != undefined &&
  //   menuItemDetail.topping != undefined &&
  //   menuItemDetail.topping.length > 0 &&
  //   menuItemDetail.topping.find(
  //     (x) => x.subparameterId == selectedsize.subparameterId
  //   );
  let selectedtopping = undefined;

  if (menuItemDetail?.topping?.length > 0 && selectedsize) {
    selectedtopping = menuItemDetail.topping.find(
      (top) =>
        top.subparameterId === selectedsize.subparameterId &&
        Array.isArray(top.list)
    );
  }
  const currentdate = new Date().toLocaleDateString("en-CA");

  const lstcarttopping: CartOptionParams[] = [];

  selectedtopping &&
    selectedtopping?.list?.forEach((lsttop) => {
      lsttop.type?.forEach((type) => {
        if (type.subOptionselected === true) {
          const isHalfPrice = type.pizzaside === PIZZA_SIDE_ENUM.LEFT || type.pizzaside === PIZZA_SIDE_ENUM.RIGHT;
          const price =
            lsttop?.freeToppingsCount > 0 && lsttop?.multipleSelectStatus
              ? type.paidQty > 0
                ? isHalfPrice
                  ? type.price * 0.5
                  : type.price
                : 0
              : type.price;

          lstcarttopping.push({
            cartid: 0,
            title: type.name,
            optionId: lsttop.optionId,
            optiontitle: lsttop.name,
            price,
            suboptionId: type.suboptionId,
            pizzaside: type.pizzaside,
            paidQty: type.paidQty,
            toppingquantity: type.subOptionToppingQuantity - type.paidQty,
            quantity: type.subOptionToppingQuantity - type.paidQty, // match original
          });
        }
      });
    });

  if (!selectedsize || !selectedtopping) {
    return null;
  }

  let cartItem: CartItem = {
    menuid: objselectedItem.menuitemId,
    restaurantId: objrestaurant.restaurantId,
    locationId: objrestaurant.defaultlocationId,
    cartId: objselectedItem.cartid ?? 0,
    OrderItemType: 0,
    orderitemId: 0,
    qty: quantity,
    price: selectedsize?.price ?? 0,
    itemname: objselectedItem.menuItemName ?? "Unknown Item",
    netprice: total ?? 0,
    subparameterid: selectedsize?.subparameterId ?? 0,
    subparametername: selectedsize?.type ?? "",
    topsubparaid: selectedtopping?.subparameterId ?? 0,
    topsubparaname: "",
    topprice: 0,
    dependentmenuitemid: objselectedItem?.dependedItemId ?? 0,
    sessionid,
    rewardpoints: 0,
    Toppings: [],
    OptionParameter: lstcarttopping,
    studentname,
  };
  // const objorder = {
  //   cart: [
  //     selectedsize &&
  //       selectedtopping && {
  //         menuid: objselectedItem.menuitemId,
  //         restaurantId: objrestaurant.restaurantId,
  //         locationId: objrestaurant.defaultlocationId,
  //         cartId: objselectedItem.cartid ?? 0,
  //         OrderItemType: 0,
  //         orderitemId: 0,
  //         qty: quantity,
  //         price: selectedsize?.price ?? 0,
  //         itemname: objselectedItem.menuItemName ?? "Unknown Item",
  //         netprice: total ?? 0,
  //         subparameterid: selectedsize?.subparameterId ?? 0,
  //         subparametername: selectedsize?.type ?? "",
  //         topsubparaid: selectedtopping?.subparameterId ?? 0,
  //         topsubparaname: null,
  //         topprice: null,
  //         dependentmenuitemid: objselectedItem?.dependedItemId ?? 0,
  //         sessionid,
  //         rewardpoints: 0,
  //         Toppings: [],
  //         OptionParameter: lstcarttopping,
  //         studentname,
  //       },
  //   ],
  //   restaurantId: objrestaurant.restaurantId,
  //   locationId: objrestaurant.defaultlocationId,
  //   removecart: "",
  //   cartsessionId: sessionid,
  //   orderType,
  //   selectedTime: selectedtime,
  //   selectedDate: currentdate,
  // };

  const objorder = {
    cart: [cartItem],
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
