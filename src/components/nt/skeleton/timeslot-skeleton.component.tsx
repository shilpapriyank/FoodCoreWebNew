import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TimeSlotSkeletonComponent: React.FC = () => {
    const arr: number[] = [1, 2, 3, 4, 5];

    return (
        <>
            {
                arr.map((item, index) => {
                    return <div className="col-12 p-2 shadow-small border-bottom border-light border-5 w-100" key={index}>
                        <Skeleton height={45}></Skeleton>
                    </div>
                })
            }
        </>
    );
};

export default TimeSlotSkeletonComponent;
