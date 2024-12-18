import React from "react";

const AccountManagement: React.FC = () => {
  return (
    <nav className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start text-base font-medium text-black max-md:mt-10">
        <h2 className="text-base font-medium">Manage My Account</h2>
        <ul className="flex flex-col self-end mt-4 list-none p-0">
          <li className="text-red-500">My Profile</li>
          <li className="mt-2 opacity-50">Address Book</li>
          <li className="mt-2 opacity-50">My Payment Options</li>
        </ul>
        <h2 className="mt-6">My Orders</h2>
        <ul className="flex flex-col self-center mt-4 list-none p-0">
          <li className="opacity-50">My Returns</li>
          <li className="mt-2 opacity-50">My Cancellations</li>
        </ul>
        <h2 className="mt-4">My WishList</h2>
      </div>
    </nav>
  );
};

export default AccountManagement;
