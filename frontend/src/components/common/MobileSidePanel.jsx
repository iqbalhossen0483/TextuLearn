import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserGraduate } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Button from "../libs/Button";

const MobileSidePanel = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Chatbot", path: "/chatbot" },
  ];

  const authLinks = [
    { name: "Login", path: "/login", variant: "outline" },
    { name: "Register", path: "/register", variant: "contain" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-sm'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Side Panel */}
      <div className='relative flex w-full max-w-xs flex-col bg-white shadow-xl'>
        <div className='flex items-center justify-between p-4 border-b border-divider'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={100}
              height={100}
              className='h-10 w-32 object-contain'
            />
          </Link>
          <button
            type='button'
            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
            onClick={onClose}
          >
            <MdClose className='size-5' aria-hidden='true' />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className='flex-1 space-y-1 p-4'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={onClose}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                pathname === link.path
                  ? "text-white bg-primary-dark"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Links or User Info */}
        <div className='border-t border-divider p-4 space-y-2'>
          {user ? (
            // User is logged in
            <div className='flex flex-col items-center space-y-1'>
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt='User Profile'
                  width={64} // Larger size for mobile panel
                  height={64}
                  className='rounded-full h-16 w-16 object-cover'
                />
              ) : (
                <FaUserGraduate className='text-primary text-5xl border border-primary p-1 rounded-full' />
              )}
              {user.name && (
                <p className='text-lg font-semibold text-gray-800'>
                  {user.name}
                </p>
              )}
              {user.email && (
                <p className='text-sm text-gray-600'>{user.email}</p>
              )}
              {/* You might want to add a logout button here */}
            </div>
          ) : (
            // User is not logged in
            authLinks.map((link) => (
              <Button
                key={link.name}
                href={link.path}
                variant={link.variant}
                onClick={onClose}
                className='w-full'
              >
                {link.name}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidePanel;
