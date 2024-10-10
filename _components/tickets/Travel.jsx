import React from "react";
import Image from "next/image";
import IMAGES from "@/public/image";
import { DotIcon } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Travel = () => {

  const router = useRouter()
  
  return (
    <div>
      <div className="relative w-full h-72 md:h-[400px] rounded-3xl overflow-hidden">
        <Image
          src={IMAGES.tickettravel}
          alt=""
          fill
          className="object-cover w-full h-full "
        />
      <div className="absolute top-0 left-0 bg-black/30 w-full h-full rounded-3xl flex justify-center items-center">
        <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-evenly items-start">
          <div className="pl-4 border-l-3">
            <span className="text-lg lg:text-xl text-white font-bold">
              Book all your tickets in advance and
            </span>
            <h2 className="text-2xl lg:text-4xl text-white font-bold">
              Travel Happily!
            </h2>
          </div>
          <div className="flex flex-col gap-1 mb-4 lg:gap-5">
            <div className="flex gap-1 lg:gap-3 justify-center items-center">
              <p className="lg:text-xl text-blue-200 font-medium">
              Flights
              </p>
              <DotIcon className="text-white" />
              <p className="lg:text-xl text-blue-200 font-medium">
              Trains
              </p>
              <DotIcon className="text-white" />
              <p className="lg:text-xl text-blue-200 font-medium">
             Busses
              </p>
              <DotIcon className="text-white" />
              <p className="lg:text-xl text-blue-200 font-medium">
             Cars
              </p>

            </div>
           
          </div>
          <div>
          <button className="flex justify-center items-center gap-3 text-white px-4 py-3 rounded-full font-semibold bg-themeColor"
          onClick={() => {
            router.push(`/filterpage/ALL`)
          }}
          >
                Book Now
                <span><FaArrowRight /></span>
              </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Travel;
