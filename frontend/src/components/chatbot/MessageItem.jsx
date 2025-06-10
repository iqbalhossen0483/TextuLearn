"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";

const MessageItem = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === "user";

  return (
    <div
      className={`flex items-start space-x-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Image height={30} width={30} src='/favicon.png' alt='' />}
      <div
        className={`p-3 rounded-lg max-w-xs lg:max-w-md shadow ${
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >
        <p className='text-sm'>{text}</p>
      </div>
      {isUser && (
        <FiUser className='h-8 w-8 text-white bg-primary p-1 rounded-full shadow' />
      )}
    </div>
  );
};

export default MessageItem;
