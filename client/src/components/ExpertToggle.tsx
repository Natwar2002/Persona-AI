import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import hiteshSir from "/hitesh_sir.jpg";
import piyushSir from "/piyush_sir.jpg";

export type Expert = "hitesh" | "piyush";

interface ExpertToggleProps {
  currentExpert: Expert;
  onExpertChange: (expert: Expert) => void;
}

export const ExpertToggle = ({ currentExpert, onExpertChange }: ExpertToggleProps) => {
  const experts = {
    hitesh: {
      name: "Hitesh Choudhary",
      avatar: hiteshSir,
      title: "JavaScript Expert",
      gradient: "gradient-hitesh"
    },
    piyush: {
      name: "Piyush Garg",
      avatar: piyushSir,
      title: "System Design Expert", 
      gradient: "gradient-piyush"
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {Object.entries(experts).map(([key, expert]) => (
        <Button
          key={key}
          variant={currentExpert === key ? "default" : "ghost"}
          onClick={() => onExpertChange(key as Expert)}
          className={`
            flex items-center gap-3 p-3 h-auto rounded-xl transition-all duration-500 hover-lift
            ${currentExpert === key 
              ? `${expert.gradient} text-white shadow-lg scale-105 hover-glow` 
              : "hover:scale-105 hover:bg-secondary"
            }
          `}
          style={{
            animation: currentExpert === key ? "expertSwitch 0.6s ease-in-out" : undefined
          }}
        >
          <Avatar className="h-10 w-10 ring-2 ring-white/20 transition-all duration-300 hover:ring-white/40">
            <AvatarImage src={expert.avatar} alt={expert.name} />
            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-semibold text-sm transition-all duration-300">{expert.name}</p>
            <p className="text-xs opacity-80 transition-all duration-300">{expert.title}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};