'use client'
import React from "react";

interface HeaderProps {
    handleChangeAddress?: () => void;
    page?: string;
}

const Header: React.FC<HeaderProps> = ({ handleChangeAddress, page }) => {
    return (
        <div>
            <p>This is Header component</p>
            {page && <p>Current page: {page}</p>}
            {handleChangeAddress && (
                <button onClick={handleChangeAddress}>Change Address</button>
            )}
        </div>
    );
};

export default Header;
