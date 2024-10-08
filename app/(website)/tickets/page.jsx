"use client";
import React, { useRef } from "react";
import Landing from "@/_components/tickets/Landing";
import MultiServices from "@/_components/tickets/MultiServices";
import Travel from "@/_components/tickets/Travel";
import DailyBooking from "@/_components/tickets/DailyBooking";
import Work from "@/_components/tickets/Work";
import Contact from "@/_components/tickets/Contact";
import Accordian from "@/_components/tickets/Accordian";
import Explore from "@/_components/tickets/Explore"
import Whychoose from "@/_components/tickets/Whychoose";


const Page = () => {
  const contactRef = useRef(null); // Create a ref for Contact component

  const smoothScrollTo = (target) => {
    if (target.current) {
      const yOffset = -100; // Adjust this value to your needs (e.g., height of your header)
      const y = target.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-16">
      <Landing />
      <div className="w-[95%] mx-auto flex flex-col gap-16">
        {/* Pass smoothScrollTo as a prop to MultiServices */}
        <MultiServices scrollToContact={() => smoothScrollTo(contactRef)} />
        <Travel />
      </div>

      <Whychoose />

      <div className="w-[95%] mx-auto flex flex-col gap-16">
        <DailyBooking />
        <Work />
        <Explore/>
        {/* Use the ref in the Contact component */}
        <div ref={contactRef}>
          <Contact />
        </div>
        <Accordian/>
      </div>
      
      {/* Use the ref in the Contact component */}
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default Page;

