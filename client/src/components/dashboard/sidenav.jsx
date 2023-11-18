import React from "react";
import Image from "next/image";

const SideNav = ({ userAttributes }) => {
  // Sample user attributes

  return (
    <div className="sideNav flex h-screen w-full flex-col items-center bg-muted p-3">
      {/* Circular Profile Image */}
      <div className="object-cover">
        <Image
          className="profileImage rounded-full
          object-cover object-center"
          src="/login.jpg"
          alt="Profile"
          width={150}
          height={150}
        />
      </div>

      {/* Array of Attributes */}
      <div className="attributes my-10 py-10 text-5xl text-black">
        {Object.keys(userAttributes).map((key) => (
          <div key={key} className="attribute mb-2 text-lg">
            <span className="font-bold">{key}:</span> {userAttributes[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
