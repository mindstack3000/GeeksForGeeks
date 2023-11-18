"use client";
import React,{useEffect,useState} from "react";
import InfoCard from "@/components/dashboard/infocard";

function WareHouseDashboardRequest() {
  const [userAttributes, setUserAttributes] = React.useState({});
  console.log(localStorage.getItem("user"));
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = fetch(`http://localhost:5000/transaction/warehouse-request/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data,"request");
          setUserAttributes(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        <InfoCard attributes={userAttributes} requriedButton={true} />
      </div>
    </>
  );
}

export default WareHouseDashboardRequest;
