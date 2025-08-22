"use client";

import dynamic from "next/dynamic";
import React, { FC, ReactNode, useEffect, useState } from "react";

const ClientProviders = dynamic(
  () => import("@/components/common/client-providers"),
  {
    ssr: false,
  }
);
const ClientWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Avoid rendering on server
  if (!hasMounted) return null;
  return (
    <>
      <ClientProviders>{children}</ClientProviders>
    </>
  );
};

export default ClientWrapper;
