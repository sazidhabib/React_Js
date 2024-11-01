import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccountManagement from "./AccountManagement";
import ProfileEdit from "./ProfileEdit";

const AccountPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <main className="flex flex-col items-center">
        <div className="flex flex-wrap gap-10 self-center mt-20 w-full text-sm max-w-[1170px] max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-1 gap-3 items-center text-black">
            <span className="self-stretch my-auto opacity-50">Home</span>
            <span className="self-stretch my-auto">My Account</span>
          </div>
          <div className="leading-5 text-red-500">
            Welcome! <span className="text-red-500">Md Rimel</span>
          </div>
        </div>
        <section className="self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <AccountManagement />
            <ProfileEdit />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
