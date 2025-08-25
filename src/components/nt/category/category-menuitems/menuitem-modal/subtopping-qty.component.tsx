import { ACTION_TYPE_ENUM } from "@/components/common/enums";
import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

const SubToppingQty: React.FC<{
  increment: (optionId: number, type: Type, quantity: number) => void;
  decrement: (optionId: number, type: Type, isRadioButton: boolean) => void;
  type: Type;
  optionId: number;
  index?: number;
  isRadioButton: boolean;
  option?: List;
  handleOnChangeSubOption?: (
    type: Type,
    optionId: number,
    //action: "select" | "deselect",
    action: ACTION_TYPE_ENUM,
    isRadioButton: boolean,
    event: InputOrClickEvent
  ) => void;
}> = ({
  increment,
  decrement,
  type,
  optionId,
  index,
  isRadioButton,
  option,
  handleOnChangeSubOption,
}) => {
  const qty = type.subOptionToppingQuantity;

  return (
    <div className="d-flex ms-auto align-items-center">
      <div className="quantity normal qty-container roundstyle">
        <button
          type="button"
          className="qty-btn-minus btn-light quantity__minus"
          onClick={() => decrement(optionId, type, isRadioButton)}
        >
          <i className="fa fa-minus" />
        </button>
        <input
          data-value
          name="qty"
          readOnly
          value={qty}
          className="input-qty quantity__input"
        />
        <button
          type="button"
          className="qty-btn-plus btn-light quantity__plus"
          onClick={() => increment(optionId, type, qty)}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    </div>
  );
};

export default SubToppingQty;
