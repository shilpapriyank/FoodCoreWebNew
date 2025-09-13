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
import { useParams, usePathname, useRouter } from "next/navigation";
import SearchBarComponent from "@/components/nt/category/category-menuitems/search-bar.component";
import { useAppDispatch } from "../../../../../../redux/hooks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FavouriteSkeleton from "@/components/nt/skeleton/favourite-skeleton";
// import { MenuItemSkeletonComponent } from "@/components/nt/skeleton/menuitem-skeleton.component";

type ParamType = {
  restaurant: string;
  location: string;
  category: string;
};

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const rawParams = useParams();
  const router = useRouter();
  const [params, setParams] = useState<ParamType | null>(null);
  const { menuitem, categoryItemsList, selecteddelivery } = useReduxData();
  const searchdata = menuitem?.searchdata;
  const searchtext = menuitem?.searchtext;
  const {
    searchItem,
    handleChangeSearch,
    handleSubmitSearch,
    handleClickCancel,
    errorMessage,
    loading,
  } = useSearchData(searchtext);
  const { filterCategory } = useUtility();
  let pickupordelivery = selecteddelivery.pickupordelivery;
  const menuItemsWithCat = filterCategory(
    (searchtext !== "" ? searchdata?.menuItems : categoryItemsList) ?? [],
    pickupordelivery
  );

  useEffect(() => {
    if (rawParams) {
      // Cast only if sure about the structure
      const { restaurant, location, category } = rawParams as ParamType;
      setParams({ restaurant, location, category });
    }
  }, [rawParams]);

  useEffect(() => {
    const loadMeta = async () => {
      if (!params) return;
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
          title: `${itemDetail?.title ? `${itemDetail?.title} || ` : ""}${itemDetail?.restaurantname
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
        <meta name="description" content="Online description" />
      </Head>
      <LoadLocationDirectComponent>
        <Layout>
          {loading ? (
            // <div className="my-3">
            //   <Skeleton height={40} count={5} style={{ marginBottom: "10px" }} />
            //   <Skeleton height={200} count={1} style={{ marginTop: "10px" }} />
            // </div>
            <FavouriteSkeleton />
          ) : (
            <>
              {!errorMessage && <CategoryHeader />}
              <CategoryMenuItems
                menuItemsWithCat={menuItemsWithCat}
                categoryslug={params?.category as string}
                errorMessage={!loading ? errorMessage : ""}
              >
                <SearchBarComponent
                  searchItem={searchItem}
                  handleChangeSearch={handleChangeSearch}
                  handleSubmitSearch={handleSubmitSearch}
                  handleClickCancel={handleClickCancel}
                  errorMessage={!loading ? errorMessage : ""}
                />
              </CategoryMenuItems>
            </>
          )}
        </Layout>
      </LoadLocationDirectComponent>
    </>
  );
}
