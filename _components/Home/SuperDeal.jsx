"use client";
import {
  Building,
  Bus,
  BusFront,
  Camera,
  Car,
  ChevronRight,
  MapPin,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import GuestModal from "@/_components/packages/Modal";
import IMAGES from "@/public/image";

const SuperDeal = ({ allPackages }) => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [enquiryClickModal, setEnquiryClickModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState({});

  const [activeItem, setActiveItem] = useState("item1");

  const handleButtonClick = (item) => {
    setActiveItem(item);
  };

  const getData = () => {
    switch (activeItem) {
      case "item1":
        return allPackages.filter((item) => item.state === "rajasthan");
      case "item2":
        return allPackages.filter((item) => item.state === "gujarat");
      case "item3":
        return allPackages.filter((item) => item.city === "allahabad" || item.city === "ayodhya" || item.city === "prayagraj");
      default:
        return [];
    }
  };

  const handleViewDetails = (id) => {
    router.push(`packages/${id}`);
  };

  const handleCloseEnquiryModal = (val) => {
    setEnquiryClickModal(val);
  };

  return (

    <div className="flex flex-col gap-8 justify-center items-center overflow-hidden">
      <h2 className="text-2xl lg:text-3xl font-bold border-b-4 text-gray-600 border-themeColor text-center">
        Incredible Packages
      </h2>

      <div className="px-6">
        <div className="mb-4 flex">
          <button
            className={`py-2 px-4 mx-2 rounded ${activeItem === "item1"
                ? "bg-blue-700 text-white font-semibold"
                : "border border-gray-200 font-semibold"
              }`}
            onClick={() => handleButtonClick("item1")}
          >
            Rajasthan Packages
          </button>
          <button
            className={`py-2 px-4 mx-2 rounded ${activeItem === "item2"
                ? "bg-blue-700 text-white font-semibold"
                : "border border-gray-200 font-semibold"
              }`}
            onClick={() => handleButtonClick("item2")}
          >
            Gujarat Packages
          </button>
          <button
            className={`py-2 px-4 mx-2 rounded ${activeItem === "item3"
                ? "bg-blue-700 text-white font-semibold"
                : "border border-gray-200 font-semibold"
              }`}
            onClick={() => handleButtonClick("item3")}
          >
            Ayodhya Packages
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="mt-4 flex lg:grid lg:grid-cols-3 w-full gap-5 lg:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {getData().map((card) => (
          <div
            key={card.package_id}
            className="flex-shrink-0 w-full border-2 border-gray-300 rounded-2xl flex flex-col justify-between gap-4 min-h-[400px] snap-start overflow-hidden"
          >
            <div className="relative h-[250px] group overflow-hidden">
              <Image
                src={card.package_image[0]}
                alt={card.package_name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all group-hover:scale-105 aspect-[300/300]"
              />

              <div className="absolute left-0 right-0 bottom-3 mx-auto flex justify-end items-center gap-5 px-5">
                <div className="size-8 backdrop-blur-lg bg-white/40 rounded-full flex justify-center items-center">
                  <Car className="text-white size-5" />
                </div>
                <div className="size-8 backdrop-blur-lg bg-white/40 rounded-full flex justify-center items-center">
                  <BusFront className="text-white size-5" />
                </div>
                <div className="size-8 backdrop-blur-lg bg-white/40 rounded-full flex justify-center items-center">
                  <Utensils className="text-white size-5" />
                </div>
                <div className="size-8 backdrop-blur-lg bg-white/40 rounded-full flex justify-center items-center">
                  <Camera className="text-white size-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="min-h-14 flex items-center px-2">
                <h2 className="text-lg font-semibold">{card.package_name}</h2>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-center lg:pt-2 ">
                  <div className="flex gap-3">
                    <div>
                      <MapPin className="text-gray-400 " />
                    </div>
                    <p className="text-gray-500">
                      <span className="font-semibold text-black">1</span>{" "}
                      Country |{" "}
                      <span className="font-semibold text-black">
                        {card.tour_itinerary.cities}
                      </span>{" "}
                      Cities |{" "}
                      <span className="font-semibold text-black">
                        {card.tour_itinerary.days}
                      </span>{" "}
                      Days,{" "}
                      <span className="font-semibold text-black">
                        {card.tour_itinerary.nights}
                      </span>{" "}
                      Nights
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-5 flex flex-col gap-2 ">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center bg-green-600 text-white px-2 py-[2px] rounded-lg gap-2">
                  <div>
                    <FaStar />
                  </div>
                  <span>5</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">SUPER DEAL PRICE</h3>
                </div>
              </div>
              <div className="flex flex-between">
                <div className="flex-1">
                  <p>Highly rated</p>
                </div>
                <div className="flex flex-1 flex-col ">
                  <p className="text-end text-gray-400">Starts from</p>
                  <h3 className="text-end text-xl font-semibold">
                    {card.price}
                  </h3>
                  <p className="text-end text-gray-400">per person </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-10 pt-2">
                <button
                  className="p-4 flex-1 border rounded-xl border-gray-400 text-gray-600 font-semibold"
                  onClick={() => {
                    setEnquiryClickModal(true);
                    setSelectedTour(card);
                  }}
                >
                  Enquire Now
                </button>
                <button
                  onClick={() => handleViewDetails(card.package_id)}
                  className="p-4 flex-1 border rounded-xl bg-themeColor text-white font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        <div>
          <GuestModal enquiryClickModal={enquiryClickModal} onCloseEnquiryModal={handleCloseEnquiryModal} action={"enquiry"} selectedPackage={selectedTour} />
        </div>
      </div>
    </div>
  );
};

export default SuperDeal;
