import React from 'react';
import { convertOptionToStrListTo } from '../../common/utility';

interface Topping {
  pizzaside?: string;
[key: string]: string | number | boolean | undefined | null;
}

interface CartItemToppingProps {
  toppingList: Topping[];
}

const CartItemTopping: React.FC<CartItemToppingProps> = ({ toppingList }) => {
  const leftPizzaSuboption = toppingList.filter(sub => sub.pizzaside === "L");
  const rightPizzaSuboption = toppingList.filter(sub => sub.pizzaside === "R");

  function checkRegular(sub: Topping): boolean {
    return sub?.pizzaside !== "L" && sub?.pizzaside !== "R" && sub?.pizzaside !== "F";
  }

  const fullSuboption = toppingList.filter(sub => sub?.pizzaside === "F");
  const regularSuboption = toppingList.filter(checkRegular);

  const [leftString, rightString, fullString, regularStr] = convertOptionToStrListTo(
    leftPizzaSuboption,
    rightPizzaSuboption,
    fullSuboption,
    regularSuboption
  );

  return (
    <>
      {fullString !== "" && (
        <h6 className="font10 mb-0">
          Full - <span className="fw-normal">{fullString}</span>
        </h6>
      )}
      {leftString !== "" && (
        <h6 className="font10 mb-0">
          Left - <span className="fw-normal">{leftString}</span>
        </h6>
      )}
      {rightString !== "" && (
        <h6 className="font10 mb-0">
          Right - <span className="fw-normal">{rightString}</span>
        </h6>
      )}
      {regularStr !== "" && (
        <h6 className="font10 mb-0">
          Toppings - <span className="fw-normal">{regularStr}</span>
        </h6>
      )}
    </>
  );
};

export default CartItemTopping;
