import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem, Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";
import Image from "next/image";
import IMAGES from "@/public/image";
import "@/app/styles/quote.css"
import "@/app/styles/reviewswiper.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function StarRating({ rating }) {

  const stars = [];


  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {

      stars.push(<FaStar key={i} className="text-yellow-400 size-5" />);
    } else if (rating >= i - 0.5) {

      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 size-5" />);
    } else {

      stars.push(<FaRegStar key={i} className="text-yellow-400 size-5" />);
    }
  }

  return <div className="flex">{stars}</div>;
}





const Reviews = ({ selectedPackage, selectedPackageReviews }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState("allReview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullSizeImageOpen, setFullSizeImageOpen] = useState(false);


  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setFullSizeImageOpen(true);
  };

  function formatDate(dateString) {

    if (!dateString || typeof dateString !== 'string') {
      console.warn('Invalid or empty date string provided');
      return 'Invalid date';
    }

    const dateObj = new Date(dateString);


    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date provided: ' + dateString);
      return 'Invalid date';
    }


    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Customize as needed
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj);

    return formattedDate;
  }


  return (
    <>

      <div className="flex flex-col w-[100%] lg:w-full h-full">
        <div className="flex gap-6 justify-left items-center pb-4">
          <h2 className="text-xl font-bold">Customer Review</h2>
          <div className="flex gap-1">
            <StarRating rating={selectedPackageReviews[0]?.rating} />
          </div>
        </div>
        <div className="flex shadow-md rounded-xl border gap-3 p-8 flex-col lg:w-full bg-red-50">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="reviewSwiper w-[300px] md:w-[500px] lg:w-[850px]"
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >{selectedPackageReviews?.map((item) => (
            <SwiperSlide key={item?.id || item?.tagline || item?.name}>
              <div className="flex flex-col gap-5 mx-auto bg-white rounded-lg">
                <div className="w-full p-4 rounded-lg shadow-lg bg-white">
                  <h2 className="text-black mb-4 text-xl font-semibold">
                    {item?.tagline}
                  </h2>
                  <div className="container">
                    <p className="styled-paragraph line-clamp-5 overflow-hidden">
                      {item?.description}
                    </p>
                  </div>
                  <div className="flex justify-center items-end flex-col mt-4">
                    <p className="text-themeColor font-semibold">{item?.name}</p>
                    <p className="text-black text-md text-[12px]">
                      {formatDate(item?.traveled_date)}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          </Swiper>

          <div className="flex items-center justify-center mt-4">
            <button
            aria-label="See All Reviews"
              className="border-themeColor border text-themeColor hover:bg-themeColor rounded-full py-2 px-4 hover:text-white"
              onClick={onOpen}
            >
              See All Reviews
            </button>
          </div>

        </div>




        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          size="3xl"
          placement="center"
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-6 justify-left items-center pb-4 border-b">
                  <h2 className="text-2xl">{selectedPackage?.package_name}</h2>
                  <div className="flex gap-1">
                    <StarRating rating={selectedPackageReviews[0]?.rating} />
                  </div>
                </div>
                <div className="flex gap-5 mt-3">
                  <button
                  aria-label="All Review"
                    className={`text-sm py-2 px-4 border rounded-xl ${activeTab === "allReview"
                      ? "bg-red-500 text-white"
                      : "border-themeColor text-themeColor hover:bg-themeColor hover:text-white"}`}
                    onClick={() => handleButtonClick("allReview")}
                  >
                    All Review
                  </button>
                  <button
                   aria-label="Photo Gallery"
                    className={`text-sm py-2 px-4 border rounded-xl ${activeTab === "photoGallery"
                      ? "bg-red-500 text-white"
                      : "border-themeColor text-themeColor hover:bg-themeColor hover:text-white"}`}
                    onClick={() => handleButtonClick("photoGallery")}
                  >
                    Photo Gallery
                  </button>
                </div>
              </ModalHeader>
              <ModalBody className="px-7">
                {activeTab === "allReview" && (
                  selectedPackageReviews?.map((item) => (
                    <div key={item?.id || item?.tagline || item?.name} className="flex flex-col gap-5 mx-auto border-gray-200 bg-white"> {/* Use a unique identifier for the key */}
                      <div className="border w-full p-4 rounded-lg shadow-lg">
                        <h2 className="text-black mb-4 text-xl font-semibold">
                          {item?.tagline}
                        </h2>
                        <div className="container">
                          <p className="styled-paragraph">
                            {item?.description}
                          </p>
                        </div>
                        <div className="flex justify-center items-end flex-col">
                          <p className="text-themeColor font-semibold">
                            {item?.name}
                          </p>
                          <p className="text-black text-md text-[12px]">
                            {formatDate(item?.traveled_date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))

                )}
                {activeTab === "photoGallery" && (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                    {selectedPackageReviews?.map((item) => {
                      return item?.image.map((item1) => {
                        return (<>
                          <div
                            key={item.id}
                            className="flex justify-center items-center border rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => handleImageClick(item1)}
                          >
                            <Image
                              src={item1}
                              width={400}
                              height={400}
                              alt={`Gallery image ${item.review_id}`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="w-full h-full object-cover"
                              style={{
                                aspectRatio: "3/2",
                                objectFit: "cover",
                              }}
                            />

                          </div>
                        </>)
                      })
                    })}
                  </div>
                )}
              </ModalBody>
            </>
          </ModalContent>
        </Modal>

        {/* Full-Size Image Modal */}
        {selectedImage && (
          <Modal
            isOpen={fullSizeImageOpen}
            onOpenChange={() => setFullSizeImageOpen(false)}
            scrollBehavior="normal"
            size="full"
            placement="center"
          >
            <ModalContent>
              <ModalBody className=" flex justify-center items-center bg-black ">
                <div className="relative flex justify-center items-center ">
                  <Image
                    src={selectedImage}
                    width={500}
                    height={500}
                    alt="Selected image"
                    className="object-cover w-full h-full " />
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>

    </>
  );
};

export default Reviews;

const ModalImg = [
  {
    id: 1,
    src: "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    id: 2,
    src: "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    id: 3,
    src: "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    id: 4,
    src: "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    id: 5,
    src: "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
];
