"use client";
import React, { useState } from "react";

import InputWithLabel from "@/components/input_with_label";
import { Button } from "@/components/ui/button";

const typesOfStorage = ["Hot Storage", "Cold Storage"];

function FarmerLogin() {
  const [selectTypeOfStorage, setSelectTypeOfStorage] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5  overflow-scroll rounded-lg border border-black p-10">
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <h2 className="w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Register
        </h2>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Register as Farmer
        </h4>
      </div>

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
        <InputWithLabel label="Warehouse" />
        <InputWithLabel label="Fullname" />
        <InputWithLabel label="Username" />
        <InputWithLabel label="Password" type="password" />
        <InputWithLabel label="Phone No." type="text" />
        <InputWithLabel label="Email" type="text" />
        <InputWithLabel label="Address" type="text" />
        <InputWithLabel label="Capacity" type="text" />
        <InputWithLabel label="Temperature Control" type="text" />

        <div className="flex w-full items-start justify-start gap-5">
          <label className="w-1/5  whitespace-nowrap text-lg font-normal tracking-tight">
            Types of Crop
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
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-5">
        <Button className=" w-2/3">Register</Button>
      </div>
    </div>
  );
}

export default FarmerLogin;
