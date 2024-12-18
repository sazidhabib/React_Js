import React from "react";

import ErrorContent from "./ErrorContent";

const ErrorPage: React.FC = () => {
  return (
    <div
      data-layername="404Error"
      className="flex overflow-hidden flex-col bg-white"
    >
      <ErrorContent />
    </div>
  );
};

export default ErrorPage;
