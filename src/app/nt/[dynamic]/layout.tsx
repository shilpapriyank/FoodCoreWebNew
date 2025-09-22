import Footer from "@/components/nt/layout/footer/footer.component";
import Header from "@/components/nt/layout/header/header.component";
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
  return (
    <>
      <Header handleChangeAddress={handleChangeAddress} page={page} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
