import heroRings from "@/assets/hero-rings.png";

const HeroImage = () => {
  return (
    <div className="w-[calc(100%+5rem)] -mt-10 -ml-10 -mr-10 relative">
      <img
        src={heroRings}
        alt="Alianças InLove Store"
        className="w-full h-auto object-cover rounded-t-card"
      />
      {/* Gradient overlay to blend with card */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
    </div>
  );
};

export default HeroImage;
