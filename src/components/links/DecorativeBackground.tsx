import { FaGem, FaRing } from "react-icons/fa6";

const DecorativeBackground = () => {
  // Positions for decorative elements - carefully placed for uniform distribution
  const decorations = [
    // Top area
    { Icon: FaGem, top: "8%", left: "10%", size: "w-4 h-4", rotate: "rotate-12", opacity: "opacity-[0.08]" },
    { Icon: FaRing, top: "12%", right: "15%", size: "w-5 h-5", rotate: "-rotate-12", opacity: "opacity-[0.06]" },
    { Icon: FaGem, top: "5%", left: "45%", size: "w-3 h-3", rotate: "rotate-45", opacity: "opacity-[0.07]" },
    
    // Upper middle
    { Icon: FaRing, top: "25%", left: "5%", size: "w-4 h-4", rotate: "rotate-6", opacity: "opacity-[0.05]" },
    { Icon: FaGem, top: "22%", right: "8%", size: "w-3 h-3", rotate: "-rotate-6", opacity: "opacity-[0.08]" },
    
    // Middle area
    { Icon: FaGem, top: "40%", left: "8%", size: "w-3 h-3", rotate: "rotate-12", opacity: "opacity-[0.06]" },
    { Icon: FaRing, top: "45%", right: "6%", size: "w-4 h-4", rotate: "-rotate-12", opacity: "opacity-[0.07]" },
    
    // Lower middle
    { Icon: FaRing, top: "60%", left: "12%", size: "w-5 h-5", rotate: "rotate-45", opacity: "opacity-[0.05]" },
    { Icon: FaGem, top: "55%", right: "10%", size: "w-4 h-4", rotate: "-rotate-6", opacity: "opacity-[0.08]" },
    
    // Bottom area
    { Icon: FaGem, top: "75%", left: "6%", size: "w-3 h-3", rotate: "rotate-6", opacity: "opacity-[0.07]" },
    { Icon: FaRing, top: "78%", right: "12%", size: "w-4 h-4", rotate: "-rotate-12", opacity: "opacity-[0.06]" },
    { Icon: FaGem, top: "85%", left: "18%", size: "w-4 h-4", rotate: "rotate-12", opacity: "opacity-[0.05]" },
    { Icon: FaRing, top: "88%", right: "20%", size: "w-3 h-3", rotate: "rotate-6", opacity: "opacity-[0.08]" },
    
    // Extra scattered elements
    { Icon: FaGem, top: "92%", left: "40%", size: "w-3 h-3", rotate: "-rotate-12", opacity: "opacity-[0.06]" },
    { Icon: FaRing, top: "3%", right: "35%", size: "w-4 h-4", rotate: "rotate-12", opacity: "opacity-[0.05]" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((item, index) => {
        const { Icon, size, rotate, opacity, ...position } = item;
        return (
          <Icon
            key={index}
            className={`absolute ${size} ${rotate} ${opacity} text-primary transition-all duration-1000`}
            style={position}
          />
        );
      })}
    </div>
  );
};

export default DecorativeBackground;
