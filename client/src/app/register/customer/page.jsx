// CustomerRegister.js
"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputWithLabel from "@/components/input_with_label";
import { Button } from "@/components/ui/button";
import RegisterSelector from "@/components/register_selector";

function CustomerRegister() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e, name) => {
    const { value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (
        form.fullName === "" ||
        form.username === "" ||
        form.password === "" ||
        form.email === ""
      ) {
        alert("Please fill all the fields");
        return;
      }

      const response = await fetch("http://localhost:5000/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          username: form.username,
          password: form.password,
          email: form.email,
        }),
      });
      const data = await response.json();

      if (data.token) {
        const user = { token: data.token, type: "customer" };
        localStorage.setItem("user", JSON.stringify(user));
        setForm({
          fullName: "",
          username: "",
          password: "",
          email: "",
        });
        router.push("/marketplace/products");
      } else {
        alert("Some error occurred");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <RegisterSelector />
      <div className="flex h-[85%] w-full flex-col items-start justify-start gap-5  rounded-lg border border-input p-10 ">
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <h2 className="w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Register
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Register as Customer
          </h4>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 ">
          <InputWithLabel
            label="Fullname"
            value={form.fullName}
            onChange={(e) => handleChange(e, "fullName")}
          />
          <InputWithLabel
            label="Username"
            value={form.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <InputWithLabel
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <InputWithLabel
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-5">
        <Button className=" w-1/3" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </>
  );
}

export default CustomerRegister;
