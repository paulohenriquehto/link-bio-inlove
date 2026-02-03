interface ProfileSectionProps {
  bio: string;
}

const ProfileSection = ({ bio }: ProfileSectionProps) => {
  return (
    <div className="animate-fade-in-up mb-8">
      {/* Bio text */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%] mx-auto whitespace-pre-line">
        {bio}
      </p>
    </div>
  );
};

export default ProfileSection;
