"use client";

import React, { ReactNode, useEffect } from "react";
import {
  fixedLengthString,
  getImagePath,
  ViewTypeEnum,
} from "../../common/utility";
import CategorySidebar from "../category-sidebar/category-sidebar.component";
import { useState } from "react";
import GridListButton from "../../../common/gridlistbutton.component";
import useUtility from "../../../customhooks/utility-hook";
import handleNotify from "../../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../../default/helpers/toaster/toaster-types";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import {
  GetThemeDetails,
  ORDER_TYPE,
  scrollToElementWithOffset,
  TOOLTIP_MSG,
} from "@/components/common/utility";
import {
  addFavorite,
  deleteFavorite,
  selectedMenuItem,
  setDipendentId,
  setDipendentIds,
  setDipendentItemQty,
  setMenuItemDetailList,
} from "../../../../../redux/menu-item/menu-item.slice";
import { MenuItemTypes } from "../../../../../redux/menu-item/menuitem.type";
import {
  removeCategoryList,
  setCategoryList,
  setSelectedCategory,
} from "../../../../../redux/category/category.slice";
import { useAppDispatch } from "../../../../../redux/hooks";
import { displayViewUpdate } from "../../../../../redux/restaurants/restaurants.slice";
import { getCartItemCount } from "../../../../../redux/tableorder/tableorder.slice";
import { CartServices } from "../../../../../redux/cart/cart.services";
import { PopOver } from "../../common/popover.component";
import MenuItemAddToCart from "../../menuitem/menuitem-add-to-cart.component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import MenuItemQuickOrder from "../../menuitem/menuitem-quick-order.component";
import FavouriteSkeleton from "../../skeleton/favourite-skeleton";
import BottomBash from "../../common/bottom-bash.component";
import CommonModal from "../../common/common-model.component";
import DependentItemListComponent from "./dependentitems-list.component";
import { setCartItem } from "../../../../../redux/cart/cart.slice";
import { useParams, useRouter } from "next/navigation";
import { MenuItemServices } from "../../../../../redux/menu-item/menu-item.services";
import ScrollToTop from "@/components/common/scroll-to-top";
import {
  GetAllMenuCategoryItems,
  GetMenuItemDetail,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import MenuItemModal from "./menuitem-modal/menuitem-modal.component";
import Login from "../../login-register/login.component";
import ToastNotify from "../../helpers/toastnotify/toast-notify.component";

const CategoryMenuItems = ({
  categoryslug,
  menuItemsWithCat,
  children,
  errorMessage,
}: {
  categoryslug: string;
  menuItemsWithCat: GetAllMenuCategoryItems[];
  children: ReactNode;
  errorMessage: string;
}) => {
  const {
    categoryItemsList,
    restaurantinfo,
    rewardpoints,
    defaultLocation,
    order,
    selecteddelivery,
    category,
    userinfo,
    maincategoryList,
    menuitem,
    cart,
    sessionid,
  } = useReduxData();
  const [loadedCategories, setLoadedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFavourite, setisFavourite] = useState<boolean>(false);
  const categoryItemList = category.categoryitemlist;
  const selectedCategory = category?.selectedcategorydetail;
  const [openMenuItemModal, setopenMenuItemModal] = useState<boolean>(false);
  const itemsPerPage = 500; // Number of categories to load per page.
  const dispatch = useAppDispatch();
  const [openLoginModal, setopenLoginModal] = useState<boolean>(false);
  const [updateView, setUpdateView] = useState<boolean>(true);
  const [viewType, setViewType] = useState<ViewTypeEnum>(
    restaurantinfo?.defaultLocation?.displaylistview
      ? ViewTypeEnum.LIST
      : ViewTypeEnum.GRID
  );
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  const searchtext = menuitem?.searchtext;
  const searchdata = menuitem?.searchdata;
  const { isDisplayPrice, isRewardTip } = useUtility();
  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  let cartItem = cartdata?.cartDetails?.cartItemDetails;
  const catWithSearch =
    searchtext !== "" ? searchdata?.categories : maincategoryList;
  const router = useRouter();
  const params = useParams();
  const {
    dynamic,
    location,
    id,
    category: categoryUrl,
    index,
    menuitemId,
  } = params;
  const [isBottomSlide, setisBottomSlide] = useState<boolean>(false);
  const ordertype =
    selecteddelivery.pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  const [selectedCatItem, setselectedCatItem] = useState<
    MainCategoryList[] | null
  >(null);
  const [updateId, setupdateId] = useState<string>("");
  const [openDependentList, setopenDependentList] = useState<boolean>(false);
  let customerId = userinfo ? userinfo.customerId : 0;
  const selecetdtime = order?.checktime;
  const dependentIds = menuitem?.dependentitemids;
  let selectedMenuItemDetail = menuitem?.selectedmenuitemdetail;
  const dependentId = menuitem?.dependentid ?? 0;
  const [selectedDependentItems, setselectedDependentItems] = useState<
    number[]
  >([]);
  let menuItemDetail = menuitem.menuitemdetaillist;
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const [isStudentPopUp, setisStudentPopUp] = useState<boolean>(false);
  const isOrderingDisable = restaurantinfo?.defaultLocation?.isOrderingDisable;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
  const [isShowSkeleton, setIsShowSkeleton] = useState<boolean>(true);
  const [loadError, setloadError] = useState<boolean>(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState<boolean>(false);
  // const selectedCategoryItems={menuItems}
  let rpoint = 0;
  const { deliveryRequestId } = order;
  let ramount = 0;
  let rewardpoint = rewardpoints;
  if (rewardpoint?.redeemPoint) {
    rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
  }
  if (rewardpoint?.rewardvalue && rpoint > 0) {
    ramount = rpoint / rewardpoint.rewardvalue;
  }

  useEffect(() => {
    if (categoryslug) {
      const targetElement = document.getElementById(categoryslug);
      if (targetElement) {
        scrollToElementWithOffset(categoryslug);
      } else {
        setTimeout(() => {
          if (document.getElementById(categoryslug)) {
            scrollToElementWithOffset(categoryslug);
          }
        }, 1000);
      }
    }

    //check category slug and selected category url not same then select  categoryslug category
    if (selectedCategory?.categoryslug !== categoryUrl && categoryUrl) {
      const findedCat = catWithSearch?.find(
        (cat) => cat?.categoryslug === categoryUrl
      );
      //dispatch(setSelectedCategory(findedCat as MainCategoryList));
    }
  }, [
    categoryslug,
    restaurantinfo?.defaultlocationId,
    selectedCategory?.categoryslug,
  ]);

  useEffect(() => {
    if (dependentId > 0) {
      console.log("dependentId", dependentId);
      setopenMenuItemModal(true);
      if (selectedMenuItemDetail) {
        dispatch(
          selectedMenuItem({
            ...selectedMenuItemDetail,
            dependedItemId:
              selectedMenuItemDetail?.dependedItemId ??
              selectedMenuItemDetail?.menuitemId ??
              0,
            qty: 1,
          })
        );
      }
      MenuItemServices.getMenuItemList({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        customerId: customerId,
        menuitemId: dependentId,
        cartsessionId: String(sessionid),
        cartId: 0,
      }).then((response) => {
        if (response) {
          console.log(
            "response of getMenuItemList in dependentId condi",
            response
          );
          dispatch(setMenuItemDetailList(response));
        }
      });
    }
  }, [dependentId]);

  useEffect(() => {
    //let selectedCat = {};
    let selectedCat;
    if (menuItemsWithCat && categoryUrl) {
      selectedCat = menuItemsWithCat?.find(
        (cat) => cat.categoryslug === categoryUrl
      );
      console.log(
        "selected category from useEffect of category menuitems for test",
        selectedCat
      );
    }
    // THIS WILL BE EXECUTE WHEN MENU ITEM ID COME FROM HOME PAGE
    if (menuitemId !== undefined && menuitemId.length > 0) {
      var menuitemObj = selectedCat?.menuitems?.find(
        (item: Menuitems, index) => {
          if (item?.menuitemId === Number(menuitemId)) {
            return item;
          }
        }
      );
      if (menuitemObj) {
        dispatch(selectedMenuItem(menuitemObj));
        if (
          menuitemObj.quickorderallow === true &&
          isOrderingDisable === false
        ) {
          quickOrderClick(menuitemObj);
        } else {
          if (!openMenuItemModal) {
            setopenMenuItemModal(true);
          }
        }
      }
    }
    if (menuItemsWithCat?.length === 0) {
      setIsShowSkeleton(true);
      setTimeout(() => {
        setIsShowSkeleton(false);
      }, 1000);
    } else {
      setIsShowSkeleton(true);
    }
  }, [menuItemsWithCat, menuitemId]);

  const handleClickItem = (e: React.MouseEvent, item: GetMenuItemDetail) => {
    debugger;
    dispatch(selectedMenuItem(item as any));
    dispatch(setMenuItemDetailList(item));
    if (isSchoolProgramEnabled) {
      setisStudentPopUp(true);
      return;
    }
    setopenMenuItemModal(true);
  };

  const handleClickItemSlider = (
    e: React.MouseEvent,
    item: GetMenuItemDetail
  ) => {
    e.stopPropagation();
    setisBottomSlide(false);
    dispatch(setMenuItemDetailList(item));
    dispatch(selectedMenuItem(item as any));
    setopenMenuItemModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setloadError(true);
    }, 2000);
  }, []);

  const handleToggleMenuItem = (value: boolean) => {
    setopenMenuItemModal(value);
  };

  const loginButton = document.querySelector(".login-btn") as HTMLButtonElement;

  const selectedFavoriteClick = (selecteditem: Menuitems, item: boolean) => {
    if (userinfo === null) {
      loginButton?.click();
      return;
    }

    const updatedItem = {
      ...selecteditem,
      isFavoriteMenu: item,
    };

    //Deep update the item inside menuItemsWithCat without mutating original array
    const updatedMenuItemsWithCat = menuItemsWithCat.map((category) => ({
      ...category,
      menuitems: category.menuitems.map((menuitem) =>
        menuitem.menuitemId === updatedItem.menuitemId ? updatedItem : menuitem
      ),
    }));

    // Update Redux state
    setisFavourite((prev) => !prev);
    // dispatch(removeCategoryList());
    dispatch(setCategoryList(updatedMenuItemsWithCat));

    if (item === true) {
      dispatch(
        addFavorite({
          customerId: String(userinfo?.customerId ?? 0),
          restaurantId: restaurantinfo?.restaurantId as number,
          menuItemId: String(updatedItem.menuitemId),
        })
      );
    } else {
      dispatch(
        deleteFavorite({
          customerId: String(userinfo?.customerId ?? 0),
          restaurantId: restaurantinfo?.restaurantId as number,
          menuItemId: String(updatedItem.menuitemId),
        })
      );
    }
  };

  const handleClickView = (type: ViewTypeEnum) => {
    setViewType(type);
    if (type === ViewTypeEnum.LIST) dispatch(displayViewUpdate(true));
    else dispatch(displayViewUpdate(false));
  };

  function quickOrderClick(item: Menuitems) {
    let checkItemExistInCart =
      cartItem !== undefined &&
      cartItem.length > 0 &&
      cartItem?.some((cartitem) => cartitem.menuitemid === item?.menuitemId);
    if (!checkItemExistInCart) {
      MenuItemServices.quickOrderaddToCart({
        menuItemId: item.menuitemId,
        cartsessionId: sessionid as string,
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
      }).then((res) => {
        if (res) {
          console.log("quick order click response in cat menuitem", res);
          handleNotify(
            "Item added succesfully",
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
          dispatch(
            getCartItemCount({
              cartsessionid: sessionid,
              locationId: restaurantinfo?.defaultlocationId,
              restaurantId: restaurantinfo?.restaurantId,
              customerId: userinfo ? userinfo?.customerId : 0,
            })
          );
          //modalPopUpCloseClick();
          CartServices.getCartItemList({
            cartsessionId: sessionid as string,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            cartId: 0,
            customerId: userinfo ? userinfo?.customerId : 0,
            rewardpoints: rpoint,
            redeemamount: ramount,
            deliveryaddressId: 0,
            tipPercentage: 0,
            tipAmount: 0,
            ordertype: String(ordertype),
            selectedTime: selecetdtime,
            requestId: deliveryRequestId,
          }).then((response) => {
            if (response) {
              if (response?.cartDetails && response?.cartDetails?.cartTotal) {
                dispatch(setCartItem(response));
              }
            }
          });
        }
      });
    } else {
      // increment(item)
    }
  }

  const handleToggleBottomSlide = (value: boolean) => {
    setisBottomSlide(value);
  };

  const handleClickSeaAll = (item: any) => {
    handleToggleBottomSlide(true);
    const selectedItem = menuItemsWithCat?.find(
      (catMenu: any) => catMenu.catId === item?.catId
    );
    setselectedCatItem(selectedItem as any);
  };

  const handleClickOnNoThanks = () => {
    setopenDependentList(false);
    dispatch(setDipendentId(0));
    dispatch(setDipendentIds([]));
    setselectedDependentItems([]);
    dispatch(setDipendentItemQty(0));
    setopenDependentList(false);
  };
  const handleOnCheck = (id: number) => {
    if (selectedDependentItems.includes(id)) {
      let item = selectedDependentItems.filter((item) => item !== id);
      setselectedDependentItems([...item]);
    } else {
      setselectedDependentItems((pre) => [...pre, id]);
    }
  };

  function handleCklickOnNext() {
    const [first, ...remainingList] = selectedDependentItems;
    const depQty =
      menuitem?.dependentqty > 0
        ? menuitem?.dependentqty
        : menuitem?.selecteditemquantity;
    dispatch(setDipendentItemQty(depQty));
    dispatch({
      type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
      payload: {},
    });
    // dispatch(setDipendentId(first?.DependantMenuItemId));
    dispatch(setDipendentId(Number(first)));
    dispatch(setDipendentIds(remainingList));
    setselectedDependentItems([]);
    setopenDependentList(false);
  }

  function handleToggleDependnt(value: boolean) {
    setopenDependentList(value);
  }

  const handleToggleStudentModal = (value: any) => {
    setisStudentPopUp(value);
  };

  const handleToggle = (value: boolean, keyName: string) => {
    setopenLoginModal(true);
  };

  const handleToggleAccountConfirm = (value: boolean) => {
    setAccountPopupOpen(true);
  };

  const handleOpenLoginModal = (value: boolean) => {
    setopenLoginModal(value);
  };

  return (
    <>
      {!(b2b && userinfo === null) && (
        <section className="categories-info">
          {/* <p>category menuitems component</p> */}
          <div className="container-fluid">
            <div className="row">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-12">
                  {children && children}
                </div>
                <div className="col-lg-1 col-md-1 col-12 d-flex justify-content-end align-items-center">
                  <GridListButton
                    viewType={viewType}
                    handleClickView={handleClickView}
                    dynamicColor={restaurantinfo?.color}
                  />
                </div>
              </div>

              {/* <MenuCarouselDemo menuItems={menuItems} /> */}

              <div className="col-lg-9 col-md-8 col-12 order-2 order-lg-1 order-md-1">
                {menuItemsWithCat?.length > 0 &&
                  menuItemsWithCat?.map((category, index) => {
                    return (
                      <div key={`${category.catId}`}>
                        <div
                          className="row"
                          id={category.categoryslug}
                          data-section={category.categoryslug}
                        >
                          <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-between">
                            {/* <h4 className={`${viewType === 'list' ? 'small-heading' : 'small-heading fs-20'}`}>{category.catName}</h4> */}
                            <span className="small-heading text-start w-75  mb-2 fs-22">
                              {category.catName}
                            </span>
                            <a
                              className="small-heading text-end text-underline d-block d-md-none"
                              onClick={() => handleClickSeaAll(category)}
                            >
                              See All
                            </a>
                          </div>
                        </div>
                        {viewType === ViewTypeEnum.LIST && (
                          <div className="row row-cols-lg-2 row-cols-md-1 row-cols-1 main-scroll">
                            {category?.menuitems?.map(
                              (menu: any, index: any) => {
                                let shareUrl = `${window.location.origin}/${selectedTheme?.url}/${dynamic}/${location}/${category?.categoryslug}?menuitemId=${menu?.menuitemId}`;
                                const isRegular =
                                  menu?.typeid === 0 &&
                                  menu?.isdefaultprice === 1;
                                const imgSrc = getImagePath(
                                  menu.imgurl,
                                  defaultLocation?.defaultmenuitemimage
                                );
                                return (
                                  <div
                                    className="cols menu-item"
                                    key={`${category.catId}-${menu.menuitemId}-${index}`}
                                  >
                                    <div className="card itembox" id="itembox">
                                      <div className="text">
                                        {menu &&
                                        (menu?.isregular === true ||
                                          isRegular) ? (
                                          <>
                                            <div className="d-flex flex-row">
                                              <div className="menu-info w-80">
                                                <a
                                                  className=""
                                                  data-menuitemid={
                                                    menu.menuitemId
                                                  }
                                                >
                                                  <h3 className="menuitem-name">
                                                    {" "}
                                                    {menu.menuItemName}{" "}
                                                  </h3>
                                                </a>
                                                {menu.description.length <
                                                100 ? (
                                                  <p>
                                                    {fixedLengthString(
                                                      menu.description
                                                    )}
                                                  </p>
                                                ) : (
                                                  <PopOver
                                                    description={
                                                      menu.description
                                                    }
                                                  ></PopOver>
                                                )}
                                              </div>
                                              <div className="plus-icon w-20 text-end">
                                                {isDisplayPrice && (
                                                  <span className="mt-10 d-inline-block fw-bold color-green">
                                                    {menu.currency}
                                                    {menu?.price}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <div>
                                              <MenuItemAddToCart
                                                shareUrl={shareUrl}
                                                item={menu}
                                                handleToggleDependnt={
                                                  handleToggleDependnt
                                                }
                                              />
                                            </div>
                                            {/* {menu.isregular && <ShareitemComponent size={25} title={menu.menuItemName} url={shareUrl} description={menu.description} linkClass="fs-5 pt-1" />} */}
                                          </>
                                        ) : (
                                          <>
                                            <div className="d-flex flex-row">
                                              <div className="menu-info w-80">
                                                <p>this is static item</p>
                                                <a
                                                  className=""
                                                  data-menuitemid={
                                                    menu.menuitemId
                                                  }
                                                  onClick={(e) =>
                                                    handleClickItem(e, menu)
                                                  }
                                                >
                                                  {" "}
                                                  <h3>
                                                    {" "}
                                                    {menu.menuItemName}{" "}
                                                  </h3>{" "}
                                                </a>
                                                {/* <p>{fixedLengthString(menu.description)}</p> */}
                                                {menu.description.length <
                                                180 ? (
                                                  <p>
                                                    {fixedLengthString(
                                                      menu.description
                                                    )}
                                                  </p>
                                                ) : (
                                                  <PopOver
                                                    description={
                                                      menu.description
                                                    }
                                                  ></PopOver>
                                                )}
                                              </div>
                                              <div className="plus-icon w-20 text-end">
                                                {isDisplayPrice && (
                                                  <span className="mt-10 d-inline-block fw-bold color-green">
                                                    {menu.currency}
                                                    {menu?.price}
                                                  </span>
                                                )}
                                                <br />
                                                {/* ////pluse icon addto cart click */}
                                                <a
                                                  className="fa plusbutton fa-plus icon-plus-list-view mt-1"
                                                  data-toggle="tooltip"
                                                  data-placement="left"
                                                  title="Open item"
                                                  onClick={(e) =>
                                                    handleClickItem(e, menu)
                                                  }
                                                ></a>
                                              </div>
                                            </div>
                                            <div>
                                              {menu?.quickorderallow && (
                                                <MenuItemQuickOrder
                                                  quickOrderClick={
                                                    quickOrderClick
                                                  }
                                                  item={menu}
                                                />
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div className="img">
                                        {imgSrc ? (
                                          <LazyLoadImage
                                            src={imgSrc}
                                            style={{ maxHeight: "136px" }}
                                            effect="blur"
                                            wrapperProps={{
                                              style: { transitionDelay: "1s" },
                                            }}
                                            alt={menu.menuItemName}
                                          />
                                        ) : null}

                                        <a
                                          data-toggle="tooltip"
                                          data-placement="left"
                                          title={TOOLTIP_MSG.ADD_TO_FAV}
                                          onClick={() => {
                                            selectedFavoriteClick(
                                              menu,
                                              !menu.isFavoriteMenu
                                            );
                                          }}
                                          className={`fa wishlist fa-heart-o ${
                                            menu?.isFavoriteMenu == true
                                              ? "active"
                                              : ""
                                          }`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}

                        {viewType === ViewTypeEnum.GRID && (
                          <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 main-scroll">
                            {category?.menuitems?.map((menu: any) => {
                              const imgSrc = getImagePath(
                                menu.imgurl,
                                defaultLocation?.defaultmenuitemimage
                              );
                              return (
                                <div
                                  className="cols menu-item"
                                  key={`${category.catId}-${menu.menuitemId}-${index}`}
                                >
                                  <div className="card features itembox">
                                    <div className="img position-relative">
                                      {imgSrc ? (
                                        <LazyLoadImage
                                          // src={getImagePath(
                                          //   menu.imgurl,
                                          //   defaultLocation?.defaultmenuitemimage
                                          // )}
                                          src={imgSrc}
                                          style={{ maxHeight: "136px" }}
                                          effect="blur"
                                          wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                          }}
                                          alt={menu.menuItemName}
                                        />
                                      ) : null}
                                      {/* <img src={getImagePath(menu.imgurl, defaultLocation?.defaultmenuitemimage)} alt={menu.menuItemName} className="img-fluid" /> */}
                                      <a
                                        className="fa plusbutton fa-plus"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Open item"
                                        // onClick={(e) =>
                                        //   handleClickItem(e, menu)
                                        // }
                                      ></a>
                                    </div>
                                    <div className="text">
                                      <h3 className="menuitem-name">
                                        {menu.menuItemName}
                                        {isDisplayPrice && (
                                          <span className="color-green fs-16 price">
                                            {menu.currency}
                                            {menu?.price}
                                          </span>
                                        )}
                                      </h3>
                                      {menu?.quickorderallow && (
                                        <div className="d-flex justify-content-center mt-2">
                                          <MenuItemQuickOrder
                                            quickOrderClick={quickOrderClick}
                                            item={menu}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                {/* {((isShowSkeleton&&menuItemsWithCat?.length===0)|| (Object.keys(searchdata).length === 0 && errorMessage == "" && searchtext !== "")) && <FavouriteSkeleton />} */}
                {Object.keys(searchdata).length === 0 &&
                  errorMessage == "" &&
                  searchtext !== "" && <FavouriteSkeleton />}
                {errorMessage && (
                  <h4 className="red-text text-center mt-5">{errorMessage}</h4>
                )}
                {menuItemsWithCat?.length === 0 && loadError && (
                  <h4 className="red-text text-center mt-5">
                    Opps! No Items Found
                  </h4>
                )}
              </div>
              <CategorySidebar />
            </div>
          </div>
        </section>
      )}
      <ToastNotify />
      <ScrollToTop />
      {/* <MenuItemDetail /> */}
      {openMenuItemModal && (
        <MenuItemModal
          handleToggleDependnt={handleToggleDependnt}
          isOpenModal={openMenuItemModal}
          handleToggleMenuItem={handleToggleMenuItem}
        />
      )}
      {openLoginModal && (
        <Login
          // handleToggle={handleToggle}
          handleToggleAccountConfirm={() => handleToggleAccountConfirm(true)}
          isOpenModal={openLoginModal}
          handleOpenLoginModal={handleOpenLoginModal}
        />
      )}
      {isBottomSlide && (
        <BottomBash
          handleClickItem={handleClickItemSlider}
          catMenuItem={selectedCatItem}
          handleToggle={handleToggleBottomSlide}
        />
      )}
      {openDependentList && (
        <CommonModal
          title={"Would you like to add additional items? "}
          btn1Name="No Thanks"
          btn2Name="Next"
          isOpenModal={openDependentList}
          handleToggle={handleClickOnNoThanks}
          handleClickBtn2={handleCklickOnNext}
          handleClickBtn1={handleClickOnNoThanks}
          isbtn2={true}
        >
          <DependentItemListComponent
            selectedDependentItems={selectedDependentItems}
            handleOnCheck={handleOnCheck}
            dependantMenuList={
              menuItemDetail?.dependantMenuList ??
              menuItemDetail?.dependantMenuList
            }
          />
        </CommonModal>
      )}
      {/* {isStudentPopUp && (
        <StudentComponent
          handleToggleMenuItem={handleToggleMenuItem}
          isStudentPopUp={isStudentPopUp}
          handleToggleStudentModal={handleToggleStudentModal}
          handleClickOk={() => {}}
        />
      )} */}
    </>
  );
};

export default CategoryMenuItems;
