import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MenuItemSkeletonComponent = () => {
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
