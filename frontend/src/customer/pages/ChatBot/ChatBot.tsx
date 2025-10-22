

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { askProductQuestion } from "../../../Redux Toolkit/Customer/AiChatBotSlice";
import { Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import CloseIcon from '@mui/icons-material/Close';

interface ChatBotProps {
    handleClose: (e: any) => void;
    productId?: number;
}

const ChatBot = ({ handleClose, productId }: ChatBotProps) => {
    const dispatch = useAppDispatch();
    const [prompt, setPrompt] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { aiChatBot } = useAppSelector(store => store);

    const handleGivePrompt = (e: any) => {
        e.preventDefault();
        if (prompt.trim() === "" || aiChatBot.loading || !productId) return;

        dispatch(askProductQuestion({
            productId: String(productId),
            question: prompt
        }));

        setPrompt(""); 
    };

    const handlePromptChange = (e: any) => {
        setPrompt(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleGivePrompt(e);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [aiChatBot.messages]);

    return (
        <div className="rounded-lg">
            <div className="w-full lg:w-[40vw] h-[82vh] shadow-2xl bg-white z-50 rounded-lg flex flex-col">
                <div className="flex-shrink-0 h-[12%] flex justify-between items-center px-5 bg-slate-100 rounded-t-lg">
                    <div className="flex items-center gap-3 ">
                        <h1 className="logo text-lg font-bold">ShopSphere</h1>
                        <p>Assistant</p>
                    </div>
                    <div>
                        <IconButton onClick={handleClose} color="primary">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>

                <div className="flex-grow p-5 flex flex-col gap-3 py-5 px-5 overflow-y-auto custom-scrollbar">
                    <p className="text-gray-600 mb-4">
                        {productId ? `You can ask questions about this product.` : `Welcome! How can I help you?`}
                    </p>
                    {aiChatBot.messages.map((item: any, index: number) => (
                        <div key={index} className={item.role === "user" ? "flex justify-end" : "flex justify-start"}>
                            {item.role === "user" ? (
                                <PromptMessage message={item.message} index={index} />
                            ) : (
                                <ResponseMessage message={item.message} />
                            )}
                        </div>
                    ))}
                    {aiChatBot.loading && <div className="text-center text-gray-500">Thinking...</div>}
                    <div ref={chatContainerRef} />
                </div>

                <div className="flex-shrink-0 h-[10%] flex items-center">
                    <input
                        onChange={handlePromptChange}
                        onKeyPress={handleKeyPress}
                        value={prompt} // <-- FIX 2: Add this line to connect the input field to the state
                        type="text"
                        placeholder="Ask about this product..."
                        className="rounded-bl-lg pl-5 h-full w-full bg-slate-100 border-none outline-none"
                    />
                    <Button
                        sx={{ borderRadius: "0 0 0.5rem 0", height: '100%' }}
                        onClick={handleGivePrompt}
                        variant="contained"
                        disabled={aiChatBot.loading}
                    >
                        <SendIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;








