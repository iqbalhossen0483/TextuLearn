"use client";
import Button from "@/components/libs/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
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

  return (
    <nav
      className={`${
        sticky
          ? "bg-secondary container mx-auto rounded-2xl shadow top-2"
          : "bg-white"
      } sticky z-80`}
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
        <div className='flex items-center space-x-3'>
          <Button href='/login' variant='outline'>
            Login
          </Button>
          <Button href='/register' variant='contain'>
            Register
          </Button>
        </div>

        {/* Mobile Menu Button (Optional - for future enhancement) */}
        {/* <div className="md:hidden">
          <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
