import { FaCertificate, FaCheck } from "react-icons/fa";

interface ProfileSectionProps {
  name: string;
  bio: string;
  logoUrl?: string;
}

const ProfileSection = ({ name, bio, logoUrl }: ProfileSectionProps) => {
  return (
    <div className="animate-fade-in-up mb-8">
      {/* Profile Image with gradient border */}
      <div className="w-28 h-28 mx-auto mb-4 p-1 bg-gradient-to-br from-accent to-primary rounded-full">
        <div className="w-full h-full rounded-full border-[3px] border-card bg-accent flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-serif font-bold text-accent-foreground">
              {name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Username with verified badge (Font Awesome style) */}
      <h1 className="font-serif text-3xl font-semibold text-accent flex items-center justify-center gap-1 mb-1">
        {name}
        <span className="relative inline-flex items-center justify-center w-6 h-6 ml-1">
          <FaCertificate className="w-[22px] h-[22px] text-blue-500 absolute" />
          <FaCheck className="w-[11px] h-[11px] text-white absolute z-10" />
        </span>
      </h1>

      {/* Bio text */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%] mx-auto whitespace-pre-line">
        {bio}
      </p>
    </div>
  );
};

export default ProfileSection;
