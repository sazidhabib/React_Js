import React from "react";

import LoginForm from "./LoginFrom";
import SideImage from "./SideImage";

const LoginPage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <main className="flex flex-wrap gap-10 items-center self-center mt-14 ml-11 max-md:mt-10 px-4 max-md:max-w-full">
        <SideImage />
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
