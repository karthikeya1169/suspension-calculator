import { cn } from "@/lib/utils";

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
}

export function ResultCard({ title, icon, items, accentColor = "bg-accent-teal" }: ResultCardProps) {
  return (
    <div className="bg-dark-secondary rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-6">
      <div className="flex items-center mb-4">
        <div className={cn("w-10 h-10 bg-opacity-20 rounded-lg flex items-center justify-center mr-3", accentColor)}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary" data-testid={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-text-secondary" data-testid={`label-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
            </span>
            <span 
              className={cn(
                "font-mono",
                item.isHighlight ? "text-accent-amber" : "text-text-primary"
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
