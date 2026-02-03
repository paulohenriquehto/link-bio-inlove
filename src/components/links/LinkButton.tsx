import { FaStar, FaStore, FaRing, FaTag, FaWhatsapp, FaTruckFast, FaLink, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { addUtmParams, trackLinkClick } from "@/lib/utm";
import type { IconType } from "react-icons";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
  isFeatured?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  delay?: number;
}

const iconMap: Record<string, IconType> = {
  star: FaStar,
  fire: FaStar,
  sparkles: FaStar,
  store: FaStore,
  globe: FaStore,
  ring: FaRing,
  gem: FaRing,
  tag: FaTag,
  whatsapp: FaWhatsapp,
  "message-circle": FaWhatsapp,
  "truck-fast": FaTruckFast,
  truck: FaTruckFast,
  package: FaTruckFast,
  link: FaLink,
};

const LinkButton = ({ title, url, icon, isFeatured = false, onClick, delay = 0 }: LinkButtonProps) => {
  const IconComponent = iconMap[icon] || FaLink;
  
  // Determine link category for analytics
  const getLinkCategory = (): string => {
    if (icon === "whatsapp" || icon === "message-circle") return "atendimento";
    if (title.toLowerCase().includes("outlet")) return "outlet";
    if (title.toLowerCase().includes("coleção")) return "colecao";
    if (title.toLowerCase().includes("rastrear")) return "rastreio";
    return "site";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click in Google Analytics
    trackLinkClick(title, url, getLinkCategory());
    
    // Call onClick for additional tracking (like database click count)
    // Pass the event so parent can preventDefault if needed (e.g., WhatsApp)
    if (onClick) {
      onClick(e);
    }
    // Let the default link behavior happen (no preventDefault) unless parent prevented it
  };
  
  // Add UTM parameters to the URL
  const urlWithUtm = addUtmParams(url, title);

  // Determine if this is a WhatsApp link
  const isWhatsApp = icon === "whatsapp" || icon === "message-circle";
  
  // Determine if this is an outlet/promo link
  const isOutlet = icon === "tag";

  // Get icon color based on type
  const getIconColor = (): string | undefined => {
    if (isWhatsApp) return "#25D366";
    if (isOutlet) return "#D4A373";
    return undefined;
  };

  return (
    <a
      href={urlWithUtm}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "opacity-0 animate-fade-in-up relative flex items-center justify-between px-5 py-4 rounded-full",
        "text-foreground font-medium transition-all duration-300 ease-out",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]",
        "bg-card border border-border/60 hover:border-primary/50"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <IconComponent 
        className="w-5 h-5 shrink-0"
        style={{ color: getIconColor() }}
      />
      <span className="flex-1 text-center text-sm">{title}</span>
      <FaChevronRight className="w-3 h-3 opacity-40 shrink-0" />
    </a>
  );
};

export default LinkButton;
