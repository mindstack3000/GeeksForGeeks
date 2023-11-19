"use client";
import React,{useEffect,useState} from "react";
import InfoCard from "@/components/dashboard/infocard";

function WareHouseDashboardRequest() {
  const [userAttributes, setUserAttributes] = useState([]);
  const [ids, setIds] = useState([]);

  const handleSubmitAccept = async(e,i) => {
    e.preventDefault();
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:5000/transaction/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          transactionId: ids[i],
        }),
      })
      const data = await response.json();
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleSubmitDeny = async(e,i) => {
    e.preventDefault();
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:5000/transaction/decline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          transactionId: ids[i],
        }),
      })
      const data = await response.json();
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  } 
    


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
          status : "pending",
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
      <div className="grid w-full grid-cols-3 flex-wrap justify-center gap-5 p-10">
        {
          userAttributes.map((userAttribute,index) => (
            <InfoCard attributes={userAttribute} requriedButton={true}
            onAccept={(e)=>handleSubmitAccept(e,index)}
            onDeny={(e)=>handleSubmitDeny(e,index)}
            />
            ))
        }
      </div>
    </>
  );
}

export default WareHouseDashboardRequest;
