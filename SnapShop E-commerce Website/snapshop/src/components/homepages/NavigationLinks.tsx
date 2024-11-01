import React from "react";

const NavigationLinks: React.FC = () => {
  const links = [
    { name: "Home", active: true },
    { name: "Contact", active: false },
    { name: "About", active: false },
    { name: "Sign Up", active: false },
  ];

  return (
    <nav className="flex gap-10 items-start text-base text-center min-w-[240px]">
      {links.map((link, index) => (
        <div
          key={index}
          className={`flex flex-col items-center ${
            link.name === "Home" ? "w-12" : ""
          } whitespace-nowrap`}
        >
          <a href={`#${link.name.toLowerCase()}`}>{link.name}</a>
          {link.active && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c4a968e61751929cf46491fa57e5fa87f2f3c7c5d51673c41475a8954433106?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain w-12 aspect-[47.62]"
              alt=""
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavigationLinks;
