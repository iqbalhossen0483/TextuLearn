"use client";

import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { usePathname } from "next/navigation";

const PageShell = ({ children }) => {
  const pathname = usePathname();
  const showNavBar = pathname !== "/chatbot";
  const showFooter = pathname !== "/chatbot";

  return (
    <>
      {showNavBar && <NavBar />}
      <main className='flex-grow'>{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

export default PageShell;
