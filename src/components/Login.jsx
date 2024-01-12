import React, { useState } from "react";
import appWriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Logo from "./Logo";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data, data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          setError("Invalid Email or Password");
        }
      }
    } catch (error) {
      setError(error);
    }

    return (
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                placeholder="Enter your email"
                label="Email:"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      // write regex to validate email
                      return (
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zzA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                          value
                        ) || "Email is not valid"
                      );
                    },
                  },
                })}
              />
            </div>
            <div className="space-y-5">
              <Input
                placeholder="Enter your password"
                label="Password:"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />

              <Button type="submit" className="w-full">
                {" "}
                Sign In{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
