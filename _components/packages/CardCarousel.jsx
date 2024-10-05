"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide React icons
import Image from "next/image"; // Using Next.js Image component
import "@/_components/Carousel.css"; // Assuming custom styles here

const Carousel = () => {
  // Example card data (replace with real data)
  const cards = [
    { title: "Card 1", image: "/image1.jpg", description: "Description 1" },
    { title: "Card 2", image: "/image2.jpg", description: "Description 2" },
    { title: "Card 3", image: "/image3.jpg", description: "Description 3" },
    { title: "Card 4", image: "/image4.jpg", description: "Description 4" },
    { title: "Card 5", image: "/image5.jpg", description: "Description 5" },
    { title: "Card 6", image: "/image5.jpg", description: "Description 5" },
    { title: "Card 7", image: "/image5.jpg", description: "Description 5" },
  ];

  return (
    <div className="w-full h-auto relative">
      <Swiper
        spaceBetween={30}
        slidesPerGroup={1} // Only move one card at a time
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev", // Corrected typo here
        }}
        style={{
          "--swiper-navigation-size": "20px",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          // When window width is >= 640px (small devices)
          640: {
            slidesPerView: 1,
          },
          // When window width is >= 768px (medium devices)
          768: {
            slidesPerView: 3,
          },
          // When window width is >= 1024px (large devices)
          1024: {
            slidesPerView: 5,
          },
        }}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-white shadow-lg">
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              />
              {/* Card Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <div className="swiper-prev absolute top-1/2 transform -translate-y-1/2 right-16 z-10 p-2 rounded-full bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-200">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="swiper-next absolute top-1/2 transform -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-200">
          <ChevronRight className="w-6 h-6" />
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
