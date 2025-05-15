import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  // Simple SpeechRecognition logic, like user's snippet
  const handleMicClick = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      setListening(false);
      // Optionally auto-send:
      // onSendMessage(speechToText);
    };
    recognition.onerror = (event: any) => {
      setListening(false);
      alert('Speech recognition error: ' + event.error);
    };
    recognition.onend = () => {
      setListening(false);
    };
  };

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
        onClick={handleMicClick}
        className={`rounded-lg w-12 h-12 flex items-center justify-center text-white transition-colors focus:outline-none ${listening ? 'bg-red-500' : 'bg-[#00A884] hover:bg-[#00916e]'}`}
        aria-label={listening ? 'Stop listening' : 'Start voice input'}
        disabled={listening}
      >
        🎤
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or speak a message"
        className="bg-[#2A3942] rounded-lg px-4 py-3 text-sm text-[#E9EDF0] placeholder-[#8696A0] focus:outline-none focus:ring-1 focus:ring-[#00A884] transition-all w-full"
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
        className="bg-[#00A884] hover:bg-[#00916e] disabled:opacity-50 disabled:hover:bg-[#00A884] transition-colors rounded-lg w-12 h-12 flex items-center justify-center text-white"
      >
        <Send size={18} />
      </button>
      {listening && (
        <span className="ml-2 text-xs text-[#00A884] animate-pulse">Listening...</span>
      )}
    </form>
  );
}