import React from "react";

const footerSections = [
  {
    title: "Support",
    items: [
      "111 Bijoy sarani, Dhaka,",
      "DH 1515, Bangladesh.",
      "exclusive@gmail.com",
      "+88015-88888-9999",
    ],
  },
  {
    title: "Account",
    items: ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"],
  },
  {
    title: "Quick Link",
    items: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
  },
];

const FooterContent: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-center items-start self-center max-md:max-w-full">
      <div className="flex flex-col text-neutral-50 w-[217px]">
        <div className="flex flex-col self-start">
          <div className="flex flex-col max-w-full whitespace-nowrap w-[118px]">
            <div
              data-layername="logo"
              className="w-full text-2xl font-bold tracking-wider leading-none"
            >
              Exclusive
            </div>
            <div
              data-layername="subscribe"
              className="mt-6 text-xl font-medium leading-snug"
            >
              Subscribe
            </div>
          </div>
          <div
            data-layername="get10OffYourFirstOrder"
            className="mt-6 text-base"
          >
            Get 10% off your first order
          </div>
        </div>
        <form
          data-layername="sendMail"
          className="flex gap-8 items-center py-3 pl-4 mt-4 max-w-full text-base rounded border-solid border-[1.5px] border-neutral-50 w-[217px]"
        >
          <label htmlFor="footerEmail" className="sr-only">
            Enter your email
          </label>
          <input
            id="footerEmail"
            type="email"
            placeholder="Enter your email"
            className="self-stretch my-auto opacity-40 bg-transparent border-none outline-none text-neutral-50"
          />
          <button type="submit" aria-label="Send">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/12a54082781a806227ade42d81d6722495cd51ed50c28a6b5eebf5a1f9d88295?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </button>
        </form>
      </div>

      {footerSections.map((section, index) => (
        <div key={index} className="flex flex-col text-neutral-50">
          <h2 className="text-xl font-medium leading-snug">{section.title}</h2>
          <ul className="flex flex-col mt-6 text-base">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className={itemIndex > 0 ? "mt-4" : ""}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col">
        <div className="flex flex-col">
          <h2
            data-layername="downloadApp"
            className="text-xl font-medium leading-snug text-neutral-50"
          >
            Download App
          </h2>
          <div className="flex flex-col mt-6">
            <div
              data-layername="save3WithAppNewUserOnly"
              className="text-xs font-medium opacity-70 text-neutral-50"
            >
              Save $3 with App New User Only
            </div>
            <div className="flex gap-2 items-center mt-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5440fda2301de4db42cb3b78ea9e454c8a6e45def7b4a78502c73f2e432adfbb?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt="QR Code"
                className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square"
              />
              <div className="flex flex-col self-stretch my-auto w-[110px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8086ca6595511b019eec8e295aefc5745b02d452f33f1870425e89046b45b7f?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt="App Store"
                  className="object-contain max-w-full aspect-[2.75] w-[110px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c8569b4d912f2f0d95c365e51f1f979a971234e5fa2a900f3797efb56a7b34?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt="Google Play"
                  className="object-contain mt-1 max-w-full aspect-[2.75] w-[110px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-start self-start mt-6">
          <a href="#" aria-label="Facebook">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/30ef1881c8ba382ad841b10dec22c4728e1ac56594cd8fd1b8fc54e4c0c91052?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ea82925a0250967a4c2b296316362661c46ebec253b541b0ae663cc9d87d003?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0b67f52bb53b8c3b436cfc50867157e647c1cc5fa6f7cc373ba309b35f3d286?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/017f03fd6271e23e94e189db8506f53ec67e53623ecac07e20b0cc0e64aa481c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;