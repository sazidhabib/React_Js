import React from "react";
import SignUpForm from "./SignUpForm";
import SideImage from "./SideImage";

const SignUp: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white max-md:max-w-full px-4">
      <main className="flex justify-center gap-10 items-center self-center mt-14 w-full max-md:mt-10 max-md:max-w-full mx-auto">
        <SideImage />
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
