// "use client";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@nextui-org/react";
// import { useRouter } from "next/navigation";

// const sections = [
//   {
//     category: "Honeymoon",
//     packages: [

//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//     ],
//   },
//   {
//     category: "Adventure",
//     packages: [
//       {
//         package_image:
//         ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//       package_name: "Best of Rajasthan",
//       tour_itinerary: {
//         days: "6",
//         nights: "4",
//       },
//       price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//     ],
//   },
//   {
//     category: "Family",
//     packages: [
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//       {
//         package_image:
//         ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//       package_name: "Best of Rajasthan",
//       tour_itinerary: {
//         days: "6",
//         nights: "4",
//       },
//       price: "₹ 65,000",
//       },
//     ],
//   },
//   {
//     category: "Beach",
//     packages: [
//       {
//         package_image:
//         ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//       package_name: "Best of Rajasthan",
//       tour_itinerary: {
//         days: "6",
//         nights: "4",
//       },
//       price: "₹ 65,000",
//       },
//       {
//         package_image:
//           ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//         package_name: "Best of Rajasthan",
//         tour_itinerary: {
//           days: "6",
//           nights: "4",
//         },
//         price: "₹ 65,000",
//       },
//     ],
//   },
//   {
//     category: "Cultural",
//     packages: [
//       {
//         package_image:
//         ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//       package_name: "Best of Rajasthan",
//       tour_itinerary: {
//         days: "6",
//         nights: "4",
//       },
//       price: "₹ 65,000",
//       },
//       {
//         package_image:
//         ["https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg"],
//       package_name: "Best of Rajasthan",
//       tour_itinerary: {
//         days: "6",
//         nights: "4",
//       },
//       price: "₹ 65,000",
//       },
//     ],
//   },
// ];

// const ExclusiveTours = () => {
//   const router = useRouter();
//   const [sections, setSections] = useState([]);
//   const [currentIndices, setCurrentIndices] = useState(
//     Array(sections?.length).fill(0)
//   );
//   const [activeCategory, setActiveCategory] = useState("");
//   const sectionRefs = useRef([]);

//   const slidesToShow = 4;

//   const handleNext = (index) => {
//     setCurrentIndices((prevIndices) =>
//       prevIndices.map((currentIndex, idx) => {
//         if (idx === index) {
//           const totalSlides = sections[idx].packages.length;
//           return (currentIndex + 1) >= Math.ceil(totalSlides / slidesToShow)
//             ? 0 // Reset to first slide
//             : currentIndex + 1;
//         }
//         return currentIndex;
//       })
//     );
//   };

//   const handlePrev = (index) => {
//     setCurrentIndices((prevIndices) =>
//       prevIndices.map((currentIndex, idx) => {
//         if (idx === index) {
//           const totalSlides = sections[idx].packages.length;
//           return (currentIndex - 1 < 0)
//             ? Math.ceil(totalSlides / slidesToShow) - 1 // Go to last slide
//             : currentIndex - 1;
//         }
//         return currentIndex;
//       })
//     );
//   };



//   const initialFxn = async () => {
//     const response = await fetch(`/api/fetchcategory`,
//       {
//         method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             category: "EXCLUSIVE",
//             operation: "fetchdatacategorieswise"
//           }),
//       }
//     );
//     const result = await response.json();

//     const uniqueCategoriess = [...new Set(result.packages.flatMap(pkg => pkg.category))].filter((item) => item !== "EXCLUSIVE");

//     const sectionss = uniqueCategoriess.map(item => ({
//       category: item,
//       packages: result.packages.filter(pkg => pkg.category.includes(item)),
//     }));

//     setSections(sectionss);

//     if (sectionss.length > 0) {
//       setActiveCategory(sectionss[0].category);
//     }
//     setCurrentIndices(Array(sectionss.length).fill(0));

//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setActiveCategory(entry.target.dataset.category);
//         }
//       });
//     }, options);

