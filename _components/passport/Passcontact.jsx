"use client"
import React, { useState } from 'react'
import IMAGES from "@/public/image";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';

const Passcontact = () => {

    const [phone, setPhone] = useState('');
    console.log(phone, "phone");

    const [passportenquiry, setpassportenquiry] = useState({ name: "", email: "", textarea: "" });
    console.log(passportenquiry, "passportenquiry");

    const [selectedServices, setSelectedServices] = useState([]);
    console.log(selectedServices, "selectedServices");

    // Toggle function to handle selection
    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            // If service is already selected, remove it from the list
            setSelectedServices(selectedServices.filter((item) => item !== service));
        } else {
            // If service is not selected, add it to the list
            setSelectedServices([...selectedServices, service]);
        }
    };


    const handleinput = (e) => {
        const { name, value } = e.target;
        setpassportenquiry({ ...passportenquiry, [name]: value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post("/api/send-email", {
            operation: "passportenquiry",
            name: passportenquiry.name,
            email: passportenquiry.email,
            number: phone,
            services: selectedServices,
            textarea: passportenquiry.textarea,
        })
        console.log(response.data, "check response");
        if (response.data.status === 200) {
            alert(response.data.message)
        }
        else if (response.data.status === 400) {
            alert(response.data.message)
        }
        else if (response.data.status === 401) {
            alert(response.data.message)
        }
        else if (response.data.status === 402) {
            alert(response.data.message)
        }
    }


    return (
        <div>
            <div className='lg:w-[95%] m-auto flex justify-center items-center flex-col lg:flex-row gap-8'>

                <div className='w-[90%] lg:w-[70%] h-[50vh] lg:h-[80vh] xl:h-[90vh] gap-3 relative lg:translate-x-[50px]'>
                    <Image
                        src={IMAGES.plane}
                        alt="contact-landing"
                        fill
                        className="object-cover w-full h-full rounded-lg"
                    /> 
                </div>

                <div className='border border-gray-300 w-[80%] lg:w-[30%] rounded-lg p-5 relative bottom-32 lg:bottom-0 lg:translate-x-[-90px] bg-white'>
                    <p className='mb-4 font-bold text-xl 2xl:text-2xl text-gray-600'>Let's Connect !</p>
                    <form className='w-full flex flex-col justify-start gap-4'>
                        <div className='flex flex-col justify-start gap-1'>
                            <input
                                type="text"
                                name='name'
                                value={passportenquiry.name}
                                onChange={handleinput}
                                placeholder='Your Name'
                                className='border border-gray-300 outline-none py-4 px-2 rounded-md placeholder:text-sm placeholder:text-gray-500'
                            />
                        </div>

                        <div className='flex flex-col justify-start gap-1'>
                            <input
                                type="email"
                                name='email'
                                value={passportenquiry.email}
                                onChange={handleinput}
                                placeholder='Your Email'
                                className='border border-gray-300 outline-none py-4 px-2 rounded-md placeholder:text-sm placeholder:text-gray-500'
                            />
                        </div>

                        <div className='flex flex-col justify-start gap-1'>
                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={setPhone}
                            />
                        </div>

                        <div className='flex flex-col justify-start gap-1'>
                            <div className='flex justify-start items-center gap-3'>
                                <div>
                                    <p className='text-sm text-gray-500'>Type of Services:</p>
                                </div>
                                <div className='flex justify-start gap-3'>
                                    <p
                                        className={`border border-[#fda465] rounded-full py-1 px-3 cursor-pointer ${selectedServices.includes('Passport')
                                            ? 'bg-[#fda465] text-white'
                                            : 'text-[#fda465]'
                                            }`}
                                        onClick={() => toggleService('Passport')}
                                    >
                                        Passport
                                    </p>
                                    <p
                                        className={`border border-[#fda465] rounded-full py-1 px-3 cursor-pointer ${selectedServices.includes('Visa')
                                            ? 'bg-[#fda465] text-white'
                                            : 'text-[#fda465]'
                                            }`}
                                        onClick={() => toggleService('Visa')}
                                    >
                                        Visa
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className='flex flex-col justify-start gap-1'>
                            <textarea
                                name='textarea'
                                value={passportenquiry.textarea}
                                onChange={handleinput}
                                placeholder='Your Message'
                                className='border border-gray-300 outline-none p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 h-32'
                            ></textarea>
                        </div>

                    </form>
                    <div className='mt-5'>
                        <button className="bg-themeColor px-5 py-3 rounded-full text-white font-semibold text-sm" onClick={(e) => handlesubmit(e)}>
                            Submit Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Passcontact