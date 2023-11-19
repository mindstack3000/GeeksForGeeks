"use client";
import React, { useEffect } from "react";

import InfoCard from "@/components/dashboard/infocard";


function FarmerDashboard() {
  const [userAttributes, setUserAttributes] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = fetch(
        `http://localhost:5000/transaction/farmer-all-request/${user.id}`,
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
          setUserAttributes(data.allTransaction);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        {userAttributes.map((userAttribute, i) => (
          <InfoCard attributes={userAttribute} requriedButton={false} />
        ))}
       
      </div>
    </>
  );
}

export default FarmerDashboard;
