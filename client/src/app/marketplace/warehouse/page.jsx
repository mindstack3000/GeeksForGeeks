"use client";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import WarehouseCard from "@/components/warehouseCard";

function WarehouseMarketplace() {
  const storageSpaces = [
    {
      owner: "John Doe",
      location: "Nagpur",
      availableCapacity: 100,
      price: "$50 per month",
      tempType: "Cold Storage",
      certification: "ISO 9001:2015",
      security: "24/7 surveillance",
      phoneNo: "123-456-7890",
      email: "john.doe@example.com",
      operatingHours: "8:00 AM - 6:00 PM",
      closingTime: "6:00 PM",
      temp_low: 0,
      temp_high: 10,
      address: "123 Storage Street, Nagpur",
    },
    {
      owner: "Jane Smith",
      location: "Nagpur",
      availableCapacity: 150,
      price: "$75 per month",
      tempType: "Hot Storage",
      certification: "Storage Association Certified",
      security: "Access card entry",
      phoneNo: "987-654-3210",
      email: "jane.smith@example.com",
      operatingHours: "9:00 AM - 7:00 PM",
      closingTime: "7:00 PM",
      temp_low: 10,
      temp_high: 20,
      address: "456 Storage Avenue, Nagpur",
    },
  ];

  const [search, setSearch] = useState("");
  const [tempType, setTempType] = useState("");
  const [temp, setTemp] = useState("");
  const [capacity, setCapacity] = useState("");

  const [filteredStorageSpaces, setFilteredStorageSpaces] =
    useState(storageSpaces);

  useEffect(() => {
    // Filter storageSpaces based on search, tempType, temp, and capacity

    if (!tempType && !temp && !capacity && !search) {
      setFilteredStorageSpaces(storageSpaces);
      return;
    }

    let filteredStorageSpaces = storageSpaces.filter((storageSpace) => {
      return storageSpace.owner.toLowerCase().includes(search.toLowerCase());
    });

    filteredStorageSpaces = filteredStorageSpaces.filter((storageSpace) => {
      return storageSpace.tempType
        .toLowerCase()
        .includes(tempType.toLowerCase());
    });

    filteredStorageSpaces = filteredStorageSpaces.filter((storageSpace) => {
      return (
        storageSpace.temp_low <= parseInt(temp) &&
        storageSpace.temp_high >= parseInt(temp) &&
        temp
      );
    });

    filteredStorageSpaces = filteredStorageSpaces.filter((storageSpace) => {
      return storageSpace.availableCapacity >= parseInt(capacity) && capacity;
    });

    setFilteredStorageSpaces(filteredStorageSpaces);
  }, [search, tempType, temp, capacity]);

  return (
    <>
      <Navbar />
      <section>
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Warehouse Marketplace
        </h1>
        <div className="mt-10 flex scroll-m-20 flex-col items-start justify-center gap-3 rounded-lg  ">
          <Label
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            htmlFor="search"
          >
            Search
          </Label>
          <Input
            id="search"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
            value={search}
          />
        </div>
      </section>

      <section className="mt-10 flex flex-col items-center  justify-center gap-8 md:flex-row md:gap-14">
        <div className="flex scroll-m-20 flex-col items-start justify-center gap-3 rounded-lg ">
          <label className="scroll-m-20 text-xl font-semibold tracking-tight">
            Types of Temperature
          </label>
          <div className="flex scroll-m-20 items-center justify-center gap-3 rounded-lg">
            <Button
              onClick={() => {
                if (tempType === "Hot Storage") {
                  setTempType("");
                  return;
                }
                setTempType("Hot Storage");
              }}
              variant={tempType === "Hot Storage" ? "" : "secondary"}
            >
              Hot Storage
            </Button>
            <Button
              onClick={() => {
                if (tempType === "Cold Storage") {
                  setTempType("");
                  return;
                }

                setTempType("Cold Storage");
              }}
              variant={tempType === "Cold Storage" ? "" : "secondary"}
            >
              Cold Storage
            </Button>
          </div>
        </div>

        <div className="flex w-full scroll-m-20 flex-col items-start justify-center gap-3 rounded-lg bg-white ">
          <label className="scroll-m-20 text-xl font-semibold tracking-tight">
            Temperature
          </label>
          <Input
            type="number"
            onChange={(e) => {
              setTemp(e.target.value);
            }}
            value={temp}
          />
        </div>

        <div className="flex w-full scroll-m-20 flex-col items-start justify-center gap-3 rounded-lg bg-white ">
          <label className="scroll-m-20 text-xl font-semibold tracking-tight">
            Capacity
          </label>
          <Input
            type="number"
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
            value={capacity}
          />
        </div>
      </section>

      <div className="mt-10 h-[1px] w-full bg-input" />

      <section className="grid w-full grid-cols-1 xl:grid-cols-2">
        {
          // Map storageSpaces to WarehouseCard components
          filteredStorageSpaces.map((storageSpace) => (
            <WarehouseCard key={storageSpace.owner} warehouse={storageSpace} />
          ))
        }
      </section>
    </>
  );
}

export default WarehouseMarketplace;
