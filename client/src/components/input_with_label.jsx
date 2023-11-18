import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

function InputWithLabel({ label, placeholder ,value, type = "text", onChange, className }) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 whitespace-nowrap sm:flex-row sm:items-center  sm:gap-5 sm:whitespace-normal">
      <label className="w-1/5  text-lg font-normal tracking-tight">
        {label}:
      </label>
      <div className="w-4/5 ">
        <Input type={type} onChange={onChange} value={value} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default InputWithLabel;
