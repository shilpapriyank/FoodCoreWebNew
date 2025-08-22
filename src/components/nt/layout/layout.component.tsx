import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}

const Layout = ({ children, handleChangeAddress, page }: LayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
