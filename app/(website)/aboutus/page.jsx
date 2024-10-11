import React from "react";
import AboutCards from "@/_components/aboutus/AboutCards";
import ScrollCards from "@/_components/aboutus/ScrollCards";
import Landing from "@/_components/aboutus/Landing";
import CardSection from "@/_components/aboutus/CardSection";
import AboutTest from "@/_components/aboutus/AboutTest";

const page = () => {
  return (
    <div>
      <Landing />
      <ScrollCards />
      <AboutTest/>
      <CardSection />
      <AboutCards />
    </div>
  );
};

export default page;
