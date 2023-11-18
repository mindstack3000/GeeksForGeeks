import React from "react";
import { Button } from "./ui/button";

const WarehouseCard = ({ warehouse }) => {
  return (
    <div className=" m-5 flex  flex-col items-start justify-center gap-5  rounded-md border border-input p-3">
      <div className=" flex w-full flex-col gap-5  sm:flex-row ">
        <div className="w-full rounded-lg bg-cover bg-center shadow-md sm:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Warehouse"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="">
            <h4 className=" scroll-m-20 text-xl font-semibold tracking-tight">
              Owner: {warehouse.owner}
            </h4>
            <p className="mb-4 scroll-m-20 text-lg font-medium tracking-tight">
              Available Capacity: {warehouse.availableCapacity}
            </p>
            <p>Location: {warehouse.location}</p>

            <p>Price: {warehouse.price}</p>
            <p>Temp Type: {warehouse.tempType}</p>
            <p>Certification: {warehouse.certification}</p>
            <p>Security: {warehouse.security}</p>
            <p>Phone No.: {warehouse.phoneNo}</p>
            <p>Email: {warehouse.email}</p>
            <p>Operating Hours: {warehouse.operatingHours}</p>
            <p>Closing Time: {warehouse.closingTime}</p>
            <p>Address: {warehouse.address}</p>
          </div>
        </div>
      </div>
      <Button>Send Request</Button>
    </div>
  );
};

export default WarehouseCard;
