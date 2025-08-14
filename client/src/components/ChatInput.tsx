import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  currentExpert: string;
}

export const ChatInput = ({ onSendMessage, isLoading = false, currentExpert }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
    onSendMessage(message.trim());
    setMessage("");
    inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-card/50 backdrop-blur-sm border-t w-[60vw] rounded-md">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 rounded-xl bg-background/80 border-border/50 focus:border-primary transition-all duration-200 hover-lift"
      />
      <Button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="rounded-xl px-6 transition-all duration-200 hover:scale-105 disabled:scale-100 hover-glow"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};