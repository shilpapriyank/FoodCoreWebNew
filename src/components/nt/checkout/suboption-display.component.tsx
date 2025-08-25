import React from "react";
import { convertOptionToStrList } from "../../common/utility";
import { CARTPAGEMESSAGE } from "../helpers/static-message/cart-message";
import { CartOptionParams } from "@/types/cart-types/cartservice.type";
import { PIZZA_SIDE_ENUM } from "@/components/common/enums";

const CartSuboptionDisplay: React.FC<{ subOption: CartOptionParams[] }> = ({
  subOption,
}) => {
  const leftPizzaSuboption = subOption.filter(
    (sub) => sub.pizzaside === PIZZA_SIDE_ENUM.LEFT
  );
  const rightPizzaSuboption = subOption.filter(
    (sub) => sub.pizzaside === PIZZA_SIDE_ENUM.RIGHT
  );
  function CheckRegular(sub: CartOptionParams) {
    return (
      sub?.pizzaside !== PIZZA_SIDE_ENUM.LEFT &&
      sub?.pizzaside !== PIZZA_SIDE_ENUM.RIGHT &&
      sub?.pizzaside !== PIZZA_SIDE_ENUM.FULL
    );
  }

  const fullSuboption = subOption.filter(
    (sub) => sub?.pizzaside === PIZZA_SIDE_ENUM.FULL
  );
  const regularSuboption = subOption.filter(CheckRegular);
  const [leftString, rightString, fullString, regularStr] =
    convertOptionToStrList(
      leftPizzaSuboption,
      rightPizzaSuboption,
      fullSuboption,
      regularSuboption
    );

  return (
    <>
      {subOption.length > 0 ? (
        <p className="small">
          {fullString !== "" && (
            <>
              {" "}
              <b>Full :</b>
              {`${fullString}`}
              <br />
            </>
          )}
          {leftString !== "" && (
            <>
              <b>Left :</b>
              {leftString}
              <br />
            </>
          )}
          {rightString !== "" && (
            <>
              <b>Right :</b>
              {rightString}
              <br />
            </>
          )}
          {regularStr !== "" && (
            <>
              <b>{CARTPAGEMESSAGE.TOOPINGS} :</b>
              {regularStr}
              <br />
            </>
          )}
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default CartSuboptionDisplay;
