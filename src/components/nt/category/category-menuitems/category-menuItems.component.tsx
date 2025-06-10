'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GridListButton from '@/components/common/gridlistbutton.component';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import CategorySidebar from '../category-sidebar/category-sidebar.component';

interface CategoryMenuItemsProps {
    children?: any;
}

const CategoryMenuItems: React.FC<CategoryMenuItemsProps> = ({ children }) => {
    const { categoryItemsList, restaurantinfo, defaultLocation, order, selecteddelivery, category, userinfo, maincategoryList, menuitem, cart, sessionid } = useReduxData();
    const [viewType, setViewType] = useState<'grid' | 'list'>(
        restaurantinfo?.defaultLocation?.displaylistview ? 'list' : 'grid'
    );

    const handleClickView = (type: 'grid' | 'list') => {
        setViewType(type);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-12">
                            {children}
                        </div>
                        <div className="col-lg-1 col-md-1 col-12 d-flex justify-content-end align-items-center">
                            <GridListButton
                                viewType={viewType}
                                handleClickView={handleClickView}
                                dynamicColor={restaurantinfo.color}
                            />
                        </div>
                    </div>
                    {/* <CategorySidebar /> */}
                </div>
            </div>
        </>
    );
};

export default CategoryMenuItems;
