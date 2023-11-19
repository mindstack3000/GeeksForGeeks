import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function WarehouseNavbar() {
  const handleChange = () => {
    localStorage.removeItem("user");
  };

  return (
    <header className="flex w-full justify-between bg-primary px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold text-white">Fresh Flow</h1>
      </div>
      <nav>
        <Button asChild variant="link" className="text-white">
          <Link href="/dashboard/warehouse/request">Dashboard</Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="text-white"
          onChange={handleChange}
        >
          <Link href="/login">Logout</Link>
        </Button>
      </nav>
    </header>
  );
}

export default WarehouseNavbar;
