"use client";
import Button from "@/components/libs/Button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import MobileSidePanel from "./MobileSidePanel"; // Import the new component

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Books", path: "/books" },
  ];

  useEffect(() => {
    const handleSticky = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    document.addEventListener("scroll", handleSticky);

    return () => {
      document.removeEventListener("scroll", handleSticky);
    };
  }, []);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`${
          sticky
            ? "bg-secondary container mx-auto rounded-2xl shadow top-2"
            : "bg-white"
        } sticky z-30`}
      >
        <div className='container mx-auto px-6 py-1 flex justify-between items-center'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={100}
              height={100}
              className='h-13 w-32 object-contain'
            />
          </Link>

          {/* Menu Items */}
          <div className='hidden md:flex items-center space-x-6'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`transition-colors font-medium duration-200 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login/Register Buttons */}
          <div className='hidden md:flex items-center space-x-3'>
            <Button href='/login' variant='outline'>
              Login
            </Button>
            <Button href='/register' variant='contain'>
              Register
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              type='button'
              className='text-primary'
              onClick={openMobileMenu}
            >
              <MdOutlineMenu className='size-5' />
            </button>
          </div>
        </div>
      </nav>

      <MobileSidePanel isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};

export default NavBar;
