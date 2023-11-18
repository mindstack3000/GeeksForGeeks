import React from "react";
import { Input } from "@/components/ui/input";

function InputWithLabel({ label, input, setInput, type = "text" , onChange }) {
  
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 whitespace-nowrap sm:flex-row sm:items-center  sm:gap-5 sm:whitespace-normal">
      <label className="w-1/5  text-lg font-normal tracking-tight">
        {label}:
      </label>
      <div className="w-4/5 ">
        <Input value={input} type={type} placeholder={label}  onChange={onChange}/>
      </div>
    </div>
  );
}

export default InputWithLabel;
