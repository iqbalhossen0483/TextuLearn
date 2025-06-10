import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import Button from "../libs/Button";

const MobileSidePanel = ({ isOpen, onClose }) => {
  const pathname = usePathname();
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

        {/* Auth Links using Button component */}
        <div className='border-t border-divider p-4 space-y-2'>
          {authLinks.map((link) => (
            <Button
              key={link.name}
              href={link.path}
              variant={link.variant}
              onClick={onClose}
              className='w-full'
            >
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidePanel;
