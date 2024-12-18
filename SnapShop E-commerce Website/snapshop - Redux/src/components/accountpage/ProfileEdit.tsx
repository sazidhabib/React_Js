import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const ProfileEdit: React.FC = () => {
  const { user } = useContext(GlobalContext);
  console.log("LoginUser: ", user);

  return (
    <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col px-20 py-10 mx-auto w-full text-base bg-white rounded shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start text-xl font-medium leading-snug text-red-500">
          Edit Your Profile
        </h2>
        <form className="mt-4">
          <div className="flex flex-wrap gap-10 items-start text-black max-md:max-w-full">
            <div className="flex flex-col min-w-[240px] w-[330px]">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="mt-2 px-4 py-3.5 rounded bg-neutral-100"
                placeholder="First Name"
                value={user?.firstName || ""}
                readOnly
              />
            </div>
            <div className="flex flex-col min-w-[240px] w-[330px]">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="mt-2 px-4 py-3.5 rounded bg-neutral-100"
                placeholder="Last Name"
                value={user?.lastName || ""}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-10 items-start mt-6 text-black max-md:max-w-full">
            <div className="flex flex-col whitespace-nowrap min-w-[240px] w-[330px]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="mt-2 px-4 py-3.5 rounded bg-neutral-100"
                placeholder="Email"
                value={user?.email || ""}
                readOnly
              />
            </div>
            <div className="flex flex-col min-w-[240px] w-[330px]">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="mt-2 px-4 py-3.5 rounded bg-neutral-100"
                placeholder="Kingston, 5236, United State"
                value={user?.address || ""}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col mt-6 text-black max-md:max-w-full">
            <h3 className="text-base font-medium">Password Changes</h3>
            <div className="flex flex-col mt-2 w-full">
              <input
                type="password"
                id="currentPassword"
                className="px-4 py-3.5 rounded bg-neutral-100 max-md:max-w-full"
                placeholder="Current Password"
              />
            </div>
            <div className="flex flex-col mt-4 max-w-full w-[710px]">
              <input
                type="password"
                id="newPassword"
                className="px-4 py-3.5 rounded bg-neutral-100 max-md:max-w-full"
                placeholder="New Password"
              />
            </div>
            <div className="flex flex-col mt-4 max-w-full w-[710px]">
              <input
                type="password"
                id="confirmPassword"
                className="px-4 py-3.5 rounded bg-neutral-100 max-md:max-w-full"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <div className="flex gap-8 items-center self-end mt-6">
            <button type="button" className="self-stretch my-auto text-black">
              Cancel
            </button>
            <button
              type="submit"
              className="gap-2.5 self-stretch px-12 py-4 my-auto font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
