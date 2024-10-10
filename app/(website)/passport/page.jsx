"use client"
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import IMAGES from "@/public/image";
import Image from "next/image";
import Passportcard from "@/_components/passport/Passportcard"
// import Steps from "@/_components/passport/Steps"
import Testimonials from "@/_components/passport/Testimonials"
import Passcontact from "@/_components/passport/Passcontact"
import Accordian from "@/_components/passport/Accordian"
import Sectionfour from "@/_components/Sectionfour"
import Steps from "@/_components/passport/Steps"
import Luxury from "@/_components/Luxury"
import { Dot } from 'lucide-react';
import { Star } from 'lucide-react';
import { Button } from '@nextui-org/react';
import GuestModal from "@/_components/packages/Modal";
import { useRouter } from 'next/navigation';

const Passport = () => {

    const router = useRouter()

    const [passportClickModal, setPassportClickModal] = useState(false);
    const [internatioalPackage, setInternatioalPackage] = useState([]);

    const handleClosePassportModal = (val) => {
        setPassportClickModal(val);
    };

    const passportConnect = () => {
        setPassportClickModal(true);
    };

    const bgimage = [
        {
            key: "1",
            image: "/image/travel1.jpg"
        }
    ]

    const data = [
        {
            key: "1",
            heading: "We give wings to your dreams with our",
            subheading: "Hassle free Visas!",
            point: (
                <>
                    <div className="flex gap-1 lg:gap-5 justify-center items-center flex-wrap">
                        <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center w-[48%] lg:w-auto">
                            <Dot className='block lg:hidden' />
                            <p>Screening</p>
                        </div>
                        <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center w-[48%] lg:w-auto">
                            <Dot />
                            <p>Documentation</p>
                        </div>
                        <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center w-[48%] lg:w-auto">
                            <Dot />
                            <p>Processing</p>
                        </div>
                        <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center w-[48%] lg:w-auto">
                            <Dot />
                            <p>Delivery</p>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <p className="text-sm lg:text-xl text-white font-medium">
                            Within 5-7 Days | Varies from country to country
                        </p>
                    </div>
                </>
            ),
            btn: (
                <><button className="flex justify-center items-center gap-3 text-white px-4 py-3 rounded-full font-semibold bg-themeColor"
                    onClick={passportConnect}
                >
                    Book Now
                </button>

                </>
            )
        }
    ]

    const luxurydata = internatioalPackage?.map((item, index) => {
        if(index > 3) {

        }else{
            return {
                id: item.package_id,
                image: item.package_image[0],
                luxurydatadescription: (
                    <>
                        <div className=''>
                            <div className='flex justify-start gap-2'>
                                <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                                <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                                <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                                <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                                <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            </div>
                            <p className='font-bold text-base mt-1 text-gray-700'>{item.package_name}</p>
                            <p className='font-semibold text-xs'>{item.tour_itinerary.days} <span className='font-normal text-sm'>Days,</span>  {item.tour_itinerary.nights} <span className='font-normal text-sm'>Nights</span> </p>
                        </div>
    
                        <div>
                            <p className='text-sm font-semibold text-end'>Starting from</p>
                            <div className='flex justify-end items-end'>
                                <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                                    router.push(`/packages/${item.package_id}`)
                                }}>
                                    &#8377; 71,000
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    })

    console.log("luxuryData:::::>", luxurydata)

    const luxurydataa = [
        {
            id: "1",
            image: "/image/usa.jpg",
            luxurydatadescription: (
                <>
                    <div className=''>
                        <div className='flex justify-start gap-2'>
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                        </div>
                        <p className='font-bold text-base mt-1 text-gray-700'>United States of America </p>
                        <p className='font-semibold text-xs'>6 <span className='font-normal text-sm'>Days,</span>  5 <span className='font-normal text-sm'>Nights</span> </p>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-end'>Starting from</p>
                        <div className='flex justify-end items-end'>
                            <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                                router.push(`/filterpage/rajasthan`)
                            }}>
                                &#8377; 71,000
                            </Button>
                        </div>
                    </div>
                </>
            )
        },
        {
            id: "2",
            image: "/image/bali.jpg",
            luxurydatadescription: (
                <>
                    <div className=''>
                        <div className='flex justify-start gap-2'>
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                        </div>
                        <p className='font-bold text-base mt-1 text-gray-700'>Bali, Indonesia </p>
                        <p className='font-semibold text-xs'>5 <span className='font-normal text-sm'>Days,</span>  4 <span className='font-normal text-sm'>Nights</span> </p>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-end'>Starting from</p>
                        <div className='flex justify-end items-end'>
                            <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                                router.push(`/filterpage/goa`)
                            }}>
                                &#8377; 31,000
                            </Button>
                        </div>
                    </div>
                </>
            )
        },
        {
            id: "3",
            image: "/image/japan.jpg",
            luxurydatadescription: (
                <>
                    <div className=''>
                        <div className='flex justify-start gap-2'>
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                        </div>
                        <p className='font-bold text-base mt-1 text-gray-700'>Tokyo, Japan </p>
                        <p className='font-semibold text-xs'>7 <span className='font-normal text-sm'>Days,</span>  6 <span className='font-normal text-sm'>Nights</span> </p>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-end'>Starting from</p>
                        <div className='flex justify-end items-end'>
                            <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                                router.push(`/filterpage/ayodhya`)
                            }}>
                                &#8377; 81,000
                            </Button>
                        </div>
                    </div>
                </>
            )
        },
        {
            id: "4",
            image: "/image/rome.jpg",
            luxurydatadescription: (
                <>
                    <div className=''>
                        <div className='flex justify-start gap-2'>
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                            <Star className='w-[20px] h-[20px] text-[#FFD700] fill-[#FFD700]' />
                        </div>
                        <p className='font-bold text-base mt-1 text-gray-700'>Rome, Italy</p>
                        <p className='font-semibold text-xs'>6 <span className='font-normal text-sm'>Days,</span>  5 <span className='font-normal text-sm'>Nights</span> </p>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-end'>Starting from</p>
                        <div className='flex justify-end items-end'>
                            <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                                router.push(`/filterpage/gujarat`)
                            }}>
                                &#8377; 61,000
                            </Button>
                        </div>
                    </div>
                </>
            )
        },
    ]


    useEffect(() => {
        try {

            let abc = async () => {
                const response = await fetch("/api/fetchcategory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({operation: "fetchinternational"})
                });
                const result = await response.json();
                setInternatioalPackage(result.data)
            }

            abc()

        } catch (error) {

        }
    }, [])





    return (
        <>
            <div className="relative h-[55vh] lg:h-[90vh] w-full">
                <Image
                    src={IMAGES.passport}
                    alt="contact-landing"
                    fill
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0  w-full h-full flex justify-center items-center">
                    <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-center items-start gap-5">
                        <p className="text-white text-3xl lg:text-5xl flex font-bold gap-2">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                            >
                                Your Journey
                            </motion.span>
                        </p>
                        <h1 className="text-white text-2xl lg:text-5xl flex font-bold pr-6 py-4 pl-2 bg-themeColor">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                            >
                                Begins Here
                            </motion.span>
                        </h1>

                        <div className="w-[70%] lg:w-1/3">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-base lg:text-lg text-white"
                            >
                                Experience seamless processing of your travel documents,
                                with speed and ease that you can trust. Let our experts handle
                                the details, so you can focus on your journey ahead!
                            </motion.p>
                        </div>

                        <button className="bg-themeColor px-5 py-3 mt-10 rounded-full text-white font-medium" onClick={passportConnect}>
                            Connect Now
                        </button>
                        <GuestModal
                            passportClickModal={passportClickModal}
                            onClosePassportModal={handleClosePassportModal}
                            action={"passport"}
                        />
                    </div>
                </div>
            </div>

            <div className="w-[95%] mx-auto flex flex-col gap-10">
                <Passportcard />
                <Steps />
                <Testimonials />
            </div>

            <div className="w-full mx-auto flex flex-col gap-10">
                <Sectionfour bgimage={bgimage} data={data} />
                <Luxury luxurydata={luxurydata} title={"Explore the World with Ease"} description={"Ready for your next adventure? Our passport and visa consultancy simplifies travel to your dream destinations. From the Maldives to the USA, we’ll handle the visa process so you can focus on making memories. Start your journey today!"} />
                <Passcontact />
            </div>

            <Accordian />
        </>
    )
}

export default Passport