//     sectionRefs.current.forEach((section) => {
//       if (section) {
//         observer.observe(section);
//       }
//     });

//     return () => {
//       sectionRefs.current.forEach((section) => {
//         if (section) {
//           observer.unobserve(section);
//         }
//       });
//     };
//   }

//   useEffect(() => {
//     initialFxn()
//   }, [])

//   const handleViewAll = (val) => {
//     router.push(`/filterpage/${val}`)
//   }


//   return (
//     <div className="flex flex-col gap-0 justify-center items-center py-10">
//       <div className="flex flex-col-reverse lg:flex-row justify-between border-b pb-8 lg:pb-16 gap-8 w-[95%] mx-auto">
//         <div className="w-full lg:w-[60%] flex-col flex justify-center gap-5 lg:gap-8">
//           <div className="flex flex-col gap-3 lg:gap-5">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-themeColor">Exclusive Tours</h2>
//             <h3 className="text-xl md:text-2xl font-medium">
//               Creating Lasting Memories Together
//             </h3>
//           </div>
//           <p className="text-justify text-gray-700">
//             Creating cherished memories together is what we hold close to our
//             hearts at Vinifera Tours. Our group tour packages offer journeys to
//             global destinations ensuring comfort, excitement and a sense of
//             family. With a legacy spanning decades as the best tour operators in
//             India, we guarantee the perfect travel experience for all our group
//             tours. Our thoughtfully chosen accommodations, expert tour leaders
//             and well-planned itineraries ensure that every moment is filled with
//             joy. Choose Vinifera Tours all-inclusive tours for memorable group
//             adventures.
//           </p>
//         </div>
//         <div className="w-full lg:w-[40%] h-72 relative group overflow-hidden rounded-xl shadow-lg">
//           <Image
//             src="/image/exclusive_packages.jpg"
//             width={800}
//             height={800}
//             alt=""
//             className="w-full h-full object-fill transition-all group-hover:scale-105 aspect-[300/300]  "

//           />
//         </div>
//       </div>

//       <div className="py-5 sticky top-20 bg-white z-30 w-full">
//         <ul className="text-base flex justify-center gap-4 w-[95%] mx-auto overflow-x-auto">
//           {sections.map((section, index) => (
//             <li
//               key={section.category}
//               className={`cursor-pointer px-4 py-2 transition-colors duration-300 border-b-2 ${activeCategory === section.category
//                 ? "border-themeColor text-themeColor"
//                 : ""
//                 }`}
//               onClick={() => {
//                 setActiveCategory(section.category);
//                 sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               {section.category}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex flex-col border-t w-[95%]">
//         {sections.map((section, index) => (
//           <div
//             key={section.category}
//             data-category={section.category}
//             ref={(el) => (sectionRefs.current[index] = el)}
//             className="h-[60vh] flex-col flex items-center justify-center  gap-5"
//           >
//             <div className="lg:py-5 relative flex w-[95%] mx-auto">
//               <h2 className="text-xl lg:text-2xl text-themeColor font-semibold">{section.category}</h2>

//               <div className="hidden lg:flex absolute top-0 right-0 gap-5">
//                 <button
//                   className="bg-gray-200 text-themeColor p-2 rounded-full"
//                   onClick={() => handlePrev(index)}
//                 >
//                   <ChevronLeft className="text-bold" />
//                 </button>
//                 <button
//                   className="bg-gray-200 text-themeColor p-2 rounded-full"
//                   onClick={() => handleNext(index)}
//                 >
//                   <ChevronRight className="text-bold" />
//                 </button>
//                 <div className="">
//                   <Button className="bg-themeColor text-white font-semibold" onClick={(e) => handleViewAll(section.category)}>View all</Button>
//                 </div>
//               </div>

//             </div>

