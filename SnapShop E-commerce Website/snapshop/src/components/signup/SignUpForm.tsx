import React from "react";

const SignUpForm: React.FC = () => {
  return (
    <section className="flex flex-col self-stretch my-auto text-black h-[712px] min-w-[240px] w-[369px]">
      <h1 className="text-4xl font-medium tracking-widest leading-none">
        Create an account
      </h1>
      <p className="mt-6 text-base">Enter your details below</p>
      <form className="flex flex-col mt-12 text-base max-md:mt-10">
        <div className="flex flex-col items-center whitespace-nowrap">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="opacity-40 p-2 border rounded mb-10"
            />

            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="opacity-40 p-2 border rounded mb-10"
            />

            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="opacity-40 p-2 border rounded mb-10"
            />

            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="opacity-40 p-2 border rounded mb-10"
            />

            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone"
              className="opacity-40 p-2 border rounded mb-10"
            />
          </div>
        </div>
        <button
          type="submit"
          className="gap-2.5 self-stretch px-32 py-4 mt-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
        >
          Create Account
        </button>
      </form>
      <div className="flex flex-col items-center mt-4">
        <button className="flex gap-4 items-center justify-center px-20 py-4 rounded border border-solid border-black border-opacity-40 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0ff62de078180931d8908f5145e028d8dd25c93a1fb7e335c0aa1484e45dba4?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <span>Sign up with Google</span>
        </button>
        <div className="flex gap-4 items-center mt-8">
          <p className="self-stretch my-auto opacity-70">
            Already have account?
          </p>
          <a href="#" className="self-stretch my-auto font-medium opacity-70">
            Log in
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
