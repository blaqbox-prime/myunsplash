import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../Utils/helpers";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Register = ({ isShowing, setIsShowing }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);

    // CHECK PASSWORDS
    if(data.password != data.confirmPassword){
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.status == 200) {
        const { token } = await res.json();
        // setIsShowing(false);
        toast.success("registered successfully");
        // Set Cookie for signed in user
        Cookies.set("username", data.email, { expires: 1 });
        Cookies.set("token", token, { expires: 1 });
        reset();
        // Navigate to App Home
      } else {
        return toast.error("Incorrect email or password", { icon: true });
      }
    } catch (error) {
      console.log(error);
      return toast.error("Internal Server Error", { icon: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition
        show={isShowing}
        appear={true}
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      enter="transition ease-in-out duration-300 transform delay-300"
    enterFrom="-translate-x-[300px] opacity-0"
    enterTo="translate-x-0 opacity-100"
    leave="transition ease-in-out duration-300 transform"
    leaveFrom="translate-x-0 opacity-100"
    leaveTo="-translate-x-[300px] opacity-0"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/my_unsplash_logo.svg"
          alt="myUnsplash"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        {/* FIRSTNAME */}

        <div>
            <label
              htmlFor="first name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="firstname"
                {...register("firstname", {required: "First name is required"})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        {/* LASTNAME */}

        <div>
            <label
              htmlFor="last name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="lastname"
                {...register("lastname", {required: "Last name is required"})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email", {required: "Email is required"})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        {/* PASSWORD */}

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>


            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {required: "Password is required"})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


                {/* CONFIRM PASSWORD */}
                <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>


            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", {required: "Enter password again"})}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500" >
            Already a member?{' '}
            <p onClick={() => setIsShowing(0)} className="font-semibold leading-6 text-green-500 hover:text-green-500">
              Sign In.
            </p>
          </p>
      </div>
    </Transition>
  );
};

export default Register;
