import React, { ReactNode } from "react";
import Header from "./header/header.component";
import Footer from "./footer/footer.component";
import CategoryHeader from "../category/category-header/category-header";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}

const Layout = ({ children, handleChangeAddress, page }: LayoutProps) => {
  return (
    <>
      {/* <Header handleChangeAddress={handleChangeAddress} page={page} /> */}
      {/* <CategoryHeader /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
