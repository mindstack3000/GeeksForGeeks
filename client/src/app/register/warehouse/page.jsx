"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/session";
import InputWithLabel from "@/components/input_with_label";
import { Button } from "@/components/ui/button";
import RegisterSelector from "@/components/register_selector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    tempType: selectTypeOfStorage,
    certifications: "",
    security: "",
    phoneNo: "",
    email: "",
    servicesOffered: "false",
    price: "",
    typeOfCrop: selectCropTypes,
  });

  const handleChange = (e, name) => {
    const { value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (
        form.location == "" ||
        form.email == "" ||
        form.name == "" ||
        form.password == "" ||
        form.phoneNo == "" ||
        form.username == "" ||
        form.capacity == "" ||
        form.certifications == "" ||
        form.security == "" ||
        form.typeOfCrop.length == 0
      ) {
        console.log("form", form);
        alert("Please fill all the fields");
        return;
      }

      const response = await fetch("http://localhost:5000/warehouse/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          password: form.password,
          location: form.location,
          facility: {
            temperature: {
              low: form.temp_low,
              high: form.temp_high,
            },
            capacity: form.capacity,
            tempType: form.tempType,
          },
          certifications: form.certifications,
          security: form.security,
          phoneNo: form.phoneNo,
          email: form.email,
          servicesOffered: form.servicesOffered,
          price: form.price,
          typeOfCrop: form.typeOfCrop,
        }),
      });
      const data = await response.json();
      if (data.token) {
        alert("Registered Successfully");
        setUser({ token : data.token, type : "warehouse"});
        setForm({
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
          servicesOffered: "false",
          price: "",
          typeOfCrop: [],
        });
      } else {
        alert("Some error occured");
        
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setForm({ ...form, typeOfCrop: selectCropTypes });
  }, [selectCropTypes]);

  useEffect(() => {
    setForm({ ...form, tempType: selectTypeOfStorage });
  }, [selectTypeOfStorage]);

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
            label="Capacity"
            type="number"
            onChange={(e) => handleChange(e, "capacity")}
          />
          <InputWithLabel
            label="Certifications"
            type="text"
            onChange={(e) => handleChange(e, "certifications")}
          />
          <InputWithLabel
            label="Security"
            type="text"
            onChange={(e) => handleChange(e, "security")}
          />

          <div className="flex w-full flex-col items-start justify-start gap-5 sm:flex-row">
            <label className="w-1/5  whitespace-nowrap text-lg font-normal tracking-tight">
              Services Offered
            </label>
            <div className="flex w-4/5  items-start justify-start gap-3">
              <RadioGroup
                defaultValue="false"
                onValueChange={(value) => {
                  setForm({ ...form, servicesOffered: value });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="r1" />
                  <Label htmlFor="r1">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="r2" />
                  <Label htmlFor="r2">False</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

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
                type="number"
                onChange={(e) => handleChange(e, "temp_low")}
              />
              <InputWithLabel
                label="High"
                type="number"
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
                  key={cropType}
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
