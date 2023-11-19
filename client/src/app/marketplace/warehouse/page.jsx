"use client";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import PopUp from "@/components/popUp";
import WarehouseCard from "@/components/warehouseCard";

function WarehouseMarketplace() {
  const [storageSpaces, setStorageSpaces] = useState([]);
  const [isSumbit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    quantity: "",
    duration: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/marketplace", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStorageSpaces(data);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [tempType, setTempType] = useState("");
  const [temp, setTemp] = useState(undefined);
  const [capacity, setCapacity] = useState(undefined);

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
      console.log(storageSpace.tempType == tempType);
      return (
        storageSpace.tempType.toLowerCase() == tempType.toLowerCase() &&
        tempType
      );
    });

    if (temp) {
      filteredStorageSpaces = filteredStorageSpaces.filter((storageSpace) => {
        return (
          storageSpace.temp_low <= parseInt(temp) &&
          storageSpace.temp_high >= parseInt(temp) &&
          temp
        );
      });
    }

    if (capacity) {
      filteredStorageSpaces = filteredStorageSpaces.filter((storageSpace) => {
        return storageSpace.availableCapacity >= parseInt(capacity) && capacity;
      });
    }

    setFilteredStorageSpaces(filteredStorageSpaces);
  }, [search, tempType, temp, capacity, storageSpaces]);

  const handleSumbit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/transaction/farmer-purchase",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user?.token,
        },
        body: JSON.stringify({
          warehouseId : e.target.id,
          crop : "rice",

        })
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const [popForm, setPopForm] = useState({
    quantity: "",
    duration: "",
  });

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <>
      <Navbar />
      <section>
        {/* {isSumbit ? <PopUp onClose={() => setSubmit(false)} /> : null} */}


        {isPopUpOpen ? <PopUp 
        onClose={() =>{
          setIsPopUpOpen(false);
          setPopForm({
            quantity: "",
            duration: "",
          });
        }}
        setForm={setPopForm}
        form={popForm}
        submit={handleSumbit} /> : null}


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
      {console.log(filteredStorageSpaces, storageSpaces)}{" "}
      <div className="mt-10 h-[1px] w-full bg-input" />
      <section className="grid w-full grid-cols-1 xl:grid-cols-2">
        {
          // Map storageSpaces to WarehouseCard components
          filteredStorageSpaces.map((storageSpace) => (
            <WarehouseCard
              key={storageSpace.owner}
              warehouse={storageSpace}
              onClick={()=>setIsPopUpOpen(true)}
            />
          ))
        }
      </section>
    </>
  );
}

export default WarehouseMarketplace;
