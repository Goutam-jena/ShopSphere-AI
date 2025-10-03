// src/customer/pages/ChatBot/HomeChatBot.tsx

import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { chatBot } from "../../../Redux Toolkit/Customer/AiChatBotSlice";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import styles from "./ChatBot.module.css"; // We can reuse the same styles
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

// This component is ONLY for general chat on the home page and other non-product pages.
const HomeChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const { messages, loading, error } = useAppSelector((store) => store.aiChatBot);
  const { user } = useAppSelector((store) => store.user);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (input.trim() === "" || loading) return;

    // This component ONLY dispatches the general 'chatBot' action
    dispatch(chatBot({
      prompt: { message: input },
      productId: null,
      userId: user?._id || null,
    }));
    setInput("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className={styles.chatIcon}>
        <ChatIcon />
      </button>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>AI Assistant</h3>
        <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.chatHistory}>
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <PromptMessage key={index} index={index} message={msg.message} />
          ) : (
            <ResponseMessage key={index} message={msg.message} />
          )
        )}
        {loading && <ResponseMessage message={"..."} />}
        {error && <ResponseMessage message={`Error: ${error}`} />}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something..."
          className={styles.chatInput}
          disabled={loading}
        />
        <button onClick={handleSendMessage} className={styles.sendButton} disabled={loading}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeChatBot;





















