import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { helpTexts } from "@/lib/performance-helpers";

interface ResultItem {
  label: string;
  value: string | number;
  isHighlight?: boolean;
}

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  items: ResultItem[];
  accentColor?: string;
  helpKey?: keyof typeof helpTexts;
}

export function ResultCard({ title, icon, items, accentColor = "bg-accent-teal", helpKey }: ResultCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-6 border border-border">
      <div className="flex items-center mb-4">
        <div className={cn("w-10 h-10 bg-opacity-20 rounded-lg flex items-center justify-center mr-3", accentColor)}>
          {icon}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <h3 className="text-lg font-semibold text-foreground" data-testid={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          {helpKey && helpTexts[helpKey] && (
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-accent-teal cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3">
                <div className="space-y-2">
                  <p className="font-semibold">{helpTexts[helpKey].title}</p>
                  <p className="text-sm">{helpTexts[helpKey].content}</p>
                  <p className="text-xs text-accent-teal font-medium">{helpTexts[helpKey].safeRange}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-muted-foreground" data-testid={`label-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
            </span>
            <span 
              className={cn(
                "font-mono",
                item.isHighlight ? "text-accent-amber" : "text-foreground"
              )}
              data-testid={`value-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
