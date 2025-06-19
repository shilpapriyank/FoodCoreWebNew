import React, { Fragment } from "react";
import useUtility from "../../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const DependentItemListComponent = ({
  dependantMenuList,
  handleOnCheck,
  selectedDependentItems,
}: any) => {
  const { isDisplayPrice } = useUtility();
  const { restaurantinfo } = useReduxData();
  const currencysymbol = restaurantinfo?.defaultLocation?.currencysymbol;

  return (
    <div className="row ms-2">
      {Array.isArray(dependantMenuList) &&
        dependantMenuList?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="col-10">
                <h6 className="text-start">
                  <i className="fa fa-circle dependet-circle fs-6 pe-2"></i>{" "}
                  {item.MenuItemName}{" "}
                  {`${
                    isDisplayPrice
                      ? `dep ${currencysymbol}${item?.Price?.toFixed(2)}`
                      : "dep"
                  }`}{" "}
                </h6>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input cursor-pointer dependent-check"
                  checked={selectedDependentItems.includes(item)}
                  name={`${item}`}
                  value={item}
                  type="checkbox"
                  id={item}
                  //defaultValue
                  onChange={(e) => handleOnCheck(item)}
                />
              </div>
            </Fragment>
          );
        })}
    </div>
  );
};

export default DependentItemListComponent;
