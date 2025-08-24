import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
  accentColor = "text-accent-teal"
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <button
        className="w-full flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`button-toggle-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="font-medium text-foreground">
          <span className={cn("mr-3", accentColor)}>
            {icon}
          </span>
          {title}
        </span>
        <ChevronDown
          className={cn(
            "text-muted-foreground transition-transform w-5 h-5",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-4" data-testid={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="bg-background p-4 rounded-lg space-y-4 border border-border">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
