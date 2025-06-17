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
}: any) => {
  // let sessionid = useSelector(({ session }) => session?.sessionid);
  let selectedsize =
    menuItemDetail != undefined &&
    menuItemDetail.size != undefined &&
    menuItemDetail.size.length > 0 &&
    menuItemDetail.size.find((x: any) => x.sizeselected === true);
  let selectedtopping =
    menuItemDetail != undefined &&
    menuItemDetail.topping != undefined &&
    menuItemDetail.topping.length > 0 &&
    menuItemDetail.topping.find(
      (x: any) => x.subparameterId == selectedsize.subparameterId
    );

  let currentdate = new Date().toLocaleDateString("en-CA");

  let lstcarttopping: any = [];
  selectedtopping.list != undefined &&
    selectedtopping.list.length > 0 &&
    selectedtopping.list.map((lsttop: any) => {
      lsttop.type != undefined &&
        lsttop.type.length > 0 &&
        lsttop.type.map((type: any) => {
          if (type.subOptionselected === true) {
            lstcarttopping.push({
              Title: type.name,
              optionId: lsttop.optionId,
              optiontitle: lsttop.name,
              price:
                lsttop?.freeToppingsCount > 0 && lsttop?.multipleSelectStatus
                  ? type.paidQty > 0
                    ? type.pizzaside === "L" || type.pizzaside === "R"
                      ? type.price * 0.5
                      : type.price
                    : 0
                  : type.price,
              suboptionId: type.suboptionId,
              toppingquantity: type.subOptionToppingQuantity - type.paidQty,
              paidQty: type.paidQty,
              pizzaside: type.pizzaside,
            });
          }
        });
    });

  let objorder = {
    cart: [
      {
        menuid: parseInt(
          objselectedItem.menuitemId != undefined
            ? objselectedItem.menuitemId
            : objselectedItem.menuitemid
        ),
        restaurantId: parseInt(objrestaurant.restaurantId),
        locationId: parseInt(objrestaurant.defaultlocationId),
        cartId:
          objselectedItem.cartid != undefined && objselectedItem.cartid != 0
            ? parseInt(objselectedItem.cartid)
            : 0,
        OrderItemType: 0,
        orderitemId: 0,
        qty: parseInt(quantity),
        price: selectedsize.price != 0 ? parseFloat(selectedsize.price) : 0,
        itemname:
          objselectedItem.menuItemName != undefined
            ? objselectedItem.menuItemName
            : objselectedItem.itemname,
        netprice: total != 0 ? parseFloat(total) : 0,
        subparameterid: parseInt(selectedsize.subparameterId),
        subparametername: selectedsize.type,
        topsubparaid: selectedtopping.subparameterId,
        topsubparaname: null,
        topprice: null,
        dependentmenuitemid: objselectedItem?.dependedItemId ?? 0,
        // "sessionid": getSessionKey(objrestaurant.restaurantId, customerId,objrestaurant.defaultlocationId),
        sessionid: sessionid,
        rewardpoints: 0,
        Toppings: [],
        OptionParameter: lstcarttopping,
        studentname: studentname,
      },
    ],
    restaurantId: parseInt(objrestaurant.restaurantId),
    locationId: parseInt(objrestaurant.defaultlocationId),
    removecart: "",
    // "cartsessionId": getSessionKey(objrestaurant.restaurantId, customerId,objrestaurant.defaultlocationId)
    cartsessionId: sessionid,
    orderType: orderType,
    selectedTime: selectedtime,
    selectedDate: currentdate,
  };

  return objorder;
};
