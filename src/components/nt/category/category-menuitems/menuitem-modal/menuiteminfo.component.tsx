import React, { useEffect, useRef } from "react";
import { getDesc, getImagePath } from "../../../common/utility";
import { useWindowDimensions } from "../../../../customhooks/usewindowdimension-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { Zoomable } from "@/components/common/zoomimage";
import MenuItemSize from "./menuitem-size.component";

const MenuItemInfo = ({
  name,
  img,
  desc,
  shareUrl,
  isFavourite,
  selectedSizeClick,
  selectedFavoriteClick,
}: any) => {
  const { restaurantinfo } = useReduxData();
  const zoomableRef = useRef<HTMLDivElement | null>(null);
  const defaultLocation = restaurantinfo?.defaultLocation;
  let zoom = document.querySelector(".zoomable");
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  //   useEffect(() => {
  //     zoom = document.querySelector(".zoomable");
  //     if (zoom) {
  //       let z = new Zoomable(zoom);
  //     }
  //   }, [zoom]);

  useEffect(() => {
    if (zoomableRef.current) {
      new Zoomable(zoomableRef.current);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8 sppr col-md-8 col-12">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <h2 className="menuitem-names">{name}</h2>
            <p className="d-md-block d-none">{getDesc(desc)}</p>
            {!isMobile && (
              <MenuItemSize
                selectedSizeClick={selectedSizeClick}
                shareUrl={shareUrl}
              />
            )}
          </div>
        </div>
        <a
          className={`fa wishlist active menuitem-heart  fa-heart${
            isFavourite ? "" : "-o"
          }`}
          onClick={() => selectedFavoriteClick(!isFavourite)}
        />
      </div>
      <div className="col-lg-4 text-end p-0 col-md-4 col-12 ">
        <div className="zoomable cursor-zoom">
          <img
            className=" itemimg zoomable__img cursor-zoom"
            src={getImagePath(img, defaultLocation?.defaultmenuitemimage)}
            alt={name ? name : undefined}
          />
        </div>
        <div className="d-flex justify-content-start"></div>
      </div>
    </div>
  );
};

export default MenuItemInfo;
