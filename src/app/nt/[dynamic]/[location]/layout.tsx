import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";
import { Metadata } from "next";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}

export const metadata: Metadata = {
  title: "My Food App | Home",
  description: "Order your favorite food online from My Food App.",
  keywords: ["food", "delivery", "online order", "restaurant"],
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  openGraph: {
    title: "My Food App",
    description: "Best place to order food online.",
    url: "https://yourdomain.com",
    siteName: "My Food App",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "My Food App Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Food App",
    description: "Order food online with ease.",
    creator: "@yourTwitterHandle",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },
};

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
