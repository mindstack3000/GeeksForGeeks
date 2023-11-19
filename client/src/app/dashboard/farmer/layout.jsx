"use client";

import SideNav from "@/components/dashboard/sidenav";
import FarmerNavbar from "@/components/navbar/navbar_farmer";
import React, { useEffect } from "react";


function FarmerDashboardLayout({ children }) {
 
 


  return (
    <>
    <FarmerNavbar/>
    <div className=" flex h-screen w-screen flex-row overflow-hidden">
      <section className="flex h-screen w-1/6 flex-col items-center ">
        <SideNav userAttributes={{}} />
      </section>

      <section className="flex h-screen w-5/6 flex-col items-center">
        <>{children}</>
      </section>
    </div>
    </>
  );
}

export default FarmerDashboardLayout;
