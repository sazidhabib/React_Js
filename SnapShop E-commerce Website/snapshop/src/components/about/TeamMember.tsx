import React from "react";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role }) => {
  return (
    <div className="flex flex-col min-w-[240px] w-[370px]">
      <div className="flex overflow-hidden flex-col justify-end px-9 pt-10 max-w-full rounded bg-neutral-100 w-[370px] max-md:px-5">
        <img
          loading="lazy"
          src={image}
          alt={`${name} - ${role}`}
          className="object-contain w-full aspect-[0.6]"
        />
      </div>
      <div className="flex flex-col self-start mt-8">
        <div className="flex flex-col text-black">
          <h3 className="text-3xl font-medium tracking-widest leading-none">
            {name}
          </h3>
          <p className="mt-2 text-base">{role}</p>
        </div>
        <div className="flex gap-4 items-start self-start mt-4">
          <a href="#" aria-label="Twitter">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce257e590f85ae7bdc52579b096904f395f36442d9415507d0dca97088900d21?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c1a0fefac87f608f4c0aae4614cc407882e4296e7e60d716ad48fdde7e2b127?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa88e0ec4d85b90779c166de611103f06f0c7744640ae7496df24ef1ff5c4d83?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
