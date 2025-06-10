"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Button from "../libs/Button";

const AccountPopover = ({ user, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Settings",
      path: user?.id ? `/user/${user.id}` : "/login",
      icon: (
        <IoSettings
          className='mr-2 size-4 text-primary-dark'
          aria-hidden='true'
        />
      ),
    },
    {
      name: "Join FB group",
      path: "https://www.facebook.com", // Full URL
      icon: (
        <FaFacebook className='mr-2 size-4 text-blue-700' aria-hidden='true' />
      ),
      external: true,
    },
    {
      name: "Follow FB page",
      path: "https://www.facebook.com", // Full URL
      icon: (
        <FaFacebook className='mr-2 size-4 text-blue-700' aria-hidden='true' />
      ),
      external: true,
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className='absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-divider z-40'>
      <div className='py-1'>
        <div className='px-4 py-3'>
          {user.name && (
            <p className='text-sm font-semibold text-gray-900'>{user.name}</p>
          )}
          <p className='truncate text-sm text-gray-500'>{user.email}</p>
        </div>
        <hr className='border-gray-200' />
        <div className='py-1'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClose}
              className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        <hr className='border-gray-200' />
        <div className='px-4 py-2'>
          <Button variant='danger' onClick={logout} className='w-full text-sm'>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountPopover;
