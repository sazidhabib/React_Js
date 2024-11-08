import React from "react";
import { IoLogInOutline } from "react-icons/io5";

const AccountDropdown: React.FC = () => {
  return (
    <div className="flex overflow-hidden z-10 flex-col self-end px-3 pt-2.5 pb-2.5 mt-0 w-56 max-w-full text-sm text-center rounded bg-cyan-950 text-neutral-50">
      <nav className="flex flex-col items-start">
        <a href="#" className="flex gap-4 items-center whitespace-nowrap">
          <IoLogInOutline className="text-3xl object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />

          <span className="self-stretch my-auto">Login</span>
        </a>
      </nav>
    </div>
  );
};

export default AccountDropdown;
