import React from "react";
import { convertOptionToStrList } from "../../common/utility";
import { CARTPAGEMESSAGE } from "../helpers/static-message/cart-message";

const CartSuboptionDisplay = ({ subOption }: any) => {
  //debugger;
  const leftPizzaSuboption = subOption.filter(
    (sub: any) => sub.pizzaside === "L"
  );
  const rightPizzaSuboption = subOption.filter(
    (sub: any) => sub.pizzaside === "R"
  );
  function CheckRegular(sub: any) {
    return (
      sub?.pizzaside !== "L" && sub?.pizzaside !== "R" && sub?.pizzaside !== "F"
    );
  }

  const fullSuboption = subOption.filter((sub: any) => sub?.pizzaside === "F");
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
