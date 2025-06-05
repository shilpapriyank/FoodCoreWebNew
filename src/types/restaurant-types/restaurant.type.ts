export type DefaultLocation = {
  locationURL: string;
};

export type RestaurantDetail = {
  themetype?: string;
  defaultLocation?: DefaultLocation;
   restaurantId?: number;
  IsAddressMandatoryForRegister?: boolean;
};
