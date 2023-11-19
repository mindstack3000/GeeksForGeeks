"use client";

import SideNav from "@/components/dashboard/sidenav";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function WarehouseDashboard({ children }) {
  const [userAttributes, setUserAttributes] = React.useState({});
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = fetch(`http://localhost:5000/warehouse/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserAttributes(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
 
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
