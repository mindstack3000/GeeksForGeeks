"use client";
import React from "react";
import InputWithLabel from "./input_with_label";
import { useState } from "react";
import { Button } from "./ui/button";

const PopUp = ({ onClose, submit, setForm, form }) => {
  const [isOpened, setIsOpened] = useState(true);
  const toggle = () => setIsOpened(!isOpened);
  React.useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened]);
  if (!isOpened) return null;
  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-50">
      <div className="sticky left-1/2 top-1/2 z-30 flex h-60 w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-md border border-input bg-white p-2">
        <button
          className="self-end p-2"
          onClick={() => {
            toggle();
            onClose();
          }}
        >
          Close
        </button>
        <span className="m-4">
          <InputWithLabel
            label={"Quantity"}
            type="number"
            onChange={(e) => {
              setForm({ ...form, quantity: e.target.value });
            }}
          />
        </span>
        <span className="m-4">
          <InputWithLabel
            label={"Duration"}
            type="number"
            onChange={(e) => {
              setForm({ ...form, duration: e.target.value });
            }}
          />
        </span>
        <div className="m-1 flex justify-end">
          <Button onClick={submit}>Send Request</Button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