//             <div className="flex w-[95%] mx-auto">
//               <div className="hidden lg:flex overflow-hidden relative w-full">
//                 <div
//                   className="flex w-full transition-transform duration-500 ease-in-out gap-x-5"
//                   style={{
//                     transform: `translateX(calc(-${(currentIndices[index] * 100) / slidesToShow
//                       }% - ${currentIndices[index] * 5}px))`,
//                   }}
//                 >
//                   <SlideCards slides={section.packages} />
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Carousel with 1.5 cards visible */}
//             <div className="flex w-[95%] mx-auto">
//               <div className="lg:hidden flex overflow-x-scroll relative w-full hide-scrollbar-x snap-x snap-mandatory scroll-smooth">
//                 <div className="flex w-full transition-transform duration-500 ease-in-out gap-x-5 ">
//                   <SlideCards slides={section.packages} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SlideCards = ({ slides }) => {
//   return (
//     <>
//       {slides?.map((slide, index) => (
//         <div
//           key={index}
//           className="flex-none w-[calc(80%-15px)] lg:w-[calc(25%-15px)] h-80 flex items-center justify-center flex-col gap-2 snap-start border rounded-2xl shadow-lg p-2"
//         >
//           <img src={slide.package_image[0]} alt={slide.heading} className="w-full h-full rounded-xl object-cover" />
//           <div className="w-full text-left p-2">
//             <h3 className="text-lg font-bold">{slide.package_name}</h3>
//             <div className="flex justify-between">
//               <div className="flex gap-2 justify-center items-baseline">
//                 <p className="text-gray-700 text-[12px]">Starts from </p><p className="text-themeColor">{slide.price + "*"}</p>
//               </div>
//               <p className="text-gray-700">{`${slide.tour_itinerary.days} Days, ${slide.tour_itinerary.nights} Nights`}</p>
//             </div>

//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ExclusiveTours;



