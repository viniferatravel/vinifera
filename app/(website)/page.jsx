"use client";
import React, { useState, useEffect, useRef } from "react";
import CityCarousel from "@/_components/Home/CityCarousel";
import Landing from "@/_components/Home/Landing";
import PopularCarousel from "@/_components/Home/PopularCarousel";
import SpecialPackage from "@/_components/Home/SpecialPackage";
import SuperDeal from "@/_components/Home/SuperDeal";
import HomePackages from "@/_components/Home/HomePackages";
import ScrollCards from "@/_components/Home/ScrollCards";
import Destination from "@/_components/Home/Destination";
import FestSeason from "@/_components/Home/FestSeason";

export default function Home() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const specialPackageRef = useRef(null);

  useEffect(() => {
    const loadWidgetScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadWidgetScript();

    const abc = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/packageApi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setAllPackages(result.result);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    abc();
  }, []);

  return (
    <div className="flex flex-col w-full gap-0">
      <Landing allPackages={allPackages} />

      <div className="w-[95%] mx-auto flex flex-col gap-16 md:gap-24">
        <ScrollCards />
        <Destination allPackages={allPackages} />
        <FestSeason />

        <div ref={specialPackageRef}>
          <PopularCarousel
            popularPackages={allPackages.filter((item) =>
              item.category.includes("EXCLUSIVE")
            )}
            isLoading={loading}
          />
        </div>

        <SpecialPackage />
        <CityCarousel allPackages={allPackages} />
        <SuperDeal allPackages={allPackages} />
        <HomePackages allPackages={allPackages} />

        
        {/* <div className="w-full mb-16">
          <div className="text-2xl lg:text-3xl text-gray-600 font-bold mb-4">
            Instagram Post:
          </div>
          <iframe
            src="//lightwidget.com/widgets/fb4569c506bb5cda9ea70a42e6b61792.html"
            scrolling="no"
            allowTransparency="true"
            className="lightwidget-widget"
            style={{ width: "100%", border: "0", overflow: "hidden" }}
          ></iframe>
        </div> */}
      </div>
    </div>
  );
}
