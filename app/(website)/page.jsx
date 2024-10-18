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
        const url = `https://graph.instagram.com/me/media?fields=id,username,media_url&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`;
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

  console.log("Feed::::::::", feed)

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

        <div className="flex flex-col gap-8 justify-center items-center mb-16">
          <div className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
            Instagram Post
          </div>
          <div className="grid grid-cols-4 gap-4">
            {feed?.data?.slice(0, 4).map((post, index) => (
              <div key={post.id || index}>
                {post.media_url ? (
                  <Image
                    src={post.media_url}
                    alt={`Instagram post by ${post.username}`}
                    width={400}
                    height={300}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-400 h-300 bg-gray-200 flex justify-center items-center rounded-lg">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
