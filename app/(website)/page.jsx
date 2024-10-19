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
import Image from "next/image";
import InstagramReels from "@/_components/Home/InstagramPosts";

export default function Home() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  const specialPackageRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
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
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInstagramFeed = async () => {
      try {
        const url = `https://graph.instagram.com/me/media?fields=id,username,media_url,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setFeed(data);
      } catch (error) {
        console.error("Error fetching Instagram feed:", error);
      }
    };

    fetchPackages();
    fetchInstagramFeed();
  }, []);

  useEffect(() => {
    // Load the Elfsight script dynamically
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  console.log("Feed::::::::", feed);

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

        {feed && feed.data && (
          <div className="flex flex-col gap-8 justify-center items-center mb-16">
            <div className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
              Instagram Post
            </div>
            <InstagramReels instaFeed={feed} />
          </div>
        )}

        <div className="flex flex-col gap-8 justify-center items-center mb-16">
          <div className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
            Instagram Post
          </div>
          <div className="elfsight-app-e1bdc987-773e-4bcd-b599-634c90d40cd5 flex flex-col items-center justify-center" data-elfsight-app-lazy></div>
        </div>


      </div>
    </div>
  );
}
