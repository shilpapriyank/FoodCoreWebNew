// "use client";

// import React, { useEffect, useState } from "react";
// // import LoadLocationDirectComponent from "../../../../components/nt/common/loadlocation-direct.component";
// // import CategoryMenuItems from "../../../../components/nt/category/category-menuitems/category-menuItems.component";
// import { useRouter } from "next/navigation";
// import CategoryHeader from "../../../../components/nt/category/category-header/category-header";
// import SearchBarComponent from "../../../../components/nt/category/category-menuitems/search-bar.component";
// import useUtility from "../../../../components/customhooks/utility-hook";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
// import { useSearchData } from "@/components/customhooks/usesearchdata-hook";
// import { OrderTypes } from "../../../../../redux/order/order.type";
// import { isasap } from "../../../../../redux/order/order.slice";
// import { OrderServices } from "../../../../../redux/order/order.services";
// import { setpickupordelivery } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
// import { ORDER_TYPE } from "@/components/common/utility";
// import Layout from "@/components/nt/layout/layout.component";
// import LoadLocationDirectComponent from "@/components/nt/common/loadlocation-direct.component";
// import { useAppDispatch } from "../../../../../redux/hooks";

// const LocationPage = () => {
//   const {
//     selecteddelivery,
//     restaurantinfo,
//     menuitem,
//     categoryItemsList,
//     userinfo,
//     order,
//   } = useReduxData();
//   const [isloadAdress, setisloadAdress] = useState(true);
//   const b2b = restaurantinfo?.defaultLocation?.b2btype;
//   const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
//   const searchdata = menuitem?.searchdata;
//   const searchtext = menuitem?.searchtext;
//   const {
//     searchItem,
//     handleChangeSearch,
//     errorMessage,
//     handleClickCancel,
//     handleSubmitSearch,
//   } = useSearchData(searchtext);
//   const dispatch = useAppDispatch();
//   const { filterCategory } = useUtility();
//   let pickupordelivery = selecteddelivery.pickupordelivery;
//   let menuItemsWithCat = filterCategory(
//     searchtext !== "" ? searchdata?.menuItems : categoryItemsList,
//     pickupordelivery
//   );
//   useEffect(() => {
//     if (
//       selecteddelivery?.pickupordelivery === null ||
//       Object.keys(selecteddelivery?.pickupordelivery).length === 0 ||
//       selecteddelivery?.pickupordelivery === ""
//     ) {
//       dispatch(
//         setpickupordelivery(
//           restaurantinfo?.defaultLocation?.defaultordertype
//             ? ORDER_TYPE.DELIVERY.text
//             : ORDER_TYPE.PICKUP.text
//         )
//       );
//     }
//   }, []);

//   useEffect(() => {
//     //if b2b restaurant
//     if (b2b || isSchoolProgramEnabled) {
//       dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));
//       //   if (order?.checktime === "") {
//       //     OrderServices.getOrderTime(
//       //       restaurantinfo.restaurantId,
//       //       restaurantinfo.defaultlocationId,
//       //       1
//       //     ).then((response: any) => {
//       //       dispatch(isasap(true));
//       //       const time = response?.ordertime?.split(":");
//       //       const timeWithMeridian = `${time?.[0]}:${time?.[1]} ${time?.[2]}`;
//       //       if (response) {
//       //         dispatch({
//       //           type: OrderTypes.CHECK_ORDER_TIME,
//       //           payload: timeWithMeridian,
//       //         });
//       //         return;
//       //       }
//       //     });
//       //   }
//     }
//   }, [userinfo]);

//   const loginButton = document.querySelector(".login-btn");
//   //   useEffect(() => {
//   //     if (b2b && userinfo === null) {
//   //       loginButton?.click();
//   //     }
//   //   }, [userinfo, loginButton]);

//   const handleChangeAddress = () => {
//     setisloadAdress(false);
//   };

//   return (
//     <>
//       <Layout handleChangeAddress={handleChangeAddress} page={"location"}>
//         <CategoryHeader>

//         </CategoryHeader>
//         {/* <LoadLocationDirectComponent isLoadAddressChangeUrl={isloadAdress}>
//           {!errorMessage && <CategoryHeader />}

//         </LoadLocationDirectComponent> */}
//         {/* <CategoryMenuItems
//           menuItemsWithCat={menuItemsWithCat}
//           errorMessage={errorMessage}
//         >
//           <SearchBarComponent
//             searchItem={searchItem}
//             handleChangeSearch={handleChangeSearch}
//             errorMessage={errorMessage}
//             handleSubmitSearch={handleSubmitSearch}
//             handleClickCancel={handleClickCancel}
//           />
//         </CategoryMenuItems> */}
//         {/* {menuItemsWithCat?.length === 0 &&<h1></h1>} */}
//       </Layout>
//     </>
//   );
// };

// export default LocationPage;

"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/nt/layout/footer/footer.component";
import SearchBarComponent from "@/components/nt/category/category-menuitems/search-bar.component";
import { useSearchData } from "@/components/customhooks/usersearchdata-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

export default function LocationPage() {
  const { selecteddelivery, restaurantinfo, menuitem, categoryItemsList, userinfo, order } = useReduxData();
  const router = useRouter();
  const params = useParams();
  const searchtext = menuitem?.searchtext
  const { searchItem, handleChangeSearch, errorMessage, handleClickCancel, handleSubmitSearch } = useSearchData(searchtext)

  useEffect(() => {
    const theme = params?.dynamic;
    const location = params?.location;

    if (theme && location) {
      router.push(`/nt/${theme}/${location}`);
    }
  }, []);

  return (
    <section className="right-sticky">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-12">
            <SearchBarComponent searchItem={searchItem} handleChangeSearch={handleChangeSearch} errorMessage={errorMessage} handleSubmitSearch={handleSubmitSearch} handleClickCancel={handleClickCancel} />
          </div>
        </div>
      </div>
    </section>
  );
}
