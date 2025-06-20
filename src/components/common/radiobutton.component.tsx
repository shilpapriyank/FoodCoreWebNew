import React, { useEffect, useState } from "react";

const RadioButton = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: any) => {
  return (
    <>
      <input
        id={type.suboptionId}
        onChange={(e) =>
          handleOnChangeSubOption(
            type,
            item.optionId,
            type.subOptionselected === true ? "deselect" : "select",
            isRadioButton,
            e
          )
        }
        className={`cursor-pointer ${classInputName}`}
        disabled={disabled}
        value={type.suboptionId}
        name={`rdsuboption_${item.optionId}_${item.subparameterId}`}
        type="radio"
        checked={type?.subOptionselected == true}
      />
    </>
  );
};

export default React.memo(RadioButton);
