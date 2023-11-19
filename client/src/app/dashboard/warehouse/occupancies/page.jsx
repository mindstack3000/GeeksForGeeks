"use client";
import React,{useEffect,useState} from "react";

import InfoCard from "@/components/dashboard/infocard";

function WareHouseDashboardOccupancies() {
  const [userAttributes, setUserAttributes] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = fetch(`http://localhost:5000/transaction/warehouse-request/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status : "accepted",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserAttributes(data.farmerInfo);
          setIds(data.Ids);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div
        className={`mt-5 flex w-full  flex-col items-start justify-center gap-5 p-10`}
      >
        <div>
          <div className="text-lg font-semibold">
            Total Capacity Occupied :{" "}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">Total Capacity Vacant : </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        {userAttributes.map((userAttribute, i) => (
          <InfoCard attributes={userAttribute} requriedButton={false}
        
          />
        ))}
      </div>
    </>
  );
}

export default WareHouseDashboardOccupancies;
