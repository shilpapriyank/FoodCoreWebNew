import React from "react";

interface CustomAnchorTagProps {
    buttonText: string;
    buttonclass?: string;
    isDisable: boolean;
    buttonMethod: (param: any, e: React.MouseEvent<HTMLAnchorElement>) => void;
    buttonParam?: any;
    children?: React.ReactNode;
}

const CustomAnchorTag: React.FC<CustomAnchorTagProps> = ({
    buttonText,
    buttonclass,
    isDisable,
    buttonMethod,
    buttonParam,
    children,
}) => {
    return (
        <>
            {isDisable ?
                <a className={buttonclass}>{buttonText}
                    {children && children}
                </a>
                :
                <a onClick={(e) => buttonMethod(buttonParam, e)} className={buttonclass}>{buttonText} {children && children}</a>
            }
        </>
    );
};

export default React.memo(CustomAnchorTag);
