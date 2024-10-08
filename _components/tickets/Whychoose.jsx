"use client"
import React from 'react'

const Svg = (props) => (
    <svg
        width={32}
        height={33}
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6.5625 14.875L15.5 0.25L24.4375 14.875H6.5625ZM24.4375 32.75C22.4062 32.75 20.68 32.0393 19.2586 30.618C17.8373 29.1967 17.1261 27.4698 17.125 25.4375C17.1239 23.4052 17.8351 21.6789 19.2586 20.2586C20.6821 18.8384 22.4084 18.1272 24.4375 18.125C26.4666 18.1228 28.1934 18.834 29.618 20.2586C31.0426 21.6832 31.7533 23.4095 31.75 25.4375C31.7467 27.4655 31.0361 29.1923 29.618 30.618C28.1999 32.0437 26.4731 32.7543 24.4375 32.75ZM0.875 31.9375V18.9375H13.875V31.9375H0.875ZM24.4375 29.5C25.575 29.5 26.5365 29.1073 27.3219 28.3219C28.1073 27.5365 28.5 26.575 28.5 25.4375C28.5 24.3 28.1073 23.3385 27.3219 22.5531C26.5365 21.7677 25.575 21.375 24.4375 21.375C23.3 21.375 22.3385 21.7677 21.5531 22.5531C20.7677 23.3385 20.375 24.3 20.375 25.4375C20.375 26.575 20.7677 27.5365 21.5531 28.3219C22.3385 29.1073 23.3 29.5 24.4375 29.5ZM4.125 28.6875H10.625V22.1875H4.125V28.6875ZM12.3313 11.625H18.6687L15.5 6.50625L12.3313 11.625Z"
            fill="#FF0000"
        />
    </svg>
);

const Whychoose = () => {

    const choosedata = [
        {
            key: "1",
            svg: <Svg />,
            heading: "Tailored Experiences",
            description: "We craft personalized travel solutions that cater to your corporate needs, ensuring every journey aligns with your goals."
        },
        {
            key: "2",
            svg: <Svg />,
            heading: "Comprehensive Services",
            description: "From flights and trains to car rentals and hotel bookings, we provide a one-stop solution for all your travel requirements."
        },
        {
            key: "3",
            svg: <Svg />,
            heading: "Competitive Rates",
            description: "Enjoy access to exclusive deals and competitive pricing, helping your organization save on travel expenses without compromising quality."
        },
        {
            key: "4",
            svg: <Svg />,
            heading: "Expert Support",
            description: "Our experienced team is dedicated to providing exceptional service and support, available 24/7 to assist you at every step."
        },
    ]

    return (
        <div className='bg-[#f3f4f6] py-8'>
            <div className='w-[95%] m-auto'>
                <div className="flex justify-center items-center">
                    <div className=" inline-block text-center">
                        <h2 className="text-center font-bold text-2xl lg:text-3xl text-gray-600">
                            Why Choose Us
                        </h2>
                        <div className="border-2 w-full rounded-full mt-1 border-themeColor"></div>
                    </div>
                </div>

                <h3 className='w-full lg:w-[60%] m-auto text-center mt-8 text-gray-500'>Discover Unmatched Ticketing Solutions Tailored for Your Corporate Needs, Providing Seamless
                    Access to Flights, Trains, and More with Exceptional Support and Great Value</h3>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
                    {choosedata && choosedata.map((e, i) => (
                        <div key={i} className='border px-3 py-6 rounded-xl border-gray-300 bg-white hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px] hover:scale-105 transition-transform duration-300'>
                            <div className=' flex flex-col justify-start gap-7 items-center'>
                                <div className='flex justify-center items-center'>
                                    {e.svg}
                                </div>
                                <div className='font-bold text-gray-600 text-lg'>
                                    <p>{e.heading}</p>
                                </div>
                            </div>
                            <div className='text-center text-gray-500 mt-3'>
                                <p>{e.description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Whychoose