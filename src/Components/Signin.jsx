import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import { toast } from "react-toastify";
import { baseUrl } from "../Utils/helpers";
import Cookies from "js-cookie";
import { ErrorMessage } from "@hookform/error-message";

const Signin = ({ isShowing, setIsShowing }) => {
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

    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/auth/authenticate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.status == 200) {
        const { token } = await res.json();
        // setIsShowing(false);
        toast.success("Signed in successfully");
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
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      appear={true}
      show={isShowing}
      enter="transition ease-in-out duration-1000 transform delay-300"
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
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: "email is required" })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-sm text-red-600">{message}</p>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-green-500 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: "password is required" })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-sm text-red-600">{message}</p>
                )}
              />
            </div>
          </div>

          <div>
            <FormButton text={"Sign in"} isloading={loading} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <p
            onClick={() => setIsShowing(1)}
            className="font-semibold leading-6 text-green-500 hover:text-green-500"
          >
            Sign up today.
          </p>
        </p>
      </div>
    </Transition>
  );
};

export default Signin;
