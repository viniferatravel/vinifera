import React from "react";
import AboutCards from "@/_components/aboutus/AboutCards";
import ScrollCards from "@/_components/aboutus/ScrollCards";
import Landing from "@/_components/aboutus/Landing";
import CardSection from "@/_components/aboutus/CardSection";

const page = () => {
  return (
    <div>
      <Landing />
      <ScrollCards />
      <CardSection />
      <AboutCards />
    </div>
  );
};

export default page;
