"use client";

import React from "react";
import { Button } from "../ui/button";

export default function InfoCard({ attributes, requriedButton }) {
  const onDeny = (e) => {
    console.log("deny");
  };
  const onAccept = (e) => {
    console.log("accept");
  };

  return (
    <section className="w-full rounded-lg border border-input p-5 ">
      {Object.keys(attributes).map((key) => (
        <div className="flex items-center justify-between gap-5" key={key}>
          <span className="text-lg font-semibold">{key}</span>
          <span>{attributes[key]}</span>
        </div>
      ))}
      <div
        className={`${
          requriedButton ? "flex" : "hidden"
        } mt-10  w-full items-center justify-between gap-5`}
      >
        <Button variant="destructive" onClick={onDeny}>
          Deny
        </Button>
        <Button onClick={onAccept}>Accept</Button>
      </div>
    </section>
  );
}
