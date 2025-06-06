// // app/layout.tsx
// 'use client';

// import React, { ReactNode, useEffect, useState } from 'react';
// import Head from 'next/head';
// import Script from 'next/script';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Provider } from 'react-redux';
// //import { ErrorBoundary } from 'react-error-boundary';
// // import ToastNotify from '@/components/default/toastnotify/toast-notify.component';
// // import Restaurant from '@/components/default/Common/restaurant.component';
// //import ErrorFallbackComponent from '@/components/dominos/error/errorpage.component';
// import { ThemeObj, ThemeTypeObj } from '@/components/common/utility';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { store } from '../../redux/store';
// import en from '../../lang/en.json';
// import fr from '../../lang/fr.json';
// import { IntlProvider } from 'react-intl';
// import Restaurant from '@/components/default/Common/restaurant.component';

// const queryClient = new QueryClient();
// const messages = { en, fr };

// const clairtyCode = `(function (c,l,a,r,i,t,y){
//   c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//   t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
//   y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
// })(typeof window !== "undefined" && window, document, "clarity", "script", "j23ksjohu1");`;

// const GMT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-PFD3CZ8D');`;

// function LoadScriptsByTheme(themeType: string) {
//   switch (themeType) {
//     case ThemeObj.default:
//       return (
//         <>
//           <Script src="/defaulttheme/js/moment-2.10.3.js" async />
//           <Script src="/defaulttheme/js/jquery-3.6.2.js" strategy="afterInteractive" />
//           <Script src="/defaulttheme/js/bootstrap.min.js" crossOrigin="anonymous" strategy="lazyOnload" defer />
//         </>
//       );
//     case ThemeObj.newtheme:
//       return (
//         <>
//           <Script src="/nt/js/jquery.min.js" />
//           <Script src="/dominos/js/moment-2.10.3.js" async />
//           <Script src="/nt/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
//           <Script src="/nt/js/custom.js" />
//         </>
//       );
//     case ThemeObj.dominos:
//       return (
//         <>
//           <Script src="/dominos/js/jquery.min.js" />
//           <Script src="/dominos/js/moment-2.10.3.js" async />
//           <Script src="/dominos/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
//           <Script src="/dominos/js/wow.min.js" strategy="afterInteractive" />
//         </>
//       );
//     case ThemeObj.tableorder:
//       return (
//         <>
//           <Script src="/to/js/jquery.min.js" strategy="afterInteractive" />
//           <Script src="/to/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
//           <Script src="/to/js/wow.min.js" strategy="afterInteractive" />
//           <Script src="/to/js/fontawesome.min.js" strategy="afterInteractive" />
//           <Script src="/to/js/custom.js" strategy="afterInteractive" />
//         </>
//       );
//     case ThemeObj.FD123456:
//       return (
//         <>
//           <Script src="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
//         </>
//       );
//     default:
//       return null;
//   }
// }

// export default function RootLayout({ children }: { children: ReactNode }) {
//   const { restaurantinfo } = useReduxData();
//   const [themeType, setThemeType] = useState<string>(ThemeObj.default);

//   useEffect(() => {
//     const selectedThemeObj = ThemeTypeObj.find(item => item.value === restaurantinfo?.themetype);
//     if (window?.location?.pathname.includes(ThemeObj.FD123456)) {
//       setThemeType(ThemeObj.FD123456);
//     } else {
//       setThemeType(selectedThemeObj?.name || ThemeObj.default);
//     }
//   }, [restaurantinfo]);

//   useEffect(() => {
//     if (themeType !== ThemeObj.default && themeType !== ThemeObj.FD123456) {
//       setTimeout(() => {
//         const src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.43/js/bootstrap-datetimepicker.min.js';
//         const script = document.createElement('script');
//         script.src = src;
//         script.async = true;
//         document.head.appendChild(script);
//       }, 1000);
//     }
//   }, [themeType]);

//   const locale = 'en'; // optionally read from cookie or route

