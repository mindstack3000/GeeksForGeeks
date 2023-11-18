import React from "react";
import InfoCard from "@/components/dashboard/infocard";

function WareHouseDashboardOccupancies() {
  const farmerData = {
    farmerName: "John Doe",
    quantity: 100, // Replace with the actual quantity
    crop: "Wheat", // Replace with the actual crop
    duration: 6, // Replace with the actual duration in months
  };

  return (
    <>
      <div
        className={`mt-5 flex w-full  flex-col items-start justify-center gap-5 p-10`}
      >
        <p>
          <div className="text-lg font-semibold">
            Total Capacity Occupied :{" "}
          </div>
        </p>
        <p>
          <div className="text-lg font-semibold">Total Capacity Vacant : </div>
        </p>
      </div>
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        <InfoCard attributes={farmerData} requriedButton={false} />
      </div>
    </>
  );
}

export default WareHouseDashboardOccupancies;
