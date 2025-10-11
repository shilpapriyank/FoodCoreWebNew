import { getorigin, isSeoDetail } from "@/components/common/utility";
import { RestaurantsServices } from "../../../../redux/restaurants/restaurants.services";

export async function fetchSeoMetadata(
  dynamic?: string,
  location?: string,
  category?: string,
  pathname?: string
) {
  if (pathname && isSeoDetail(pathname)) {
    return null;
  }
  const isMenuItemId = category?.includes("menuitemId");
  const selectedCategory = isMenuItemId ? category?.split("?")[0] : category;
  const menuitemId = category?.split("=")[1];

  let metaData = {
    title: "",
    description: "",
    image: "",
    url: "",
  };

  const obj = {
    restaurantURL: dynamic,
    locationURL: location,
    categoryURL: selectedCategory,
    menuitemURL: "",
    menuitemId:
      menuitemId !== "" && menuitemId !== null && menuitemId !== undefined
        ? parseInt(menuitemId)
        : 0,
    categoryId: 0,
  };

  try {
    const result = await RestaurantsServices.getMetadataDetails(obj);
    const itemDetail = result?.seodetails;

    if (itemDetail !== null && itemDetail !== undefined) {
      metaData = {
        title: `${itemDetail?.title !== "" ? `${itemDetail?.title} || ` : ""}${
          itemDetail?.restaurantname
        }`,
        description: itemDetail?.description ?? "",
        image: itemDetail?.imageurl ?? "",
        url: `${getorigin()}${pathname}`,
      };
    }
    return metaData;
  } catch (error) {
    console.error("Error in fetchSeoMetadata:", error);
    return null;
  }
}
