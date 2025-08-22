import { PIZZA_SIDE_ENUM } from "@/components/common/enums";
import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

const PizzaSlice: React.FC<{
  type: Type;
  handleOnChangeSubOption: (
    type: Type,
    optionId: number,
    // side: "L" | "F" | "R",
    side: PIZZA_SIDE_ENUM,
    isRadioButton: boolean,
    event: InputOrClickEvent
  ) => void;
  isRadioButton?: boolean;
  optionId: number;
}> = ({ type, handleOnChangeSubOption, isRadioButton = false, optionId }) => {
  return (
    <div className="sun">
      <a
        className={`ft cursor-pointer ${
          type?.pizzaside === PIZZA_SIDE_ENUM.LEFT ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(
            type,
            optionId,
            PIZZA_SIDE_ENUM.LEFT,
            isRadioButton,
            e
          )
        }
      />
      <a
        className={`sd cursor-pointer ${
          type?.pizzaside === PIZZA_SIDE_ENUM.FULL ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(
            type,
            optionId,
            PIZZA_SIDE_ENUM.FULL,
            isRadioButton,
            e
          )
        }
      />
      <a
        className={`td cursor-pointer ${
          type?.pizzaside === PIZZA_SIDE_ENUM.RIGHT ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(
            type,
            optionId,
            PIZZA_SIDE_ENUM.RIGHT,
            isRadioButton,
            e
          )
        }
      />
    </div>
  );
};

export default PizzaSlice;
