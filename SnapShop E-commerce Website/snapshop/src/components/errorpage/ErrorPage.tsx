import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ErrorContent from "./ErrorContent";

const ErrorPage: React.FC = () => {
  return (
    <div
      data-layername="404Error"
      className="flex overflow-hidden flex-col bg-white"
    >
      <Header />
      <ErrorContent />
      <Footer />
    </div>
  );
};

export default ErrorPage;