"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "@/app/styles/swiper.css";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const ExclusiveTours = () => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const sectionRefs = useRef([]);
  const router = useRouter();

  // Fetch data when the component mounts
  const initialFxn = async () => {
    const response = await fetch(`/api/fetchcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "EXCLUSIVE",
        operation: "fetchdatacategorieswise",
      }),
    });

    const result = await response.json();

    // Extract unique categories from packages
    const uniqueCategories = [
      ...new Set(result.packages.flatMap((pkg) => pkg.category)),
    ].filter((item) => item !== "EXCLUSIVE");

    // Map categories to their respective packages
    const sectionsData = uniqueCategories.map((item) => ({
      category: item,
      packages: result.packages.filter((pkg) => pkg.category.includes(item)),
    }));

    setSections(sectionsData);
    setActiveCategory(sectionsData[0]?.category); // Set the first category as active
    sectionRefs.current = sectionsData.map(() => React.createRef()); // Create refs for each section
    setLoading(false);
  };

  useEffect(() => {
    initialFxn();
  }, []);

  // Scroll handler to update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (
          ref.current &&
          ref.current.getBoundingClientRect().top + window.scrollY <
          scrollPosition
        ) {
          setActiveCategory(sections[index].category);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  // Function to handle category click with a 150px offset
  const handleCategoryClick = (index) => {
    setActiveCategory(sections[index].category); // Set active category
    const targetSection = sectionRefs.current[index]; // Get section reference

    if (targetSection) {
      const targetPosition =
        targetSection.current.getBoundingClientRect().top + window.scrollY; // Get absolute position of section
      window.scrollTo({
        top: targetPosition - 150, // Offset by 150 pixels
        behavior: "smooth", // Smooth scroll behavior
      });
    }
  };

  const handleViewAll = (val) => {
    router.push(`/filterpage/${val}`);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const handleCardClick = (id) => {
    router.push(`/packages?id=${id}`)
  }
  
  return (
    <div>
      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="flex flex-col gap-0 justify-center items-center pt-10"
      >
        <div className="flex flex-col-reverse lg:flex-row justify-between border-b pb-8 lg:pb-16 gap-8 w-[95%] mx-auto">
          <div className="w-full lg:w-[60%] flex-col flex justify-center gap-5 lg:gap-8">
            <div className="flex flex-col gap-3 lg:gap-5">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-themeColor">
                Exclusive Tours
              </h2>
              <h3 className="text-xl md:text-2xl font-medium">
                Creating Lasting Memories Together
              </h3>
            </div>
            <p className="text-justify text-gray-700">
              Creating cherished memories together is what we hold close to our
              hearts at Vinifera Tours. Our group tour packages offer journeys to
              global destinations ensuring comfort, excitement and a sense of
              family. With a legacy spanning decades as the best tour operators in
              India, we guarantee the perfect travel experience for all our group
              tours. Our thoughtfully chosen accommodations, expert tour leaders
              and well-planned itineraries ensure that every moment is filled with
              joy. Choose Vinifera Tours all-inclusive tours for memorable group
              adventures.
            </p>
          </div>
          <div className="w-full lg:w-[40%] h-72 relative group overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/image/exclusive_packages.jpg"
              width={800}
              height={800}
              alt="special-tours"
              className="w-full h-full object-fill transition-all group-hover:scale-105 aspect-[300/300]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Menu */}
      {loading ? (
        <div className="animate-pulse w-full h-20 bg-gray-100 rounded-2xl flex flex-col justify-between p-4">
          <div className="bg-gray-200 h-52 w-full rounded-xl"></div>
        </div>
      ) : (
        <div className="sticky top-20 bg-white border-b z-30 overflow-x-auto">
          <ul className="flex justify-center">
            {sections.map((section, index) => (
              <li key={index} className="px-2 py-5">
                <button
                  onClick={() => handleCategoryClick(index)}
                  className={`p-2 pb-2 border-b-2 text-xs md:text-base ${activeCategory === section.category
                    ? "text-red-500 border-themeColor"
                    : ""
                    }`}
                >
                  {section.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections with Swiper */}
      <div>
        {sections.map((section, index) => (
          <div
            key={index}
            ref={sectionRefs.current[index]}
            className="h-full px-4 py-8 flex flex-col gap-8 w-full lg:w-[95%] mx-auto"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
                {section.category}
              </h2>
              <div className="flex justify-center items-center">
                <Button
                  className="bg-themeColor text-white font-semibold hidden lg:flex"
                  onClick={() => handleViewAll(section.category)}
                >
                  View all
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="flex gap-4">
                {/* Skeleton Loader */}
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse w-60 h-80 bg-gray-100 rounded-2xl flex flex-col justify-between p-4"
                  >
                    <div className="bg-gray-300 h-52 w-full rounded-xl"></div>
                    <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                slidesPerView={1.2}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="placesSwiperPackage"
                breakpoints={{
                  640: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
              >
                {section.packages?.map((slide, index) => (
                  <SwiperSlide key={index} onClick={() => handleCardClick(slide.package_id)} className="cursor-pointer">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      variants={sectionVariants}
                      className="w-full h-80 flex items-center justify-center flex-col gap-2 snap-start border rounded-2xl p-2 bg-gray-50 shadow"
                    >
                      <div className="w-full min-h-52 overflow-hidden relative group rounded-xl">
                        <Image
                          src={slide.package_image[0]}
                          alt={slide.package_name}
                          height={500}
                          width={500}
                          className="h-full w-full object-fill transition-all group-hover:scale-105 aspect-[300/300] "
                        />
                      </div>

                      <div className="w-full text-left p-2 h-full">
                        <h3 className="text-lg font-bold">
                          {slide.package_name}
                        </h3>
                        <div className="text-sm">{slide.location}</div>
                        <div className="flex justify-between">
                          <div className="flex gap-2 justify-center items-baseline">
                            <p className="text-gray-700 text-[12px]">Starts from </p><p className="text-themeColor">{slide.price + "*"}</p>
                          </div>
                          <p className="text-gray-700">{`${slide.tour_itinerary.days} Days, ${slide.tour_itinerary.nights} Nights`}</p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveTours;


