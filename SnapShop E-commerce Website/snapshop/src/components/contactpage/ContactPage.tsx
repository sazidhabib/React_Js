import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactPage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <main>
        <section className="flex flex-col self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
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
      <Footer />
    </div>
  );
};

export default ContactPage;