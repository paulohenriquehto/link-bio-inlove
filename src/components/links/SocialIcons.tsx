import { Instagram, Facebook, Mail } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface SocialIconsProps {
  links: SocialLink[];
}

// TikTok icon (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  facebook: Facebook,
  mail: Mail,
};

const SocialIcons = ({ links }: SocialIconsProps) => {
  return (
    <div className="mt-10 flex justify-center gap-5">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon] || Mail;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground text-2xl transition-colors duration-300 hover:text-primary"
            aria-label={link.platform}
          >
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
