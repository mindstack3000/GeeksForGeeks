"use client";

import SideNav from "@/components/dashboard/sidenav";
import FarmerNavbar from "@/components/navbar/navbar_farmer";
import React, { useEffect } from "react";


function FarmerDashboardLayout({ children }) {
  const [userAttributes, setUserAttributes] = React.useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = fetch(
        `http://localhost:5000/farmer/getData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserAttributes(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
    <FarmerNavbar/>
    <div className=" flex h-screen w-screen flex-row overflow-hidden">
      <section className="flex h-screen w-1/6 flex-col items-center ">
        <SideNav userAttributes={userAttributes}  />
      </section>

      <section className="flex h-screen w-5/6 flex-col items-center">
        <>{children}</>
      </section>
    </div>
    </>
  );
}

export default FarmerDashboardLayout;
