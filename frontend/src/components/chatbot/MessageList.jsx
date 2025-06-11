"use client";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, messagesEndRef, isLoading }) => {
  return (
    <div className='grow space-y-4'>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} isLoading={isLoading} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
