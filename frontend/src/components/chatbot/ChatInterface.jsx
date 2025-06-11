"use client";

import { useEffect, useRef, useState } from "react";
import { CiRedo } from "react-icons/ci";
import { MdOutlineMenu } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import SessionHistoryPanel from "./SessionHistoryPanel";

const ChatInterface = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isLoading, setIsLoading] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (input, save = true) => {
    if ((inputValue.trim() === "" && !input) || isLoading) return;
    const botMessageId = crypto.randomUUID();
    setIsLoading(botMessageId);

    const questionText = inputValue || input;
    setInputValue("");

    if (save) {
      const newUserMessage = {
        id: crypto.randomUUID(),
        text: questionText,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    }

    const initialBotMessage = {
      id: botMessageId,
      text: "",
      sender: "assistant",
    };
    setMessages((prevMessages) => [...prevMessages, initialBotMessage]);

    const userId = user?.id;
    if (!userId) {
      throw { message: "Error: User not authenticated" };
    }

    const formData = new FormData();
    formData.append("question", questionText);
    formData.append("user_id", userId);
    formData.append("session_id", sessionId);
    formData.append("save", save);

    try {
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
        let errorData = "";
        try {
          res = await response.json();
          errorData = res.message;
        } catch (e) {}
        throw { message: errorData || "Something was wrong, Try again" };
      }

      if (!response.body) {
        throw { message: "Response body is null or undefined." };
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
            if (chunk.startsWith("error: ")) {
              setError(chunk.trim());
            } else if (chunk.startsWith("json:")) {
              const data = chunk.replace("json:", "").trim();
              try {
                const jsonData = JSON.parse(data);
                setSessionId(jsonData?.session_id);
              } catch (error) {
                console.log(error);
              }
            } else {
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
      }
    } catch (error) {
      console.log("Failed to send message or process stream:", error);
      setError(error.message || "Something was wrong, Try again");
    } finally {
      setIsLoading("");
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
        className={`flex flex-col px-6 z-10 py-2 grow container mx-auto h-full overflow-auto relative ${
          !messages.length ? "justify-center items-center" : ""
        }`}
      >
        {messages.length ? (
          <MessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <p className='text-2xl font-medium text-primary mb-4'>
            Let's talk to learn
          </p>
        )}

        {error && (
          <button
            onClick={() => handleSendMessage("retry", false)}
            className='text-red-600 font-medium flex items-center gap-1'
          >
            <span>{error}</span> <CiRedo className='text-xl font-medium' />
          </button>
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
