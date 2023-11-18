import React from "react";
import InfoCard from "@/components/dashboard/infocard";

function WareHouseDashboardRequest() {
  const userAttributes = {
    Name: "John Doe",
    Quanrtity: "105",
    Crop: "rice",
    Dutration: "1 year",
    PhoneNo: "+91-9876543210",
    Email: "abc@gmail.com",
  };

  return (
    <>
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        <InfoCard attributes={userAttributes} requriedButton={true} />
      </div>
    </>
  );
}

export default WareHouseDashboardRequest;
