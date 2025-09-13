 "use client";

import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MenuItemSkeletonComponent : FC = () => {
  return (
    <>
      <div className="col-12 px-3">
        <Skeleton height={170} />
        <br></br>
      </div>
      <div className="row">
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
        <div className="col-6 px-4">
          <Skeleton height={50} className="mb-1" />
        </div>
      </div>
      {/* <div className="col-lg-5 col-md-5 col-12 ">
    <Skeleton  height={250}/>
</div> */}
      <div className="d-flex justify-content-between mt-3">
        <div className="w-25">
          <Skeleton height={70} />
        </div>
        <div className="w-25">
          <Skeleton height={70} />
        </div>
      </div>
    </>
  );
};

export default MenuItemSkeletonComponent;








// "use client";

// import React, { FC } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export const MenuItemSkeletonComponent: FC = () => {
//   const count = Array.from({ length: 12 }, (_, i) => i + 1);

//   return (
//     <div className="row eq_none_medium row-eq-height">
//       <div className="col-lg-3 cate col-sm-12 col-xs-12">
//         <div className="col-lg-12 col-sm-12 col-xs-12">
//           <h3 className="margin_top_20 margin_bottom_25">Categories:</h3>
//         </div>
//         <div className="col-lg-12 categories-ul b-right col-sm-12 col-xs-12">
//           <ul>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//             <li><Skeleton height={39} style={{ borderRadius: "20px " }} /></li>
//           </ul>
//         </div>
//       </div>
//       <CategoryItemSkeleton />
//     </div>
//   );
// };

// export const CategoryItemSkeleton: FC = () => {
//   const count = [1, 2, 3, 4, 5];

//   return (
//     <div className="col-lg-6 pull-right pizza-in col-sm-12 col-xs-12">
//       <div className="row" id='itemscroll' data-name="itemScrolldiv">
//         <div className="col-lg-12 col-sm-12 col-xs-12 small-text-center">
//           <h1><Skeleton height={50} style={{ borderRadius: "10px ", width: "70%" }} /></h1>
//         </div>
//       </div>
//       <div>
//         {
//           count.map((item) => (
//             <div className="row" key={item}>
//               <div className="col-lg-12 s-piza col-sm-12 col-xs-12">
//                 <div className="row">
//                   <div className="col-lg-4 flush-right text-center col-sm-4 col-xs-12">
//                     <a>
//                       <Skeleton
//                         height={130}
//                         style={{ borderRadius: "20px", width: "50%" }}
//                       />
//                     </a>
//                   </div>
//                   <div className="col-lg-8 col-sm-8 col-xs-12">
//                     <div className="itembox">
//                       <div className="tablerow">
//                         <div className="tablecell">
//                           <h3 className="color_black margin_bottom_10">
//                             <a>
//                               <Skeleton
//                                 height={24}
//                                 style={{ borderRadius: "20px", width: "60%" }}
//                               />
//                             </a>
//                           </h3>
//                           <p>
//                             <Skeleton
//                               height={20}
//                               style={{ borderRadius: "20px", width: "80%" }}
//                             />
//                           </p>
//                           <a>
//                             <span
//                               className="fa angle size_15 angle-round bg_greenn color_white fa-angle-right"
//                               style={{ backgroundColor: "red !important" }}
//                             />
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

