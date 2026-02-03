import heroRings from "@/assets/hero-rings.png";

const HeroImage = () => {
  return (
    <div className="w-full mb-6 -mt-10 -mx-10 rounded-t-card overflow-hidden">
      <img
        src={heroRings}
        alt="Alianças InLove Store"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default HeroImage;
