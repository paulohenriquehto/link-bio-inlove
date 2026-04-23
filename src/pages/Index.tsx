import ProfileSection from "@/components/links/ProfileSection";
import LinkButton from "@/components/links/LinkButton";
import SocialIcons from "@/components/links/SocialIcons";
import Footer from "@/components/links/Footer";
import HeroImage from "@/components/links/HeroImage";
import { PROFILE, LINKS, SOCIAL_LINKS } from "@/data/content";

const Index = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-background">
      <div className="w-full max-w-md bg-card rounded-card p-10 text-center relative overflow-hidden transform-gpu shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15),0_10px_20px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/20 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2),0_15px_25px_-10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] transition-shadow duration-300">
        <HeroImage />
        <ProfileSection name={PROFILE.name} bio={PROFILE.bio} />
        <div className="flex flex-col gap-4">
          {LINKS.map((link, index) => (
            <LinkButton
              key={link.id}
              title={link.title}
              url={link.url}
              icon={link.icon}
              isFeatured={link.isFeatured}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
        <SocialIcons links={SOCIAL_LINKS} />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
