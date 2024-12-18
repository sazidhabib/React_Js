import React from "react";

const Footer: React.FC = () => {
  const supportLinks = [
    { text: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh." },
    { text: "exclusive@gmail.com" },
    { text: "+88015-88888-9999" },
  ];

  const accountLinks = [
    { text: "My Account" },
    { text: "Login / Register" },
    { text: "Cart" },
    { text: "Wishlist" },
    { text: "Shop" },
  ];

  const quickLinks = [
    { text: "Privacy Policy" },
    { text: "Terms Of Use" },
    { text: "FAQ" },
    { text: "Contact" },
  ];

  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/30ef1881c8ba382ad841b10dec22c4728e1ac56594cd8fd1b8fc54e4c0c91052?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      alt: "Facebook",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0330c0494800b3088beb255eba1e66ce571f512ad5691c57e216433c05dc5f47?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      alt: "Twitter",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0b67f52bb53b8c3b436cfc50867157e647c1cc5fa6f7cc373ba309b35f3d286?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      alt: "Instagram",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/017f03fd6271e23e94e189db8506f53ec67e53623ecac07e20b0cc0e64aa481c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      alt: "LinkedIn",
    },
  ];

  return (
    <footer className="flex overflow-hidden flex-col justify-end pt-20 pb-6 mt-36 w-full bg-black max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-center items-start self-center max-md:max-w-full">
        <div className="flex flex-col text-neutral-50 ">
          <div className="flex flex-col self-start">
            <div className="flex flex-col max-w-full whitespace-nowrap">
              <h2 className="w-full text-2xl font-bold tracking-wider leading-none">
                Exclusive
              </h2>
              <h3 className="mt-6 text-xl font-medium leading-snug">
                Subscribe
              </h3>
            </div>
            <p className="mt-6 text-base">Get 10% off your first order</p>
          </div>
          <form className="flex gap-8 items-center py-3 pl-4 mt-4 max-w-full text-base rounded border-solid border-[1.5px] border-neutral-50 w-[217px]">
            <label htmlFor="email" className="sr-only">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="self-stretch my-auto opacity-40 bg-transparent border-none outline-none"
            />
            <button type="submit" aria-label="Subscribe">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bac8a3a4556d00df359345f40c4304fa01a92d9d278e1cc8be218cdcd6e20d8?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            </button>
          </form>
        </div>

        <div className="flex flex-col text-neutral-50 w-[175px]">
          <h3 className="text-xl font-medium leading-snug">Support</h3>
          <ul className="flex flex-col mt-6 max-w-full text-base w-[175px]">
            {supportLinks.map((link, index) => (
              <li key={index} className={index !== 0 ? "mt-4" : ""}>
                {link.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-neutral-50">
          <h3 className="text-xl font-medium leading-snug">Account</h3>
          <ul className="flex flex-col mt-6 text-base">
            {accountLinks.map((link, index) => (
              <li key={index} className={index !== 0 ? "mt-4" : ""}>
                <a href="#">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-neutral-50">
          <h3 className="text-xl font-medium leading-snug">Quick Link</h3>
          <ul className="flex flex-col mt-6 text-base">
            {quickLinks.map((link, index) => (
              <li key={index} className={index !== 0 ? "mt-4" : ""}>
                <a href="#">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className="text-xl font-medium leading-snug text-neutral-50">
              Download App
            </h3>
            <div className="flex flex-col mt-6">
              <p className="text-xs font-medium opacity-70 text-neutral-50">
                Save $3 with App New User Only
              </p>
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
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df59572eb8c812f019934d33ba52be08e637c623b1c2c4343e086e5a6869b3c4?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    alt="Google Play Store"
                    className="object-contain max-w-full aspect-[2.75] w-[110px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c8569b4d912f2f0d95c365e51f1f979a971234e5fa2a900f3797efb56a7b34?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    alt="Apple App Store"
                    className="object-contain mt-1 max-w-full aspect-[2.75] w-[110px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-start self-start mt-6">
            {socialIcons.map((icon, index) => (
              <a key={index} href="#" aria-label={icon.alt}>
                <img
                  loading="lazy"
                  src={icon.src}
                  alt=""
                  className="object-contain shrink-0 w-6 aspect-square"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="w-full bg-white border border-white border-solid opacity-40 min-h-[1px] max-md:max-w-full" />
        </div>
        <div className="flex gap-3 items-center mt-4 text-base text-white">
          <div className="flex gap-1.5 items-center self-stretch my-auto min-w-[240px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/207c5d33f1e035178e0be8d020049bff7b4add721531f45a07670b638424cd03?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
            <p className="self-stretch my-auto">
              Copyright from SazidHabib 2024. All right reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
