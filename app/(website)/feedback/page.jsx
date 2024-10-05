"use client"
import React, { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import IMAGES from "@/public/image";
import Image from "next/image";
import axios from 'axios';

const Feedback = () => {

  const [phone, setPhone] = useState('');
  console.log(phone, "phone");

  const [feedbackdata, setfeedbackdata] = useState({ name: "", email: "", feedback: "" });
  console.log(feedbackdata, "feedbackdata");

  const [selectfeedback, setselectfeedback] = useState('');
  console.log(selectfeedback, "selectfeedback");

  const handleinput = (e) => {
    const { name, value } = e.target;
    setfeedbackdata({ ...feedbackdata, [name]: value });
  }

  const handledropdown = (e) => {
    setselectfeedback(e.target.value);
  }

  const handlesubmit = async (e) => {

    e.preventDefault();

    const response = await axios.post("/api/send-email", {
      operation: "addfeedback",
      name: feedbackdata.name,
      email: feedbackdata.email,
      number: phone,
      feedback: feedbackdata.feedback,
      feedropdown: selectfeedback,
    })
    console.log(response.data, "check response");
    if (response.data.status === 200) {
      alert(response.data.message);
      setfeedbackdata({ name: "", email: "", feedback: "" });
      setPhone('');
      setselectfeedback('');
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
    <>
      <div className="relative h-[50vh] lg:h-[70vh] w-full">
        <Image
          src={IMAGES.feedback}
          alt="contact-landing"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0  w-full h-full flex justify-center items-center">
          <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-center items-start gap-5">
            <h1 className="text-gray-700 text-3xl lg:text-5xl flex font-bold gap-2">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                Facing
              </motion.span>
            </h1>
            <h1 className="text-white text-3xl lg:text-5xl flex font-bold p-4 bg-themeColor">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                Problems?
              </motion.span>
            </h1>

            <div className="w-[70%] lg:w-1/3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-700"
              >
                We love to help our customers, and we strive to
                better the experience.
              </motion.p>
            </div>

            <button className="bg-themeColor px-5 py-3 mt-10 rounded-full text-white font-medium">
              Connect Now
            </button>
          </div>
        </div>
      </div>


      <div className='bg-[#fffafa] py-8'>
        <div className='w-[95%] m-auto'>
          <div className='flex flex-col lg:flex-row justify-between py-6'>
            <div className='w-full lg:w-[35%]'>
              <div className=' w-[90%] pb-5 lg:pb-0'>
                <h1 className='text-3xl lg:text-5xl font-bold leading-snug text-gray-600'>Vinifera Feedback</h1>
                <p className='mt-3 leading-relaxed text-medium text-gray-500'>We would love to hear from you
                  about your Vinifera experience. Drop
                  a tour review or tell us about your
                  Vinifera booking experience, we
                  would love to know about your
                  Vinifera Journey.</p>
              </div>
            </div>
            <div className='bg-white w-full lg:w-[60%] pt-5 lg:p-10'>
              <div className='w-full flex flex-col justify-start gap-3'>
                <p className='font-bold text-2xl text-gray-600'>Guest Feedback</p>
                <p className='text-medium leading-relaxed text-gray-500'>Your feedback is essential for us to improve. We value your input in shaping our services
                  to better meet your needs. Please take a moment to share your thoughts and
                  suggestions.</p>
                <form className='mt-5 lg:mt-0 flex flex-col justify-start gap-4'>
                  <div className='flex flex-col justify-start gap-1'>
                    <input
                      type="text"
                      name='name'
                      value={feedbackdata.name}
                      onChange={handleinput}
                      placeholder='Your Name'
                      className='border border-gray-300 outline-none py-4 px-2 rounded-md placeholder:text-sm placeholder:text-gray-500'
                    />
                  </div>

                  <div className='flex flex-col justify-start gap-1'>
                    <input
                      type="email"
                      name='email'
                      value={feedbackdata.email}
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
                    <select
                      className='border border-gray-300 outline-none py-4 px-2 rounded-md text-sm bg-white text-gray-500'
                      onChange={handledropdown}
                      value={selectfeedback}
                    >
                      <option value="" disabled hidden>Select Feedback</option>
                      <option value="website content">Website Content</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Appreciation">Appreciation</option>
                      <option value="Online Booking Experience">Online Booking Experience</option>
                    </select>
                  </div>

                  <div className='flex flex-col justify-start gap-1'>
                    <textarea
                      name='feedback'
                      value={feedbackdata.feedback}
                      onChange={handleinput}
                      placeholder='Your Message'
                      className='border border-gray-300 outline-none p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 h-32'
                    ></textarea>
                  </div>
                </form>
                <div className='mt-8'>
                  <button className="bg-themeColor px-5 py-3 rounded-full text-white font-semibold" onClick={(e) => handlesubmit(e)}>
                    Connect Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Feedback