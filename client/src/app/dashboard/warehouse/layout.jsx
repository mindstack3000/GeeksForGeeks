"use client";

import SideNav from "@/components/dashboard/sidenav";
import { Button } from "@/components/ui/button";
import React, { Children } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function WarehouseDashboard({ children }) {
  const userAttributes = {
    Owner: "John Doe",
    Location: "105, San Francisco, New York, America.",
    Price: "$100",
    TempType: "Hot/Cold (0-27)",
    Certification: "A+",
    Security: "X",
    PhoneNo: "+91-9876543210",
    Email: "johndoe@gmail.com",
    Address: "home at earth",
    TypesofGoods: "grains",
  };

  const path = usePathname();

  return (
    <div className=" flex h-screen w-screen flex-row overflow-hidden">
      <section className="flex h-screen w-1/6 flex-col items-center ">
        <SideNav userAttributes={userAttributes} />
      </section>

      <section className="flex h-screen w-5/6 flex-col items-center">
        <div className="flex w-full items-center justify-between p-3">
          <Button
            asChild
            className="w-full"
            variant={path == "/dashboard/warehouse/request" ? "" : "secondary"}
          >
            <Link href="/dashboard/warehouse/request">Request</Link>
          </Button>
          <Button
            asChild
            className="w-full"
            variant={
              path == "/dashboard/warehouse/occupancies" ? "" : "secondary"
            }
          >
            <Link href="/dashboard/warehouse/occupancies">Occupancies</Link>
          </Button>
          <Button
            asChild
            className="w-full"
            variant={path == "/dashboard/warehouse/customer" ? "" : "secondary"}
          >
            <Link href="/dashboard/warehouse/customer">Customer</Link>
          </Button>
        </div>
        <>{children}</>
      </section>
    </div>
  );
}

export default WarehouseDashboard;
