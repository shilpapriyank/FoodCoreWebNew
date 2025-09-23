import React, { ReactNode } from "react";
import Header from "./header/header.component";
import Footer from "./footer/footer.component";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, handleChangeAddress, page }: LayoutProps) => {
  return (
    <>
      {/* <Header handleChangeAddress={handleChangeAddress} page={page} /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
