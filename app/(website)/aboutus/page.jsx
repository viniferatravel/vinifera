'use client'
import React, { useState, useEffect } from "react";
import AboutCards from "@/_components/aboutus/AboutCards";
import ScrollCards from "@/_components/aboutus/ScrollCards";
import Landing from "@/_components/aboutus/Landing";
import CardSection from "@/_components/aboutus/CardSection";
import AboutTest from "@/_components/aboutus/AboutTest";

const AboutUs = () => {

  const [ packageReviews, setPackageReviews ] = useState({});

  useEffect(() => {

    try {

      const abc = async () => {
        const response1 = await fetch(`/api/reviewApi`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result1 = await response1.json();

        const groupedReviews = result1.result.reduce((acc, review) => {
          const { package_id } = review;
          if (!acc[package_id]) {
            acc[package_id] = [];
          }
          acc[package_id].push(review);
          return acc;
        }, {});
  
        setPackageReviews(groupedReviews)
      }

      abc ()



    } catch(error) {

    }

  }, [])
  
  return (
    <div>
      <Landing />
      <ScrollCards />
      <AboutTest packageReviews={packageReviews}/>
      <CardSection />
      <AboutCards />
    </div>
  );
};

export default AboutUs;
