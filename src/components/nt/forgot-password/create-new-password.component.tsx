'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { MemoizedRegisterHeaderLogoComponent } from '../Header/registerheaderlogo.component';
import { GetThemeDetails } from '../../common/utility';
import { useParams } from 'next/navigation';
import { PAGES } from '../common/pages';
import { ToasterPositions } from '@/components/default/helpers/toaster/toaster-positions';
import { ToasterTypes } from '@/components/default/helpers/toaster/toaster-types';
import handleNotify from '@/components/default/helpers/toaster/toaster-notify';
import Loader from '@/components/default/Common/loader.component';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { CustomerServices } from '../../../../redux/customer/customer.services';
import { MemoizedHeaderLogoComponent } from '../Header/headerlogo.component';

const CreateNewPasswordForm: React.FC = () => {
    const { restaurantinfo } = useReduxData();
    const params = useParams();
    const dynamic = params?.dynamic as string;
    const id = params?.index as string;

    const [password, setPassword] = useState('');
    const [trypassword, setTrypassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype ?? 1);
    const requestUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${restaurantinfo?.restaurantURL}`;

    const {
        data,
        isSuccess,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['gettoken', restaurantinfo?.restaurantId],
        queryFn: () => CustomerServices.userResetPasswordValidToken(id, restaurantinfo!.restaurantId),
        enabled: !!id,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    const validEmailAddress = data?.result?.ValidEmailAddress;
    const phone = data?.result?.Phone ?? '';
    const phoneMasked = phone ? `(xxx) xxx-${phone.slice(-4)}` : '';

    const router = useRouter();
    if (isSuccess && !data?.result?.TokenIsValid) {
        router.push(`/${selectedTheme?.url}/${dynamic}/${PAGES.RESET_FAIL}`);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage(null);

        let hasError = false;
        if (!password) {
            setPasswordErrorMessage('Password must be required');
            hasError = true;
        }
        if (!trypassword) {
            setConfirmPasswordErrorMessage('Confirm password must be required');
            hasError = true;
        }
        if (password && trypassword && password !== trypassword) {
            setErrorMessage('Password and confirm password not matched');
            hasError = true;
        }

        if (hasError) return;

        await refetch();

        if (data?.result?.TokenIsValid && !isFetching) {
            const requestBody = {
                emailId: validEmailAddress,
                password,
                validtoken: id,
                confirmpassword: trypassword,
                restaurantId: restaurantinfo!.restaurantId,
                requestUrl,
                returnUrl: requestUrl,
            };

            CustomerServices.userResetPasswordRequest(requestBody).then((res: any) => {
                const response = JSON.parse(res.d);
                if (response?.result?.ChangeSuccessfully) {
                    handleNotify(response.PasswordMessage, ToasterPositions.TopRight, ToasterTypes.Success);
                    router.push(`/${selectedTheme?.url}/${dynamic}/${PAGES.PASS_SET}`);
                } else {
                    setSubmitting(false);
                    handleNotify(response.PasswordMessage, ToasterPositions.TopRight, ToasterTypes.Error);
                    setErrorMessage(response.PasswordMessage);
                }
            });
        } else {
            setSubmitting(false);
            handleNotify('Token is not valid, please request again', ToasterPositions.TopRight, ToasterTypes.Error);
            setErrorMessage('Token is not valid, please request again');
        }
    };

    if (!isSuccess) return <Loader />;

    return (
        <>
            <Head>
                <title>Create New Password || {restaurantinfo?.restaurantname}: Online Ordering</title>
                <meta name="description" content="Online description" />
            </Head>
            <section id="pickup" className="cre-password">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 left-a col-sm-4 col-xs-6">
                            <Link href={`/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}`} className="size_24 weight_500 color_grey">
                                {/* Back link */}
                            </Link>
                        </div>
                        <MemoizedRegisterHeaderLogoComponent />
                        
                        {/* <MemoizedHeaderLogoComponent
                            restaurantinfo={restaurantinfo}
                            isLeftMenu={false}
                            isDisplayBack={false}
                            isDisplayDeliveryOption={false}
                            isDisplayCart={false}
                            routePath={{ href: '', as: '' }}

                        /> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-12 tp-pickup flush col-sm-12 col-xs-12"></div>
                        <div className="col-lg-12 flush col-sm-12 col-xs-12">
                            <div className="col-lg-5 column-centered col-sm-8 col-xs-12">
                                <div className="col-lg-12 bg-s col-sm-12 col-xs-12">
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-xs-12">
                                            <h2>Create A New Password</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 register tttp flush column-centered col-sm-12 col-xs-12">
                                            <form className="customForm" noValidate onSubmit={handleSubmit}>
                                                <div className="col-lg-12 text-center col-sm-12 col-xs-12">
                                                    <input type="text" placeholder="Email" value={validEmailAddress ?? ''} disabled required />
                                                </div>
                                                <div className="col-lg-12 text-center col-sm-12 col-xs-12">
                                                    <input type="text" placeholder="Phone Number" value={phoneMasked} disabled required />
                                                </div>
                                                <div className="col-lg-12 text-center col-sm-12 col-xs-12">
                                                    <input
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => { setPassword(e.target.value); setPasswordErrorMessage(''); setErrorMessage(null); }}
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    <label className="formlabel">Choose a new Password</label>
                                                    {passwordErrorMessage && <span className="color_red">{passwordErrorMessage}</span>}
                                                </div>
                                                <div className="col-lg-12 text-center col-sm-12 col-xs-12">
                                                    <input
                                                        type="password"
                                                        placeholder="Re-enter password"
                                                        value={trypassword}
                                                        onChange={(e) => { setTrypassword(e.target.value); setConfirmPasswordErrorMessage(''); setErrorMessage(null); }}
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    <label className="formlabel">Confirm Password</label>
                                                    {confirmPasswordErrorMessage && <span className="color_red">{confirmPasswordErrorMessage}</span>}
                                                    {errorMessage && <span className="color_red">{errorMessage}</span>}
                                                </div>
                                                <div className="col-lg-12 text-center flush col-sm-12 col-xs-12">
                                                    <div className="col-lg-12 flush column-centered col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-sm-12 col-xs-12">
                                                            <button
                                                                className="blue_btn font_18px blue_btn_porder orange_submit"
                                                                type="submit"
                                                                disabled={submitting}
                                                            >
                                                                Continue
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateNewPasswordForm;
