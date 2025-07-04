'use client';

import React, { useCallback, useState } from "react";
import Head from "next/head";
import Layout from "@/components/nt/layout/layout.component";
import FavouriteItem from "@/components/nt/favourite/favourite-item.component";
import MenuItemModal from "@/components/nt/category/category-menuitems/menuitem-modal/menuitem-modal.component";
import FavouriteSkeleton from "@/components/nt/skeleton/favourite-skeleton";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { FavouritesServices } from "../../../../../../redux/favourites/favourites.services";
import { selectedMenuItem } from "../../../../../../redux/menu-item/menu-item.slice";

const FavouritePage = () => {
  const { restaurantinfo, userinfo } = useReduxData();
  const [isProductItemPopup, setisProductItemPopup] = useState(false);

  const dispatch = useAppDispatch();

  const { isError, isLoading, data, isSuccess, refetch } = useQuery({
    queryKey: [
      "getFavourites",
      restaurantinfo?.restaurantId,
      restaurantinfo?.defaultlocationId,
    ],
    queryFn: () =>
      FavouritesServices.getFavouritesList(
        restaurantinfo?.restaurantId as number,
        userinfo?.customerId as number,
        restaurantinfo?.defaultlocationId as number
      ),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const orderNowClick = useCallback(
    (item: any) => {
      if (item != undefined) {
        const updatedItem = { ...item, isFavoriteMenu: true };
        dispatch(selectedMenuItem(updatedItem));
        setisProductItemPopup(true);
      }
    },
    [dispatch]
  );

  const selectedFavoriteClick = useCallback(
    (selectedItem: any) => {
      FavouritesServices.deletefavorite(
        userinfo?.customerId as number,
        restaurantinfo?.restaurantId as number,
        selectedItem.menuitemid
      ).then(() => {
        refetch();
      });
    },
    [userinfo?.customerId, restaurantinfo?.restaurantId, refetch]
  );

  const handleToggleMenuItemModal = (value: boolean) => {
    setisProductItemPopup(value);
  };

  return (
    <>
      <Head>
        <title>
          Favourite || {restaurantinfo?.restaurantname}: Ordering Online
        </title>
        <meta name="description" content="Online description" />
      </Head>

      <Layout>
        <section className="categories-info">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h4 className="small-heading">Favourites</h4>
                  </div>
                </div>
                <div className="row row-cols-lg-2 row-cols-md-1 row-cols-1">
                  {isLoading ? (
                    <FavouriteSkeleton />
                  ) : data && data.length > 0 ? (
                    data.map((item: any, index: number) => (
                      <FavouriteItem
                        key={index}
                        item={item}
                        index={index}
                        selectedFavoriteClick={selectedFavoriteClick}
                        orderNowClick={orderNowClick}
                        page="favourite"
                      />
                    ))
                  ) : (
                    <h5>Your favourite list is empty.</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {isProductItemPopup && (
          <MenuItemModal
            handleToggleMenuItem={handleToggleMenuItemModal}
            isOpenModal={isProductItemPopup}
          />
        )}
      </Layout>
    </>
  );
};

export default FavouritePage;