//   return (
//     <html lang={locale}>
//       <head>
//         {process.env.NEXT_PUBLIC_ENV === 'production' && (
//           <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: GMT }} />
//         )}
//       </head>
//       <body>
//         <Provider store={store}>
//           <QueryClientProvider client={queryClient}>
//             {LoadScriptsByTheme(themeType)}
//             <div id="portal" />
//             <div id="bottom-bash" />
//             <Restaurant metaDataRestaurant={null} themetype="theme">
//               {/* <ErrorBoundary FallbackComponent={ErrorFallbackComponent}> */}
//               {/* <IntlProvider locale={locale} messages={messages[locale]}> */}
//               {children}
//               {/* </IntlProvider> */}
//               {/* <ToastNotify position="bottom-right" /> */}
//               {/* </ErrorBoundary> */}
//             </Restaurant>
//             <ReactQueryDevtools initialIsOpen={false} position="bottom" />
//           </QueryClientProvider>
//         </Provider>
//         {process.env.NEXT_PUBLIC_ENV === 'production' && (
//           <noscript>
//             <iframe
//               src="https://www.googletagmanager.com/ns.html?id=GTM-PFD3CZ8D"
//               height={0}
//               width={0}
//               style={{ display: 'none', visibility: 'hidden' }}
//             />
//           </noscript>
//         )}
//       </body>
//     </html>
//   );
// }

