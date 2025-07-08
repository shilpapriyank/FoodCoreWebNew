import { GetThemeDetails, ThemeObj } from "../common/utility";
import { MainServices } from "../../../redux/main/main.services";
import {
  getAllCategoryMenuItems,
  setSelectedCategory,
} from "../../../redux/category/category.slice";
import { useParams, useRouter } from "next/navigation";
import { mainSlice, setMainCategoryList } from "../../../redux/main/main.slice";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import { useAppDispatch } from "../../../redux/hooks";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
import { ThemeType } from "@/types/common-types/common.types";

const useLoadCatData = (customerId: number) => {
  const dispatch = useAppDispatch();
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
        newselectedRestaurant?.defaultlocationId;
      if (
        ThemeObj.newtheme.toString() ===
        GetThemeDetails(newselectedRestaurant?.themetype)?.name
      ) {
        dispatch(
          getAllCategoryMenuItems({
            restaurantId: newselectedRestaurant.restaurantId,
            locationId: locationId,
            customerId: customerId,
            categories: "",
            selectedCategoryUrl: "",
          })
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
          if (catresponse) {
            dispatch(
              setMainCategoryList(categoryresponse as MainCategoryList[])
            );
          } else {
            dispatch(setMainCategoryList([]));
          }

          //const firstCategory = catresponse[0];
          const firstCategory = { ...catresponse[0], catSelected: true };
          if (categoryitemlist.length === 0) {
            dispatch(setSelectedCategory(firstCategory));
          }
          let promotioncategories = catresponse.find(
            (x) => x.catName === "PROMOTION"
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
          dispatch(setMainCategoryList(catresponse as MainCategoryList[]));
        }
      }
      return new Promise((resolve, rejects) => {
        resolve(true);
      });
    } else {
      const locationId =
        newselectedRestaurant?.defaultLocation?.locationId ||
        newselectedRestaurant.defaultlocationId;
      let catresponse;
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
          dispatch(setMainCategoryList(categoryresponse as MainCategoryList[]));

          const firstCategory = { ...catresponse[0], catSelected: true };
          firstCategory.catSelected = true;
          dispatch(setSelectedCategory(firstCategory));
          // const firstCategory = catresponse[0];
          // firstCategory.catSelected = true;
          // if (categoryitemlist.length === 0) {
          //     dispatch(selectedCategory(firstCategory));
          // }

          let promotioncategories = catresponse.find(
            (x) => x.catName === "PROMOTION"
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
          if (catresponse && catresponse !== null) {
            dispatch(setMainCategoryList(catresponse as MainCategoryList[]));
          } else {
            dispatch(setMainCategoryList([]));
          }
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
