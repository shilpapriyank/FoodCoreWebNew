"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

// Define the shape of serializable restaurant data
interface SerializableRestaurantData {
  themeType: string;
  restaurantName: string;
  id: string;
}

interface ClientProvidersProps {
  children: ReactNode;
  restaurantData?: SerializableRestaurantData | null;
}

// Create query client inside the component to avoid SSR issues
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function ClientProviders({
  children,
  restaurantData,
}: ClientProvidersProps) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Avoid rendering on server
  if (!hasMounted) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* You can use restaurantData here if needed for client-side logic */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
