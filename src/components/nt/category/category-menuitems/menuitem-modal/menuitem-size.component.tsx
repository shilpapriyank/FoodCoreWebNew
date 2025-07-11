import React from "react";
import useUtility from "../../../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import ShareitemComponent from "@/components/nt/common/shareitem.component";
import { Size } from "@/types/menuitem-types/menuitem.type";

const MenuItemSize = ({
  selectedSizeClick,
  shareUrl,
}: {
  selectedSizeClick: (item: Size) => void;
  shareUrl: string;
}) => {
  const { menuitem, restaurantinfo, menuitemdetaillist } = useReduxData();
  // let studentname = studentdata
  const { isDisplayPrice } = useUtility();
  const selctedItemSize = menuitemdetaillist?.size;
  return (
    <>
      <div
        className={` mb-0 d-flex justify-content-${
          restaurantinfo?.isSchoolProgramEnabled ? "between" : "end"
        }`}
      >
        {/* {(studentname?.studentname !== "" && restaurantinfo?.isSchoolProgramEnabled) && <h6 className="color_black">{studentname?.type === 'teacher' ? "Teacher Name" : "Student Name"}: <span className='color-red'> {studentname?.name} </span></h6>} */}
        <ShareitemComponent
          linkClass="fs-4 mt-1 ms-1 pointer-cursor"
          url={shareUrl}
          title="Share this item"
          description="Check out this delicious item!"
          size={32}
          isHrLine={false}
        />
      </div>
      <h3 className="text-start">Size</h3>
      <div className="circle-icons text-center">
        {selctedItemSize?.map((item, index) => {
          let sizeSymbol = item.type.match(/\b(\w)/g);

          return (
            <a
              onClick={() => {
                selectedSizeClick(item);
              }}
              key={index}
            >
              <span
                className={`circle-box size-count ${
                  item.sizeselected === true && "active"
                }`}
                id="size-count"
              >
                <span>{item.type}</span>
                <br />
                <span>
                  {isDisplayPrice && (
                    <>
                      {item?.currency}
                      {item?.price?.toFixed(2)}
                    </>
                  )}
                </span>
              </span>
              {/* <label>{item.type}</label> */}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default MenuItemSize;
