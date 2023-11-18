import React from "react";

function RegisterLayout({ children }) {
  return (
    <>
      <div className="flex h-screen w-full overflow-scroll">
        <section className="h-full w-1/2 bg-cover bg-center bg-no-repeat">
          <img
            src="/images/register_bg.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </section>

        <section className="h-full w-1/2 p-14">{children}</section>
      </div>
    </>
  );
}

export default RegisterLayout;
