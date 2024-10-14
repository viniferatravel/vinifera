'use client'
import { Mail, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import "@/app/styles/swiper.css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import GuestModal from "@/_components/packages/Modal"
import EmailModal from "@/_components/EmailModal"

const Places = ({ selectedPackage }) => {



  const [enquiryClickModal, setEnquiryClickModal] = useState(false)

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseTourInclExclModal = (val) => {
    setTourInclExclModal(val)
  }

  const handleCloseEnquiryModal = (val) => {
    setEnquiryClickModal(val)
  }

  const getMapSrc = (cityName, stateName) => {
    const encodedCity = encodeURIComponent(`${cityName}, ${stateName}`);
    return `https://www.google.com/maps?q=${encodedCity}&output=embed`;
  };

  const handleCloseModal = (val) => {
    setModalOpen(false)
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 shadow-md rounded-xl border gap-2">
        <div className="font-semibold">Plan Your Adventure:</div>

        <div className="flex gap-3">
          <div className="flex justify-center items-center">
            <Mail className="size-5" />
          </div>
          <button type="button" className="text-base font-semibold" onClick={() => setModalOpen(true)}>Email Itinerary</button>
        </div>

        <EmailModal modalOpen={modalOpen} onCloseModal={handleCloseModal} selectedPackage={selectedPackage} />

        <div className="flex gap-3">
          <div className="flex justify-center items-center">
            <NotebookPen className="size-5" />
          </div>
          <button type="button" onClick={() => setEnquiryClickModal(true)} className="text-base font-semibold">Enquire Now</button>
        </div>
        <div>
          <GuestModal enquiryClickModal={enquiryClickModal} onCloseEnquiryModal={handleCloseEnquiryModal} action={"enquiry"} selectedPackage={selectedPackage} />
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:gap-8 pb-8">
        <h2 className="text-xl lg:text-2xl font-semibold ">
          Places You&apos;ll See
        </h2>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="placesSwiperPackage"
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
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {selectedPackage?.places?.map((place) => {
            return (
              <SwiperSlide key={place.id || place.name}>
                <div className="relative w-full h-[250px] md:h-[350px] lg:h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src={place.image}
                    alt={`image of ${place.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-left text-lg font-medium pt-1">{place.name}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>


      <div className="flex h-44 w-full shadow-md rounded-xl border object-cover">

        <iframe
          className="w-full h-full overflow-hidden object-cover"
          src={getMapSrc(selectedPackage?.city, selectedPackage?.state)}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

    </div>


  );
};

export default Places;
