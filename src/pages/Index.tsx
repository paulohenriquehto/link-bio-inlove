import ProfileSection from "@/components/links/ProfileSection";
import LinkButton from "@/components/links/LinkButton";
import SocialIcons from "@/components/links/SocialIcons";
import Footer from "@/components/links/Footer";
import HeroImage from "@/components/links/HeroImage";
import { useLinks, useSocialLinks, useSettings, useTrackClick } from "@/hooks/useLinks";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: links, isLoading: linksLoading } = useLinks();
  const { data: socialLinks, isLoading: socialLoading } = useSocialLinks();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const trackClick = useTrackClick();

  const isLoading = linksLoading || socialLoading || settingsLoading;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string, url: string) => {
    // Always track the click
    trackClick.mutate(linkId);
    
    // Handle WhatsApp link - prevent default and open with correct URL
    if (url.includes("wa.me") && settings?.whatsapp_message) {
      e.preventDefault();
      
      // Ensure URL has protocol
      let baseUrl = url;
      if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
        baseUrl = "https://" + baseUrl;
      }
      
      // Use URL API to properly set/replace the text parameter (never duplicates)
      try {
        const urlObj = new URL(baseUrl);
        urlObj.searchParams.set("text", settings.whatsapp_message);
        window.open(urlObj.toString(), "_blank", "noopener,noreferrer");
      } catch {
        // Fallback: just open the base URL if URL parsing fails
        window.open(baseUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5 bg-background">
        <div className="w-full max-w-md bg-card rounded-card shadow-elegant p-10 text-center">
          <Skeleton className="w-full h-48 rounded-t-card mb-4" />
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
  const profileBio = settings?.profile_bio || "A maior loja online de Alianças para Casamento, Noivado e Compromisso 💍";

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-background">
      {/* Main container with 3D effect */}
      <div className="w-full max-w-md bg-card rounded-card p-10 text-center relative overflow-hidden transform-gpu shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15),0_10px_20px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/20 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2),0_15px_25px_-10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] transition-shadow duration-300">
        {/* Hero Image */}
        <HeroImage />

        {/* Profile Section */}
        <ProfileSection 
          name={profileName}
          bio={profileBio}
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
              onClick={(e) => handleLinkClick(e, link.id, link.url)}
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
