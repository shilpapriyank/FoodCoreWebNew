import React, { useEffect, useState } from "react";
import useFutureOrder from "../../../customhooks/usefuture-order-hook";
import useUtility from "../../../customhooks/utility-hook";
import { useParams, usePathname, useRouter } from "next/navigation";
// import MenuItemDetail from "../../menuitem/menuitem.component";
import MenuItemModal from "../../category/category-menuitems/menuitem-modal/menuitem-modal.component";
import { RelatedItem } from "./related-item";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch } from "../../../../../redux/hooks";
import { CategoryServices } from "../../../../../redux/category/category.services";
import { useQuery } from "@tanstack/react-query";
import {
  selectedMenuItem,
  setMenuItemDetailList,
} from "../../../../../redux/menu-item/menu-item.slice";
import { PAGES } from "../pages";
import {
  getAvailableCartRelativeData,
  GetThemeDetails,
} from "@/components/common/utility";
import { ORDER_TYPE } from "../utility";
import { GetCategoriesRelativeItems } from "@/types/category-types/category.services.type";

export const RelatedItemsList = () => {
  const {
    restaurantinfo,
    selecteddelivery,
    sessionid,
    rewardpoints,
    main,
    cart,
  } = useReduxData();
  let cartitemcount = cart?.cartitemcount;
  const pickupordelivery = selecteddelivery.pickupordelivery;
  let sessionId = sessionid;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openMenuItemModal, setopenMenuItemModal] = useState<boolean>(false);
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const params = useParams();
  const { dynamic, location, id, category, index } = params;
  let locationFullLink =
    "/" +
    selectedTheme?.url +
    "/" +
    restaurantinfo?.restaurantURL +
    "/" +
    restaurantinfo?.defaultLocation?.locationURL.trim() +
    "/";
  let locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;

  const { data, refetch } = useQuery({
    queryKey: [
      "getCategoryRelativesItems",
      restaurantinfo?.restaurantId,
      restaurantinfo?.defaultLocation.locationId,
      sessionid,
    ],
    queryFn: () =>
      CategoryServices.getCategoryRelativesItems(
        sessionid as string,
        restaurantinfo?.defaultLocation.locationId as number,
        restaurantinfo?.restaurantId as number
      ),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: (cart?.cartitemcount as number) > 0,
  });

  const maincategoryList = main.maincategoryList;

  let availableCartRelativeItems = getAvailableCartRelativeData(
    maincategoryList!,
    pickupordelivery,
    data as any
  );

  var dcharges =
    cart &&
    pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    cart.carttotal != undefined &&
    cart.carttotal?.deliveryCharges &&
    JSON.parse(cart.carttotal?.deliveryCharges);
  var dtotal =
    dcharges != undefined &&
    pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    dcharges?.DeliveryCharges &&
    parseFloat(dcharges.DeliveryCharges);
  let rewardvalue = rewardpoints?.rewardvalue;
  const { recievingDate, enabletimeslot } = useFutureOrder();
  const { isDisplayPrice } = useUtility();
  const pathname = usePathname();

  useEffect(() => {
    refetch();
  }, [cartitemcount]);

  const handleToggleMenuItem = (value: boolean) => {
    setopenMenuItemModal(value);
  };

  const handleRelativeItemClick = (item: any) => {
    if (item && item?.menuItemId !== undefined)
      item.menuitemId = item.menuItemId;
    delete item.menuItemId;
    dispatch(setMenuItemDetailList(item));
    dispatch(selectedMenuItem(item));

    setTimeout(() => {
      setopenMenuItemModal(true);
    }, 100);
  };

  if (
    pathname.includes(PAGES.CHECKOUT) &&
    data &&
    (cart?.cartitemcount as number) > 0
  ) {
    return (
      <div className="infobox">
        <h3 className="heading">SUGGESTIONS</h3>
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
          {availableCartRelativeItems?.map(
            (item, outerIndex) =>
              item !== undefined &&
              item.items.length > 0 &&
              item.items.map((relativeItem, innerIndex) => (
                <React.Fragment key={`inner-${innerIndex}`}>
                  <div className="cols" key={`outer-${outerIndex}`}>
                    <RelatedItem
                      relativeItem={relativeItem}
                      index={innerIndex}
                      isDisplayPrice={isDisplayPrice}
                      handleRelativeItemClick={handleRelativeItemClick}
                      defaultmenuitemimage={
                        restaurantinfo?.defaultLocation?.defaultmenuitemimage
                      }
                    />
                  </div>
                </React.Fragment>
              ))
          )}
        </div>
        {openMenuItemModal && (
          <MenuItemModal
            isOpenModal={openMenuItemModal}
            handleToggleMenuItem={handleToggleMenuItem}
            handleToggleDependnt={handleToggleMenuItem}
            isPreLoaded={false}
          />
        )}
      </div>
    );
  } else if (data && (cart?.cartitemcount as number) > 0) {
    return (
      <>
        <h3 className="heading">SUGGESTIONS</h3>
        {/* <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1"> */}
        {availableCartRelativeItems?.map(
          (item, outerIndex) =>
            item.items !== undefined &&
            item.items.length > 0 &&
            item.items.map((relativeItem, innerIndex) => {
              return (
                <React.Fragment key={`inner-${innerIndex}`}>
                  {/* <div className="cols" key={`outer-${outerIndex}`}> */}
                  <RelatedItem
                    relativeItem={relativeItem}
                    index={index}
                    handleRelativeItemClick={handleRelativeItemClick}
                    defaultmenuitemimage={
                      restaurantinfo?.defaultLocation?.defaultmenuitemimage
                    }
                  />
                  {/* </div> */}
                </React.Fragment>
              );
            })
        )}
        <hr />
        {/* </div> */}
        {/* <MenuItemDetail /> */}
        {openMenuItemModal && (
          <MenuItemModal
            isOpenModal={openMenuItemModal}
            handleToggleMenuItem={handleToggleMenuItem}
          />
        )}
      </>
    );
  }
};
