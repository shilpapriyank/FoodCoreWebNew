import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";
import { fetchSeoMetadata } from "@/components/nt/common/seo-utils";
import { Metadata } from "next";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
  params: {
    dynamic: string;
    location: string;
  };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { dynamic: string; location: string };
// }) {
//   const { dynamic, location } = await params;
//   const pathname = `/nt/${dynamic}/${location}`;

//   const metaData = await fetchSeoMetadata(dynamic, location, pathname);
//   if (metaData) {
//     debugger
//     return {
//       title: metaData.title,
//       description: metaData.description,
//       openGraph: {
//         title: metaData.title,
//         description: metaData.description || "Online description",
//         url: metaData.url,
//         images: metaData.image,
//         //images: [{ url: metaData.image }],
//       },
//     };
//   } else {
//     return {
//       title: "Online Ordering || FC",
//       description: "Online description",
//     };
//   }

//   // return {
//   //   title: "My Food App | Home",
//   //   description: "Order your favorite food online from My Food App.",
//   //   keywords: ["food", "delivery", "online order", "restaurant"],
//   //   authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
//   //   openGraph: {
//   //     title: "My Food App",
//   //     description: "Best place to order food online.",
//   //     url: "https://yourdomain.com",
//   //     siteName: "My Food App",
//   //     images: [
//   //       {
//   //         url: "https://yourdomain.com/og-image.jpg",
//   //         width: 800,
//   //         height: 600,
//   //         alt: "My Food App Banner",
//   //       },
//   //     ],
//   //     locale: "en_US",
//   //     type: "website",
//   //   },
//   //   twitter: {
//   //     card: "summary_large_image",
//   //     title: "My Food App",
//   //     description: "Order food online with ease.",
//   //     creator: "@yourTwitterHandle",
//   //     images: ["https://yourdomain.com/twitter-image.jpg"],
//   //   },
//   // };
// }

const Layout: React.FC<LayoutProps> = ({
  children,
  handleChangeAddress,
  page,
}) => {
  return (
    <>
      <RestaurantComponent>{children}</RestaurantComponent>
    </>
  );
};

export default Layout;

// import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";
// import { Metadata } from "next";
// import React, { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   handleChangeAddress?: () => void;
//   page?: string;
// }

// export const metadata: Metadata = {
//   title: "My Food App | Home",
//   description: "Order your favorite food online from My Food App.",
//   keywords: ["food", "delivery", "online order", "restaurant"],
//   authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
//   openGraph: {
//     title: "My Food App",
//     description: "Best place to order food online.",
//     url: "https://yourdomain.com",
//     siteName: "My Food App",
//     images: [
//       {
//         url: "https://yourdomain.com/og-image.jpg",
//         width: 800,
//         height: 600,
//         alt: "My Food App Banner",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "My Food App",
//     description: "Order food online with ease.",
//     creator: "@yourTwitterHandle",
//     images: ["https://yourdomain.com/twitter-image.jpg"],
//   },
// };

// const Layout: React.FC<LayoutProps> = ({
//   children,
//   handleChangeAddress,
//   page,
// }) => {
//   return (
//     <>
//       <RestaurantComponent>{children}</RestaurantComponent>
//     </>
//   );
// };

// export default Layout;
