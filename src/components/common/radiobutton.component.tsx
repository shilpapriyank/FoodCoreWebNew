import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";
import { ACTION_TYPE_ENUM } from "./enums";

interface RadioButtonProps {
  type: Type;
  item: List;
  isRadioButton: boolean;
  classInputName?: string;
  disabled?: boolean;
  handleOnChangeSubOption: (
    type: Type,
    optionId: number,
    //action: "select" | "deselect",
    action: ACTION_TYPE_ENUM,
    isRadioButton: boolean,
    event: InputOrClickEvent
  ) => void;
}

const RadioButton = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: RadioButtonProps) => {
  return (
    <input
      id={String(type.suboptionId)}
      onChange={(e) =>
        handleOnChangeSubOption(
          type,
          item.optionId,
          type.subOptionselected === true
            ? ACTION_TYPE_ENUM.DESELECT
            : ACTION_TYPE_ENUM.SELECT,
          isRadioButton,
          e
        )
      }
      className={`cursor-pointer ${classInputName}`}
      disabled={disabled}
      value={type.suboptionId}
      name={`rdsuboption_${item.optionId}_${item.subparameterId}`}
      type="radio"
      checked={type?.subOptionselected === true}
    />
  );
};

export default React.memo(RadioButton);
