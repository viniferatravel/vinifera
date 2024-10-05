"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import IMAGES from "@/public/image";
import Image from "next/image";

const MainContact = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[+]*[0-9]{10,15}$/; // Basic regex for phone numbers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    if (!fullName) newErrors.fullName = "Full Name is required.";
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number is not valid.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!message) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const whatsappMessage = `
      Full Name: ${fullName}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Message: ${message}
    `.trim();

    const fixedNumber = "7977929734";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${fixedNumber}&text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
    // Clear the form fields
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
    setErrors({});
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
    <>
      <div className="relative h-[70vh] w-full">
        <Image
          src={IMAGES.contact}
          alt="contact-landing"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0  w-full h-full flex justify-center items-center bg-black/15">
          <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-center items-start gap-10">
            <h1 className="text-white text-3xl lg:text-5xl flex  gap-2">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                Contact
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-themeColor px-1 text-center"
              >
                Us
              </motion.span>
            </h1>
            <div className="w-[70%] lg:w-1/3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white"
              >
                For any inquiries about your group tour, please contact us. Our
                team is ready to assist you with tour details, booking, and any
                other questions you may have for a smooth travel experience.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-20 mt-10 ">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-5xl font-semibold">Contact Us</h1>
          <p className="w-full lg:w-[80%] text-base text-center text-gray-500">
            We’re here to enhance your experience. If you have questions about
            our services, need help with reservations, or want to provide
            feedback, our dedicated team is ready to assist you. Please fill out
            the form below or contact us directly by phone or email. We look
            forward to connecting with you!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants}
            className="flex justify-center flex-col w-[90%] lg:w-[70%] mx-auto gap-5"
          >
            <div className="flex justify-between items-center w-full gap-5 flex-col md:flex-row ">
              <input
                type="text"
                placeholder="Full Name"
                className="border flex-1 p-3 rounded-2xl bg-red-100 w-full"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="text-red-600">{errors.fullName}</span>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                className="border flex-1 p-3 rounded-2xl bg-red-100 w-full"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <span className="text-red-600">{errors.phoneNumber}</span>
              )}
            </div>
            <input
              type="email"
              placeholder="Email ID"
              className="border flex-1 p-3 rounded-2xl bg-red-100"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
            <textarea
              placeholder="Message"
              className="border flex-1 p-3 rounded-2xl bg-red-100"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <span className="text-red-600">{errors.message}</span>
            )}
            <div className="w-full">
              <button className="border border-themeColor px-10 py-3 rounded-full text-themeColor flex-1 font-semibold hover:bg-themeColor hover:text-white">
                Submit
              </button>
            </div>
          </motion.div>
        </form>

        <div className="p-10 bg-red-100 w-full h-full">
          <div className="w-full lg:w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 h-full lg:h-60">
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants}
            className="bg-themeColor rounded-2xl flex justify-center items-center flex-col p-5 gap-5">
              <h2 className="text-white text-xl font-semibold">
                +91- 91364-34899
              </h2>
              <p className="text-gray-300 text-center">
                For all inquiries regarding to booking call us any time at the
                above number
              </p>
            </motion.div>
            <motion.div initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants} className="bg-themeColor rounded-2xl flex justify-center items-center flex-col p-5 gap-5">
              <h2 className="text-white text-xl font-semibold">
                travel@vinifera.com
              </h2>
              <p className="text-gray-300 text-center">
                For all inquiries regarding to booking call us any time at the
                above number
              </p>
            </motion.div>
            <motion.div initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants} className="bg-themeColor rounded-2xl flex justify-center items-center flex-col p-5 gap-5">
              <h2 className="text-white text-xl font-semibold">
                Ocean Pearl Resort
              </h2>
              <p className="text-gray-300 text-center">
                1006, Juhi Niharika Mirage, Sector 10, Kharghar, 410210
              </p>
            </motion.div>
          </div>
        </div>
        <div className="overflow-hidden h-full rounded-xl w-[90%] mx-auto mb-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.619303126785!2d73.07621497537683!3d19.03648995321138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c20d3e4bdf33%3A0x6233e94401a34a5b!2sJuhi%20Niharika%20Mirage%20Kharghar!5e0!3m2!1sen!2sin!4v1727422828398!5m2!1sen!2sin"
            className="w-full h-72 border-none shadow-lg "
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default MainContact;
