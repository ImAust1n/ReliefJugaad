import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message, ChatState } from '../types/messageTypes';
import { MessageSquare } from 'lucide-react';
import { saveMessage, getAllMessages, clearMessages } from '../utils/db';
import useChatStore from '../store/useChatStore';
import React from 'react';
import { useSpeechSynthesis } from '../utils/useSpeech';

type ChatResponse = {
  result: string[];
  fetchHello: (message: string) => Promise<string[]>;
}

function ChatBotApp() {
  const { result, fetchHello } = useChatStore() as ChatResponse;
  const { speak } = useSpeechSynthesis();

  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track the last spoken bot message ID
  const lastSpokenBotMsgId = useRef<string | null>(null);
  // Track if initial messages have loaded
  const hasLoadedInitialMessages = useRef(false);

  // useEffect(() => {
  //   clearMessages();
  // }, []);

  useEffect(() => {
    const loadMessages = async () => {
      const savedMessages = await getAllMessages();
      if (savedMessages.length > 0) {
        setChatState(prev => ({
          ...prev,
          messages: savedMessages
        }));
      }
      hasLoadedInitialMessages.current = true;
    };
    loadMessages();
  }, []);

  // Speak only when a new bot message is added after initial load
  useEffect(() => {
    if (!hasLoadedInitialMessages.current) return;
    if (chatState.messages.length === 0) return;
    const lastMsg = chatState.messages[chatState.messages.length - 1];
    if (
      lastMsg.sender === 'bot' &&
      lastMsg.id !== lastSpokenBotMsgId.current
    ) {
      speak(lastMsg.content.replace(/<[^>]+>/g, ''));
      lastSpokenBotMsgId.current = lastMsg.id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    await saveMessage(userMessage);
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    const response = await fetchHello(content); 
    setTimeout(async () => {
      const idd = (Date.now() + 1).toString()
      const botMessage: Message = {
        id: idd,
        content: `${response}`,
        sender: 'bot',
        timestamp: new Date()
      };

      await saveMessage(botMessage);
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false
      }));
    }, 1000);
  };

  useEffect(() => {
    if (chatState.messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="h-[75vh] bg-[#111B21] flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header id="header" className="bg-[#202C33] py-3 px-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center">
            <MessageSquare className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white font-semibold">Chatney</h1>
            <p className="text-[#8696A0] text-xs">Always active</p>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto chat-bg bg-[#0B141A]">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            {chatState.messages.length === 0 ? (
              <div className="text-center text-[#8696A0] mt-12 p-6">
                <div className="w-16 h-16 rounded-full bg-[#00A884] flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <p className="text-sm font-medium mb-2">Welcome to Chatney</p>
                <p className="text-xs">Send a message to start chatting</p>
              </div>
            ) : (
              chatState.messages.map(message => {
                // Format the message content if it's from the bot
                if (message.sender === 'bot') {
                  // Check if the content contains numbered list items
                  const formattedContent = message.content.replace(
                    /(\d+\.\s+)\*\*([^*]+)\*\*:([^.]+\.)/g, 
                    '<div class="mb-2"><span class="font-bold">$1$2</span>$3</div>'
                  );
                  
                  return (
                    <ChatMessage 
                      key={message.id} 
                      message={{
                        ...message,
                        content: formattedContent
                      }} 
                    />
                  );
                }
                
                return <ChatMessage key={message.id} message={message} />;
              })
            )}
            {chatState.isTyping && (
              <div className="flex items-center gap-1 text-[#8696A0] ml-12">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.4s]"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#202C33] p-4">
          <div className="max-w-2xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBotApp;