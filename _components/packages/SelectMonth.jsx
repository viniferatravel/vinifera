"use client";
import axios from "axios";
import corporateone from "@/public/image/cp1.jpg";
import { AlarmClockCheck, CircleArrowRight, Clock, MapPin, Plane } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SelectMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const router = useRouter();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const [fetchcard, setfetchcard] = useState([]);
  // console.log(fetchcard, "fetchcard");

  useEffect(() => {
    async function getData() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchcardpackage"
      })
      // console.log(response.data.fetchsortdata, "check data");
      setfetchcard(response.data.fetchsortdata);
    }
    getData()
  }, [])

  const handlepackage = (id) => {
    if (id) {
      router.push(`/packages?id=${id}`);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("No package ID provided");
    }
  };
  

  return (
    <div className=" p-5 rounded-xl shadow-xl bg-white border flex flex-col gap-5">
      <div className="flex w-full">
        <p className="text-xl font-semibold">Famous Destinations</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <p>Uncover the enchanting beauty and cultural richness of India with our exclusive travel packages designed to highlight the country&apos;s most famous destinations.</p>
        {/* {months.map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthChange(month)}
            className={`p-2 rounded-xl border text-sm font-medium ${
              selectedMonth === month
                ? "bg-themeColor text-white border-themeColor"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {month}
          </button>
        ))} */}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold"> Tour Packages:</h2>

        <div className="w-full lg:h-[60vh] overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-5 lg:gap-0  hide-scrollbar-x ">
          <div className="flex gap-5 lg:flex-col lg:gap-5">

            <div className="grid grid-cols-1 gap-4 mt-5 cursor-pointer">
              {fetchcard && fetchcard.map((tour,index) => (
                <div key={index} className=" grid grid-cols-3 gap-5 p-2 border rounded-xl shadow-md"  onClick={() => handlepackage(tour?.package_id)}>
                  <div className=" h-[5rem] relative col-span-1"> 
                    <div className='relative h-[5rem] rounded-md'>
                      <Image
                        alt={tour.package_name}
                        src={tour.package_image[0]}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                        className="rounded-md"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 w-full">
                    <p className="font-semibold w-full">{tour.package_name}</p>

                    <div className="w-full flex-wrap flex justify-between items-center gap-2 mt-2">
                      <div className="flex justify-start items-center gap-2">
                        <MapPin className="w-[15px] h-[15px] text-[#ff0000]" />
                        <p>{tour.city}</p>
                      </div>

                      <div className="flex justify-start items-center gap-2">
                        <AlarmClockCheck className="w-[15px] h-[15px] text-[#ff0000]" />
                        {fetchcard.length > 0 && fetchcard[0].tour_itinerary ? (
                          <p className="text-sm flex justify-center items-center">
                            {fetchcard[0].tour_itinerary.days}D/{fetchcard[0].tour_itinerary.nights}N
                          </p>
                        ) : (
                          null
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="flex-shrink-0 w-[45%] lg:w-full flex flex-col border rounded-xl p-3 gap-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
                <div>
                  <CircleArrowRight className="text-gray-400" />
                </div>
                <div className="flex flex-col text-end">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <div>
                    <Clock className="size-5" />
                  </div>
                  <div>8 Nights/ 9 Days</div>
                </div>
                <div className="flex gap-5">
                  <button className="flex-1 bg-themeColor rounded-xl text-white p-2">
                    Tour Price Details
                  </button>
                  <button className="flex-1 border border-themeColor rounded-xl p-2 hover:bg-themeColor hover:text-white">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="flex gap-3 border-t py-3">
                <div className="flex justify-center items-center">
                  <Plane className="size-5" />
                </div>
                <p className="text-xl font-semibold">Mumbai</p>
              </div>
            </div>

            <div className="flex-shrink-0 w-[45%] lg:w-full flex flex-col border rounded-xl p-3 gap-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
                <div>
                  <CircleArrowRight className="text-gray-400" />
                </div>
                <div className="flex flex-col text-end">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <div>
                    <Clock className="size-5" />
                  </div>
                  <div>8 Nights/ 9 Days</div>
                </div>
                <div className="flex gap-5">
                  <button className="flex-1 bg-themeColor rounded-xl text-white p-2">
                    Tour Price Details
                  </button>
                  <button className="flex-1 border border-themeColor rounded-xl p-2 hover:bg-themeColor hover:text-white">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="flex gap-3 border-t py-3">
                <div className="flex justify-center items-center">
                  <Plane className="size-5" />
                </div>
                <p className="text-xl font-semibold">Mumbai</p>
              </div>
            </div>

            <div className="flex-shrink-0 w-[45%] lg:w-full flex flex-col border rounded-xl p-3 gap-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
                <div>
                  <CircleArrowRight className="text-gray-400" />
                </div>
                <div className="flex flex-col text-end">
                  <p className="text-base">Monday</p>
                  <p className="text-base font-semibold">Oct 21, 2024</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <div>
                    <Clock className="size-5" />
                  </div>
                  <div>8 Nights/ 9 Days</div>
                </div>
                <div className="flex gap-5">
                  <button className="flex-1 bg-themeColor rounded-xl text-white p-2">
                    Tour Price Details
                  </button>
                  <button className="flex-1 border border-themeColor rounded-xl p-2 hover:bg-themeColor hover:text-white">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="flex gap-3 border-t py-3">
                <div className="flex justify-center items-center">
                  <Plane className="size-5" />
                </div>
                <p className="text-xl font-semibold">Mumbai</p>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectMonth;
