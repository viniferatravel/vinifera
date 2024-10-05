import React from "react";
import { CircleCheck } from "lucide-react"

const highlights = [
  {
    name: "Panchmarhi",
    description: "Saputara ki Rani",
  },
  {
    name: "Bhimbhetka",
    description:
      "A UNESCO site to see archaeological treasures in the form of cave paintings that reveal the life story of pre-historic cave dwellers in India.",
  },
  {
    name: "Sanchi Stupa",
    description:
      "One of the oldest stone structures & UNESCO World Heritage site.",
  },
  {
    name: "Ujjain",
    description: "Mahakal Corridor, one of its kind in India.",
  },
  {
    name: "Manav Museum",
    description:
      "India’s greatest museum, exhibiting prehistorical landscapes and evidence of human settlement.",
  },
  {
    name: "Indore",
    description: "Cleanest city of India.",
  },
  {
    name: "Omkareshwar Temple",
    description: "It is one of the 12 revered Jyotirlinga shrines of Shiva.",
  },
  {
    name: "Maheshwar",
    description: "Famous for its sarees.",
  },
];
const Highlight = ({ selectedPackage }) => {
  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Highlights</h1>
      <ul className=" space-y-2">
        {selectedPackage?.highlights?.map((highlight, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
            {/* <h2 className="text-xl font-semibold">{highlight}</h2> */}
            <div className="inline-flex gap-1 items-center">
              <div>
                <CircleCheck className="h-4"/>
              </div>
              <p className="text-gray-700">
                {highlight}
              </p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Highlight;
