import InputWithLabel from "@/components/input_with_label";
import React from "react";

function FarmerLogin() {
  return (
    <div>
      <section></section>
      <section>
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Register
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Register as Farmer
          </p>
        </div>
        <div>
          <InputWithLabel label="Name" />
        </div>
      </section>
    </div>
  );
}

export default FarmerLogin;
