export const BannerName = {
  banner1Name: "Home Page Banner1",
  banner2Name: "Home Page Banner2",
  banner3Name: "Home Page Banner3",
  banner4Name: "Home Page Banner4",
  banner5Name: "Home Page Banner5",
  banner6Name: "Home Page Banner6",
  banner7Name: "Home Page Banner7 Left",
  banner8Name: "Home Page Banner7 Right",
};

export const validateQueryString = (
  restaurantURL: string,
  locationURL: string,
  categoryURL: string = "",
  menuitemURL: string = ""
): boolean => {
  const pattern = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
  const validLength =
    restaurantURL.length < 20 ||
    locationURL.length < 20 ||
    categoryURL.length < 50 ||
    menuitemURL.length < 50;

  if (
    validLength &&
    !pattern.test(restaurantURL) &&
    !pattern.test(locationURL) &&
    (categoryURL.length === 0 || !pattern.test(categoryURL)) &&
    (menuitemURL.length === 0 || !pattern.test(menuitemURL))
  ) {
    return true;
  }

  return false;
};
