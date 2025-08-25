import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

const SubToppingRequiredWarning: React.FC<{
  item: List;
  handleOnChangeRemoveSubOption: (
    item: Type,
    optionId: number,
    selection: string
  ) => void;
}> = ({ item, handleOnChangeRemoveSubOption }) => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        {item.isCompulsory === true && (
          <small className="red-text">
            Please choose 1 item from this selection.
          </small>
        )}
      </div>
      {!item?.multipleSelectStatus && (
        <div className="">
          <a
            className="cursor float-end change-right"
            onClick={() =>
              handleOnChangeRemoveSubOption(
                item as any,
                item.optionId,
                "deselectall"
              )
            }
          >
            DeSelect
          </a>
        </div>
      )}
    </div>
  );
};

export default SubToppingRequiredWarning;
