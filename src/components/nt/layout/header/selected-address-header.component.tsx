// import React, { useMemo } from "react";
// import { ORDER_TYPE } from "../../../common/utility";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

// const SelectedAddressHeader = ({ handleToggleOrderTypeModal, b2b }: any) => {
//   const { selecteddelivery, restaurantinfo, deliveryaddress } = useReduxData();
//   const defaultLocation = restaurantinfo?.defaultLocation;
//   const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
//   const orderTypeName = selecteddelivery?.pickupordelivery;
//   const address =
//     orderTypeName === ORDER_TYPE.PICKUP.text ? defaultLocation : "";
//   const selecteddeliveryaddress = selecteddelivery.selecteddeliveryaddress;
//   let myDeliveryAddress = selecteddeliveryaddress ?? tempDeliveryAddress;

//   const DisplayselectedPickup = () => {
//     return (
//       <>
//         {orderTypeName === ORDER_TYPE.DELIVERY.text ? (
//           <>
//             {" "}
//             {myDeliveryAddress &&
//               `${
//                 myDeliveryAddress?.address1 && myDeliveryAddress?.address1
//               },  ${myDeliveryAddress?.city && myDeliveryAddress?.city}, ${
//                 myDeliveryAddress?.zipcode && myDeliveryAddress?.zipcode
//               }`}
//           </>
//         ) : (
//           <>
//             {" "}
//             {`${
//               restaurantinfo && restaurantinfo?.defaultLocation?.address1
//             },  ${
//               restaurantinfo && restaurantinfo?.defaultLocation?.cityname
//             }, ${restaurantinfo && restaurantinfo?.defaultLocation?.zipcode}`}
//           </>
//         )}
//       </>
//     );
//   };

//   return (
//     <a
//       className="takeout"
//       id="time-mdl"
//       onClick={() => handleToggleOrderTypeModal(true)}
//     >
//       <i className="fa arrow fa-angle-right" />
//       {!b2b && (
//         <>
//           {" "}
//           {orderTypeName === ORDER_TYPE.PICKUP.text ? (
//             <i className="fa icon fa-shopping-bag" />
//           ) : (
//             <i className="fa icon fa-car"></i>
//           )}
//         </>
//       )}
//       <div className="">
//         <h4>
//           {!b2b && (
//             <>
//               {!restaurantinfo?.isSchoolProgramEnabled
//                 ? selecteddelivery?.pickupordelivery
//                 : restaurantinfo?.defaultLocation?.locationName}
//               <br />
//             </>
//           )}{" "}
//           <span>{<DisplayselectedPickup />}</span>
//         </h4>
//       </div>
//     </a>
//   );
// };

// export default SelectedAddressHeader;
