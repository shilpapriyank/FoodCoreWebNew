import { useMemo, useState } from "react";
import { ORDER_TYPE, allRegex } from "../common/utility";
import {
  CartDetailOfCartTotal,
  CartTotal,
} from "@/types/cart-types/cartservice.type";
import { useReduxData } from "./useredux-data-hooks";
import { useAppDispatch } from "../../../redux/hooks";
import useFutureOrder from "./usefuture-order-hook";
import { AnyIfEmpty } from "react-redux";
import { carttotaldata } from "../../../redux/cart/cart.slice";
import { TipObjectType } from "@/types/usetip-types/usetiphook.type";
import { stringify } from "querystring";

const useTipValue = (
  isDefaultTip: boolean,
  carttotal: CartDetailOfCartTotal,
  isOnChange: boolean = false,
  isCallTotalOnBlur: boolean = true
) => {
  const {
    sessionid,
    restaurantinfo,
    userinfo,
    selecteddelivery,
    order,
    recievingTime,
    meredian,
    orderTimeType,
  } = useReduxData();
  const dispatch = useAppDispatch();
  let customerId = userinfo ? userinfo.customerId : 0;
  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  const pickupordelivery = selecteddelivery?.pickupordelivery;
  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  const location = restaurantinfo?.defaultLocation;
  const tipValue = location?.tipYourDriver?.split(",");
  const enableTip = location?.enableTip;
  const { deliveryRequestId } = order;
  let tipIntialValue =
    carttotal?.totalTip && carttotal?.totalTip > 0
      ? carttotal?.totalTip.toFixed(2)
      : 0;
  const tipObj = tipValue?.map((item, index) => {
    return { id: index + 1, value: false, text: item.trim() };
  });
  const [tipdata, settipdata] = useState(tipObj);
  const [tipdatanew, settipdatanew] = useState([]);
  // const [tipdata, settipdata] = useState<TipObjectType[]>([]);
  // const [tipdatanew, settipdatanew] = useState<TipObjectType[]>([]);
  const [isDefaulttip, setisDefaulttip] = useState<boolean>(isDefaultTip);
  const [tipvalue, settipvalue] = useState(tipIntialValue);
  const [tipPercent, settipPercent] = useState(
    carttotal?.tipPercentage > 0 ? carttotal.tipPercentage : ""
  );
  const [tipamount, settipamount] = useState(tipIntialValue);
  const [grandtotal, setgrandtotal] = useState(
    carttotal?.grandTotal != undefined ? carttotal.grandTotal : 0
  );
  const minTipDriver = location?.minTipPercentage;
  const [tipWarningMessage, settipWarningMessage] = useState<string>("");
  const minTipValue = calculateTip(
    String(location?.minTipPercentage),
    String(carttotal?.subTotal)
  );
  const { recievingDate, enabletimeslot } = useFutureOrder();
  // FUNCTION FOR THE CALCULATING TIPVALUE
  function calculateTip(selectedtip: string, subtotal: string) {
    let tipamount = 0;
    if (enableTip) {
      if (Number(selectedtip) > 0 && Number(subtotal) > 0) {
        tipamount = (parseInt(selectedtip) * parseFloat(subtotal)) / 100;
        return tipamount.toFixed(2);
      } else {
        return tipamount;
      }
    }
    return tipamount;
  }

  const onchangetipamount = (item: any) => {
    const pattern = new RegExp(allRegex.validateTipAmount);
    const { value } = item.target;
    if (pattern.test(value) || value === "") {
      let tvalue = value !== "" ? value : "";
      let updatetip: any = [];
      if (tvalue != undefined) {
        tipdata?.map((data) => {
          data.value = false;
          updatetip.push(data);
        });

        settipamount(tvalue);
        settipPercent(0);
        settipdata(updatetip);
        let tipValue = tvalue != "" ? parseFloat(tvalue).toFixed(2) : 0;
        // let tipValue=tvalue != "" ?tvalue : 0
        settipvalue(tipValue);
        if (isOnChange) {
          tipOnBlur(isOnChange, tipValue);
        }
      }
    }
  };

  const isTipWarning = useMemo(() => {
    const mintipvalue = calculateTip(
      String(location?.minTipPercentage),
      String(carttotal?.subTotal)
    );
    let tipWarning = false;
    if (
      location?.isUseFudmeDriver &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      carttotal?.tipAmount < (mintipvalue as number) &&
      location?.minTipPercentage > 0
    ) {
      tipWarning = true;
    }
    return tipWarning;
  }, [carttotal?.subTotal, carttotal?.tipAmount, location?.minTipPercentage]);

  function tipOnBlur(isOnChange: boolean, tipValue: any) {
    //CHECK FOR THE TIPWARNING ON FOCUS VALUE IN TEXTBOX
    let tipTextBoxValue = isOnChange ? tipValue : tipvalue;
    // const minTipValue=calculateTip(location?.minTipPercentage, carttotal?.subTotal)
    if (
      location?.isUseFudmeDriver &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      tipTextBoxValue < parseFloat(minTipValue as string) &&
      location?.minTipPercentage > 0
    ) {
      settipWarningMessage(location?.minTipTextMessage);
      tipTextBoxValue = minTipValue;
    } else {
      settipWarningMessage("");
    }

    // settipamount(isOnChange ? tipValue : tipvalue)
    settipamount(tipTextBoxValue);
    setisDefaulttip(false);
    if (isCallTotalOnBlur) {
      dispatch(
        carttotaldata({
          cartsessionId: sessionid as string,
          locationId: restaurantinfo?.defaultlocationId as number,
          restaurantId: restaurantinfo?.restaurantId as number,
          customerId,
          cartId: 0,
          rewardpoints: String(carttotal?.reedemPoints),
          redeemamount: String(carttotal.reedemAmount),
          tipPercentage: String(0),
          tipAmount: tipTextBoxValue,
          deliveryaddressId:
            deliveryaddressinfo && pickupordelivery === ORDER_TYPE.DELIVERY.text
              ? deliveryaddressinfo.deliveryaddressId
              : 0,
          ordertype: ordertype,
          requestId: deliveryRequestId,
          recievingTime: recievingTime as string,
          recievingMeridian: meredian as string,
          ordertimetype: orderTimeType,
          recievingDate: recievingDate as string,
          enableTimeSlot: enabletimeslot as boolean,
        })
      );
    }
    setgrandtotal(parseFloat(carttotal.grandTotal?.toFixed(2)));
  }

  const updatecart = (caltippercent: string, caltipamount: string) => {
    settipPercent(caltippercent);
    dispatch(
      carttotaldata({
        cartsessionId: sessionid as string,
        locationId: restaurantinfo?.defaultlocationId as number,
        restaurantId: restaurantinfo?.restaurantId as number,
        customerId,
        cartId: 0,
        rewardpoints: String(carttotal?.reedemPoints),
        redeemamount: String(carttotal.reedemAmount),
        tipPercentage: enableTip ? caltippercent : "0",
        tipAmount: Number(caltipamount),
        deliveryaddressId:
          deliveryaddressinfo && pickupordelivery === ORDER_TYPE.DELIVERY.text
            ? deliveryaddressinfo.deliveryaddressId
            : 0,
        ordertype: ordertype,
        requestId: deliveryRequestId,
        recievingTime: recievingTime as string,
        recievingMeridian: meredian as string,
        ordertimetype: orderTimeType,
        recievingDate: recievingDate as string,
        enableTimeSlot: enabletimeslot as boolean,
      })
    );
  };

  const addtipclick = (item: TipObjectType, isUpdateCart: boolean = true) => {
    setisDefaulttip(false);

    //CHECK SLECTED PERCENTAGE TIPAMOUNT IS LESS THAN  MINTIP AMOUN TNO NEDD TO SLECT ADD MIN TIP
    let slectedItemTipValue = calculateTip(
      item?.text,
      String(carttotal.subTotal)
    );
    if (
      location?.isUseFudmeDriver &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      parseFloat(slectedItemTipValue as string) <
        parseFloat(minTipValue as string) &&
      location?.minTipPercentage > 0
    ) {
      settipamount(parseFloat(minTipValue as string).toFixed(2));
      settipvalue(parseFloat(minTipValue as string).toFixed(2));
      settipdatanew([]);
      settipdata(tipObj as TipObjectType[]);
      updatecart("0", minTipValue as string);
      settipWarningMessage(location?.minTipTextMessage);
      return;
    }
    settipWarningMessage("");
    let updatetip: any = [];
    if (item !== undefined) {
      settipPercent(item.text);
      tipdata?.map((data) => {
        if (data.id === item.id && item.value === true) data.value = false;
        else if (data.id === item.id && item.value === false) data.value = true;
        else if (data.id !== item.id) data.value = false;
        updatetip.push(data);
      });
      settipdata(updatetip);
      let selectedtip = tipdata?.find((x) => x.value === true);
      if (selectedtip != undefined && parseInt(selectedtip.text) > 0) {
        let tipamount = calculateTip(
          selectedtip.text,
          String(carttotal.subTotal)
        );
        settipamount(tipamount);
        settipvalue(parseFloat(tipamount as string));
        // settipdata(tipObj)
        updatecart(selectedtip.text, tipamount as string);
      } else {
        settipvalue(0);
        settipamount(0);
        if (isUpdateCart) {
          setgrandtotal(parseFloat(carttotal.grandTotal?.toFixed(2)));
          updatecart("0", "0");
        }
      }
    }
  };

  return {
    tipdata,
    settipdata,
    calculateTip,
    settipdatanew,
    tipdatanew,
    tipamount,
    settipamount,
    isDefaulttip,
    setisDefaulttip,
    settipPercent,
    tipPercent,
    settipvalue,
    tipvalue,
    onchangetipamount,
    grandtotal,
    setgrandtotal,
    tipOnBlur,
    updatecart,
    addtipclick,
    minTipDriver,
    isTipWarning,
    tipWarningMessage,
  };
};

export default useTipValue;
