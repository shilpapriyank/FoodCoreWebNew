import React from "react";
import { resolve } from "path";
import { rejects } from "assert";
import { useDispatch } from "react-redux";
import { GetThemeDetails, ThemeObj } from "../common/utility";
import { MainServices } from "../../../redux/main/main.services";
import { MainTypes } from "../../../redux/main/main.type";
import { selectedCategory } from "../../../redux/category/category.slice";
import { useParams, useRouter } from "next/navigation";

const useLoadCatData = (customerId: number) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { category } = params;
  const loadCatData = async ({
    newselectedRestaurant,
    isTableOrder,
    categoryitemlist,
  }: any) => {
    let categoryresponse = [];

    if (!isTableOrder) {
      const locationId =
        newselectedRestaurant?.defaultLocation?.locationId ||
        newselectedRestaurant.defaultlocationId;
      if (
        ThemeObj.newtheme.toString() ===
        GetThemeDetails(newselectedRestaurant.themetype).name
      ) {
        // dispatch(
        //   getAllCategoryMenuItems(
        //     newselectedRestaurant.restaurantId,
        //     locationId,
        //     customerId,
        //     "",
        //     category
        //   )
        // );
      } else {
        const catresponse = await MainServices.getMenuCategoryList(
          newselectedRestaurant.restaurantId,
          locationId
        );

        if (catresponse && catresponse.length > 0) {
          categoryresponse = catresponse;
          dispatch({
            type: MainTypes.GET_MENU_CATEGORY_DATA,
            payload: categoryresponse,
          });

          const firstCategory = catresponse[0];
          firstCategory.catSelected = true;
          if (categoryitemlist.length === 0) {
            dispatch(selectedCategory(firstCategory));
          }

          let promotioncategories = catresponse.find(
            (x: any) => x.catName === "PROMOTION"
          );
          let promotionCatId = 0;
          if (promotioncategories) {
            promotionCatId = promotioncategories.catId;
            const promocatresponse =
              await MainServices.getPromotionCategoryList(
                newselectedRestaurant.restaurantId,
                promotionCatId,
                customerId,
                newselectedRestaurant.defaultlocationId
              );
            // MainServices.getPromotionCategoryList(newselectedRestaurant.restaurantId, promotionCatId, customerId, newselectedRestaurant.defaultlocationId)

            if (promocatresponse && promocatresponse != null) {
              dispatch({
                type: MainTypes.GET_PROMOTION_CATEGORY_DATA,
                payload: promocatresponse,
              });
            }
          } else {
            dispatch({
              type: MainTypes.UPDATE_PROMOTION_CATEGORY_DATA,
              payload: null,
            });
          }
        } else {
          dispatch({
            type: MainTypes.GET_MENU_CATEGORY_DATA,
            payload: catresponse,
          });
        }
      }
      return new Promise((resolve, rejects) => {
        resolve(true);
      });
    } else {
      const locationId =
        newselectedRestaurant?.defaultLocation?.locationId ||
        newselectedRestaurant.defaultlocationId;
      const catresponse = await MainServices.getMenuCategoryListPOS(
        newselectedRestaurant.restaurantId,
        locationId,
        true,
        customerId
      );
      if (catresponse && catresponse.length > 0) {
        categoryresponse = catresponse;
        dispatch({
          type: MainTypes.GET_MENU_CATEGORY_DATA,
          payload: categoryresponse,
        });

        const firstCategory = catresponse[0];
        firstCategory.catSelected = true;
        // if (categoryitemlist.length === 0) {
        //     dispatch(selectedCategory(firstCategory));
        // }

        let promotioncategories = catresponse.find(
          (x: any) => x.catName === "PROMOTION"
        );
        let promotionCatId = 0;
        if (promotioncategories) {
          promotionCatId = promotioncategories.catId;
          const promocatresponse = await MainServices.getPromotionCategoryList(
            newselectedRestaurant.restaurantId,
            promotionCatId,
            customerId,
            newselectedRestaurant.defaultlocationId
          );
          // MainServices.getPromotionCategoryList(newselectedRestaurant.restaurantId, promotionCatId, customerId, newselectedRestaurant.defaultlocationId)

          if (promocatresponse && promocatresponse != null) {
            dispatch({
              type: MainTypes.GET_PROMOTION_CATEGORY_DATA,
              payload: promocatresponse,
            });
          }
        } else {
          dispatch({
            type: MainTypes.UPDATE_PROMOTION_CATEGORY_DATA,
            payload: null,
          });
        }
      } else {
        dispatch({
          type: MainTypes.GET_MENU_CATEGORY_DATA,
          payload: catresponse,
        });
      }
      return new Promise((resolve, rejects) => {
        resolve(true);
      });
    }
  };
  return { loadCatData };
};

export default useLoadCatData;
