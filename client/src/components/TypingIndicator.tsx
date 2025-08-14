import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Expert } from "./ExpertToggle";

interface TypingIndicatorProps {
  expert: Expert;
}

export const TypingIndicator = ({ expert }: TypingIndicatorProps) => {
  const expertInfo = {
    hitesh: {
      name: "Hitesh Choudhary",
      avatar: "",
    },
    piyush: {
      name: "Piyush Garg", 
      avatar: "",
    }
  };

  const currentExpert = expertInfo[expert];

  return (
    <div className="flex gap-3 p-4 message-slide-in">
      <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover-float">
        <AvatarImage src={currentExpert.avatar} alt={currentExpert.name} />
        <AvatarFallback>{currentExpert.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col max-w-[70%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">{currentExpert.name}</span>
          <span className="text-xs text-muted-foreground">is typing...</span>
        </div>
        
        <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-message-expert border hover-lift">
          <div className="flex items-center space-x-1">
            <div 
              className="h-2 w-2 bg-primary rounded-full"
              style={{ animation: "typingDot 1.4s ease-in-out infinite" }}
            ></div>
            <div 
              className="h-2 w-2 bg-primary rounded-full"
              style={{ animation: "typingDot 1.4s ease-in-out infinite", animationDelay: "0.2s" }}
            ></div>
            <div 
              className="h-2 w-2 bg-primary rounded-full"
              style={{ animation: "typingDot 1.4s ease-in-out infinite", animationDelay: "0.4s" }}
            ></div>
          </div>
          
          {/* Shimmer effect */}
          <div className="relative mt-2 h-1 bg-muted rounded overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{ animation: "shimmer 2s ease-in-out infinite" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};