import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex overflow-hidden flex-col justify-end pt-20 pb-6 mt-8 w-full bg-black max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-center items-start self-center max-md:max-w-full">
        <div className="flex flex-col text-neutral-50 w-[217px]">
          <div className="flex flex-col self-start">
            <div className="flex flex-col max-w-full whitespace-nowrap w-[118px]">
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
              className="self-stretch my-auto bg-transparent border-none outline-none text-neutral-50 opacity-40"
            />
            <button type="submit" aria-label="Subscribe">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d484ebf327e7f5f26c1b64221034aac01d7d563177d370a8bd83d7971ad4f72c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className="flex flex-col text-neutral-50 w-[175px]">
          <h3 className="text-xl font-medium leading-snug">Support</h3>
          <address className="flex flex-col mt-6 max-w-full text-base w-[175px] not-italic">
            <p className="leading-6">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <a href="mailto:exclusive@gmail.com" className="mt-4">
              exclusive@gmail.com
            </a>
            <a href="tel:+8801588889999" className="mt-4">
              +88015-88888-9999
            </a>
          </address>
        </div>
        <nav className="flex flex-col text-neutral-50">
          <h3 className="text-xl font-medium leading-snug">Account</h3>
          <ul className="flex flex-col mt-6 text-base">
            <li>
              <a href="#my-account">My Account</a>
            </li>
            <li className="mt-4">
              <a href="#login-register">Login / Register</a>
            </li>
            <li className="mt-4">
              <a href="#cart">Cart</a>
            </li>
            <li className="mt-4">
              <a href="#wishlist">Wishlist</a>
            </li>
            <li className="mt-4">
              <a href="#shop">Shop</a>
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col text-neutral-50">
          <h3 className="text-xl font-medium leading-snug">Quick Link</h3>
          <ul className="flex flex-col mt-6 text-base">
            <li>
              <a href="#privacy-policy">Privacy Policy</a>
            </li>
            <li className="mt-4">
              <a href="#terms-of-use">Terms Of Use</a>
            </li>
            <li className="mt-4">
              <a href="#faq">FAQ</a>
            </li>
            <li className="mt-4">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
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
                  className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square"
                  alt="QR Code"
                />
                <div className="flex flex-col self-stretch my-auto w-[110px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df59572eb8c812f019934d33ba52be08e637c623b1c2c4343e086e5a6869b3c4?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    className="object-contain max-w-full aspect-[2.75] w-[110px]"
                    alt="Google Play"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c8569b4d912f2f0d95c365e51f1f979a971234e5fa2a900f3797efb56a7b34?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    className="object-contain mt-1 max-w-full aspect-[2.75] w-[110px]"
                    alt="App Store"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-start self-start mt-6">
            <a href="#facebook" aria-label="Facebook">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30ef1881c8ba382ad841b10dec22c4728e1ac56594cd8fd1b8fc54e4c0c91052?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-6 aspect-square"
                alt=""
              />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e07ee12b3f4a08dfd6b075044c19114b1a124ce39a37504133d15c1c1f0d1d42?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-6 aspect-square"
                alt=""
              />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0b67f52bb53b8c3b436cfc50867157e647c1cc5fa6f7cc373ba309b35f3d286?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-6 aspect-square"
                alt=""
              />
            </a>
            <a href="#linkedin" aria-label="LinkedIn">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/017f03fd6271e23e94e189db8506f53ec67e53623ecac07e20b0cc0e64aa481c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-6 aspect-square"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="w-full bg-white border border-white border-solid opacity-40 min-h-[1px] max-md:max-w-full"></div>
        </div>
        <div className="flex gap-3 items-center mt-4 text-base text-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6b79712dbe7a2d336b37d7ebf70c7273efd1e0b2c367db9dc475f03fce05596?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            alt=""
          />
          <p className="self-stretch my-auto">
            Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
