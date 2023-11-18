"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function RegisterSelector() {
  const path = usePathname();
  const router = useRouter();

  const registerLinks = [
    {
      name: "Farmer",
      link: "/register/farmer",
    },
    {
      name: "Warehouse",
      link: "/register/warehouse",
    },
  ];

  return (
    <div className="mb-3 flex w-fit  items-center justify-center gap-3 rounded-md border border-input p-2">
      {registerLinks.map((link) => (
        <Button
          key={link.name}
          variant={path === link.link ? "secondary" : "ghost"}
          onClick={() => {
            router.push(link.link);
          }}
        >
          {link.name}
        </Button>
      ))}
    </div>
  );
}

export default RegisterSelector;
