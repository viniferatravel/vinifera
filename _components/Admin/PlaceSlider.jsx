import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import "@/app/styles/swiper.css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

const PlacesSlider = ({ selectedPack }) => {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4 ml-10">Places You&apos;ll See</h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="placesSwiper"
            >
                {selectedPack?.places?.map((place, index) => {
                    return (<>
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-64 md:h-96 lg:h-44 lg:w-72 rounded-xl overflow-hidden">
                                <Image
                                    src={place.image}
                                    alt={`image ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-xl"
                                />
                                
                            </div>
                            <div className="">
                                    <p className="text-left text-lg font-medium pt-1">{place.name}</p>
                                </div>
                        </SwiperSlide>
                    </>);
                })}
            </Swiper>
        </div>
    );
};

export default PlacesSlider;
