"use client";

import React from "react";
import { Button } from "@/components/ui/button";

function LoginSelector({ value, set }) {
  const registerLinks = [
    {
      name: "Farmer",
      apiLink: "",
    },
    {
      name: "Warehouse",
      apiLink: "",
    },
    {
      name: "Customer",
      apiLink: "",
    },
  ];

  return (
    <div className="mb-3 flex w-fit  items-center justify-center gap-3 rounded-md border border-input p-2">
      {registerLinks.map((link) => (
        <Button
          key={link.name}
          variant={value === link.name ? "secondary" : "ghost"}
          onClick={() => {
            set(link.name);
          }}
        >
          {link.name}
        </Button>
      ))}
    </div>
  );
}

export default LoginSelector;
