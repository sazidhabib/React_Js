import React from "react";
import { Link } from "react-router-dom";

const ErrorContent: React.FC = () => {
  return (
    <main className="flex flex-col mt-20 w-full  max-md:mt-10 max-md:max-w-full">
      <nav
        data-layername="roadmap"
        className="flex gap-3 items-center self-start text-sm text-black"
      >
        <a
          href="/"
          data-layername="account"
          className="self-stretch my-auto opacity-50"
        >
          Home
        </a>
        <span data-layername="nothing" className="self-stretch my-auto">
          404 Error
        </span>
      </nav>
      <section className="flex flex-col items-center self-center mt-36 max-md:mt-10 max-md:max-w-full">
        <h1
          data-layername="404NotFound"
          className="text-8xl font-medium leading-none text-black tracking-[3.3px] max-md:max-w-full max-md:text-4xl"
        >
          404 Not Found
        </h1>
        <p
          data-layername="yourVisitedPageNotFoundYouMayGoHomePage"
          className="mt-10 text-base text-black max-md:max-w-full"
        >
          Your visited page not found. You may go home page.
        </p>
      </section>
      <Link
        to="/"
        data-layername="button"
        className="gap-2.5 self-center px-12 py-4 mt-20 ml-16 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5 max-md:mt-10"
      >
        Back to home page
      </Link>
    </main>
  );
};

export default ErrorContent;
