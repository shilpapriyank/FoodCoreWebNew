'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { GetThemeDetails } from '../../common/utility';
import { AppDispatch } from '../../../../redux/store';
import { getCartItemCount } from '../../../../redux/cart/cart.slice';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';

const CartCounter: React.FC = () => {
  const { restaurantinfo, userinfo, sessionid, cart } = useReduxData();
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
  const customerId = userinfo ? userinfo.customerId : 0;
  const dispatch = useDispatch<AppDispatch>();
  const cartcount = cart.cartitemcount;
  const router = useRouter();
  const params = useParams();

  // These should exist in the dynamic route /[dynamic]/[location]/...
  const dynamic = params?.dynamic as string;
  const location = params?.location as string;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedTheme?.url && dynamic && location) {
      router.push(`/${selectedTheme.url}/${dynamic}/${location}/checkout`);
    }
  };

// useEffect(() => {
//   if (sessionid && restaurantinfo) {
//     dispatch(
//       getCartItemCount({
//         sessionid,
//         locationId: restaurantinfo.defaultlocationId,
//         restaurantId: restaurantinfo.restaurantId,
//         customerId,
//       })
//     );
//   }
// }, [userinfo, sessionid, restaurantinfo, customerId, dispatch]);


  return (
    <button onClick={handleClick} className="px-0 fs-6 position-relative bg-white">
      <i className="fa fa-shopping-cart color-green fs-5" />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dynamic text-white">
        {cartcount}
        <span className="visually-hidden"></span>
      </span>
    </button>
  );
};

export default CartCounter;
