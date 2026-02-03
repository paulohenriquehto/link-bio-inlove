interface ProfileSectionProps {
  name: string;
  bio: string;
}

const ProfileSection = ({ name, bio }: ProfileSectionProps) => {
  return (
    <div className="animate-fade-in-up mb-8 mt-4">
      {/* Store name with elegant font */}
      <h1 className="font-serif text-3xl font-semibold text-accent italic mb-3">
        {name}
      </h1>

      {/* Bio text */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%] mx-auto whitespace-pre-line">
        {bio}
      </p>
    </div>
  );
};

export default ProfileSection;
