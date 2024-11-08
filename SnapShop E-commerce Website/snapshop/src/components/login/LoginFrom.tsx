import React from "react";

const LoginForm: React.FC = () => {
  const onSubmitHandeler = (e) => {
    e.preventdefault();
  };
  return (
    <section className="flex flex-col self-stretch my-auto min-w-[240px]">
      <div className="flex flex-col max-w-full w-[370px]">
        <div className="flex flex-col self-start text-black">
          <h2 className="text-4xl font-medium tracking-widest leading-none">
            Log in to SnapShop
          </h2>
          <p className="mt-6 text-base">Enter your details below</p>
        </div>
        <form
          onSubmit={onSubmitHandeler}
          className="flex flex-col mt-12 w-full max-md:mt-10"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="username"
              className="text-base text-black opacity-40"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 w-full border-b border-black"
              required
            />
          </div>
          <div className="flex flex-col mt-10 w-full">
            <label
              htmlFor="password"
              className="text-base text-black opacity-40"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full border-b border-black"
              required
            />
          </div>
          <div className="flex gap-10 items-center mt-10 text-base">
            <button
              type="submit"
              className="flex-grow font-medium text-neutral-50 px-12 py-4 bg-red-500 rounded max-md:px-5"
            >
              Log In
            </button>
            <a href="#" className="text-red-500">
              Forget Password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
