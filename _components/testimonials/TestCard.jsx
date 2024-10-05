'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IMAGES from "@/public/image";
import { FaStar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { Pagination } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Search } from "lucide-react";

// import React, { useState } from "react";
// import Image from "next/image";
// import IMAGES from "@/public/image";
// import { FaStar } from "react-icons/fa6";
// import { IoIosPerson } from "react-icons/io";
// import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
// } from "@nextui-org/modal";
// import { Button } from "@nextui-org/react";
// import { Search } from "lucide-react";

const packageReviews = [
  {
    name: "Alice Smith",
    package_name: "European Adventure",
    package_id: 1,
    rating: 5,
    special: "women special",
    tour_leader: "John Doe",
    traveled_date: "2023-05-15",
    description:
      "An unforgettable journey through Europe! A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Bob Johnson",
    package_name: "Tropical Paradise",
    package_id: 2,
    rating: 4,
    special: "women special",
    tour_leader: "Jane Doe",
    traveled_date: "2023-06-10",
    description:
      "Beautiful beaches and amazing weather. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Charlie Brown",
    package_name: "Asian Explorer",
    package_id: 3,
    rating: 5,
    tour_leader: "Mike Smith",
    traveled_date: "2023-07-20",
    description:
      "A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Daisy Green",
    package_name: "African Safari",
    package_id: 4,
    rating: 4,
    special: "women special",
    tour_leader: "Sarah Wilson",
    traveled_date: "2023-08-15",
    description:
      "Saw amazing wildlife and landscapes. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Ethan Hunt",
    package_name: "South American Journey",
    package_id: 5,
    rating: 3,
    special: "women special",
    tour_leader: "Tom Jones",
    traveled_date: "2023-09-01",
    description:
      "Interesting culture but a bit challenging. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Fiona White",
    package_name: "Australian Outback",
    package_id: 6,
    rating: 5,
    special: "women special",
    tour_leader: "Emma Brown",
    traveled_date: "2023-09-10",
    description: "Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "George Black",
    package_name: "Antarctic Expedition",
    package_id: 7,
    rating: 5,
    special: "women special",
    tour_leader: "Lucy Adams",
    traveled_date: "2023-09-20",
    description:
      "A once-in-a-lifetime experience. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Alice Smith",
    package_name: "European Adventure",
    package_id: 1,
    rating: 5,
    special: "women special",
    tour_leader: "John Doe",
    traveled_date: "2023-05-15",
    description:
      "An unforgettable journey through Europe! A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Bob Johnson",
    package_name: "Tropical Paradise",
    package_id: 2,
    rating: 4,
    special: "women special",
    tour_leader: "Jane Doe",
    traveled_date: "2023-06-10",
    description:
      "Beautiful beaches and amazing weather. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Charlie Brown",
    package_name: "Asian Explorer",
    package_id: 3,
    rating: 5,
    tour_leader: "Mike Smith",
    traveled_date: "2023-07-20",
    description:
      "A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Daisy Green",
    package_name: "African Safari",
    package_id: 4,
    rating: 4,
    special: "women special",
    tour_leader: "Sarah Wilson",
    traveled_date: "2023-08-15",
    description:
      "Saw amazing wildlife and landscapes. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Ethan Hunt",
    package_name: "South American Journey",
    package_id: 5,
    rating: 3,
    special: "women special",
    tour_leader: "Tom Jones",
    traveled_date: "2023-09-01",
    description:
      "Interesting culture but a bit challenging. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Fiona White",
    package_name: "Australian Outback",
    package_id: 6,
    rating: 5,
    special: "women special",
    tour_leader: "Emma Brown",
    traveled_date: "2023-09-10",
    description: "Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "George Black",
    package_name: "Antarctic Expedition",
    package_id: 7,
    rating: 5,
    special: "women special",
    tour_leader: "Lucy Adams",
    traveled_date: "2023-09-20",
    description:
      "A once-in-a-lifetime experience. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Alice Smith",
    package_name: "European Adventure",
    package_id: 1,
    rating: 5,
    special: "women special",
    tour_leader: "John Doe",
    traveled_date: "2023-05-15",
    description:
      "An unforgettable journey through Europe! A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Bob Johnson",
    package_name: "Tropical Paradise",
    package_id: 2,
    rating: 4,
    special: "women special",
    tour_leader: "Jane Doe",
    traveled_date: "2023-06-10",
    description:
      "Beautiful beaches and amazing weather. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Charlie Brown",
    package_name: "Asian Explorer",
    package_id: 3,
    rating: 5,
    tour_leader: "Mike Smith",
    traveled_date: "2023-07-20",
    description:
      "A fantastic experience with great food! Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Daisy Green",
    package_name: "African Safari",
    package_id: 4,
    rating: 4,
    special: "women special",
    tour_leader: "Sarah Wilson",
    traveled_date: "2023-08-15",
    description:
      "Saw amazing wildlife and landscapes. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Ethan Hunt",
    package_name: "South American Journey",
    package_id: 5,
    rating: 3,
    special: "women special",
    tour_leader: "Tom Jones",
    traveled_date: "2023-09-01",
    description:
      "Interesting culture but a bit challenging. Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
  {
    name: "Fiona White",
    package_name: "Australian Outback",
    package_id: 6,
    rating: 5,
    special: "women special",
    tour_leader: "Emma Brown",
    traveled_date: "2023-09-10",
    description: "Stunning landscapes and friendly locals.",
    image: IMAGES.specialtours,
  },
 

];

// const TestCard = () => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 6;

//   // Calculate total pages
//   const totalPages = Math.ceil(packageReviews.length / reviewsPerPage);

//   // Get current reviews based on the page
//   const currentReviews = packageReviews.slice(
//     (currentPage - 1) * reviewsPerPage,
//     currentPage * reviewsPerPage
//   );

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   // Function to open modal and store the selected review
//   const handleReadMore = (review) => {
//     setSelectedReview(review);
//     onOpen();
//   };

// const regions = [
//   "America",
//   "Europe",
//   "Australia & New Zealand",
//   "South East Asia",
//   "Rajasthan",
//   "Kerala",
//   "Thailand",
//   "Himachal Pradesh",
//   "Bhutan",
//   "Rajasthan",
//   "Kerala",
//   "Thailand",
//   "Himachal Pradesh",
//   "Bhutan",
// ];

//   return (
//     <div className="py-10">
//       <div className="w-[95%] mx-auto flex flex-col gap-5">
//         <p>
//           <span className="font-semibold">7,67,919+</span> happy travellers,{" "}
//           <span className="font-semibold">57,552 </span>tours,{" "}
//           <span className="font-semibold">10779+ </span>guests reviews
//         </p>

//         <div className="flex justify-center items-center border py-2 px-1 lg:px-3 gap-1 lg:gap-5 rounded-md w-full md:w-[45%] lg:w-[35%]">
//           <input
//             className="border-none focus:ring-0 focus:outline-none w-full "
//             type="text"
//             placeholder="Search reviews for a tour or destination ..."
//           />
//           <Search className="size-4 text-gray-500 cursor-pointer" />
//         </div>

//         <div className="flex flex-col gap-2">
//           <p>
//             We've been receiving outstanding reviews from guests all around the
//             world.
//           </p>

//           <div className="flex justify-between items-center">
//             <ul className="flex gap-5 overflow-x-scroll w-full text-nowrap">
//               {regions.map((region, index) => (
//                 <li
//                   className="border px-3 py-2 w-full mb-3 rounded-xl bg-red-100 cursor-pointer"
//                   key={index}
//                 >
//                   {region}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-full lg:h-[90vh] flex flex-col justify-between bg-gray-200 py-10">
//         <div className="w-[95%] mx-auto flex justify-between items-center">
//           <div className="flex justify-center items-center gap-5">
//             <button className="bg-red-100 border border-black py-2 px-4 rounded-xl">
//               All Reviews
//             </button>
//             <button className="bg-red-100 border border-black py-2 px-4 rounded-xl">
//               Gallery
//             </button>
//           </div>
//           <div className="flex justify-center items-center">
//             <select
//               className="block w-full bg-red-100  rounded-md shadow-sm   py-3 px-3 border border-black"

//             >
//               <option disabled>Sort By: Newest to Oldest</option>
//               <option value="newest">Newest to Oldest</option>
//               <option value="oldest">Oldest to Newest</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[95%] mx-auto my-10">
//           {currentReviews.map((review) => (
//             <div
//               key={review.package_id}
//               className="relative w-full border overflow-hidden rounded-xl shadow-lg flex flex-col bg-white"
//             >
//               <div className="relative w-full min-h-72 border overflow-hidden rounded-xl shadow-lg">
//                 <Image
//                   src={IMAGES.testimonialsbg}
//                   alt="Background"
//                   fill
//                   className="w-full h-full object-contain opacity-20"
//                 />
//                 <div className="absolute inset-0 flex flex-col justify-between p-4 gap-2">
//                   <div className="flex justify-between items-start">
//                     <div className="flex items-center gap-2">
//                       <FaStar className="text-yellow-400" />
//                       <span className="text-base font-semibold">
//                         {review.rating}
//                       </span>
//                       {review.special && (
//                         <span className="text-xs text-themeColor border px-1 border-themeColor rounded">
//                           {review.special}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="flex-1 h-32">
//                       <h1 className="font-semibold line-clamp-2">
//                         {review.package_name}
//                       </h1>
//                       <p className="text-sm line-clamp-4">
//                         {review.description}
//                       </p>
//                       <button
//                         onClick={() => handleReadMore(review)}
//                         className="underline text-themeColor"
//                       >
//                         read more
//                       </button>
//                     </div>

//                     {review.image && (
//                       <div className="w-32 h-32 relative group overflow-hidden rounded-xl shadow-lg">
//                         <Image
//                           src={review.image}
//                           alt={review.package_name}
//                           width={400}
//                           height={400}
//                           className="w-full h-full object-fill transition-all group-hover:scale-105"
//                           loading="lazy"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="font-semibold">{review.name}</h3>
//                       <p className="text-xs">{review.traveled_date}</p>
//                     </div>
//                     <div className="flex justify-between gap-5 items-center text-sm font-semibold text-themeColor">
//                       <span>
//                         <IoIosPerson />
//                       </span>
//                       <span>{review.tour_leader}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Modal to show review details */}
//         </div>
//         {/* Modal to show review details */}
// {selectedReview && (
//   <Modal
//     isOpen={isOpen}
//     onOpenChange={onOpenChange}
//     scrollBehavior="inside"
//     backdrop="blur"
//     placement="center"
//   >
//     <ModalContent>
//       {(onClose) => (
//         <>
//           <ModalHeader className="flex flex-col gap-2">
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-2">
//                 <FaStar className="text-yellow-400" />
//                 <span className="text-base font-semibold">
//                   {selectedReview.rating}
//                 </span>
//                 {selectedReview.special && (
//                   <span className="text-xs text-themeColor border px-1 border-themeColor rounded">
//                     {selectedReview.special}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <span>{selectedReview.package_name}</span>
//             <div className="w-full h-full relative group overflow-hidden rounded-xl shadow-lg">
//               <Image
//                 src={selectedReview.image}
//                 alt={selectedReview.package_name}
//                 width={300}
//                 height={300}
//                 className="w-full h-full object-fill transition-all group-hover:scale-105 aspect-[100/00]"
//                 loading="lazy"
//               />
//             </div>
//           </ModalHeader>
//           <ModalBody className="mx-6">
//             <h3 className="text-xl font-semibold">
//               {selectedReview.name}
//             </h3>

//             <p>
//               <span className="font-medium">Travel Date:</span>{" "}
//               {selectedReview.traveled_date}
//             </p>
//             <p>{selectedReview.description}</p>
//             <p className="flex gap-5 items-center">
//               <span>
//                 <IoIosPerson className="size-7" />
//               </span>
//               <span className="font-medium">Tour Leader:</span>{" "}
//               {selectedReview.tour_leader}
//             </p>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="danger" variant="light" onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </>
//       )}
//     </ModalContent>
//   </Modal>
// )}
//         <div className="flex justify-center items-center mt-6 w-full gap-5">
//           <button
//             className="flex justify-center items-center size-8 bg-gray-200 rounded-full "
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             <FaChevronLeft />
//           </button>

//           <div className="flex justify-center items-center gap-1">
//             {/* Map through total pages and create a button for each page */}
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 className={`w-8 h-8 rounded-full ${
//                   currentPage === index + 1 ? "bg-themeColor  text-white" : ""
//                 }`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             className="flex justify-center items-center size-8 bg-gray-200 rounded-full"
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             <FaAngleRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestCard;



const sampleGalleryImages = [
  IMAGES.specialtours,
  IMAGES.testimonialsbg,
  // Add more images for the gallery as needed
];

const TestCard = ({ packageReviews, allPackages }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("reviews");

  const [reviewRegions, setReviewRegions] = useState([]);

  const [filteredReviews, setFilteredReviews] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");

  const reviewsPerPage = 6;

  const uniquePackagesSet = new Set(packageReviews?.map(review => review.package_id));

  const uniquiId = [...uniquePackagesSet];

  const [serchInput, setSerchInput] = useState("");

  const [sortOrder, setSortOrder] = useState('');


  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {

    if (allPackages?.length > 0) {
      const abc = allPackages?.map((item) => {

        if (uniquiId.includes(item.package_id)) {
          return item.state
        }

      }).filter(state => state !== undefined);

      console.log("uniquePackagesSet::::::>", abc)

      setReviewRegions(abc)
    }


  }, [allPackages])




  // Calculate total pages
  const totalPages = Math.ceil(packageReviews.length / reviewsPerPage);

  // Get current reviews based on the page
  const currentReviews = packageReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Function to open modal and store the selected review
  const handleReadMore = (review) => {
    setSelectedReview(review);
    onOpen();
  };

  // const regions = [
  //   "America",
  //   "Europe",
  //   "Australia & New Zealand",
  //   "South East Asia",
  //   "Rajasthan",
  //   "Kerala",
  //   "Thailand",
  //   "Himachal Pradesh",
  //   "Bhutan",
  //   "Rajasthan",
  //   "Kerala",
  //   "Thailand",
  //   "Himachal Pradesh",
  //   "Bhutan",
  // ];

  // const regions = reviewRegions;

  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string') {
      return ''; // Return an empty string or handle the fallback as needed
    }

    return sentence
      .toLowerCase() // Convert the whole sentence to lowercase
      .split(" ") // Split the sentence by spaces into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a sentence
  }

  useEffect(() => {

    console.log("Filetred Results region::::::>", selectedRegion)
    if (selectedRegion) {
      const uniquePackagesSet = new Set(allPackages?.map(review => review.state === selectedRegion ? review.package_id : ""));
      const abc = [...uniquePackagesSet].filter((item) => item !== "")
      console.log("Filetred Results::::::>", abc)
      setFilteredReviews(packageReviews?.filter((item) => abc.includes(item.package_id)))
    }
  }, [selectedRegion])

  useEffect(() => {
    if (packageReviews?.length > 0) {
      setFilteredReviews(packageReviews)
    }
  }, [packageReviews])

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Dummy search results
  const searchResults = [
    "Tour of Paris",
    "Adventure in the Alps",
    "Beach Trip to Maldives",
    "Safari in Kenya",
  ];

  useEffect(() => {
    if (serchInput) {
      console.log("serchInput:::::::::::>", serchInput);


      const uniquePackagesSet = new Set(allPackages?.map(review => review.package_name.toLowerCase().includes(serchInput.toLowerCase()) ? review.package_id : ""));
      const abc = [...uniquePackagesSet].filter((item) => item !== "")

      const uniqueStatesSet = new Set(allPackages?.map(review => review.state.toLowerCase().includes(serchInput.toLowerCase()) ? review.package_id : ""));
      const abc1 = [...uniqueStatesSet].filter((item) => item !== "")

      const uniqueCitySet = new Set(allPackages?.map(review => review.city.toLowerCase().includes(serchInput.toLowerCase()) ? review.package_id : ""));
      const abc2 = [...uniqueCitySet].filter((item) => item !== "")
      console.log("Filetred City Results::::::>", abc, abc1, abc2)

      const mergedArray = [...new Set([...abc, ...abc1, ...abc2])];

      console.log("mergedArray:::::>", mergedArray)

      setFilteredReviews(packageReviews?.filter((item) =>
        mergedArray.includes(item.package_id)
      ));

      // if(abc.length !== 0) {
      //   setFilteredReviews(packageReviews?.filter((item) => 
      //     item.package_id.includes(abc)
      //   ));
      // }else if(abc1.length !== 0) {
      //   setFilteredReviews(packageReviews?.filter((item) => 
      //     item.package_id.includes(abc1)
      //   ));
      // }else {
      //   setFilteredReviews(packageReviews?.filter((item) => 
      //     item.package_id.includes(abc2)
      //   ));
      // }

      // const uniquePackagesSet = new Set(allPackages?.map(review => review.state.toLowerCase().includes(serchInput.toLowerCase()) ? review.package_id : ""));
      // const abc = [...uniquePackagesSet].filter((item) => item !== "")
      // console.log("Filetred Results::::::>", abc)

    } else {
      setFilteredReviews(packageReviews);
    }
  }, [serchInput, packageReviews]);


  useEffect(() => {
    if (sortOrder) {

      const sortTrips = (order) => {
        const sorted = [...packageReviews].sort((a, b) => {
          const dateA = new Date(a.traveled_date);
          const dateB = new Date(b.traveled_date);
          if (sortOrder === 'newest') {
            return dateB - dateA;
          } else {
            return dateA - dateB;
          }
        });
        setFilteredReviews(sorted);
      };

      sortTrips()
    }
  }, [sortOrder])


  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="w-[95%] mx-auto flex flex-col gap-10">
        {/* Header and search input */}
        <div className="flex justify-between items-center flex-col lg:flex-row gap-5">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">7,67,919+</span> happy travellers,{" "}
            <span className="font-semibold">57,552 </span> tours,{" "}
            <span className="font-semibold">10779+ </span> guests reviews
          </p>
          <div className="relative flex justify-center items-center border py-3 px-4 lg:px-3 gap-1 lg:gap-5 rounded-lg w-full md:w-[45%] lg:w-[35%] bg-gray-50">
            <input
              className="border-none focus:ring-0 focus:outline-none w-full bg-transparent"
              type="text"
              placeholder="Search reviews for a tour or destination ..."
              onFocus={() => setIsPopupVisible(true)}
              onBlur={() => setTimeout(() => setIsPopupVisible(false), 100)}
              onChange={(e) => setSerchInput(e.target.value)}
              value={serchInput}
            />
            <Search className="size-4 text-gray-500 cursor-pointer" />
            {/* {isPopupVisible && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                <ul>
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-gray-700">
            We&apos;ve been receiving outstanding reviews from guests all around the
            world.
          </p>

          <div className="flex justify-between items-center">
            <ul className="flex gap-5 overflow-x-auto w-full text-nowrap bg-gray-100 rounded-lg justify-left pt-4 pl-4">
              {reviewRegions?.map((region, index) => (
                <li
                  className=""
                  key={index}
                >
                  <Button className="text-black border px-3 py-2 w-full mb-3 rounded-lg cursor-pointer bg-gray-300"
                    onClick={() => {
                      setSelectedRegion(region)
                    }}>
                    {capitalizeWords(region)}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-full  flex flex-col justify-between bg-gray-50 py-8">
        <div className="w-[95%] mx-auto flex justify-between items-center gap-5">
          <div className="flex  gap-5">
            <button
              onClick={() => setActiveSection("reviews")}
              className={`py-2 px-4 rounded-xl ${activeSection === "reviews"
                ? "bg-themeColor text-white"
                : "bg-[#fffafa] border "
                }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveSection("gallery")}
              className={`py-2 px-4 rounded-xl ${activeSection === "gallery"
                ? "bg-themeColor text-white"
                : "bg-[#fffafa] border "
                }`}
            >
              Gallery
            </button>
          </div>

          <div className="flex justify-center items-center gap-5">
            {/* {activeSection === "gallery" && (
              <select className=" w-full bg-white  rounded-md shadow-sm   py-3 px-3 border ">
                <option value="all">All photos & videos</option>
                <option value="photos">Photos Only</option>
                <option value="videos">Videos Only</option>
              </select>
            )} */}
            <select className="w-full bg-white  rounded-md shadow-sm   py-3 px-3 border "
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option disabled>Sort By: Newest to Oldest</option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>

        {selectedRegion !== "" ? <div className="pt-4 ml-10">
          <a className="text-blue-600 cursor-pointer" onClick={() => {
            setSelectedRegion("")
            setFilteredReviews(packageReviews)
          }}><u>Reset</u></a>
        </div> : ""}

        {/* Conditional rendering based on active section */}
        {activeSection === "reviews" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[95%] mx-auto my-8">
              {filteredReviews?.map((review, index) => (
                <div
                  key={index}
                  className="relative w-full border overflow-hidden rounded-xl shadow-lg flex flex-col bg-white"
                >
                  <div className="relative w-full min-h-72 border overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={IMAGES.testimonialsbg}
                      alt="Background"
                      fill
                      className="w-full h-full object-contain opacity-20"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-4 gap-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          <span className="text-base font-semibold">
                            {review?.rating}
                          </span>
                          {/* {review.special && (
                            <span className="text-xs text-themeColor border px-1 border-themeColor rounded">
                              {review.special}
                            </span>
                          )} */}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1 h-32">
                          <h1 className="font-semibold line-clamp-2 text-gray-700">
                            {review?.package_name}
                          </h1>
                          <p className="text-sm line-clamp-4 text-gray-500">
                            {review?.description}
                          </p>
                          <button
                            onClick={() => handleReadMore(review)}
                            className="underline text-themeColor"
                          >
                            read more
                          </button>
                        </div>

                        {review?.image[0] && (
                          <div className="w-32 h-32 relative group overflow-hidden rounded-xl shadow-lg">
                            <Image
                              src={review?.image[0]}
                              alt={review?.package_name}
                              width={400}
                              height={400}
                              className="w-full h-full object-fill transition-all group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{review?.name}</h3>
                          <p className="text-xs">{review?.traveled_date}</p>
                        </div>
                        <div className="flex justify-between gap-5 items-center text-sm font-semibold text-themeColor">
                          <span>
                            <IoIosPerson />
                          </span>
                          <span>{review?.tour_leader}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal to show review details */}
            </div>
          </>
        )}

        {/* Gallery Section */}
        {activeSection === "gallery" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[95%] mx-auto my-10 ">
            {filteredReviews?.map((reviews) => {

              return reviews.image?.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 overflow-hidden rounded-xl shadow-lg"
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              ))

            })}
          </div>
        )}

        {/* Modal to show review details */}
        {selectedReview && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="blur"
            placement="center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-base font-semibold">
                          {selectedReview.rating}
                        </span>
                        {selectedReview.special && (
                          <span className="text-xs text-themeColor border px-1 border-themeColor rounded">
                            {selectedReview.special}
                          </span>
                        )}
                      </div>
                    </div>
                    <span>{selectedReview.package_name}</span>
                    {selectedReview?.image[0] && (

                      <div className="w-full h-full relative group overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={selectedReview?.image[0]}
                          alt={selectedReview?.package_name}
                          width={300}
                          height={300}
                          className="w-full h-full object-fill transition-all group-hover:scale-105 aspect-[100/00]"
                          loading="lazy"
                        />
                      </div>

                    )}
                  </ModalHeader>
                  <ModalBody className="mx-6">
                    <h3 className="text-xl font-semibold">
                      {selectedReview.name}
                    </h3>

                    <p>
                      <span className="font-medium">Travel Date:</span>{" "}
                      {selectedReview.traveled_date}
                    </p>
                    <p>{selectedReview.description}</p>
                    <p className="flex gap-5 items-center">
                      <span>
                        <IoIosPerson className="size-7" />
                      </span>
                      <span className="font-medium">Tour Leader:</span>{" "}
                      {selectedReview.tour_leader}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
        {/* Pagination */}

        {activeSection === "reviews" && (
          <div className="flex justify-center w-[95%] mx-auto mt-5">
            <Pagination
              total={totalPages} // total number of pages
              initialPage={currentPage} // current active page
              onPageChange={(page) => handlePageChange(page)} // function to call on page change
              classNames={{
                wrapper: "gap-3",
                item: "rounded-full bg-white",
                cursor: "bg-themeColor text-white font-bold rounded-full",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCard;
