import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const FavouriteSkeleton = () => {

  const count = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="row w-100">
      {
        count.map((index: number) => {
          return <div className="col-12 col-md-6 col-lg-6 border  rounded py-2 mb-2 w-48 mx-1 ske-100" key={index}>
            <div className=" d-flex flex-row">
              <div className='w-75'><Skeleton className='w-100' height={70}></Skeleton>
                <Skeleton className='mt-2' height={70}></Skeleton>
              </div>
              <div className='w-25 px-2'>   <Skeleton className='' height={150}></Skeleton> </div>
            </div>
          </div>
        })}
    </div>
  )
};

export default FavouriteSkeleton;