"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IMAGES from "@/public/image";
import Image from "next/image";

const Page = () => {

  const [fetchgroup, setfetchgroup] = useState([]);
  // console.log(fetchgroup, "fetchgroup");

  useEffect(() => {
    async function getData() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchallpackage",
      });
      const rawData = response.data.fetchalldata;
      const stateMap = {};

      // Loop through the raw data to process it
      for (const current of rawData) {
        const state = current.state;

        // Check if the state is already in the map
        if (!stateMap[state]) {
          // Initialize if not present
          stateMap[state] = {
            ...current,
            tourCount: 1
          };
        } else {
          // Compare prices and update if necessary
          if (parseInt(current.price.replace(/,/g, "")) < parseInt(stateMap[state].price.replace(/,/g, ""))) {
            stateMap[state] = {
              ...current,
              tourCount: stateMap[state].tourCount + 1
            };
          } else {
            // Increment the tour count for existing state
            stateMap[state].tourCount += 1;
          }
        }
      }

      // Convert the map back to an array
      const filteredData = Object.values(stateMap);
      // console.log(filteredData, "Filtered Data");
      setfetchgroup(filteredData);
    }
    getData();
  }, []);

  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string') {
      return ''; // Return an empty string or handle the fallback as needed
    }

    return sentence
      .toLowerCase() // Convert the whole sentence to lowercase
      .split(" ") // Split the sentence by spaces into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a sentence
  }


  return (
    <div className="flex flex-col w-[90%] mx-auto gap-5 my-5 lg:gap-10 lg:my-16">
      <div className="flex flex-col-reverse lg:flex-row justify-between border-b pb-8 lg:pb-16 gap-8">
        <div className="w-full lg:w-[60%] flex-col flex justify-center gap-5 lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-5">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-themeColor">Group Tours</h2>
            <h3 className="text-xl md:text-2xl font-medium">
              Creating Lasting Memories Together
            </h3>
          </div>
          <p className="text-justify text-gray-700">
            Creating cherished memories together is what we hold close to our
            hearts at Vinifera Tours. Our group tour packages offer journeys to
            global destinations ensuring comfort, excitement and a sense of
            family. With a legacy spanning decades as the best tour operators in
            India, we guarantee the perfect travel experience for all our group
            tours. Our thoughtfully chosen accommodations, expert tour leaders
            and well-planned itineraries ensure that every moment is filled with
            joy. Choose Vinifera Tours all-inclusive tours for memorable group
            adventures.
          </p>
        </div>

        <div className="w-full lg:w-[40%] h-72 relative group overflow-hidden rounded-xl shadow-lg">
          {fetchgroup.length > 0 && (
            <img
              src={IMAGES.GroupTours}
              width={300}
              height={300}
              alt=""
              className="w-full h-full object-cover transition-all group-hover:scale-105 aspect-[300/300]  "
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-themeColor">Indian Group Tours</h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium ">
          Breathe in the Beauty of Incredible India
        </h3>
        <p className="text-justify text-gray-700">
          Experience the diverse wonders of India with our exclusive group tour
          packages that cover the snow-capped peaks of the Himalayas, the
          sun-kissed beaches of Goa, the majestic forts of Rajasthan and the
          tranquil backwaters of Kerala. At Vinifera Tours, we take you on a
          journey through the heart of India&apos;s rich cultural tapestry, majestic
          landscapes and vibrant traditions. Come, breathe in the beauty of
          incredible India with our Indian group tour packages. India Group Tour
          Andaman Starting: ₹38,990 4 Tours India Group Tour Andhra Pradesh
          Starting: ₹34,990 5 Tours India Group Tour Goa Starting: ₹14,990 2
          Tours India Group Tour Gujarat Starting: ₹24,990 6 Tours India Group
          Tour
        </p>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {fetchgroup?.map((dest, id) => (
          <Link
            key={id}
            href={`/filterpage/${dest.state}`}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          >
            <img
              src={dest.package_image[0]}
              width={300}
              height={300}
              // alt={dest.name}
              className="w-full h-full object-cover transition-all group-hover:scale-105 aspect-[300/400] lg:aspect-[300/300] "
            />
            <div className="absolute inset-0  flex items-start justify-end p-4 text-white flex-col bg-black/30 hover:bg-black/40">
              <div>
                <h3 className="text-lg font-bold">{capitalizeWords(dest.state)}</h3>
              </div>
              <div className="flex gap-0 lg:gap-5 flex-col lg:flex-row lg:justify-between lg:items-center">
                <p className="flex justify-center items-center text-sm">
                  Price: <span className="text-sm font-extrabold"> &#8377; {dest.price}</span>

                </p>
                <span className="text-sm font-extrabold">{dest.tourCount} tours</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* {mobile view} */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
        {fetchgroup.map((dest, id) => (
          <Link
            key={id}
            href={`/filterpage/${dest.state}`}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <div className="w-full h-32 rounded-lg">
              <img
                src={dest.package_image[0]}
                // alt={dest.name}
                className="w-full h-full object-cover transition-all group-hover:scale-105 aspect-[300/400] lg:aspect-[300/300] "
              />
            </div>

            <div className="py-1 px-2">
              <p className="text-sm font-bold">{capitalizeWords(dest.state)}</p>
              <p className="mt-1 text-sm ">Starting: <span className="font-bold">&#8377; {dest.price}</span></p>
              <p className="mt-1 text-sm ">{dest.tourCount} Tours</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;





