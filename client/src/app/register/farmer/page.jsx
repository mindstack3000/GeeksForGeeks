"use client";
import React, { useState, useEffect } from "react";

import InputWithLabel from "@/components/input_with_label";
import { Button } from "@/components/ui/button";

import RegisterSelector from "@/components/register_selector";

const cropTypes = [
  "Wheat",
  "Rice",
  "Corn",
  "Barley",
  "Soybeans",
  "Cotton",
  "Potatoes",
  "Tomatoes",
  "Fruits",
  "Vegetables",
  "Other",
];

function FarmerRegister() {
  const [selectCropTypes, setSelectCropTypes] = useState([]);
  const [form, setForm] = useState({
    adharNo: "",
    fullName: "",
    phoneNo: "",
    email: "",
    address: "",
    username: "",
    password: "",
    landSize: "",
    typeOfCrop: selectCropTypes,
  });

  useEffect(() => {
    setForm({ ...form, typeOfCrop: selectCropTypes });
  }, [selectCropTypes]);

  const handleChange = (e, name) => {
    const { value } = e.target.value;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (
        form.address === "" ||
        form.adharNo === "" ||
        form.email === "" ||
        form.fullName === "" ||
        form.password === "" ||
        form.phoneNo === "" ||
        form.username === "" ||
        form.landSize === "" ||
        form.typeOfCrop.length === 0
      ) {
        alert("Please fill all the fields");
        return;
      }

      const response = await fetch("http://localhost:5000/farmer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adharNo: form.adharNo,
          fullName: form.fullName,
          phoneNo: form.phoneNo,
          email: form.email,
          address: form.address,
          username: form.username,
          password: form.password,
          landSize: form.landSize,
          typeOfCrop: form.typeOfCrop,
        }),
      });
      const data = await response.json();
      if (data.token) {
        alert("Registered Successfully");
        window.location.href = "/login";
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
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
            Register as Farmer
          </h4>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 ">
          <InputWithLabel
            label="Aadhar Card No"
            type="number"
            onChange={(e) => handleChange(e, "adharNo")}
          />
          <InputWithLabel
            label="Fullname"
            onChange={(e) => handleChange(e, "fullName")}
          />
          <InputWithLabel
            label="Username"
            onChange={(e) => handleChange(e, "username")}
          />
          <InputWithLabel
            label="Password"
            type="password"
            onChange={(e) => handleChange(e, "password")}
          />
          <InputWithLabel
            label="Phone No."
            type="tel"
            onChange={(e) => handleChange(e, "phoneNo")}
          />
          <InputWithLabel
            label="Email"
            type="email"
            onChange={(e) => handleChange(e, "email")}
          />
          <InputWithLabel
            label="Address"
            type="text"
            onChange={(e) => handleChange(e, "address")}
          />
          <InputWithLabel
            label="Land Size"
            type="number"
            onChange={(e) => handleChange(e, "landSize")}
          />

          <div className="flex w-full flex-col items-start justify-start gap-5 sm:flex-row">
            <label className="w-1/5  whitespace-nowrap text-lg font-normal tracking-tight">
              Types of Crop
            </label>
            <div className="flex w-4/5 flex-wrap items-start justify-start gap-3">
              {cropTypes.map((cropType) => (
                <Button
                  variant={
                    selectCropTypes.includes(cropType) ? "secondary" : "outline"
                  }
                  onClick={() => {
                    if (selectCropTypes.includes(cropType)) {
                      setSelectCropTypes(
                        selectCropTypes.filter((crop) => crop !== cropType),
                      );
                    } else {
                      setSelectCropTypes([...selectCropTypes, cropType]);
                    }
                  }}
                >
                  {cropType}
                </Button>
              ))}
            </div>
          </div>
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

export default FarmerRegister;
