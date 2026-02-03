import { ChevronRight, Sparkles, Globe, Gem, Tag, MessageCircle, Package, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
  isFeatured?: boolean;
  onClick?: () => void;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  globe: Globe,
  gem: Gem,
  tag: Tag,
  "message-circle": MessageCircle,
  package: Package,
  link: LinkIcon,
};

const LinkButton = ({ title, url, icon, isFeatured = false, onClick, delay = 0 }: LinkButtonProps) => {
  const IconComponent = iconMap[icon] || LinkIcon;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "opacity-0 animate-fade-in-up relative flex items-center justify-between px-6 py-5 rounded-btn",
        "text-foreground font-semibold transition-all duration-300 ease-out",
        "shadow-sm hover:shadow-hover hover:-translate-y-1",
        isFeatured 
          ? "bg-accent text-accent-foreground border-none animate-pulse-border hover:bg-accent/90" 
          : "bg-card border border-border hover:border-primary"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <IconComponent className="w-5 h-5 shrink-0" />
      <span className="flex-1 text-center">{title}</span>
      <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
    </a>
  );
};

export default LinkButton;
