"use client";
import Footer from "@/components/nt/layout/footer/footer.component";
import Header from "@/components/nt/layout/header/page";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  handleChangeAddress,
  page,
}) => {
  console.log("dynamic segment:", "test");
  return (
    <>
      <Header handleChangeAddress={handleChangeAddress} page={page} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
