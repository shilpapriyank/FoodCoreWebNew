require('dotenv').config()
// const headers = require('./headers');
const withImages = require('next-images')
module.exports = {
  compress: false,
  // reactStrictMode: true,
 
  env: {
    MYLOCAL_VAR1: 'nilesh',
    MYLOCAL_VAR2: process.env.MYLOCAL_VAR2,
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputStandalone: true,
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
 
  images: {
    // domains is an array of comma-separated strings
    domains: ['foodcore-web.azurewebsites.net', 'localhost', 'sqlvaq3d2b3xfm24ce.blob.core.windows.net',
      'foodcoredev.blob.core.windows.net', 'foodcoreprodstorage.blob.core.windows.net', 'dev.foodcore.tech'],
    loader: "default",
    // the sizes define below are the defaults
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // This is 60 seconds
    minimumCacheTTL: 60
  },
 
  async redirects() {
    return [{
      source: '/',
      destination: '/home',
      permanent: true,
    },]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // {
          //   key: 'X-DNS-Prefetch-Control',
          //   value: 'on',
          // },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(),battery=(), geolocation=(), microphone=()', // allow specified policies here
 
          },
        ]
      },
    ];
  },
  //basePath:'/home'
}
 
 
 
 
 
 
 
 





// require('dotenv').config()
// // const headers = require('./headers');
// const withImages = require('next-images')
// module.exports = {
//   compress: false,
//   // reactStrictMode: true,
 
//   env: {
//     MYLOCAL_VAR1: 'nilesh',
//     MYLOCAL_VAR2: process.env.MYLOCAL_VAR2,
//     NEXT_API_URL: process.env.NEXT_API_URL,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   experimental: {
//     outputStandalone: true,
//   },
//   i18n: {
//     locales: ['en', 'fr'],
//     defaultLocale: 'en',
//   },
 
//   images: {
//     // domains is an array of comma-separated strings
//     domains: ['foodcore-web.azurewebsites.net', 'localhost', 'sqlvaq3d2b3xfm24ce.blob.core.windows.net',
//       'foodcoredev.blob.core.windows.net', 'foodcoreprodstorage.blob.core.windows.net', 'dev.foodcore.tech'],
//     loader: "default",
//     // the sizes define below are the defaults
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     // This is 60 seconds
//     minimumCacheTTL: 60
//   },
 
//   async redirects() {
//     return [{
//       source: '/',
//       destination: '/home',
//       permanent: true,
//     },]
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           // {
//           //   key: 'X-DNS-Prefetch-Control',
//           //   value: 'on',
//           // },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=63072000; includeSubDomains; preload',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'same-origin',
//           },
//           {
//             key: 'Permissions-Policy',
//             value: 'camera=(),battery=(), geolocation=(), microphone=()', // allow specified policies here
 
//           },
//         ]
//       },
//     ];
//   },
//   //basePath:'/home'
// }






