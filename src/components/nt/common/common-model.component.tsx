import React, { ReactNode } from 'react';

export interface CommonModalProps {
    title: string;
    text?: string;
    keyName?: string;
    isbtn2?: boolean;
    isOpenModal: boolean;
    btn1Name?: string;
    btn2Name?: string;
    isDisplayCloseIcon?: boolean;
    isButton?: boolean;
    isChild?: boolean;
    children?: ReactNode;
    handleToggle?: (value: boolean, keyName?: string) => void;
    handleClickBtn1?: () => void;
    handleClickBtn2?: () => void;
}


const CommonModal: React.FC<CommonModalProps> = ({
    title,
    isbtn2,
    text,
    keyName,
    handleToggle,
    children,
    handleClickBtn1,
    handleClickBtn2,
    isOpenModal,
    btn1Name = 'OK',
    btn2Name = 'Cancel',
    isDisplayCloseIcon = true,
}) => {
    return (
         <>
            <div className={`modal modal-your-order choose-order fade ${isOpenModal ? 'show d-block' : ''}`} id="exampleModal-time_modified" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <h5 className="modal-title fs-5" id="staticBackdropLabel">{title}</h5>
                        {isDisplayCloseIcon && <button type="button" className="btn-close" onClick={() => handleToggle?.(false,keyName)} /> }
                        <form>
                            <div className="modal-body">
                                <div className="row">
                                   <div className="col-lg-12 text-center col-md-12 col-12">
                                   {text&&   <h2>{text}</h2>}
                                   {children&&children}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row justify-content-center w-100 ms-auto me-auto">
                                    {btn1Name && <div className="col-lg-6 text-center col-md-6 col-6">
                                        <a className="btn-default w-100" aria-label="Close" onClick={handleClickBtn1}>{btn1Name}</a>
                                    </div>}
                                    {isbtn2 && <div className="col-lg-6 text-center col-md-6 col-6">
                                        <a className="btn-default black w-100" aria-label="Close" onClick={handleClickBtn2}>{btn2Name}</a>
                                    </div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="modal-backdrop fade show"></div> */}
        </>
    );
};

export default CommonModal;
