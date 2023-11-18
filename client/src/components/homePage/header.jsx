import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="flex h-24 w-full items-center justify-between bg-primary ">
      <div className="mx-3">
        <Button>FreshFlow</Button>
      </div>
      <div className="mx-5 flex justify-evenly">
        <span className="mx-3">
          <Button asChild className="bg-white text-primary hover:bg-secondary">
            <Link href="/register/farmer">Register</Link>
          </Button>
        </span>
        <span className="mx-3">
          <Button asChild className="bg-white text-primary hover:bg-secondary">
            <Link href="/login">Login</Link>
          </Button>
        </span>
      </div>
    </div>
  );
}

export default Header;
