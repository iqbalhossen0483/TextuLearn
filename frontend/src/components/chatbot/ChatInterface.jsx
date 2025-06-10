"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import SessionHistoryPanel from "./SessionHistoryPanel";

const ChatInterface = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      text: inputValue,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");

    // Simulate bot response
    // TODO: Replace with actual API call to the backend chatbot service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const botResponse = {
      id: messages.length + 2,
      text: `Echo: ${newUserMessage.text}`, // Simple echo bot for now
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botResponse]);
  };

  return (
    <div className='flex h-screen bg-secondary relative'>
      {!showSideBar && (
        <button
          onClick={() => setShowSideBar(true)}
          className='absolute top-1 left-1 z-50'
        >
          <MdOutlineMenu className='size-6 text-primary' />
        </button>
      )}
      <SessionHistoryPanel open={showSideBar} setOpen={setShowSideBar} />
      <div
        className={`flex flex-col px-6 z-10 py-1 grow container mx-auto h-full overflow-auto relative ${
          !messages.length ? "justify-center items-center" : ""
        }`}
      >
        {messages.length ? (
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        ) : (
          <p className='text-2xl font-medium text-primary mb-4'>
            Let's talk to learn
          </p>
        )}

        <MessageInput
          extended={!messages.length}
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
