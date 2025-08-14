import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ExpertToggle, Expert } from "./ExpertToggle";
import { ThemeToggle } from "./ThemeToggle";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import socket from "@/utils/socketConnection";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentExpert, setCurrentExpert] = useState<Expert>("hitesh");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Smooth auto-scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "end" 
    });
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Auto-scroll when user sends message
    setTimeout(scrollToBottom, 100);

    socket.emit('MessageFromClient', {
      content: content,
      expert: currentExpert
    });
  };

  const handleExpertChange = (expert: Expert) => {
    if(currentExpert === expert) return;

    setCurrentExpert(expert);
    // Add a system message when expert changes
    const systemMessage: Message = {
      id: Date.now().toString(),
      content: `Switched to ${expert === 'hitesh' ? 'Hitesh Choudhary' : 'Piyush Garg'}. How can I help you today?`,
      sender: expert,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, systemMessage]);
    
    // Auto-scroll when expert changes
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    socket.on('MessageFromServer', (data) => {
      console.log(data);
      setIsLoading(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), content: data?.content, sender: data?.expert, timestamp: new Date() }])
    })
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hey there! I'm Hitesh Choudhary. I'm here to help you with JavaScript, web development, and programming concepts. What would you like to learn today?",
      sender: "hitesh",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-chat-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-md hover-lift">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover-float">
          Expert Chat
        </h1>
        <ExpertToggle 
          currentExpert={currentExpert} 
          onExpertChange={handleExpertChange}
        />
        <ThemeToggle />
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-2 pb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <TypingIndicator expert={currentExpert} />
          )}
          {/* Invisible element for smooth scrolling */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="w-full flex justify-center">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} currentExpert={currentExpert}  />
      </div>
    </div>
  );
};