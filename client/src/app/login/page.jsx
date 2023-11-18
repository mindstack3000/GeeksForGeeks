import React from "react";
import InputWithLabel from "../../components/input_with_label";
import Image from "next/image";
import { Button } from "../../components/ui/button";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-white p-5">
      <div className="flex h-full flex-col md:flex-row">
        <div className="imgContainer mb-3 hidden object-cover md:mb-0 md:block md:w-1/2">
          <Image src={"/login.jpg"} width={500} height={500} />
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="inputContainer border-red-800 p-5 md:p-10 md:pb-0">
            <div className="loginContainer rounded-lg border border-input">
              <h3 className="m-3 text-2xl font-semibold tracking-tight">
                LogIn
              </h3>
              <p className="p-5">
                Login with the data you entered during your registration.
              </p>
              <div className="p-5">
                <InputWithLabel label="Email" />
              </div>
              <div className="p-5">
                <InputWithLabel label="Password" />
              </div>
              <div className="flex flex-col items-end justify-end p-5">
                <span className="p-2">
                  <Button>Login</Button>
                </span>
                <p className="text-sm">
                  <a href="#">Did you forget your password?</a>
                </p>
              </div>
            </div>
          </div>
          <div className="inputContainer p-5 md:p-10">
            <div className="loginContainer rounded-lg border border-input">
              <h3 className="m-3 text-2xl font-semibold tracking-tight">
                Register
              </h3>
              <p className="p-5">Don’t have an Account? Register here.</p>
              <div className="flex flex-col items-end justify-end p-5">
                <span className="p-2">
                  <Button>Register</Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
