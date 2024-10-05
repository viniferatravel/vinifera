'use client'
import React, { useState, useEffect } from "react";
import TestCard from "@/_components/testimonials/TestCard";
import Landing from "@/_components/testimonials/Landing";

const Page = () => {

  const [ packageReviews, setPackageReviews ] = useState([]);
  const [ allPackages, setAllPackages ] = useState([]);

  useEffect(() => {
    const abc = async () => {
      const response = await fetch(`/api/packageApi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setAllPackages(result.result);

      const response1 = await fetch(`/api/reviewApi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result1 = await response1.json();

      setPackageReviews(result1.result)
    };

    abc();
  }, []);

  return (
    <div>
      <Landing />
      <TestCard packageReviews={packageReviews} allPackages={allPackages}/>
    </div>
  );
};

export default Page;
