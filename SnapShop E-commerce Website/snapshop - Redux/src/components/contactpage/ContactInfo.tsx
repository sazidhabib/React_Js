import React from "react";

interface ContactInfoItemProps {
  icon: string;
  title: string;
  details: string[];
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon,
  title,
  details,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[262px]">
      <div className="flex gap-4 items-center self-start text-base font-medium text-black">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square fill-red-500"
        />
        <div className="self-stretch my-auto">{title}</div>
      </div>
      <div className="flex flex-col mt-6 w-full text-sm text-black">
        {details.map((detail, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c3adeddc5c9e4686049185eec05edf726c5ccbe1f3b16611c2da9a310ca5061?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "Call To Us",
      details: [
        "We are available 24/7, 7 days a week.",
        "Phone: +8801611112222",
      ],
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/78ce634fd57696e4af7a0dd0217c81b3d24659ea00c5b91dd9cc701749c73926?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "Write To Us",
      details: [
        "Fill out our form and we will contact you within 24 hours.",
        "Emails: customer@exclusive.com",
        "Emails: support@exclusive.com",
      ],
    },
  ];

  return (
    <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col grow justify-center px-9 py-12 w-full bg-white rounded shadow-sm max-md:px-5 max-md:mt-8">
        <div className="flex flex-col">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              <ContactInfoItem {...item} />
              {index < contactItems.length - 1 && (
                <div className="flex flex-col mt-8 max-w-full w-[270px]">
                  <div className="shrink-0 h-px bg-black border border-black border-solid" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
