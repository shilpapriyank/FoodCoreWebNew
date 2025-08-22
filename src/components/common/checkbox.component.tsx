import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";
import { ACTION_TYPE_ENUM } from "./enums";

interface CheckBoxProps {
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

const CheckBox = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: CheckBoxProps) => {
  return (
    <>
      <input
        type="checkbox"
        name={`${item.optionId}_${item.subparameterId}`}
        id={String(type.suboptionId)}
        disabled={disabled}
        className={`cursor-pointer ${classInputName ?? ""}`}
        onChange={(e) =>
          handleOnChangeSubOption(
            type,
            item.optionId,
            type.subOptionselected
              ? ACTION_TYPE_ENUM.DESELECT
              : ACTION_TYPE_ENUM.SELECT,
            isRadioButton,
            e
          )
        }
        value={type.suboptionId}
        checked={type.subOptionselected === true}
      />
    </>
  );
};

export default React.memo(CheckBox);
