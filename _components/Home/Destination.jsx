import IMAGES from "@/public/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

// const destinations = [
//     { image: IMAGES.ayodhya, name: "Ayodhya Tour", price: "₹16,000" }, // Approx. $200
//     { image: IMAGES.ayodhya, name: "Varanasi Experience", price: "₹20,000" }, // Approx. $250
//     { image: IMAGES.ayodhya, name: "Delhi Sightseeing", price: "₹24,000" }, // Approx. $300
//     { image: IMAGES.ayodhya, name: "Mumbai Adventure", price: "₹28,000" }, // Approx. $350
//     { image: IMAGES.ayodhya, name: "Kolkata Culture", price: "₹32,000" }, // Approx. $400
//     { image: IMAGES.ayodhya, name: "Bangalore City", price: "₹36,000" }, // Approx. $450
//     { image: IMAGES.ayodhya, name: "Chennai Exploration", price: "₹40,000" }, // Approx. $500
//     { image: IMAGES.ayodhya, name: "Hyderabad Heritage", price: "₹44,000" }, // Approx. $550
//   ];


const Destination = ({ allPackages }) => {

  const router = useRouter()

  const destinations = allPackages?.filter((item) => item.category.includes("INTERNATIONAL ADVENTURE"));

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold underline decoration-themeColor text-center">
      Top Trending International Tourist Destinations
      </h2>
      <p className="text-base lg:text-lg lg:w-[80%] text-center">
      You only live once—make it unforgettable! Explore breathtaking landscapes and vibrant cultures at these must-visit international destinations!
      </p>
      <div className="hidden lg:flex gap-3 w-full">
        <div className="min-h-[500px] grid grid-cols-2 gap-4 w-full">
          {destinations?.slice(0, 1).map((destination, index) => (
            <div
              key={index}
              className="border relative col-span-2 rounded-xl hover:scale-[1.01] hover:transition-all  hover:duration-1000 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/filterpage/${destination.state}`)}
            >
              <Image
                src={destination.package_image[2]}
                alt={`Destination ${index + 1}`}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0  w-full h-full bg-black/20 flex flex-col p-5 justify-end">
                <h2 className="text-white font-semibold text-lg">{destination.package_name}</h2>
                <p className="text-white">Starting {destination.price} pp </p>
              </div>
            </div>
          ))}
          {destinations?.slice(1, 3).map((destination, index) => (
            <div
              key={index}
              className="border relative col-span-1 rounded-xl hover:scale-[1.01] hover:transition-all  hover:duration-1000 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/filterpage/${destination.state}`)}
            >
              <Image
                src={destination.package_image[0]}
                alt={`Destination ${index + 1}`}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0  w-full h-full bg-black/20 flex flex-col p-5 justify-end">
                <h2 className="text-white font-semibold text-lg">{destination.package_name}</h2>
                <p className="text-white">Starting {destination.price} pp </p>
              </div>
            </div>
          ))}
        </div>
        <div className="min-h-[500px] grid grid-cols-1 gap-4 w-full">
          {destinations?.slice(3, 4).map((destination, index) => (
            <div
              key={index}
              className="border relative col-span-1 rounded-xl hover:scale-[1.01] hover:transition-all  hover:duration-1000 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/filterpage/${destination.state}`)}
            >
              <Image
                src={destination.package_image[1]}
                alt={`Destination ${index + 4}`}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0  w-full h-full bg-black/20 flex flex-col p-5 justify-end">
                <h2 className="text-white font-semibold text-lg">{destination.package_name}</h2>
                <p className="text-white">Starting {destination.price} pp </p>
              </div>
            </div>
          ))}
        </div>
        <div className="min-h-[500px] grid grid-cols-4 lg:grid-cols-2 gap-4 w-full">
          {destinations?.slice(4).map((destination, index) => (
            <div
              key={index}
              className="border relative col-span-1 rounded-xl hover:scale-[1.01] hover:transition-all  hover:duration-1000 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/filterpage/${destination.state}`)}
            >
              <Image
                src={destination.package_image[2]}
                alt={`Destination ${index + 5}`}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0  w-full h-full bg-black/20 flex flex-col p-5 justify-end">
                <h2 className="text-white font-semibold text-lg">{destination.package_name}</h2>
                <p className="text-white">Starting {destination.price} pp </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory p-5 gap-4 w-full mx-auto hide-scrollbar-x">
        {destinations?.map((item) => (
          <div
            key={item.id}
            className="relative flex-none w-[calc(80%-16px)] md:w-[calc(40%-16px)] h-72 md:h-96 flex items-center justify-center flex-col gap-5 snap-start cursor-pointer rounded-xl overflow-hidden lg:hidden"
            onClick={() => router.push(`/filterpage/${item.state}`)}
          >
            <Image
              src={item.package_image[1]}
              alt={`Destination`}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0  w-full h-full bg-black/20 flex flex-col p-5 justify-end">
              <h2 className="text-white font-semibold text-lg">{item.package_name}</h2>
              <p className="text-white">Starting {item.price} pp </p>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Destination;
