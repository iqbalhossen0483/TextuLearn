"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import SessionHistoryPanel from "./SessionHistoryPanel";

const ChatInterface = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    setIsLoading(true);
    const questionText = inputValue;
    setInputValue("");

    const newUserMessage = {
      id: crypto.randomUUID(),
      text: questionText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const botMessageId = crypto.randomUUID();
    const initialBotMessage = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, initialBotMessage]);

    const userId = user?.id;
    if (!userId) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "Error: User not authenticated.", isError: true }
            : msg
        )
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("question", questionText);
    formData.append("user_id", userId);
    formData.append("session_id", crypto.randomUUID());

    try {
      // Moved fetch logic directly into the component
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${apiBaseUrl}/agent/chatbot`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errorDetail = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorData.message || errorDetail;
        } catch (e) {
          errorDetail = response.statusText || errorDetail;
        }
        throw new Error(errorDetail);
      }

      if (!response.body) {
        throw new Error("Response body is null or undefined.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          if (chunk && chunk.trim()) {
            accumulatedText += chunk.replace("data: ", "");
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === botMessageId
                  ? { ...msg, text: accumulatedText }
                  : msg
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message or process stream:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: `Error: ${error.message || "Failed to connect"}`,
                isError: true,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
