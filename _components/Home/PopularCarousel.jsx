// "use client";
// import { ChevronLeft, ChevronRight} from "lucide-react";
// import { FaStar } from "react-icons/fa";
// import Image from "next/image";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";


// const slides = [
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Best of Rajasthan",
//     description: "6 Days, 5 Nights",
//     price: "₹ 65,000",
//   },
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Spiritual Ayodhya",
//     description: "7 Days, 6 Nights",
//     price: "₹ 65,000",
//   },
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Mesmerizing Goa",
//     description: "5 Days, 4 Nights",
//     price: "₹ 65,000",
//   },
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Rann ke Rang",
//     description: "6 Days, 5 Nights",
//     price: "₹ 65,000",
//   },
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Item 5",
//     description: "6 Days, 5 Nights",
//     price: "₹ 65,000",
//   },
//   {
//     image:
//       "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
//     heading: "Item 6",
//     description: "6 Days, 5 Nights",
//     price: "₹ 65,000",
//   },
// ];

// const PopularCarousel = ({popularPackages}) => {
//   // State to track the active slide
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Function to move to the next slide
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === slides.length - 4 ? 0 : prevIndex + 1
//     ); // Ensure it loops after showing the last full set of 4 cards
//   };

//   // Function to move to the previous slide
//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 4 : prevIndex - 1
//     );
//   };



//   return (
//     <div className="flex flex-col gap-8 justify-center items-center">

//       <h2 className="text-2xl lg:text-3xl font-bold border-b-4 border-themeColor">Popular Packages</h2>
//       <p className="text-base lg:text-lg lg:w-[80%] text-center">
//         Explore amazing destinations, enjoy comfortable stays, and create
//         lasting memories all with packages designed to fit your budget and
//         delight every member.
//       </p>
//       {/* Desktop Carousel with 4 cards visible */}
//       <div className="hidden lg:flex overflow-hidden relative w-full">
//         <div
//           className="flex w-full transition-transform duration-500 ease-in-out gap-x-5"
//           style={{
//             transform: `translateX(calc(-${(currentIndex * 100) / 4}% - ${
//               currentIndex * 5
//             }px))`,
//           }}
//         >
//           <SlideCards popularPackages={popularPackages}/>
//         </div>

//         {/* Show buttons only on desktop */}
//         <button
//           className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-black/70 text-sky-100 p-2 rounded-full "
//           onClick={handlePrev}
//         >
//           <ChevronLeft className="text-bold" />
//         </button>
//         <button
//           className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-black/70 text-sky-100 p-2 rounded-full "
//           onClick={handleNext}
//         >
//           <ChevronRight className="text-bold" />
//         </button>
//       </div>

//       {/* Mobile Carousel with 1.5 cards visible */}
//       <div className="lg:hidden flex overflow-x-scroll relative w-full hide-scrollbar-x snap-x snap-mandatory scroll-smooth">
//         <div className="flex w-full transition-transform duration-500 ease-in-out gap-x-5  ">
//           <SlideCards />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularCarousel;

// const SlideCards = ({popularPackages}) => {

//   const router = useRouter()

//   const handleBookButton = (id) => {
//     router.push(`/packages/${id}`)
//   }

//   return (
//     <>
//       {popularPackages?.map((slide, index) => (
//         <div
//           key={index}
//           className="flex-none w-[calc(80%-15px)] lg:w-[calc(25%-15px)] h-96 flex items-center justify-center flex-col gap-5 snap-start"
//         >
//           <div className="w-full h-[70%]">
//             <Image
//               src={slide.package_image[0]}
//               alt={slide.package_name}
//               height={500}
//               width={500}
//               className="h-full w-full object-fill rounded-2xl"
//             />
//           </div>
//           <div className="flex w-full h-[30%] flex-col gap-2">
//             <div className="flex justify-between items-center">
//               <div className="flex gap-1">
//                 <FaStar className="size-3 lg:size-4 text-yellow-500" />
//                 <FaStar className="size-3 lg:size-4 text-yellow-500" />
//                 <FaStar className="size-3 lg:size-4 text-yellow-500" />
//                 <FaStar className="size-3 lg:size-4 text-yellow-500" />
//                 <FaStar className="size-3 lg:size-4 text-yellow-500" />
//               </div>
//               <span className="text-sm text-gray-500">Starting from</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-semibold">{slide.package_name}</h2>
//                 <p className="text-sm text-gray-500">{slide.tour_itinerary.days} Days, {slide.tour_itinerary.nights} Nights</p>
//               </div>
//               <div>
//                 <button onClick={() => handleBookButton(slide.package_id)} className="bg-themeColor p-2 lg:py-2 lg:px-4 rounded-xl text-sm lg:text-base font-semibold text-white">
//                   {slide.price}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


