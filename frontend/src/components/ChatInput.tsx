import React, { useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../utils/useSpeech';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');
  const { listening, startListening, stopListening, interimTranscript } = useSpeechRecognition((result) => {
    setInput(result);
    onSendMessage(result);
    setInput('');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        className={`rounded-lg w-12 h-12 flex items-center justify-center text-white transition-colors focus:outline-none ${listening ? 'bg-red-500' : 'bg-[#00A884] hover:bg-[#00916e]'}`}
        aria-label={listening ? 'Stop listening' : 'Start voice input'}
      >
        {listening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
      <div className="flex-1 flex flex-col">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening && interimTranscript ? interimTranscript : "Type or speak a message"}
          className="bg-[#2A3942] rounded-lg px-4 py-3 text-sm text-[#E9EDF0] placeholder-[#8696A0] focus:outline-none focus:ring-1 focus:ring-[#00A884] transition-all w-full"
        />
        {listening && interimTranscript && (
          <span className="text-xs text-[#00A884] mt-1 animate-pulse">{interimTranscript}</span>
        )}
      </div>
      <button
        type="submit"
        onClick={() => {
          const header = document.getElementById("header");
          if (header) {
            header.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        disabled={!input.trim()}
        className="bg-[#00A884] hover:bg-[#00916e] disabled:opacity-50 disabled:hover:bg-[#00A884] transition-colors rounded-lg w-12 h-12 flex items-center justify-center text-white"
      >
        <Send size={18} />
      </button>
      {listening && !interimTranscript && (
        <span className="ml-2 text-xs text-[#00A884] animate-pulse">Listening...</span>
      )}
    </form>
  );
}