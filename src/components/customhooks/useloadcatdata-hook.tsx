import React from "react";
import { resolve } from "path";
import { rejects } from "assert";
import { useDispatch } from "react-redux";
import { GetThemeDetails, ThemeObj } from "../common/utility";
import { MainServices } from "../../../redux/main/main.services";
import { MainTypes } from "../../../redux/main/main.type";
import {
  getAllCategoryMenuItems,
  selectedCategory,
} from "../../../redux/category/category.slice";

import { useParams, useRouter } from "next/navigation";
import { AppDispatch } from "../../../redux/store";
import {
  mainSlice,
  setMainCategoryList,
  updatePromotionCategoryData,
} from "../../../redux/main/main.slice";
import { MainCategory } from "@/types/mainservice-types/mainservice.type";

const useLoadCatData = (customerId: number) => {
  const dispatch = useDispatch<AppDispatch>();
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
        dispatch(
          getAllCategoryMenuItems({
            restaurantId: newselectedRestaurant.restaurantId,
            locationId: locationId,
            customerId: customerId,
            categories: "",
            selectedCategoryUrl: "",
          }) as any
        );
      } else {
        const catresponse = await MainServices.getMenuCategoryList(
          newselectedRestaurant.restaurantId,
          locationId
        );
        if (catresponse && catresponse.length > 0) {
          categoryresponse = catresponse;
          // dispatch({
          //   type: MainTypes.GET_MENU_CATEGORY_DATA,
          //   payload: categoryresponse,
          // });
          dispatch(setMainCategoryList(categoryresponse as MainCategory[]));

          //const firstCategory = catresponse[0];
          const firstCategory = { ...catresponse[0], catSelected: true };
          if (categoryitemlist.length === 0) {
            dispatch(selectedCategory(firstCategory));
          }
          let promotioncategories = catresponse.find(
            (x: any) => x.catName === "PROMOTION"
          );
          let promotionCatId: string = "0";
          if (promotioncategories) {
            promotionCatId = String(promotioncategories.catId);
            MainServices.getPromotionCategoryList(
              newselectedRestaurant.restaurantId,
              promotionCatId,
              customerId,
              newselectedRestaurant.defaultlocationId
            ).then((promocatresponse) => {
              if (promocatresponse && promocatresponse != null) {
                // dispatch({
                //   type: MainTypes.GET_PROMOTION_CATEGORY_DATA,
                //   payload: promocatresponse,
                // });
                dispatch(
                  mainSlice.actions.setPromotionCategoryList(promocatresponse)
                );
              }
            });
          } else {
            // dispatch({
            //   type: MainTypes.UPDATE_PROMOTION_CATEGORY_DATA,
            //   payload: null,
            // });
            dispatch(mainSlice.actions.updatePromotionCategoryData([]));
          }
        } else {
          dispatch(setMainCategoryList(catresponse as MainCategory[]));
        }
      }
      return new Promise((resolve, rejects) => {
        resolve(true);
      });
    } else {
      const locationId =
        newselectedRestaurant?.defaultLocation?.locationId ||
        newselectedRestaurant.defaultlocationId;
      let catresponse: any;
      await MainServices.getMenuCategoryListPOS(
        newselectedRestaurant.restaurantId,
        locationId,
        true,
        customerId
      ).then((catresponsedata) => {
        catresponse = catresponsedata;
        if (catresponse && catresponse !== null && catresponse !== undefined) {
          let categoryresponse = catresponse;
          // dispatch({
          //   type: MainTypes.GET_MENU_CATEGORY_DATA,
          //   payload: categoryresponse,
          // });
          dispatch(setMainCategoryList(categoryresponse as MainCategory[]));

          const firstCategory = { ...catresponse[0], catSelected: true };
          firstCategory.catSelected = true;
          dispatch(selectedCategory(firstCategory));
          // const firstCategory = catresponse[0];
          // firstCategory.catSelected = true;
          // if (categoryitemlist.length === 0) {
          //     dispatch(selectedCategory(firstCategory));
          // }

          let promotioncategories = catresponse.find(
            (x: any) => x.catName === "PROMOTION"
          );
          let promotionCatId = 0;
          if (promotioncategories) {
            promotionCatId = promotioncategories.catId;
            const promocatresponse = MainServices.getPromotionCategoryList(
              newselectedRestaurant.restaurantId,
              promotionCatId.toString(),
              customerId,
              newselectedRestaurant.defaultlocationId
            );
            // MainServices.getPromotionCategoryList(newselectedRestaurant.restaurantId, promotionCatId, customerId, newselectedRestaurant.defaultlocationId)

            if (promocatresponse && promocatresponse != null) {
              // dispatch({
              //   type: MainTypes.GET_PROMOTION_CATEGORY_DATA,
              //   payload: promocatresponse,
              // });
              dispatch(
                mainSlice.actions.getPromotionCategoryData(
                  promocatresponse as any
                )
              );
            }
          } else {
            // dispatch({
            //   type: MainTypes.UPDATE_PROMOTION_CATEGORY_DATA,
            //   payload: null,
            // });
            dispatch(mainSlice.actions.updatePromotionCategoryData([]));
          }
        } else {
          // dispatch({
          //   type: MainTypes.GET_MENU_CATEGORY_DATA,
          //   payload: catresponse,
          // });
          dispatch(setMainCategoryList(catresponse as MainCategory[]));
        }
        return new Promise((resolve, rejects) => {
          resolve(true);
        });
      });
    }
  };
  return { loadCatData };
};

export default useLoadCatData;
