import React, { ReactNode } from 'react';

interface ButtonLoaderProps {
    textName: string;
    isLoader?: boolean;
    classname?: string;
    btnType?: 'button' | 'submit' | 'reset';
    isDisable?: boolean;
    handleClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({
    textName,
    isLoader = false,
    classname = '',
    btnType = 'button',
    isDisable = false,
    handleClick,
    children,
}) => {
    return (
        <>
            {!isDisable ?
                <>
                    <button type={btnType} className={"btn-default w-100"} disabled={isDisable} onClick={handleClick}>{children} {textName}</button>
                </>
                : <>
                    <button type={btnType} className={"btn-default w-100 greyColor pe-none"} disabled={isDisable} onClick={handleClick}>{children} {textName}&nbsp;&nbsp;
                        {isLoader && <><span className="spinner-border spinner-border-sm" aria-hidden="true" />
                            <span className="visually-hidden" role="status">Loading...</span>
                        </>}
                    </button>
                </>}
        </>
    );
};
