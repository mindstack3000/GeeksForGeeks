"use client";
import React, { useState } from "react";

import InputWithLabel from "@/components/input_with_label";
import { Button } from "@/components/ui/button";
import RegisterSelector from "@/components/register_selector";

const typesOfStorage = ["Hot Storage", "Cold Storage"];

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

function WareHouseRegister() {
  const [selectTypeOfStorage, setSelectTypeOfStorage] = useState("");
  const [selectCropTypes, setSelectCropTypes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    location: "",
    temp_low: "",
    temp_high: "",
    capacity: "",
    tempType: "",
    certifications: "",
    security: "",
    phoneNo: "",
    email: "",
    servicesOffered: "",
    price: "",
    typeOfCrop: [],
  });

  const handleChange = (e, name) => {
    const { value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    console.log("form", form);
  };

  return (
    <>
      <RegisterSelector />
      <div className="flex h-[85%] w-full flex-col items-start justify-start gap-5  overflow-scroll rounded-lg border border-input p-10">
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <h2 className="w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Register
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Register as Warhouse
          </h4>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
          <InputWithLabel
            label="Fullname"
            onChange={(e) => handleChange(e, "name")}
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
            type="text"
            onChange={(e) => handleChange(e, "phoneNo")}
          />
          <InputWithLabel
            label="Email"
            type="text"
            onChange={(e) => handleChange(e, "email")}
          />
          <InputWithLabel
            label="Address"
            type="text"
            onChange={(e) => handleChange(e, "address")}
          />
          <InputWithLabel
            label="Capacity"
            type="text"
            onChange={(e) => handleChange(e, "capacity")}
          />

          <div className="flex w-full flex-col items-start justify-start gap-5 sm:flex-row">
            <label className="w-1/5  whitespace-nowrap text-lg font-normal tracking-tight">
              Types of Temp
            </label>
            <div className="flex w-4/5 flex-wrap items-start justify-start gap-3">
              {typesOfStorage.map((cropType) => (
                <Button
                  key={cropType}
                  variant={
                    selectTypeOfStorage == cropType ? "secondary" : "outline"
                  }
                  onClick={() => {
                    if (selectTypeOfStorage == cropType) {
                      setSelectTypeOfStorage("");
                      console.log("cropType", cropType);
                    } else {
                      setSelectTypeOfStorage(cropType);
                    }
                  }}
                >
                  {cropType}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-5 sm:flex-row">
            <label className="w-1/5  whitespace-nowrap text-lg font-normal tracking-tight">
              Temperature
            </label>

            <div className="flex w-4/5 flex-wrap items-start justify-start gap-3">
              <InputWithLabel
                label="Low"
                type="text"
                onChange={(e) => handleChange(e, "temp_low")}
              />
              <InputWithLabel
                label="High"
                type="text"
                onChange={(e) => handleChange(e, "temp_high")}
              />
            </div>
          </div>

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

export default WareHouseRegister;
