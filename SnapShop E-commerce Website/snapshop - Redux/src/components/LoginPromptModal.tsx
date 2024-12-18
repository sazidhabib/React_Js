import React from "react";
import { Link } from "react-router-dom";

interface LoginPromptModalProps {
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Please Log In</h2>
        <p className="mt-4">You need to log in to add items to the cart.</p>
        <div className="flex mt-6 space-x-4">
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
