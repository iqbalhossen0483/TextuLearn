"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageItem = ({ message, isLoading }) => {
  const { text, sender, id } = message;
  const isUser = sender === "user";

  return (
    <div
      className={`flex items-start space-x-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <Image
          className={isLoading === id ? "animate-pulse" : ""}
          height={30}
          width={30}
          src='/favicon.png'
          alt=''
        />
      )}
      <div
        className={`w-fit max-w-[90%] ${
          isUser
            ? "bg-primary text-white rounded-br-none shadow p-3 rounded-lg"
            : ""
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className='text-xl font-bold my-2' {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className='text-lg font-semibold my-1' {...props} />
            ),
            p: ({ node, ...props }) => <p className='mb-1' {...props} />,
            a: ({ node, ...props }) => (
              <a
                className='text-blue-500 hover:underline'
                target='_blank'
                rel='noopener noreferrer'
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul className='list-disc list-inside ml-5 mb-2' {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className='list-decimal list-inside ml-5 mb-2' {...props} />
            ),
            li: ({ node, ...props }) => <li className='mb-0.5' {...props} />,
            table: ({ node, ...props }) => (
              <table
                className='table-auto w-full border-collapse border border-gray-300 my-2'
                {...props}
              />
            ),
            th: ({ node, ...props }) => (
              <th
                className='border border-gray-300 px-2 py-1 bg-gray-100 font-semibold text-left'
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className='border border-gray-300 px-2 py-1' {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <pre className='bg-gray-800 text-white p-3 rounded-md overflow-x-auto my-2 text-xs'>
                  <code className={`language-${match[1]}`} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code
                  className='bg-gray-200 text-red-600 px-1 py-0.5 rounded text-xs'
                  {...props}
                >
                  {children}
                </code>
              );
            },
            blockquote: ({ node, ...props }) => (
              <blockquote
                className='border-l-4 border-gray-400 pl-4 italic my-2 text-gray-600'
                {...props}
              />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
      {isUser && (
        <FiUser className='h-8 w-8 text-white bg-primary p-1 rounded-full shadow' />
      )}
    </div>
  );
};

export default MessageItem;
