import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl px-4">
      <div className="flex flex-col bg-white rounded shadow-sm py-10 px-8 w-full text-base max-md:px-5">
        <form className="flex flex-col items-start w-full">
          <div className="flex flex-wrap gap-4 mb-6 w-full">
            <div className="flex flex-col flex-1 min-w-[200px]">
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name *"
                required
                className="px-4 py-3.5 rounded bg-neutral-100"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-[200px]">
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email *"
                required
                className="px-4 py-3.5 rounded bg-neutral-100"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-[200px]">
              <label htmlFor="phone" className="sr-only">
                Your Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Your Phone *"
                required
                className="px-4 py-3.5 rounded bg-neutral-100"
              />
            </div>
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="px-4 py-3.5 rounded bg-neutral-100 h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="self-stretch mt-4 px-6 py-3 bg-red-500 rounded text-white font-medium hover:bg-red-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
