import { FaInstagram, FaTiktok, FaFacebookF, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface SocialIconsProps {
  links: SocialLink[];
}

const iconMap: Record<string, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  mail: FaEnvelope,
  envelope: FaEnvelope,
};

const SocialIcons = ({ links }: SocialIconsProps) => {
  return (
    <div className="mt-10 flex justify-center gap-5">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon] || FaEnvelope;
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