// this conditionaly script
"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "next/app";
import type { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";
//import ToastNotify from '';
import { getCookie, setCookie } from "cookies-next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cache, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
// import en from "./lang/en.json";
// import fr from "./lang/fr.json";
import { IntlProvider } from "react-intl";
import { usePathname } from "next/navigation";
// import { ThemeObj } from "../components/default/common/dominos/helpers/utility";
import { store } from "../../redux/store";
import { RestaurantsServices } from "../../redux/restaurants/restaurants.services";

const clairtyCode = `(function (c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(typeof window !== "undefined" && window, document, "clarity", "script", "j23ksjohu1");`;

const GMT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFD3CZ8D');`;

const queryClient = new QueryClient();

function LoadDefaultScript() {
  return (
    <>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js" ></Script> */}
      <Script src="/defaulttheme/js/moment-2.10.3.js" async></Script>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.2/jquery.min.js" strategy="afterInteractive" ></Script> */}
      <Script
        src="/defaulttheme/js/jquery-3.6.2.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/defaulttheme/js/bootstrap.min.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        defer
      />
    </>
  );
}
function LoadNewThemeScript() {
  return (
    <>
      {/* jQuery */}
      <Script src="/nt/js/jquery.min.js" strategy="beforeInteractive" />

      {/* Moment.js */}
      <Script src="/dominos/js/moment-2.10.3.js" strategy="beforeInteractive" />

      {/* Bootstrap Bundle (includes Popper) */}
      <Script
        src="/nt/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />

      {/* Custom JS */}
      <Script src="/nt/js/custom.js" strategy="afterInteractive" />
    </>
  );
}
function LoadDominosScript() {
  return (
    <>
      {/* <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" strategy="afterInteractive" defer></Script> */}
      <Script src="/dominos/js/jquery.min.js"></Script>
      <Script src="/dominos/js/moment-2.10.3.js" async></Script>
      <Script
        src="/dominos/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script src="/dominos/js/wow.min.js" strategy="afterInteractive"></Script>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js" ></Script> */}

      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.43/js/bootstrap-datetimepicker.min.js" crossOrigin='anonymous' defer
      ></Script> */}
      {/* <Script strategy="afterInteractive" src="https://cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/src/js/bootstrap-datetimepicker.js" defer></Script> */}
    </>
  );
}
function LoadFD123456Script() {
  return (
    <>
      {/* <Script src="/dominos/js/jquery.min.js" ></Script> */}
      {/* <Script src="/fd123456/js/bootstrap.bundle.min.js" strategy="afterInteractive"></Script> */}
      <Script
        src="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      ></Script>
    </>
  );
}
function LoadTableOrderScript() {
  return (
    <>
      <Script src="/to/js/jquery.min.js" strategy="afterInteractive"></Script>
      <Script
        src="/to/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script src="/to/js/wow.min.js" strategy="afterInteractive"></Script>
      {/* <Script src="/to/js/owl.carousel.min.js" strategy="afterInteractive" ></Script> */}
      <Script
        src="/to/js/fontawesome.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script src="/to/js/custom.js" strategy="afterInteractive"></Script>
    </>
  );
}
export const getCachedRestaurantData = cache(async (slug: string) => {
  return RestaurantsServices.getRestaurantThemeType(slug);
});
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>
          <QueryClientProvider client={queryClient}>
            {/* <Provider store={store()}>
          <PersistGate persistor={persistor}> */}
            <Head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>My App</title>

              {/* Add your CSS here */}
              {/* {themeType === "default" && */}
              <>
                {/* <meta httpEquiv='Content-Security-policy' content="style-src 'self' maxcdn.bootstrapcdn.com  cdnjs.cloudflare.com 'unsafe-inline' ;script-src 'self' maxcdn.bootstrapcdn.com cdnjs.cloudflare.com maps.googleapis.com cdn.firebase.com *.firebaseio.com js.stripe.com 'unsafe-eval';img-src 'self' sqlvaq3d2b3xfm24ce.blob.core.windows.net fudmeprodstorage.blob.core.windows.net data: https: 'unsafe-inline' ; "></meta> */}
                <link
                  rel="stylesheet"
                  href="/defaulttheme/css/bootstrap.min.css"
                  crossOrigin="anonymous"
                ></link>
                <link
                  href="/defaulttheme/css/jquery.bxslider.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                  rel="stylesheet"
                />
                {/* <link href="/defaulttheme/css/fontawesome.css" rel="stylesheet" /> */}
                <link href="/defaulttheme/css/style.css" rel="stylesheet" />
                <link href="/defaulttheme/css/fonts.css" rel="stylesheet" />
                <link href="/defaulttheme/css/colors.css" rel="stylesheet" />
                <link
                  href="/defaulttheme/css/responsive.css"
                  rel="stylesheet"
                />
                <link href="/defaulttheme/css/zoomImage.css" rel="stylesheet" />
              </>
              {/* } */}
              {/* {themeType === ThemeObj.newtheme && */}
              <>
                <link rel="stylesheet" href="/nt/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/nt/css/owl.carousel.min.css" />
                <link
                  rel="stylesheet"
                  href="/nt/css/owl.theme.default.min.css"
                />
                <link rel="stylesheet" href="/nt/css/font-awesome.css" />
                <link rel="stylesheet" href="/nt/css/colors.css" />
                <link rel="stylesheet" href="/nt/css/font.css" />
                <link rel="stylesheet" href="/nt/css/generic.css" />
                <link rel="stylesheet" href="/nt/css/responsive.css" />
                <link rel="stylesheet" href="/nt/css/custom.css" />
                <link rel="stylesheet" href="/nt/css/zoomImage.css" />
              </>
              {/* } */}
              {/* {themeType === ThemeObj.FD123456 && */}
              <>
                <link
                  href="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/css/bootstrap.min.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  href="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/css/style.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                ></link>
                {/*<link href="/fd123456/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
              <link href="/fd123456/css/style.css" rel="stylesheet" type="text/css" /> */}
              </>
              {/* } */}
              {/* {themeType === ThemeObj.dominos && */}
              <>
                <link
                  href="/dominos/css/bootstrap.min.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="/dominos/css/animate.min.css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                {/* <link rel="stylesheet" type="text/css" href="/dominos/css/fontawesome.min.css" /> */}
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="/dominos/css/owl.carousel.min.css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="/dominos/css/owl.theme.default.min.css"
                />
                <link
                  href="/dominos/css/custom.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  href="/dominos/css/style.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  href="/dominos/css/responsive.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link href="/dominos/css/zoomImage.css" rel="stylesheet" />
              </>
              {/* } */}
              {/* { themeType === ThemeObj.tableorder &&  */}
              <>
                <link
                  rel="stylesheet"
                  href="/to/css/bootstrap.min.css"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="/to/css/font-awesome.css"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="/to/css/fonts.css"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="/to/css/colors.css"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="/to/css/generic.css"
                  type="text/css"
                />
                <link
                  href="/to/css/custom.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  rel="stylesheet"
                  href="/to/css/responsive.css"
                  type="text/css"
                />
                {/* <link rel="stylesheet" href="/to/css/owl.carousel.min.css"></link> */}
              </>
              {/* } */}
            </Head>

            {/* Provide redux store to your app */}
            <Provider store={store}>{children}</Provider>
            <LoadNewThemeScript />
          </QueryClientProvider>
        </>
      </body>
    </html>
  );
}
