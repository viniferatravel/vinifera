"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { DotIcon } from "lucide-react";
import "@/_components/Carousel.css";
import IMAGES from "@/public/image";
import { useRouter } from "next/navigation";

export default function CityCarousel({ allPackages }) {

  const states = allPackages ? Array.from(new Set(allPackages.map(trip => trip.state))) : [];

  const catWest = allPackages?.filter(item => item.sub_category.includes("WEST"));

  const citiesWest = allPackages ? Array.from(new Set(catWest?.map(trip => trip.city))) : [];

  const catEast = allPackages?.filter(item => item.sub_category.includes("EAST"));

  const citiesEast = allPackages ? Array.from(new Set(catEast?.map(trip => trip.city))) : [];

  const catNorth = allPackages?.filter(item => item.sub_category.includes("NORTH"));

  const citiesNorth = allPackages ? Array.from(new Set(catNorth?.map(trip => trip.city))) : [];

  const catSouth = allPackages?.filter(item => item.sub_category.includes("SOUTH"));

  const citiesSouth = allPackages ? Array.from(new Set(catSouth?.map(trip => trip.city))) : [];

  const router = useRouter();

  // console.log("STaes:::::>", catEast, citiesEast)

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


  const indiaTourData = [
    {
      region: "Western India",
      highlight: `Highlights of Rajasthan`,
      destinations: ["Kutch", "Hawa Mahal", "Pushkar"],
      days: "8 Days",
      price: "From ₹ 56,000",
      image: IMAGES.rajasthanhome,
    },
    {
      region: "Southern India",
      highlight: "Explore Kerala",
      destinations: ["Alleppey", "Munnar", "Kochi"],
      days: "7 Days",
      price: "From ₹ 45,000",
      image: IMAGES.rajasthanhome,
    },
    {
      region: "Northern India",
      highlight: "Himalayan Adventures",
      destinations: ["Shimla", "Manali", "Dharamshala"],
      days: "10 Days",
      price: "From ₹ 65,000",
      image: IMAGES.rajasthanhome,
    },
    {
      region: "Eastern India",
      highlight: "Splendors of Bengal",
      destinations: ["Sundarbans", "Darjeeling", "Kolkata"],
      days: "6 Days",
      price: "From ₹ 40,000",
      image: IMAGES.rajasthanhome,
    },
  ];


  const indiaTourDataa = [
    {
      region: "Western India",
      highlight: `Highlights of ${capitalizeWords(catWest[0]?.state || '')}`,
      destinations: citiesWest,
      days: `${catWest[0]?.tour_itinerary.days || ''} Days`,
      price: `From ₹ ${catWest[0]?.price || 'N/A'}`,
      image: catWest[0]?.package_image[0],
    },
    {
      region: "Southern India",
      highlight: `Explore ${capitalizeWords(catSouth[0]?.state || '')}`,
      destinations: citiesSouth,
      days: `${catSouth[0]?.tour_itinerary.days || ''} Days`,
      price: `From ₹ ${catSouth[0]?.price || 'N/A'}`,
      image: catSouth[0]?.package_image[0],
    },
    {
      region: "Northern India",
      highlight: "Himalayan Adventures",
      destinations: citiesNorth,
      days: `${catNorth[0]?.tour_itinerary.days || ''} Days`,
      price: `From ₹ ${catNorth[0]?.price || 'N/A'}`,
      image: catNorth[0]?.package_image[0],
    },
    {
      region: "Eastern India",
      highlight: `Splendors of ${capitalizeWords(catEast[0]?.state || '')}`,
      destinations: citiesEast,
      days: `${catEast[0]?.tour_itinerary.days || ''} Days`,
      price: `From ₹ ${catEast[0]?.price || 'N/A'}`,
      image: catEast[0]?.package_image[0],
    },
  ];

  const handleBookNow = (region) => {
    if (region === "Western India") {
      router.push(`/filterpage/WEST`)
    }

    if (region === "Southern India") {
      router.push(`/filterpage/SOUTH`)
    }

    if (region === "Northern India") {
      router.push(`/filterpage/NORTH`)
    }

    if (region === "Eastern India") {
      router.push(`/filterpage/EAST`)
    }
  }

  return (
    <div className="w-full h-auto">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        navigation={false}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper w-full"
        style={{
          "--swiper-navigation-size": "10px",
        }}
      >
        {
          allPackages.length === 0
            ? indiaTourData.map((tour, index) => (
              <SwiperSlide key={index} className="relative ">
                <div className="relative w-full h-72 md:h-[400px] rounded-3xl overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    className="object-cover w-full h-full"

                  />
                </div>
                <div className="absolute top-0 left-0 bg-black/45 w-full h-full rounded-3xl flex justify-center items-center">
                  <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-evenly items-start">
                    <div className="pl-4 border-l-3">
                      <span className="text-lg lg:text-xl text-white font-bold">
                        {tour.region}
                      </span>
                      <h2 className="text-2xl lg:text-4xl text-white font-bold">
                        {tour.highlight}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1 mb-4 lg:gap-5">
                      <div className="flex gap-1 lg:gap-5 justify-center items-center">
                        {tour.destinations.map((destination, i) => (
                          <React.Fragment key={i}>
                            <p className="lg:text-xl text-blue-200 font-medium">
                              {destination}
                            </p>
                            {i < tour.destinations.length - 1 && (
                              <DotIcon className="text-white" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div>
                        <p className="lg:text-xl text-white font-medium">
                          {tour.days} | {tour.price}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-white px-4 py-3 rounded-xl font-bold text-gray-600">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
            : indiaTourDataa?.map((tour, index) => (
              <SwiperSlide key={index} className="relative ">
                <div className="relative w-full h-72 md:h-[400px] rounded-3xl overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    className="object-cover w-full h-full"

                  />
                </div>
                <div className="absolute top-0 left-0 bg-black/45 w-full h-full rounded-3xl flex justify-center items-center">
                  <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-evenly items-start">
                    <div className="pl-4 border-l-3">
                      <span className="text-lg lg:text-xl text-white font-bold">
                        {tour.region}
                      </span>
                      <h2 className="text-2xl lg:text-4xl text-white font-bold">
                        {tour.highlight}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1 mb-4 lg:gap-5">
                      <div className="flex gap-x-2 lg:gap-x-5 justify-left items-center">
                        {tour.destinations.map((destination, i) => {
                          if (index <= 3) {
                            return (
                              <div key={i} className="flex items-center">
                                <p className="lg:text-xl text-blue-200 font-medium">
                                  {capitalizeWords(destination)}
                                </p>
                                {/* Render the DotIcon only if it's not the last destination */}
                                {i < tour.destinations.length - 1 && (
                                  <DotIcon className="text-white mx-1 lg:mx-2" />
                                )}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>


                      <div>
                        <p className="lg:text-xl text-white font-medium">
                          {tour.days} | {tour.price}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-white px-4 py-3 rounded-xl font-bold text-gray-600" onClick={() => handleBookNow(tour.region)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
        }

      </Swiper>
    </div>
  );
}
