"use client";

import React, { useEffect, useState } from "react";
import LoadLocationDirectComponent from "../../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../../components/nt/category/category-menuitems/category-menuItems.component";
import CategoryHeader from "../../../../../components/nt/category/category-header/category-header";
import { useSearchData } from "../../../../../components/customhooks/usesearchdata-hook";
import {
  getorigin,
  isSeoDetail,
} from "../../../../../components/common/utility";
import Head from "next/head";
import useUtility from "../../../../../components/customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import Layout from "@/components/nt/layout/layout.component";
import { addmetaData } from "../../../../../../redux/metadata/metadata.slice";
import { RestaurantsServices } from "../../../../../../redux/restaurants/restaurants.services";
//import { validateQueryString } from "@/components/default/common/dominos/helpers/utility";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../redux/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import SearchBarComponent from "@/components/nt/category/category-menuitems/search-bar.component";

export default function CategoryPage({
  params,
}: {
  params: {
    restaurant: string;
    location: string;
    category: string;
    title: string;
  };
}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  //const params = useParams();
  const { menuitem, categoryItemsList, selecteddelivery } = useReduxData();
  const searchdata = menuitem?.searchdata;
  const searchtext = menuitem?.searchtext;
  const {
    searchItem,
    handleChangeSearch,
    errorMessage,
    handleClickCancel,
    handleSubmitSearch,
  } = useSearchData(searchtext);
  const { filterCategory } = useUtility();
  let pickupordelivery = selecteddelivery.pickupordelivery;
  let menuItemsWithCat = filterCategory(
    searchtext !== "" ? searchdata?.menuItems : categoryItemsList,
    pickupordelivery
  );
  const { location, category } = params;

  //   useEffect(() => {
  //     //CONDITION FOR THE categoryitemlist REDUX IS EMPTY AND USER DIRECT ENTER THE LINK IN THE BROWSER
  //     if (categoryitemlist.length === 0 || (selectedmenuitemdetail.length === undefined && Object.keys(selectedmenuitemdetail).length === 0)) {
  //         const catagerySelected = maincategoryList.filter(x =>x.categoryslug=== category)
  //         dispatch(selectedCategory(catagerySelected[0]))
  //         CategoryServices.getCategoryItemList(restaurantinfo.restaurantId, catagerySelected[0].catId, userinfo ? userinfo.customerId : 1, restaurantinfo.defaultlocationId).then(response => {

  //             if (response) {
  //                 selcetedCategoryList = response;
  //                 dispatch({
  //                     type: CategoryTypes.CATEGORY_ITEM_LIST,
  //                     payload: response
  //                 })
  //                 let selectedCategoryItem;
  //                 if (selcetedCategoryList !== undefined && selcetedCategoryList !== null) {
  //                     selectedCategoryItem = selcetedCategoryList?.filter(x => x.menuitemId === parseInt(menuitemId))
  //                     dispatch(selectedMenuItem(selectedCategoryItem[0]));
  //                     dispatch(getMenuItemDetailes(restaurantinfo.restaurantId, restaurantinfo.defaultlocationId, 0, 0, 0, 0));
  //                     // dispatch(getMenuItemDetailes(restaurantinfo.restaurantId, restaurantinfo.defaultlocationId, 0, selectedCategoryItem[0].menuitemId, 0, 0));
  //                     setload(load + 1);
  //                 }
  //             }
  //         })
  //         // setload(load + 1)
  //     } else {
  //         setload(load + 1)
  //     }
  // }, [])

  useEffect(() => {
    const loadMeta = async () => {
      const { restaurant, location, category } = params;

      const isMenuItemId = category.includes("menuitemId");
      const selectedCategory = isMenuItemId ? category.split("?")[0] : category;
      const menuitemId = category.split("=")[1];

      if (!restaurant || !location || !selectedCategory) return;

      if (isSeoDetail(pathname)) return;

      const obj = {
        restaurantURL: restaurant,
        locationURL: location,
        categoryURL: selectedCategory,
        menuitemURL: "",
        menuitemId:
          menuitemId !== "" && menuitemId !== null && menuitemId !== undefined
            ? parseInt(menuitemId)
            : 0,
        categoryId: 0,
      };

      const result = await RestaurantsServices.getMetadataDetails(obj);
      const itemDetail = result?.seodetails;

      if (itemDetail) {
        const metaData = {
          title: `${itemDetail?.title ? `${itemDetail?.title} || ` : ""}${
            itemDetail?.restaurantname
          } : Online Ordering`,
          description: itemDetail?.description ?? "",
          image: itemDetail?.imageurl ?? "",
          url: `${getorigin()}${pathname}`,
        };
        dispatch(addmetaData(metaData));
      }
    };
    loadMeta();
  }, [params]);

  return (
    <>
      <Head>
        <title>{params.title}</title>
        <meta name="description" content="Online description" />
      </Head>
      <LoadLocationDirectComponent>
        <Layout>
          {/* {!errorMessage && } */}
          <CategoryHeader />
          <CategoryMenuItems
            menuItemsWithCat={menuItemsWithCat}
            categoryslug={category}
            errorMessage={errorMessage}
          >
            <SearchBarComponent
              searchItem={searchItem}
              handleChangeSearch={handleChangeSearch}
              handleSubmitSearch={handleSubmitSearch}
              handleClickCancel={handleClickCancel}
              errorMessage={errorMessage}
            />
          </CategoryMenuItems>
        </Layout>
      </LoadLocationDirectComponent>
    </>
  );
}

// export const getServerSideProps = getServerSideProps(
//   (store: any) =>
//     async ({ req, res, resolvedUrl }: any) => {
//       const [category, location, restaurant] = resolvedUrl.split("/").reverse();
//       const isMenuItemId = category.includes("menuitemId");
//       let selectedCategory = isMenuItemId ? category.split("?")[0] : category;
//       let menuitemId = category.split("=")[1];
//       if (isSeoDetail(resolvedUrl)) {
//         return;
//       }

//       if (!validateQueryString(restaurant, location, selectedCategory)) {
//         return;
//       }

//       let metaData = {
//         title: "",
//         description: "",
//         image: "",
//         url: "",
//       };
//       let obj = {
//         restaurantURL: restaurant,
//         locationURL: location,
//         categoryURL: selectedCategory,
//         menuitemURL: "",
//         menuitemId:
//           menuitemId !== "" && menuitemId !== null && menuitemId !== undefined
//             ? parseInt(menuitemId)
//             : 0,
//         categoryId: 0,
//       };

//       let result = await RestaurantsServices.getMetadataDetails(obj);
//       // let result = {};
//       let itemDetail = result?.seodetails;
//       if (itemDetail !== null && itemDetail !== undefined) {
//         metaData.title = `${
//           itemDetail?.title !== "" ? `${itemDetail?.title} || ` : ""
//         }${itemDetail?.restaurantname} : Online Ordering `;
//         metaData.description = itemDetail?.description ?? "";
//         metaData.image = itemDetail?.imageurl ?? "";
//         metaData.url = `${getorigin()}${resolvedUrl}`;
//         store.dispatch(addmetaData(metaData));
//       }
//       return { props: { title: metaData.title } };
//     }
// );
