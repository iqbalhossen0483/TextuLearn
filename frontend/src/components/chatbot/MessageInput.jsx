"use client";

import { FiMic, FiSend } from "react-icons/fi";

const MessageInput = ({
  inputValue,
  onInputChange,
  onSendMessage,
  extended,
  isLoading,
}) => {
  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    console.log("Voice input activated");
  };

  return (
    <div
      className={`flex items-center shadow-2xl rounded-3xl w-full xl:w-4xl mx-auto bg-primary text-white ${
        extended ? "px-2 py-4" : "p-2 sticky bottom-0"
      }`}
    >
      <input
        type='text'
        value={inputValue}
        onChange={onInputChange}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !isLoading) {
            onSendMessage();
          }
        }}
        placeholder='Explore knowledge effortlessly...'
        className='grow p-3 bg-transparent focus:outline-none'
        disabled={isLoading}
      />
      <div className='flex items-center'>
        <button
          onClick={handleVoiceInput}
          className='p-2 rounded-full hover:bg-primary-dark transition-colors duration-150'
          aria-label='Voice input'
        >
          <FiMic className='h-5 w-5' />
        </button>
        <button
          onClick={onSendMessage}
          disabled={!inputValue.trim() || !isLoading}
          className='p-2  hover:bg-primary-dark rounded-full transition-colors duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed'
          aria-label='Send message'
        >
          <FiSend className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
