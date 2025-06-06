
// 'use client';

// import React, { useCallback, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { setpickupordelivery } from '../../../../../redux/selected-delivery-data/selecteddelivery.slice';
// import LoadLocationDirectComponent from '../../../../components/nt/common/loadlocation-direct.component';
// import CategoryMenuItems from '../../../../components/nt/category/category-menuitems/category-menuItems.component';
// import { useRouter } from 'next/navigation';
// import CategoryHeader from '../../../../components/nt/category/category-header/category-header';
// import {isasap} from "../../../../../redux/order/order.slice";
// // import { OrderServices } from '../../../../redux/order/order.services';
// import { useSearchData } from '../../../../components/customhooks/usesearchdata-hook';
// import SearchBarComponent from '../../../../components/nt/category/category-menuitems/search-bar.component';
// import useUtility from '../../../../components/customhooks/utility-hook';
// import { ORDER_TYPE } from '@/components/common/utility';
// import Layout from '../layout';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { OrderTypes } from '../../../../../redux/order/order.type';
// import { OrderServices } from '../../../../../redux/order/order.services';


// const Page = () => {
//   const dispatch = useDispatch();
//   const { selecteddelivery, restaurantinfo, menuitem, categoryItemsList, userinfo, order } = useReduxData();
//   const [isloadAdress, setisloadAdress] = useState(true)
//   const b2b = (restaurantinfo?.defaultLocation as any)?.b2btype;
//   const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
//   const searchdata = menuitem?.searchdata
//   const searchtext = menuitem?.searchtext
//   const { searchItem, handleChangeSearch, errorMessage, handleClickCancel, handleSubmitSearch } = useSearchData(searchtext)
//   const { filterCategory } = useUtility()
//   let pickupordelivery = selecteddelivery.pickupordelivery;
//   let menuItemsWithCat = filterCategory(searchtext !== "" ? searchdata?.menuItems : categoryItemsList, pickupordelivery);

//   useEffect(() => {
//     if (selecteddelivery?.pickupordelivery === null || Object.keys(selecteddelivery?.pickupordelivery).length === 0 || selecteddelivery?.pickupordelivery === '') {
//       dispatch(setpickupordelivery(restaurantinfo?.defaultLocation?.defaultordertype ? ORDER_TYPE.DELIVERY.text : ORDER_TYPE.PICKUP.text));
//     }
//   }, [])

//   useEffect(() => {
//     //if b2b restaurant
//     if (b2b || isSchoolProgramEnabled) {
//       dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));
//       if (order?.checktime === "") {
//         OrderServices.getOrderTime(restaurantinfo.restaurantId, restaurantinfo.defaultlocationId, '1').then((response: { ordertime: string }) => {
//           dispatch(isasap(true));
//           const time = response?.ordertime?.split(":")
//           const timeWithMeridian = `${time?.[0]}:${time?.[1]} ${time?.[2]}`
//           if (response) {
//             dispatch({
//               type: OrderTypes.CHECK_ORDER_TIME,
//               payload: timeWithMeridian
//             })
//             return;
//           }
//         })
//       }
//     }
//   }, [userinfo])

//   const loginButton = document.querySelector('.login-btn') as HTMLElement | null;
//   useEffect(() => {
//     if (b2b && userinfo === null) {
//       loginButton?.click()
//     }
//   }, [userinfo, loginButton])

//   const handleChangeAddress = () => {
//     setisloadAdress(false)
//   }

//   return (
//     <Layout handleChangeAddress={handleChangeAddress} page={"location"}>
//       <LoadLocationDirectComponent isLoadAddressChangeUrl={isloadAdress} >
//         {!errorMessage && <CategoryHeader />}
//       </LoadLocationDirectComponent>
//       <CategoryMenuItems menuItemsWithCat={menuItemsWithCat} errorMessage={errorMessage}>
//         <SearchBarComponent searchItem={searchItem} handleChangeSearch={handleChangeSearch} errorMessage={errorMessage} handleSubmitSearch={handleSubmitSearch} handleClickCancel={handleClickCancel} />
//       </CategoryMenuItems>
//       {/* {menuItemsWithCat?.length === 0 &&<h1></h1>} */}
//     </Layout>
//   )
// }

// export default Page


"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/nt/layout/footer/footer.component";

export default function LocationPage() {
  const router = useRouter();
  const params = useParams();

  // useEffect(() => {
  //   const theme = params?.dynamic;
  //   const location = params?.location;

  //   if (theme && location) {
  //     router.push(`/nt/${theme}/${location}`);
  //   }
  // }, []);

  return (
    <div>
      this is nt/fc/location page...
      <Footer />
    </div>
  );
}