import { Message } from '../types/messageTypes';
import { Bot, User } from 'lucide-react';
import React from 'react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex message gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start group`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
        ${isBot ? 'bg-[#00A884]' : 'bg-[#8696A0]'}
        `}>
        {isBot ? 
          <Bot size={16} className="text-white" /> : 
          <User size={16} className="text-white" />
        }
      </div>
      <div className={`max-w-[80%] rounded-lg px-4 py-3 shadow-sm
        ${isBot ? 
          'bg-[#202C33]' : 
          'bg-[#005C4B]'
        }`}>
        <span 
          className="text-[#E9EDF0] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: message.content.replace(/\*/g, '') }}
        />
        <span className="text-[10px] text-[#8696A0] mt-1.5 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}