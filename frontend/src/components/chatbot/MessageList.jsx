"use client";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className='grow space-y-4'>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
