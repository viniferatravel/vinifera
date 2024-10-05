'use client'
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import "@/app/styles/swiper.css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

const PackageSlider = ({selectedPack}) => {
    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {selectedPack.package_image.map((image, index) => {
                return (<>
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-64 md:h-96 lg:h-[26rem] rounded-3xl overflow-hidden">
                            <Image
                                src={image}
                                alt={`image ${index + 1}`}
                                fill
                                style={{
                                    objectFit: 'fill',
                                }} />
                        </div>
                    </SwiperSlide>
                </>);
            })}
        </Swiper>
    )
}

export default PackageSlider