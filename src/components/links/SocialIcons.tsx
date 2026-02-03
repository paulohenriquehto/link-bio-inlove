import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { addSocialUtmParams, trackSocialClick } from "@/lib/utm";
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
  mail: FaRegEnvelope,
  envelope: FaRegEnvelope,
};

const SocialIcons = ({ links }: SocialIconsProps) => {
  const handleClick = (platform: string, url: string) => {
    trackSocialClick(platform, url);
  };

  return (
    <div className="mt-10 flex justify-center gap-5">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon] || FaRegEnvelope;
        const urlWithUtm = addSocialUtmParams(link.url, link.platform);
        
        return (
          <a
            key={link.id}
            href={urlWithUtm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.platform, link.url)}
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
