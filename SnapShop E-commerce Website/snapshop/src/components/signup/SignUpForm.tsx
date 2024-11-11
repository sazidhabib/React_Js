import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must only contain numbers")
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
});

interface FormInputs {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInputs) => {
    const userData = {
      email: data.email,
      username: data.name,
      password: data.password,
      name: {
        firstname: data.name.split(" ")[0] || "",
        lastname: data.name.split(" ")[1] || "",
      },
      address: {
        city: "your city here",
        street: data.address,
        number: 1,
        zipcode: "00000",
        geolocation: {
          lat: "0",
          long: "0",
        },
      },
      phone: data.phone,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      console.log("User created:", result);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("Account creation failed!");
    }
  };

  return (
    <section className="flex flex-col self-stretch my-auto text-black h-[712px] min-w-[240px] w-[369px] px-2 ">
      <h1 className="text-4xl font-medium tracking-widest leading-none">
        Create an account
      </h1>
      <p className="mt-6 text-base">Enter your details below</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-12 text-base max-md:mt-10"
      >
        <div className="flex flex-col items-center whitespace-nowrap">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="opacity-40 p-2 border rounded mb-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="opacity-40 p-2 border rounded mb-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="opacity-40 p-2 border rounded mb-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <input
              type="text"
              placeholder="Address"
              {...register("address")}
              className="opacity-40 p-2 border rounded mb-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}

            <input
              type="tel"
              placeholder="Phone"
              {...register("phone")}
              className="opacity-40 p-2 border rounded mb-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="gap-2.5 self-stretch px-32 py-4 mt-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
        >
          Create Account
        </button>
      </form>
      <div className="flex flex-col items-center mt-4">
        <button className="flex gap-4 items-center justify-center px-20 py-4 rounded border border-solid border-black border-opacity-40 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0ff62de078180931d8908f5145e028d8dd25c93a1fb7e335c0aa1484e45dba4?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <span>Sign up with Google</span>
        </button>
        <div className="flex gap-4 items-center mt-8">
          <p className="self-stretch my-auto opacity-70">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="self-stretch my-auto font-medium opacity-70"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
