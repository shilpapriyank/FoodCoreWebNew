import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  GetCurrency,
  GetThemeDetails,
  ORDERTYPE,
  PromotionType,
} from "../../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { CARTPAGEMESSAGE } from "../../helpers/static-message/cart-message";

const OrderTotalDetails = () => {
  const { restaurantinfo, cart, userinfo, selecteddelivery, deliveryaddress } =
    useReduxData();
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const currency = GetCurrency();

  const charges = cart?.carttotal && cart.carttotal;
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const enableTip = restaurantinfo?.defaultLocation?.enableTip;
  const enableRewardPoint = restaurantinfo?.defaultLocation?.enableRewardPoint;
  const tipvalue = charges?.totalTip && charges?.totalTip.toFixed(2);
  let cartTaxList = charges?.cartTaxList && charges.cartTaxList;

  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;

  var dcharges =
    cart &&
    pickupordelivery === ORDERTYPE.Delivery &&
    cart.carttotal != undefined &&
    cart.carttotal?.deliveryCharges &&
    JSON.parse(cart.carttotal?.deliveryCharges);
  var dtotal =
    dcharges != undefined &&
    pickupordelivery === ORDERTYPE.Delivery &&
    dcharges?.DeliveryCharges &&
    parseFloat(dcharges.DeliveryCharges);
  const distance =
    dcharges != undefined &&
    pickupordelivery === ORDERTYPE.Delivery &&
    dcharges?.distance &&
    dcharges?.distance > 0
      ? parseFloat(dcharges.distance)
      : 0;

  const router = useRouter();
  const {
    query: { dynamic, location },
  } = router;

  return (
    <>
      {charges &&
        cart?.cartitemcount > 0 &&
        charges.subTotal != undefined &&
        charges.subTotal > 0 && (
          <>
            <h3 className="heading">
              {CARTPAGEMESSAGE.SUB_TOTAL}
              <span className="float-end">
                {charges != undefined &&
                  charges.subTotal != undefined &&
                  currency + charges.subTotal.toFixed(2)}
              </span>
            </h3>
            {charges?.isDiscountApplied === true &&
              charges?.discountAmount > 0 && (
                <h3 className="heading">
                  {CARTPAGEMESSAGE.DISCOUNT} ({charges.discountPercentage} %)
                  <span className="float-end">
                    {charges?.discountAmount > 0 && "-"}
                    {charges?.discountAmount > 0
                      ? currency + charges.discountAmount.toFixed(2)
                      : currency + " 0.00"}
                  </span>
                </h3>
              )}

            {userinfo != undefined &&
              userinfo != null &&
              enableRewardPoint &&
              charges?.reedemPoints != undefined &&
              charges?.reedemPoints > 0 && (
                <>
                  <h3 className="heading">
                    {CARTPAGEMESSAGE.REEDEM_POINTS} (
                    {charges != undefined &&
                      charges?.reedemPoints != undefined &&
                      charges?.reedemPoints}
                    ) :
                    <span className="float-end">
                      {charges != undefined &&
                      charges?.reedemAmount != undefined &&
                      charges?.reedemAmount > 0
                        ? `-${currency}${charges?.reedemAmount.toFixed(2)}`
                        : currency + "0.00"}
                    </span>
                  </h3>
                </>
              )}

            {charges?.PromotionData &&
              charges?.PromotionData?.promotionpercentagecal > 0 && (
                <h3 className="heading">
                  {charges?.PromotionData?.promotionruletype ===
                  PromotionType.Fixed ? (
                    <>{`Promotion(${currency} ${charges?.PromotionData?.promotionpercentagecal.toFixed(
                      2
                    )})`}</>
                  ) : (
                    <>{`Promotion(${charges?.PromotionData?.promotionpercentage.toFixed(
                      2
                    )}%)`}</>
                  )}
                  <span className="float-end">
                    {charges?.PromotionData?.promotionpercentagecal > 0 && "-"}
                    {charges?.PromotionData?.promotionpercentagecal > 0
                      ? currency +
                        charges?.PromotionData?.promotionpercentagecal.toFixed(
                          2
                        )
                      : currency + " 0.00"}
                  </span>
                </h3>
              )}

            {pickupordelivery === ORDERTYPE.Delivery &&
              dtotal != undefined &&
              dtotal > 0 && (
                <h3 className="heading">
                  {CARTPAGEMESSAGE.DELIVERY}
                  <span className="float-end">
                    {pickupordelivery === ORDERTYPE.Delivery &&
                      dtotal !== undefined &&
                      currency + " " + dtotal.toFixed(2)}
                  </span>
                </h3>
              )}

            <h3 className="heading">
              {CARTPAGEMESSAGE.TOTAL_PRE_TAX}
              <span className="float-end">
                {charges != undefined &&
                  charges.subTotalWithDiscount != undefined &&
                  currency + charges.subTotalWithDiscount.toFixed(2)}
              </span>
            </h3>

            {charges?.hstTotal > 0 && (
              <h3 className="heading">
                {" "}
                {CARTPAGEMESSAGE.HST_TAX} (
                {charges != undefined &&
                  charges.taxPercentage != undefined &&
                  charges.taxPercentage.toFixed(2)}
                %)
                <span className="float-end">
                  {charges != undefined &&
                    charges.hstTotal != undefined &&
                    currency + charges.hstTotal.toFixed(2)}
                </span>
              </h3>
            )}

            {cartTaxList &&
              cartTaxList?.map((taxes: any, index: any) => {
                return (
                  <h3 className="heading">
                    {taxes.FeesType === 2 ? (
                      <>
                        {taxes?.TaxesName} ({taxes?.Taxes.toFixed(2)} %) :
                      </>
                    ) : (
                      <>{taxes?.TaxesName} :</>
                    )}
                    <span className="float-end">
                      {taxes != undefined &&
                        taxes?.Taxes !== undefined &&
                        currency + taxes?.TaxesRate.toFixed(2)}
                    </span>
                  </h3>
                );
              })}

            {charges != undefined &&
              charges.systemAccessFee != undefined &&
              charges.systemAccessFee > 0 && (
                <h3 className="heading">
                  System Access Fee
                  <span className="float-end">
                    {charges && currency + charges.systemAccessFee.toFixed(2)}
                  </span>
                </h3>
              )}

            {enableTip && tipvalue && tipvalue != undefined && (
              <h3 className="heading">
                Tip
                <span className="float-end">
                  {tipvalue != undefined
                    ? currency + tipvalue
                    : currency + "0.00"}
                </span>
              </h3>
            )}

            <h3 className="heading">
              {CARTPAGEMESSAGE.ORDER_TOTAL}
              <span className="float-end">
                {charges?.grandTotal &&
                  currency + charges?.grandTotal.toFixed(2)}
              </span>
            </h3>
          </>
        )}
    </>
  );
};
export default OrderTotalDetails;
