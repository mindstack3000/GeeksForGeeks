"use client";
import React from 'react';
import InputWithLabel from './input_with_label';
import { useState } from 'react';
import { Button } from './ui/button';

const PopUp = ({ onClose }) => {
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
    <div className='flex flex-col w-80 border border-input p-2  z-30'>
      <button className="self-end p-2" 
        onClick={() => {
            toggle();
            onClose();
        }}

      >
        Close
      </button>
      <span className='m-4'>
        <InputWithLabel label={"Quantity"}/>
      </span>
      <span className='m-4'>
        <InputWithLabel label={"Duration"}/>
      </span>
      <div className='flex justify-end m-1'>
        <Button>Send Request</Button>
      </div>
    </div>
  );
};

export default PopUp;
