import React, { useEffect, useRef } from "react";
import { Bot, Send, X } from "lucide-react";
import { useUtilsStore } from "../../store/useUtilsStore";

export const ChatbotBox = ({ onClose }) => {
  const { input, setInput, clearChat, sentMessage, chatMessage } =
    useUtilsStore();
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    // Send request to backend and update bot response
    await sentMessage(input);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [input, chatMessage]);

  return (
    <div className="fixed z-100 bottom-5 right-5 w-80 h-96 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <div className="flex justify-between items-center border-b border-base-content/10 p-1">
        <div className="flex justify-center items-center gap-2">
          <span className="bg-accent-color text-white p-1 rounded-full flex justify-center items-center">
            <Bot className="size-5" />
          </span>
          <h2 className="text-sm font-semibold">Cimso AI</h2>
        </div>
        <button
          onClick={() => {
            onClose();
            clearChat();
          }}
          className="text-gray-500 hover:text-gray-800 cursor-pointer hover:bg-primary-color transition-colors duration-200 rounded-full p-1"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="h-[80%] overflow-y-auto">
        {chatMessage.length === 0 ? (
          <div className=" h-full w-full flex  justify-center items-center">
            <div className="bg-accent-color/90 p-2 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-xs text-primary-color">Hi 👋</p>
              <p className="text-xs text-primary-color">
                Let's me know if you need something.
              </p>
            </div>
          </div>
        ) : (
          chatMessage.map((chat, index) => (
            <div
              className={`chat ${
                chat.role === "user" ? "chat-end" : "chat-start"
              }`}
              key={index}
              ref={messagesEndRef}
            >
              {chat.parts.map((part) => (
                <div
                  className="chat-bubble text-xs font-semibold bg-accent-color text-primary-color"
                  key={part.text}
                >
                  {part.text}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="mt-2 flex justify-between items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="input input-sm input-bordered focus:outline-none focus:ring-0"
          value={input || ""}
          name="input"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
              setInput("");
            }
          }}
        />
        <span
          className={`${
            input && "bg-accent-color text-white"
          }  border border-base-content/30 text-base-content/30  p-2 rounded-lg flex justify-center items-center cursor-pointer`}
          onClick={() => {
            handleSendMessage();
            setInput("");
          }}
        >
          <Send className="size-4" />
        </span>
      </div>
    </div>
  );
};
