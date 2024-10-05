import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <div>
      <div className="flex flex-col w-[90%] mx-auto gap-5">
        <h2 className="text-2xl md:text-3xl font-bold my-4">
          Popular destinations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Paris",
              location: "France",
              src: "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg",
            },
            {
              name: "London",
              location: "United Kingdom",
              src: "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg",
            },
            {
              name: "Tokyo",
              location: "Japan",
              src: "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg",
            },
            {
              name: "New York",
              location: "United States",
              src: "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg",
            },
          ].map((dest, id) => (
            <Link
              key={id}
              href="#"
              className="relative group overflow-hidden rounded-lg shadow-lg"
              prefetch={false}
            >
              <img
                src={dest.src}
                width={300}
                height={200}
                alt={dest.name}
                className="w-full h-full object-cover transition-all group-hover:scale-105"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-4 text-white group-hover:bg-black/30">
                <div>
                  <h3 className="text-lg font-bold">{dest.name}</h3>
                  <p className="text-sm">{dest.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
