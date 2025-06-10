"use client";

import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import Button from "../libs/Button";

const SessionHistoryPanel = ({ open, setOpen }) => {
  // Placeholder data for session history
  const historySections = [
    {
      title: "Today",
      sessions: [
        { id: "t1", name: "Chat about Chapter 1" },
        { id: "t2", name: "Discussing character development" },
      ],
    },
    {
      title: "Yesterday",
      sessions: [{ id: "y1", name: "Questions on Theme A" }],
    },
    {
      title: "Previous History",
      sessions: [
        { id: "p1", name: "Initial thoughts on Book X" },
        { id: "p2", name: "Follow-up on plot points" },
      ],
    },
  ];

  return (
    <div
      className={`${
        open
          ? "w-64 absolute top-0 bottom-0 left-0 lg:static z-[80]"
          : "w-0 overflow-hidden "
      } transition-all duration-500 `}
    >
      <div
        className={
          open
            ? "flex flex-col bg-gray-50 p-4 border-r border-gray-200 h-full relative"
            : "hidden"
        }
      >
        <button
          onClick={() => setOpen(false)}
          className='absolute top-1 right-1'
        >
          <HiMenuAlt3 className='size-6 text-primary' />
        </button>
        <div className='mb-4'>
          <Link href='/' className='flex items-center mb-4'>
            <Image src='/logo.png' alt='Logo' width={130} height={80} />
          </Link>
          <Button
            onClick={() => console.log("New chat started")}
            className='w-full'
          >
            <FiPlus />
            <span>New Chat</span>
          </Button>
        </div>

        <div className='flex-grow overflow-y-auto'>
          {historySections.map((section) => (
            <div key={section.title} className='mb-6'>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>
                {section.title}
              </h3>
              <ul className='space-y-1'>
                {section.sessions.map((session) => (
                  <li key={session.id}>
                    <button
                      onClick={() =>
                        console.log(`Load session: ${session.name}`)
                      } // Corrected template literal
                      className='w-full text-left text-sm text-gray-700 hover:bg-secondary hover:text-primary-dark py-1 px-2 rounded-md transition-colors duration-150 truncate whitespace-nowrap overflow-hidden'
                    >
                      {session.name}
                    </button>
                  </li>
                ))}
                {section.sessions.length === 0 && (
                  <p className='text-xs text-gray-500 italic'>No chats yet.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionHistoryPanel;
