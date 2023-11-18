import React from "react";
import InputWithLabel from "@/components/input_with_label";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-white p-5">
      <div className="flex flex-col md:flex-row h-full">
        <div className="imgContainer hidden md:block object-cover mb-3 md:mb-0 md:w-1/2">
          <Image src={"/login.jpg"} width={500} height={500} />
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="inputContainer p-5 md:p-10 md:pb-0 border-red-800">
            <div className="loginContainer border border-input rounded-lg">
              <h3 className="text-2xl font-semibold tracking-tight m-3">
                LogIn
              </h3>
              <p className="p-5">Login with the data you entered during your registration.</p>
              <div className="p-5">
                <InputWithLabel label="Email" />
              </div>
              <div className="p-5">
                <InputWithLabel label="Password" />
              </div>
              <div className="flex items-end justify-end flex-col p-5">
                <span className="p-2">
                  <Button>Login</Button>
                </span>
                <p className="text-sm"><a href="#">Did you forget your password?</a></p>
              </div>
            </div>
          </div>
          <div className="inputContainer p-5 md:p-10">
            <div className="loginContainer border border-input rounded-lg">
              <h3 className="text-2xl font-semibold tracking-tight m-3">
                Register
              </h3>
              <p className="p-5">Don’t have an Account? Register here.</p>
              <div className="flex items-end justify-end flex-col p-5">
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
