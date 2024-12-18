import React from "react";

type IconButtonProps = {
  iconSrc: string;
  alt: string;
};

const IconButton: React.FC<IconButtonProps> = ({ iconSrc, alt }) => {
  return (
    <button aria-label={alt}>
      <img
        loading="lazy"
        src={iconSrc}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
      />
    </button>
  );
};

export default IconButton;
