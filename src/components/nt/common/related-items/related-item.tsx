import React, { useEffect } from "react";
import { getImagePath } from "../utility";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GetCurrency } from "@/components/common/utility";

export const RelatedItem = ({
  relativeItem,
  index,
  handleRelativeItemClick,
  defaultmenuitemimage,
  isDisplayPrice,
}: any) => {
  let itemImage = getImagePath(
    relativeItem?.menuItemImage,
    defaultmenuitemimage
  );
  let currency = GetCurrency();
  return (
    //  <a className="suggession-box" key={index} onClick={()=>{handleRelativeItemClick(relativeItem)}} data-bs-toggle="modal" data-bs-target="#exampleModal">
    <a
      className="suggession-box"
      key={index}
      onClick={() => {
        handleRelativeItemClick(relativeItem);
      }}
    >
      <div className="img">
        {itemImage ? (
          <LazyLoadImage
            src={itemImage}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            alt={relativeItem.menuItemName}
          />
        ) : null}
      </div>
      <div className="text">
        <p>
          <span className="color-green">
            {relativeItem.menuItemName}{" "}
            {isDisplayPrice && (
              <>
                {currency}
                {relativeItem?.price?.toFixed(2)}
              </>
            )}
          </span>
          <br />
          {/* {relativeItem.menuItemName} */}
        </p>
      </div>
      <div className="plus-btn ms-auto"> + </div>
    </a>
  );
};
