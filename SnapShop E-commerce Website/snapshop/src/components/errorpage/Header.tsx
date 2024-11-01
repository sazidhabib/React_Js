import React from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";

const Header: React.FC = () => {
  return (
    <header>
      <TopHeader />
      <MainHeader />
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
    </header>
  );
};

export default Header;
