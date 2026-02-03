import ProfileSection from "@/components/links/ProfileSection";
import LinkButton from "@/components/links/LinkButton";
import SocialIcons from "@/components/links/SocialIcons";
import Footer from "@/components/links/Footer";
import { useLinks, useSocialLinks, useSettings, useTrackClick } from "@/hooks/useLinks";
import { Skeleton } from "@/components/ui/skeleton";
import inloveLogo from "@/assets/inlove-logo.jpg";

const Index = () => {
  const { data: links, isLoading: linksLoading } = useLinks();
  const { data: socialLinks, isLoading: socialLoading } = useSocialLinks();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const trackClick = useTrackClick();

  const isLoading = linksLoading || socialLoading || settingsLoading;

  const handleLinkClick = (linkId: string, url: string) => {
    trackClick.mutate(linkId);
    
    // Handle WhatsApp link
    if (url.includes("wa.me") && settings?.whatsapp_message) {
      const message = encodeURIComponent(settings.whatsapp_message);
      const whatsappUrl = `${url}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-br from-secondary/30 to-background">
        <div className="w-full max-w-md bg-card rounded-card shadow-elegant p-10 text-center">
          <Skeleton className="w-28 h-28 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-40 mx-auto mb-2" />
          <Skeleton className="h-4 w-60 mx-auto mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-btn" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const profileName = settings?.profile_name || "InLove Store";
  const profileBio = settings?.profile_bio || "Moda, Alianças e Acessórios ✨\nEnviamos para todo o Brasil 🇧🇷";

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-br from-secondary/30 to-background">
      {/* Main container */}
      <div className="w-full max-w-md bg-card rounded-card shadow-elegant p-10 text-center relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary" />

        {/* Profile Section */}
        <ProfileSection 
          name={profileName} 
          bio={profileBio}
          logoUrl={inloveLogo}
        />

        {/* Links List */}
        <div className="flex flex-col gap-4">
          {links?.map((link, index) => (
            <LinkButton
              key={link.id}
              title={link.title}
              url={link.url}
              icon={link.icon}
              isFeatured={link.is_featured}
              delay={(index + 1) * 100}
              onClick={() => handleLinkClick(link.id, link.url)}
            />
          ))}
        </div>

        {/* Social Icons */}
        {socialLinks && socialLinks.length > 0 && (
          <SocialIcons links={socialLinks} />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
