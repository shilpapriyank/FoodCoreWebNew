import React from "react";
import { GetCurrency } from "../../common/utility";
import useUtility from "../../customhooks/utility-hook";
import { getImagePath } from "../common/utility";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetMenuItemFavorite } from "@/types/menuitem-types/menuitem.type";

const FavouriteItem: React.FC<{
  index: any;
  page: string;
  item: any;
  orderNowClick: (item: any) => void;
  selectedFavoriteClick: (item: any) => void;
}> = ({ index, page, item, orderNowClick, selectedFavoriteClick }) => {
  const { restaurantinfo } = useReduxData();
  const { isDisplayPrice } = useUtility();
  const currency = GetCurrency();
  let itemImage = getImagePath(
    item.mediumimgurl,
    restaurantinfo?.defaultLocation?.defaultmenuitemimage
  );
  return (
    <div className="cols">
      <div className="card itembox">
        <div className="text">
          <h3>
            {item.menuItemName}{" "}
            {isDisplayPrice && (
              <span>
                {currency}
                {item.price.toFixed(2)}
              </span>
            )}
          </h3>
          <p> {item.description} </p>
          <div className="d-flex align-items-center">
            <a
              className="btn-default small"
              onClick={() => orderNowClick(item)}
            >
              View Details
            </a>
            <a
              className="deletebtn ms-auto small"
              onClick={() => selectedFavoriteClick(item)}
            >
              <i className="fa fa-trash" />
            </a>
          </div>
        </div>
        <div className="img">
          <LazyLoadImage
            src={itemImage}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            alt={item.menuItemName}
          />
          <a className="fa wishlist active fa-heart-o" />
        </div>
      </div>
    </div>
  );
};

export default FavouriteItem;
