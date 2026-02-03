const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-8 text-xs text-muted-foreground/60">
      <p>© {currentYear} InLove Store</p>
      <p className="mt-1">
        Criado por{" "}
        <a 
          href="#" 
          className="hover:text-primary transition-colors"
        >
          Zapixmkt
        </a>
      </p>
    </footer>
  );
};

export default Footer;
