"use client";
import Button from "@/components/libs/Button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import AccountPopover from "./AccountPopover"; // Import AccountPopover
import MobileSidePanel from "./MobileSidePanel";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false); // State for popover
  const popoverRef = useRef(null); // Ref for popover
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

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsAccountPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleAccountPopover = () => setIsAccountPopoverOpen((prev) => !prev);
  const closeAccountPopover = () => setIsAccountPopoverOpen(false);

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

          {/* Login/Register Buttons or User Profile */}
          <div className='hidden md:flex items-center space-x-3'>
            {user ? (
              // User is logged in
              <div className='relative' ref={popoverRef}>
                {" "}
                {/* Added relative positioning and ref */}
                <button
                  onClick={toggleAccountPopover}
                  className='flex items-center focus:outline-none'
                >
                  {user.profileImage ? ( // Corrected to user.profileImage as per previous logic
                    <Image
                      src={user.profileImage}
                      alt='User Profile'
                      width={40}
                      height={40}
                      className='rounded-full h-10 w-10 object-cover'
                    />
                  ) : (
                    <FaUserGraduate className='text-primary text-3xl border border-primary rounded-full p-1' />
                  )}
                </button>
                {isAccountPopoverOpen && (
                  <AccountPopover user={user} onClose={closeAccountPopover} />
                )}
              </div>
            ) : (
              // User is not logged in
              <>
                <Button href='/login' variant='outline'>
                  Login
                </Button>
                <Button href='/register' variant='contain'>
                  Register
                </Button>
              </>
            )}
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
