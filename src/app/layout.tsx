import type { Metadata } from "next";
import "../../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { ReactNode } from "react";
import { RestaurantsServices } from "../../redux/restaurants/restaurants.services";
import { ThemeStyles } from "@/components/common/theme-styles";
import { ThemeScripts } from "@/components/common/theme-scripts";
import { GetThemeDetails } from "@/components/common/utility";
import ClientWrapper from "@/components/common/client-wrapper";
import ToastNotify from "@/components/nt/helpers/toastnotify/toast-notify.component";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import moment from "moment";
// const ClientProviders = dynamic(() => import('@/components/common/client-providers'), {
//   ssr: false,
// });
export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Restaurant ordering application",
};

// Helper function to serialize data for client components
function serializeRestaurantData(data: any) {
  if (!data) return null;

  // Only pass plain object properties that can be serialized
  return {
    themeType: data.themeType || "default",
    restaurantName: data.restaurantName || "",
    id: data.id || "",
    // Add other serializable properties you need
    // Avoid passing class instances, functions, or complex objects
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let restaurantData = null;
  let themeType = "default";

  try {
    // Fetch restaurant data on the server
    const rawData = await RestaurantsServices.getRestaurantThemeType("fc");
    // Serialize the data to ensure it can be passed to client components
    restaurantData = serializeRestaurantData(rawData);
    themeType = GetThemeDetails(rawData?.themetype)?.name || "default";
  } catch (error) {
    console.error("Failed to fetch restaurant data:", error);
    // Fallback to default theme
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Load theme-specific CSS */}
        <ThemeStyles themeType={themeType} />
      </head>
      <body>
        {/* Pass only serializable data to client components */}
        <ClientWrapper>
          <ToastNotify position={ToasterPositions.TopRight} />
          {children}
        </ClientWrapper>

        {/* Load theme-specific scripts */}
        <ThemeScripts themeType={themeType} />
      </body>
    </html>
  );
}
