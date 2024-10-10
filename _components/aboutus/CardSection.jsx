import { SendHorizontal } from "lucide-react";
import React from "react";

const CardSection = () => {
  const cardData = [
    {
      icon: <SendHorizontal size={40} />,
      title: "Explore Together",
      description: "We aim to make travel accessible to everyone by offering tailored packages that cater to your unique needs, ensuring unforgettable experiences across India.",
      iconColor: "text-blue-500", // Add color for icon
      bgColor: "bg-blue-100", // Add color for background
    },
    {
      icon: <SendHorizontal size={40} />,
      title: "Travel Specialists",
      description: "Our dedicated team of travel specialists is passionate about crafting the perfect itinerary, providing insider knowledge and support to make your journey seamless",
      iconColor: "text-green-500", // Different color
      bgColor: "bg-green-100", // Different background
    },
    {
      icon: <SendHorizontal size={40} />,
      title: "Quality Travel",
      description: "We believe that great travel experiences shouldn’t break the bank. Enjoy competitive rates without compromising on quality, so you can explore more for less.",
      iconColor: "text-red-500", // Different color
      bgColor: "bg-red-100", // Different background
    },
    {
      icon: <SendHorizontal size={40} />,
      title: "Custom Itineraries",
      description: "From family vacations to solo adventures, our personalized packages are designed to meet your preferences and make your dream trip a reality.",
      iconColor: "text-yellow-500", // Different color
      bgColor: "bg-yellow-100", // Different background
    },
    {
      icon: <SendHorizontal size={40} />,
      title: "Your Happiness",
      description: "We take pride in our commitment to customer satisfaction. Our goal is to ensure every traveler leaves with memories to cherish for a lifetime.",
      iconColor: "text-purple-500", // Different color
      bgColor: "bg-purple-100", // Different background
    },
    {
      icon: <SendHorizontal size={40} />,
      title: "Connect Together",
      description: "Join our growing community of travel enthusiasts! Share your adventures and tips, and stay updated on the latest offers and travel inspiration.",
      iconColor: "text-orange-500", // Different color
      bgColor: "bg-orange-100", // Different background
    },
  ];
  return (
    <div className="">
      <div className="flex justify-center items-center w-[95%] mx-auto gap-10 my-10">
        <div className="flex justify-center items-center flex-col gap-10 w-full py-10 ">
          <div>
            <h1 className="text-4xl font-semibold w-full  text-center">
            One Stop Platform for all your {" "}
               <span className="text-themeColor">
               travel needs
              </span>{" "}
            </h1>
          </div>
          <p className="text-gray-500 w-full lg:w-[50%] text-center">
          We at Vinifera strive to be your one stop solution for all your travel needs, With a rich experience in the industry you can rest assure and trust us with all your travel concerns
          </p>
          <div className="relative flex justify-center items-center w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full h-96 rounded-xl border bg-white px-4 py-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group gap-5"
                >
                  <div
                    className={`size-16 ${card.bgColor} flex justify-center items-center rounded-xl ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {React.cloneElement(card.icon, {
                      className: card.iconColor,
                    })}
                   
                  </div>
                  <h2 className="mt-4 text-xl lg:text-3xl font-semibold  rounded  transition-colors duration-300 group-hover:text-themeColor">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-gray-500 w-full text-base lg:text-lg">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <div
              class="absolute transform skew-x-0 inset-0 w-[60%] h-full  md:h-[60%] bg-red-100 m-auto rounded-full z-[-10]"
              style={{ transform: "skewY(-30deg)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
