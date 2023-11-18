import React from "react";
import { Button } from "./button";


function Header() {
  return (
    <div className="flex w-full h-24 items-center justify-between bg-primary ">
        <div>
        <Button>FreshFlow</Button>
        </div>
        <div className="m-5 flex justify-evenly">
        <Button>Register</Button>
        <Button>LogIn</Button>
        </div>
    </div>
  );
}

export default Header;
