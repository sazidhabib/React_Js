import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

interface AccountDropdownProps {
  closeDropdown: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ closeDropdown }) => {
  const { setLogin } = useContext(GlobalContext);

  const handelLogOut = (e) => {
    e.preventdefault();
    setLogin(false);
    closeDropdown();
  };

  return (
    <div className="flex overflow-hidden z-10 flex-col self-end px-3 pt-5 pb-2.5 mt-0 w-56 max-w-full text-sm text-center rounded bg-cyan-950 text-neutral-50">
      <nav className="flex flex-col items-start">
        <Link
          onClick={closeDropdown}
          to="/profile"
          className="flex gap-4 items-center"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4d3933bd60bc7f03e80195cff61581a8fb5573107350371a713dbfa0482821b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <span className="self-stretch my-auto">Manage My Account</span>
        </Link>
        <a href="#" className="flex gap-4 items-center mt-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c153124546cb6b9efef3168c24f225bca3a8a8f898ad639ac1f78f897b410b20?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">My Order</span>
        </a>
        <a href="#" className="flex gap-4 items-center mt-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0d73c945483150020ad3e75cd5079429cf53a005a69a364be947fb8fca587e1?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">My Cancellations</span>
        </a>
        <Link
          onClick={closeDropdown}
          to="/signup"
          className="flex gap-4 items-center mt-3.5"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/943c84ae3047cf3e3844a45ef6f5c62cb367d6032aaa74048785a1d185e49909?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">SignUp</span>
        </Link>
        <Link
          onClick={handelLogOut}
          to="/login"
          className="flex gap-4 items-center mt-3.5 whitespace-nowrap"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dd4ef2221a26eb97c44021b855f72d1aa05086d707c891b3a9c34b08b015240?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default AccountDropdown;
