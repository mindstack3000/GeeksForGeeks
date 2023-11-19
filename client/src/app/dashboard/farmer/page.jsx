import React from "react";

function FarmerDashboard() {
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
