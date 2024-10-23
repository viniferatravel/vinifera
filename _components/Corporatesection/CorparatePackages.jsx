import IMAGES from "@/public/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const CorporatePackages = () => {

  const router = useRouter();

  const [links, setlinks] = useState([]);
  // console.log(links, "links");

  const [international, setinternational] = useState([]);
  // console.log(international, "international");

  const [noninternational, setnoninternational] = useState([]);
  // console.log(noninternational, "noninternational");

  useEffect(() => {
    if (links) {
      const internationaldata = links.filter(link => link.sub_category.includes("INTERNATIONAL")).slice(0, 3);
   

      const noninternationaldata = links.filter(link => !link.sub_category.includes("INTERNATIONAL")).slice(0, 2);


      setinternational(internationaldata);
      setnoninternational(noninternationaldata)
    }

  }, [links]);

  useEffect(() => {
    async function getdata() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchallpackage",
      });

      setlinks(response.data.fetchalldata);
    }
    getdata();
  }, []);

  const mergedata = [...international, ...noninternational]
  // console.log(mergedata, "mergedata");

  const handleclick = (id) => {
    router.push(`/filterpage/${id}`)
  }

  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string') {
      return '';
    }

    return sentence
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="w-[95%] mx-auto my-10 py-10 flex flex-col gap-5">
      {/* Section Heading */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl lg:text-3xl text-center text-gray-600 font-bold underline decoration-themeColor">
          Treat your Team to Something Memorable
        </h2>
        <p className="text-gray-500 w-full lg:w-[60%] text-center">
          Discover the Power of Team Bonding on Unforgettable Corporate Tours to
          Inspiring Destinations. Elevate your team&apos;s experience, foster
          collaboration, and create lasting memories together!
        </p>
      </div>

      {/* Cards Section with Scroll Snapping */}
      <div className="flex lg:overflow-hidden overflow-x-scroll scroll-smooth whitespace-nowrap gap-4 hide-scrollbar-x scroll-snap-x snap-mandatory">
        {mergedata.map((pkg, index) => (
          <div
            key={index}
            className="flex-none w-[calc(80%-16px)] md:w-[calc(40%-16px)] lg:w-[calc(20%-16px)] h-96 flex items-center justify-center flex-col gap-5 snap-start cursor-pointer"
            onClick={() => handleclick(pkg.state)}
          >
            <div className="relative group rounded-2xl overflow-hidden w-full">
              <img
                src={pkg.package_image[0]}
                width={300}
                height={300}
                alt={pkg.destination}
                className="w-full h-full object-cover transition-all group-hover:scale-105"
                style={{ aspectRatio: "300/300", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/30 flex justify-between items-end p-3 text-white group-hover:bg-black/20 transition-all">
                <div className="flex justify-start items-start flex-col">
                  <h3 className="text-base font-bold">{capitalizeWords(pkg.state)}</h3>
                  <p className="text-xs">
                    <span className="font-semibold">{pkg.tour_itinerary.days}</span> Days{" "}
                    <span className="font-semibold">{pkg.tour_itinerary.nights}</span> Nights
                  </p>
                </div>
                <div className="flex justify-start items-center flex-col">
                  <p className="text-xs">Starts From</p>
                  <h3 className="text-base font-bold">&#8377; {pkg.price}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporatePackages;
