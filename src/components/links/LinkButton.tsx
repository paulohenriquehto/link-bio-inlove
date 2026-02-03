import { FaChevronRight, FaFire, FaGlobe, FaGem, FaTag, FaWhatsapp, FaTruck, FaLink } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
  isFeatured?: boolean;
  onClick?: () => void;
  delay?: number;
}

const iconMap: Record<string, IconType> = {
  fire: FaFire,
  sparkles: FaFire,
  globe: FaGlobe,
  gem: FaGem,
  tag: FaTag,
  whatsapp: FaWhatsapp,
  "message-circle": FaWhatsapp,
  truck: FaTruck,
  package: FaTruck,
  link: FaLink,
};

const LinkButton = ({ title, url, icon, isFeatured = false, onClick, delay = 0 }: LinkButtonProps) => {
  const IconComponent = iconMap[icon] || FaLink;

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
        "shadow-sm hover:shadow-hover hover:-translate-y-1 active:scale-[0.98]",
        isFeatured 
          ? "bg-accent text-accent-foreground border-none animate-pulse-border hover:bg-accent/90" 
          : "bg-card border border-border hover:border-primary"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <IconComponent className="w-5 h-5 shrink-0" />
      <span className="flex-1 text-center">{title}</span>
      <FaChevronRight className="w-3 h-3 opacity-50 shrink-0" />
    </a>
  );
};

export default LinkButton;
