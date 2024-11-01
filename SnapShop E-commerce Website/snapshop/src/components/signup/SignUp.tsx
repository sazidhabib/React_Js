import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";
import SideImage from "./SideImage";

const SignUp: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <main className="flex gap-10 items-center self-center mt-14 w-full max-w-[1237px] max-md:mt-10 max-md:max-w-full">
        <SideImage />
        <SignUpForm />
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
