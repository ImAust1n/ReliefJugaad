import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        className="flex-1 bg-[#2A3942] rounded-lg px-4 py-3
          text-sm text-[#E9EDF0] placeholder-[#8696A0] 
          focus:outline-none focus:ring-1 focus:ring-[#00A884]
          transition-all"
      />
      <button
        type="submit"
        onClick={() => {
          const header = document.getElementById("header");
          if (header) {
            header.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        disabled={!input.trim()}
        className="bg-[#00A884] hover:bg-[#00916e] disabled:opacity-50 disabled:hover:bg-[#00A884]
          transition-colors rounded-lg w-12 h-12 flex items-center justify-center text-white"
      >
        <Send size={18} />
      </button>
    </form>
  );
}