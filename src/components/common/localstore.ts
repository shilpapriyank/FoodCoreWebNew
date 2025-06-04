export const StorageVariable = {
  LOCATION_ID: "defaultlocationId",
  RESTAURANT_ID: "restaurantId",
  RESTAURANT_NAME: "restaurantName",
};

export const setLocationIdInStorage = (defaultLocationId: number) => {
  if (typeof window !== "undefined") {
    console.log("location id ", defaultLocationId);
    localStorage.setItem(
      StorageVariable.LOCATION_ID,
      defaultLocationId > 0 ? defaultLocationId.toString() : "0"
    );
  }
};

export const setRestaurantIdInStorage = (restaurantId: number) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageVariable.RESTAURANT_ID,
      restaurantId > 0 ? restaurantId.toString() : "0"
    );
  }
};

export const setRestaurantNameInStorage = (restaurantName: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageVariable.RESTAURANT_NAME,
      restaurantName !== "" ? restaurantName : ""
    );
  }
};

export const getLocationIdFromStorage = (): number => {
  if (typeof window === "undefined") return 0;
  const locationId = localStorage.getItem(StorageVariable.LOCATION_ID);
  return locationId !== null ? parseInt(locationId) : 0;
};

export const getRestaurantIdFromStorage = (): number => {
  if (typeof window === "undefined") return 0;
  const restaurantId = localStorage.getItem(StorageVariable.RESTAURANT_ID);
  return restaurantId !== null ? parseInt(restaurantId) : 0;
};

export const getRestaurantNameFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(StorageVariable.RESTAURANT_NAME);
};
