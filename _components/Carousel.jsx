"use client"
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import "@/_components/Carousel.css"


const Carousel = ({selectedPackage}) => {

  const images = selectedPackage?.package_image;

  return (
    <div className="w-full h-auto">
      

      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        navigation={true} // Enable navigation (next/prev arrows)
        modules={[Pagination, Navigation,Autoplay]}
        className="mySwiperGuest"
        style={{
           
            "--swiper-navigation-size": "20px",
           
          }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden">
              <Image
                src={image}
                alt={`slide ${index + 1}`}
                fill
                style={{
                  objectFit: 'fill',
                }}
              />
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default Carousel;