const PopularCarousel = ({ popularPackages, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = popularPackages.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides - 4 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
        Popular Packages
      </h2>
      <p className="text-base lg:text-lg lg:w-[80%] text-center">
        Explore amazing destinations, enjoy comfortable stays, and create
        lasting memories all with packages designed to fit your budget and
        delight every member.
      </p>

      {/* Desktop Carousel with 4 cards visible */}
      <div className="hidden lg:flex overflow-hidden relative w-full">
        <div
          className="flex w-full transition-transform duration-500 ease-in-out gap-x-5"
          style={{
            transform: `translateX(calc(-${(currentIndex * 100) / 4}% - ${currentIndex * 5
              }px))`,
          }}
        >
          <SlideCards popularPackages={popularPackages} isLoading={isLoading} />
        </div>

        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-black/70 text-sky-100 p-2 rounded-full"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-bold" />
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-black/70 text-sky-100 p-2 rounded-full"
          onClick={handleNext}
        >
          <ChevronRight className="text-bold" />
        </button>
      </div>

      {/* Mobile Carousel with 1.5 cards visible */}
      <div className="lg:hidden flex overflow-x-scroll relative w-full hide-scrollbar-x snap-x snap-mandatory scroll-smooth">
        <div className="flex w-full h-full transition-transform duration-500 ease-in-out gap-x-5 py-5">
          <SlideCards popularPackages={popularPackages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

const SlideCards = ({ popularPackages, isLoading }) => {
  const router = useRouter();

  const handleBookButton = (id) => {
    router.push(`/packages/${id}`);
  };


  const SkeletonCard = () => (
    <div
      className="flex-none w-[calc(80%-15px)] lg:w-[calc(25%-15px)] h-96 flex items-center justify-center flex-col gap-5"
    >
      <div className="w-full h-[70%] bg-gray-200 animate-pulse rounded-2xl"></div>
      <div className="flex w-full h-[30%] flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        // Separate the prioritized packages
        (() => {
          const prioritizedPackages = popularPackages?.filter((slide) =>
            ["Uttaranchal Chardham Yatra", "Tristhal Darshan With Ayodhya"].includes(slide.package_name)
          );

          const remainingPackages = popularPackages?.filter(
            (slide) => !["Uttaranchal Chardham Yatra", "Tristhal Darshan With Ayodhya"].includes(slide.package_name)
          );

          // Combine the prioritized packages with the remaining ones
          const packagesToDisplay = [...prioritizedPackages, ...remainingPackages];

          return packagesToDisplay?.map((slide, index) => (
            <div
              key={index}
              className="flex-none w-[calc(80%-15px)] lg:w-[calc(25%-15px)] h-96 flex items-center justify-center flex-col gap-5 snap-start cursor-pointer"
              onClick={() => handleBookButton(slide.package_id)}
            >
              <div className="w-full h-[70%]">
                <Image
                  src={slide.package_image[0]}
                  alt={slide.package_name}
                  height={500}
                  width={500}
                  className="h-full w-full object-fill rounded-2xl"
                />
              </div>
              <div className="flex w-full h-[30%] flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="size-3 lg:size-4 text-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 pr-4">Starting from</span>
                </div>
                <div className="flex justify-between items-start ">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {slide.package_name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {slide.tour_itinerary.days} Days,{" "}
                      {slide.tour_itinerary.nights} Nights
                    </p>
                  </div>
                  <motion.div className="box flex-1 flex justify-end pr-4"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      onClick={() => handleBookButton(slide.package_id)}
                      className="bg-themeColor p-2 lg:py-2 lg:px-4 rounded-xl text-sm lg:text-base font-semibold text-white hover:bg-red-950 transition-colors duration-300"
                    >
                      ₹ {slide.price}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          ));
        })()
      )}
    </>
  );


};

export default PopularCarousel;
