import React from "react";
import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";

const Footer: React.FC = () => {
  return (
    <footer
      data-layername="footer"
      className="flex overflow-hidden flex-col justify-end pt-20 pb-6 mt-36 w-full bg-black max-md:mt-10 max-md:max-w-full"
    >
      <FooterContent />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
