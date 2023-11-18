import React from "react";

function RegisterLayout({ children }) {
  return (
    <>
      <div className="flex h-[100%] w-[90%]  gap-10 p-10">
        <section className="l hidden w-1/2  rounded-md bg-cover bg-center bg-no-repeat lg:flex ">
          <img
            src="/images/register_bg.jpg"
            alt=""
            className=" h-full w-full rounded-md object-cover object-center"
          />
        </section>

        <section className=" h-full w-full overflow-scroll lg:w-1/2">
          {children}
        </section>
      </div>
    </>
  );
}

export default RegisterLayout;
