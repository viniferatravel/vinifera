import React, { useState } from 'react'
import IMAGES from "@/public/image";
import Image from "next/image";
import { motion } from "framer-motion";
import GuestModal from "@/_components/packages/Modal";

const Testimonials = () => {


    const [passportClickModal, setPassportClickModal] = useState(false);

    const handleClosePassportModal = (val) => {
        setPassportClickModal(val);
    };

    const passportConnect = () => {
        setPassportClickModal(true);
    };

    const [hoveredCard, setHoveredCard] = useState(null); // State to track which card is hovered

    const handleMouseEnter = (cardIndex) => {
        setHoveredCard(cardIndex); // Set hovered card index when mouse enters
    };

    const handleMouseLeave = () => {
        setHoveredCard(null); // Reset hovered card when mouse leaves
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    return (
        <div>
            <div className=' w-full flex flex-col lg:flex-row lg:justify-between justify-start gap-4'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={sectionVariants}
                    className='w-full lg:w-[40%] flex justify-center items-start flex-col gap-8'>
                    <p className="text-gray-700 text-3xl lg:text-5xl flex font-bold gap-2 w-[70%] lg:leading-snug">
                        {/* <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                        > */}
                        What Our
                        Customers Say
                        {/* </motion.span> */}
                    </p>

                    <div className="w-full">
                        <p
                            className="text-base lg:text-lg text-gray-600"
                        >
                            Our team will carefully review your submitted
                            documents to ensure everything is complete and
                            meets the necessary requirements for your
                            application.
                        </p>
                    </div>

                    <button className="bg-themeColor px-5 py-3 mt-10 rounded-full text-white font-medium" onClick={passportConnect}>
                        Connect Now
                    </button>
                    <GuestModal
                        passportClickModal={passportClickModal}
                        onClosePassportModal={handleClosePassportModal}
                        action={"passport"}
                    />
                </motion.div>

                <div className='w-full lg:w-[55%] flex flex-col justify-start gap-5 lg:block mt-8 lg:mt-0'>
                    <div
                        className='flex justify-end'
                    >
                        <div className='lg:relative lg:z-[5] lg:top-1 border border-gray-300 w-full lg:w-[80%] h-56 md:h-36 lg:h-36 flex justify-start items-center gap-3 hover:scale-110 transition-all duration-500' onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={handleMouseLeave}>
                            <div
                                className={`${hoveredCard === 1 ? 'bg-themeColor' : 'bg-gray-500'} w-2 h-full`}
                            ></div>

                            <div className='flex justify-start item-center w-full gap-3 px-2 py-3'>
                                <div className='relative size-24 rounded-full overflow-hidden'>
                                    <Image
                                        src={IMAGES.profile}
                                        alt='contact-landing'
                                        fill
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <div className='w-[80%]'>
                                    <p className='text-gray-600'>
                                        Vinifera Tours and Travels made the entire passport process so smooth! I was dreading all the paperwork, but they took care of everything, and I had my passport in no time.
                                    </p>
                                    <p className='text-end mt-2 text-gray-600'>- Arjun Malhotra</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='flex  justify-start'
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className='lg:relative lg:z-10 lg:bg-white border border-gray-300 w-full lg:w-[80%] h-56 md:h-36 lg:h-36 flex justify-start items-center gap-3 hover:scale-110 transition-all duration-500'>
                            <div
                                className={`${hoveredCard === 1 || hoveredCard === 3
                                    ? 'bg-gray-500'
                                    : 'bg-themeColor'
                                    } w-2 h-full`}
                            ></div>
                            <div className='flex justify-start item-center w-full gap-3 px-2 py-3'>
                                <div className='relative size-24 rounded-full overflow-hidden'>
                                    <Image
                                        src={IMAGES.profile1}
                                        alt='contact-landing'
                                        fill
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <div className='w-[80%]'>
                                    <p className='text-gray-600'>
                                        I am super impressed with the professionalism of Vinifera Tours and Travels. They kept me updated throughout the passport process, and I never had to worry about a thing. Thanks to them, my travel plans are now on track!
                                    </p>
                                    <p className='text-end mt-2 text-gray-600'>- Rajesh Kumar</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='flex justify-end'
                    >
                        <div className='lg:relative lg:z-10 bg-white border border-gray-300 w-full lg:w-[80%] h-56 md:h-36 lg:h-36 flex justify-start items-center gap-3 hover:scale-110 transition-all duration-500' onMouseEnter={() => handleMouseEnter(3)}
                            onMouseLeave={handleMouseLeave}>
                            <div
                                className={`${hoveredCard === 3 ? 'bg-themeColor' : 'bg-gray-500'} w-2 h-full`}
                            ></div>
                            <div className='flex justify-start item-center w-full gap-3 px-2 py-3'>
                                <div className='relative size-24 rounded-full overflow-hidden'>
                                    <Image
                                        src={IMAGES.profile2}
                                        alt='contact-landing'
                                        fill
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <div className='w-[80%]'>
                                    <p className='text-gray-600'>
                                        Vinifera Tours and Travels exceeded my expectations with their passport services. The entire process was straightforward, and their team was super friendly and helpful. If you need passport assistance, they are the ones to go to!
                                    </p>
                                    <p className='text-end mt-2 text-gray-600'>- Sanjay Desai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials