"use client";

import React, { useState } from "react";
import InputWithLabel from "@/components/input_with_label";
import Image from "next/image";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button";
import LoginSelector from "@/components/login_selector";

export default function Login() {
  const [loginType, setLoginType] = useState("Farmer");
  const [form ,setForm] = useState({"username" : "" ,"password" : ""});
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (
        !form.username || !form.password
      ) {
        alert("Please fill all the fields");
        return;
      }

      const response = await fetch(`http://localhost:5000/${loginType.toLowerCase()}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username  : form.username,
          password : form.password
        }),
      });
      const data = await response.json();
      if (data.token) {
        const user  = { token : data.token, type : "farmer" }
        localStorage.setItem("user", JSON.stringify(user));
        setForm({
          username : "",
          password : ""
        });
        router.push("/marketplace/warehouse");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white p-5">
      <div className="flex h-full flex-col md:flex-row">
        <div className="imgContainer mb-3 hidden object-cover md:mb-0 md:block md:w-1/2">
          <Image src={"/login.jpg"} width={500} height={500} />
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="inputContainer border-red-800 p-5 md:p-10 md:pb-0">
            <LoginSelector value={loginType} set={setLoginType} />
            <div className="loginContainer rounded-lg border border-input">
              <h3 className="m-3 text-2xl font-semibold tracking-tight">
                LogIn
              </h3>
              <p className="p-5">
                Login for {loginType} with the data you entered during your registration.
              </p>
              <div className="p-5">
                <InputWithLabel label="Username" onChange={(e)=>setForm({...form , username : e.target.value})}
                value = {form.username}
                  />
              </div>
              <div className="p-5">
                <InputWithLabel label="Password" onChange={(e)=>setForm({...form , password : e.target.value})} value={form.password}/>
              </div>
              <div className="flex flex-col items-end justify-end p-5">
                <span className="p-2">
                  <Button
                  onClick={handleSubmit}

                  >Login</Button>
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
                  <Button
                    onClick={() => router.push(`/register/${loginType.toLowerCase()}`)}
                  >Register</Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
