import React from 'react';
import Image from 'next/image';

const SideNav = () => {
  // Sample user attributes
  const userAttributes = {
    Owner: "John Doe",
    Location: "105, San Francisco, New York, America.",
    Price: "$100",
    TempType: "Hot/Cold (0-27)",
    Certification: "A+",
    Security: "X",
    PhoneNo: "+91-9876543210",
    Email: "johndoe@gmail.com",
    Address: "home at earth",
    TypesofGoods: "grains",
  };

  return (
    <div className="sideNav bg-slate-50 h-screen w-60 p-3 flex flex-col items-center">
      {/* Circular Profile Image */}
      <div className='object-cover'>
        <Image
          className="profileImage mb-5 rounded-full overflow-hidden"
          src="/login.jpg"
          alt="Profile"
          width={150}
          height={150}
        />
      </div>

      {/* Array of Attributes */}
      <div className="attributes my-10 py-10 text-black text-5xl">
        {Object.keys(userAttributes).map((key) => (
          <div key={key} className="attribute text-lg mb-2">
            <span className="font-bold">{key}:</span> {userAttributes[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
