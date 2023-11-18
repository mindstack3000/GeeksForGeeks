import React from "react";
import Header from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="heroSection w-full h-[900px] my-0.5 bg-[url('/hero.jpg')] bg-cover">
        <div className="heroSection__content flex flex-col items-start justify-center h-full text-white p-3">
          <h1 className="text-5xl font-bold">FreshFlow</h1>
          <h2 className="text-2xl font-medium text-black px-10">"Fresh Flow" streamlines food storage management by cataloging items, sending expiration alerts, suggesting recipes based on inventory, and offering storage tips. Its intuitive interface and data insights reduce waste, save money, and promote healthier eating, making it ideal for households and professional kitchens seeking efficient inventory control.</h2>
          <button className="bg-white text-black px-4 py-2 m-10 rounded-md">
            Explore
          </button>
          </div>
      </div>
      <div className="infoSection flex flex-col items-center justify-center h-full text-white p-3 m-0.5">
        <h1 className="text-5xl font-bold">How it works</h1>
        <h2 className="text-2xl font-medium text-black px-10">"Fresh Flow" streamlines food storage management by cataloging items, sending expiration alerts, suggesting recipes based on inventory, and offering storage tips. Its intuitive interface and data insights reduce waste, save money, and promote healthier eating, making it ideal for households and professional kitchens seeking efficient inventory control.</h2>
        <button className="bg-white text-black px-4 py-2 m-10 rounded-md">
          Explore
        </button>
      </div>
      <Footer />
    </main>
  );
}
