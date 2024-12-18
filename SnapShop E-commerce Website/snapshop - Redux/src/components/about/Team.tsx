import React from "react";
import TeamMember from "./TeamMember";

const Team: React.FC = () => {
  const teamMembers = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/eb1c2581c3f449bb61077d555f71b6e7dc3282deba44706a0ea087c6585879ae?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "Tom Cruise",
      role: "Founder & Chairman",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0b8857412b43ee5b030a6b8f3bef2b6c1563b7b65906986470fc38837f9e0b89?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "Emma Watson",
      role: "Managing Director",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c431045861034878ee2dab9b00cd043db6c3d2110da911a3ef68c4c6fc4eda8b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "Will Smith",
      role: "Product Designer",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 items-start mt-36 max-w-full px-4 md:px-8 lg:px-12 max-md:mt-10">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  );
};

export default Team;
