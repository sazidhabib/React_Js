import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactPage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <main>
        <section className="flex flex-col self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full mx-auto px-4 md:px-6 lg:px-8 max-md:mt-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex gap-3 items-center self-start text-sm text-black whitespace-nowrap">
              <li>
                <a href="/" className="opacity-50">
                  Home
                </a>
              </li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>
          <div className="mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
