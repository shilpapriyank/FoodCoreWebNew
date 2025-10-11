"use client";

import React, { useEffect, useState } from "react";
import LoadLocationDirectComponent from "../../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../../components/nt/category/category-menuitems/category-menuItems.component";
import CategoryHeader from "../../../../../components/nt/category/category-header/category-header";
import { useSearchData } from "../../../../../components/customhooks/usesearchdata-hook";
import Head from "next/head";
import useUtility from "../../../../../components/customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import Layout from "@/components/nt/layout/layout";
import { addmetaData } from "../../../../../../redux/metadata/metadata.slice";
import { RestaurantsServices } from "../../../../../../redux/restaurants/restaurants.services";
import { useParams, usePathname, useRouter } from "next/navigation";
import SearchBarComponent from "@/components/nt/category/category-menuitems/search-bar.component";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchSeoMetadata } from "@/components/nt/common/seo-utils";
import { MetadataTypes } from "@/types/metadata-types/metadata.type";

type ParamType = {
  location: string;
  category: string;
  dynamic: string;
  pathname: string;
};

type Props = {
  metaData: MetadataTypes;
};

export default function CategoryClient({metaData}: Props) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const rawParams = useParams();
  const router = useRouter();
  const [params, setParams] = useState<ParamType | null>(null);
  const { menuitem, categoryItemsList, selecteddelivery, metadata } =
    useReduxData();
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
  const metadatadetail = metadata?.metadata;

  useEffect(() => {
    if (rawParams && metaData) {
      const { dynamic, location, category, pathname } = rawParams as ParamType;
     // setParams({ dynamic, location, category, pathname });
      dispatch(addmetaData(metaData))
    }
  }, [rawParams, metaData]);

  return (
    <>
      {/* <Head>
          <title>{metadatadetail.title || "Online Ordering"}</title>
          <meta name="description" content={metadatadetail.description || "Online description"} />
          <meta property="og:image" content={metadatadetail.image} />
          <meta property="og:url" content={metadatadetail.url} />
        </Head> */}
      <LoadLocationDirectComponent>
        <Layout>
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
        </Layout>
      </LoadLocationDirectComponent>
    </>
  );
}
