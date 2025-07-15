// MobileLeftMenuComponent.tsx
import React, { useState, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

// 👇 If you have a typed AppDispatch, import it and use the generic.
//    Otherwise you can omit <AppDispatch> for now.

import { useWindowDimensions } from '../../customhooks/usewindowdimension-hook';
import { useAppDispatch } from '../../../../redux/hooks';
import { leftMenuToggle } from '../../../../redux/restaurants/restaurants.slice';

const MobileLeftMenuComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
        setIsOpen(prev => {
            const next = !prev;
            dispatch(leftMenuToggle(next));
            return next;
        });
    };

    if (!isMobile) return null;

    return (
        <a id="menu-btn" onClick={handleClick}>
            <span />
            <span />
            <span />
        </a>
    );
};

export default MobileLeftMenuComponent;
