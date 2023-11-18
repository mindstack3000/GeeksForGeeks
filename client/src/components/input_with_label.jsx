import React from "react";
import { Input } from "@/components/ui/input";

function InputWithLabel({ label, input, setInput, type = "text" }) {
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <label>{label}:</label>
      <Input type={type} placeholder={label} />
    </div>
  );
}

export default InputWithLabel;
