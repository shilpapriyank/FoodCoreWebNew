import React from "react";
import { createPortal } from "react-dom";
import { fixedLengthString, getImagePath } from "./utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { SelectedMenuItemDetail } from "@/types/menuitem-types/menuitem.type";

const BottomBash = ({ catMenuItem, handleToggle, handleClickItem }: any) => {
  const { defaultLocation } = useReduxData();
  const container = document.getElementById("bottom-bash") as Element;
  if (!container) {
    return null;
  }
  return createPortal(
    <div
      className="d-flex justify-content-center align-items-center overlay-loder "
      onClick={() => handleToggle(false)}
    >
      <div className="bottom-bash h-85 bg-white w-100 position-absolute bottom-0 ">
        <div className="row ">
          <div className="col-12 d-flex justify-content-center py-3">
            <h2>This is bottom bash</h2>
            <span
              className="span-line rounded"
              onClick={() => handleToggle(false)}
            ></span>
          </div>
          <div className="col-12 position-relative px-2">
            {/* <div className='line-st w-100 start-0 w-50  ms-1'></div>
                        <div className='line-st end-0 d-inline-block me-2'></div> */}
            <h3 className="menuitem-name text-center color-green fw-bold text-uppercase mb-2">
              {" "}
              {catMenuItem?.catName}
            </h3>
          </div>
          <hr />
        </div>
        <div className="row item-menu">
          <div className="container d-flex justify-content-center  ">
            <div className="col-12 me-2 w-90  ">
              {catMenuItem?.menuitems &&
                catMenuItem?.menuitems?.map(
                  (menuItem: SelectedMenuItemDetail) => {
                    return (
                      <>
                        <a className="suggession-box  border-0 py-2">
                          <div className="img pe-2 w-25">
                            <img
                              src={getImagePath(
                                menuItem.imgurl,
                                defaultLocation?.defaultmenuitemimage
                              )}
                              className="rounded"
                              height={70}
                              width={70}
                            />
                          </div>
                          <div className="text w-75">
                            <p className="pb-0 mb-1 ">
                              <span className=" fs-6 color-green">
                                {menuItem?.menuItemName}{" "}
                              </span>
                              <br />{" "}
                              <span className="light-gray">
                                {fixedLengthString(menuItem.description, 35)}
                              </span>
                            </p>
                            <p className="">
                              <span className="color-green">
                                {" "}
                                ${menuItem?.price}
                              </span>
                            </p>
                          </div>
                          <div
                            className="plus-btn ms-auto"
                            onClick={(e) => handleClickItem(e, menuItem)}
                          >
                            +
                          </div>
                        </a>
                        <hr />
                      </>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    container
  );
};

export default BottomBash;
