'use client'
import LoadRestaurant from "@/components/commonRestaurant/loadrestaurant.component";
import Footer from "@/components/nt/layout/footer/footer.component";
import Header from "@/components/nt/layout/page";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  handleChangeAddress?: () => void;
  page?: string;
}
import type { Metadata } from 'next'
 
// export const metadata: Metadata = {
//   title: 'My Blog',
//   description: '...',
// }

// const Layout: React.FC<LayoutProps> = ({
//   children,
//   handleChangeAddress,
//   page,
// }) => {
//   console.log("Dynamic segment:", "test");
const Layout: React.FC<LayoutProps> = ({ children, handleChangeAddress, page }) => {
    console.log("dynamic segment:", "test")
debugger
  return (
    <>
      <Header handleChangeAddress={handleChangeAddress} page={page} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

// import LoadRestaurant from "@/components/commonRestaurant/loadrestaurant.component";
// import Footer from "@/components/nt/layout/footer/footer.component";
// import Header from "@/components/nt/layout/page";
// import React, { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   page?: string;
// }

// export const metadata = {
//   title: 'My location',
//   description: '...',
// };

// const Layout = async ({ children, page }: LayoutProps) => {
//     console.log("dynamic segment:", "test")

//   return (
//     <>
//       {/* You can move Header to a client component if it uses interactivity */}
//       <Header page={page} />
//       {children}
//       <Footer />
//     </>
//   );
// };

// export default Layout;
