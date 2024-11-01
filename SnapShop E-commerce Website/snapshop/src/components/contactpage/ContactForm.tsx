import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col grow justify-center px-8 py-10 w-full text-base bg-white rounded shadow-sm max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <form className="flex flex-col items-end w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-4 items-start leading-6 text-red-500 max-md:max-w-full">
            <div className="flex flex-col w-[235px]">
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name *"
                required
                className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              />
            </div>
            <div className="flex flex-col w-[235px]">
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email *"
                required
                className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              />
            </div>
            <div className="flex flex-col w-[235px]">
              <label htmlFor="phone" className="sr-only">
                Your Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Your Phone *"
                required
                className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              />
            </div>
          </div>
          <div className="flex flex-col mt-8 max-w-full text-black w-[737px]">
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="flex overflow-hidden flex-col items-start px-4 pt-3.5 pb-44 rounded bg-neutral-100 max-md:pr-5 max-md:pb-24 max-md:max-w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="gap-2.5 self-stretch px-12 py-4 mt-8 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
