import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Expert } from "./ExpertToggle";
import hiteshSir from "/hitesh_sir.jpg";
import piyushSir from "/piyush_sir.jpg";

export interface Message {
  id: string;
  content: string;
  sender: "user" | Expert;
  timestamp: Date | string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";
    
  const expertInfo = {
    hitesh: {
      name: "Hitesh Choudhary",
      avatar: hiteshSir,
      badge: "JS Master",
      badgeColor: "bg-hitesh-primary"
    },
    piyush: {
      name: "Piyush Garg", 
      avatar: piyushSir,
      badge: "Python Pro",
      badgeColor: "bg-piyush-primary"
    }
  };

  const expert = !isUser ? expertInfo[message.sender as Expert] : null;

  return (
    <div className={`flex gap-3 rounded-md p-4 message-slide-in hover-lift group ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && expert && (
        <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-110">
          <AvatarImage src={expert.avatar} alt={expert.name} />
          <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && expert && (
          <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium text-foreground">{expert.name}</span>
            <Badge className={`${expert.badgeColor} text-white text-xs px-2 py-0.5 hover-glow`}>
              {expert.badge}
            </Badge>
          </div>
        )}
        
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md
            ${isUser 
              ? "bg-message-user text-message-user-foreground rounded-br-md hover-glow" 
              : "bg-message-expert text-message-expert-foreground rounded-bl-md border hover:border-primary/30"
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          { typeof message?.timestamp == 'string' ? message?.timestamp : message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        </span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 hover-glow">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};