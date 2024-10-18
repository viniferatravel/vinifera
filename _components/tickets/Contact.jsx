'use client'
import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    queries: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/send-email", {
      operation: "sendenquirymail",
      name: formData.name,
      email: formData.email,
      number: formData.phone,
      query: formData.queries || null,
    });
    console.log(response.data, "check respobse");
    if (response.data.status === 200) {
      // alert(response.data.message);
      Swal.fire({
        title: "Email sent and enquiry saved successfully",
        text: "Team connect with you soon",
        icon: "success"
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        queries: "",
      });
    }
    else if (response.data.status === 402) {
      Swal.fire({
        title: "Number must be exactly 10 digits and contain only numeric values",
        // text: "Team connect with you soon",
        icon: "success"
      });
    }

    //     console.log("Form submitted:", formData);

    //     const whatsappMessage = `Hi, I am interested in your service!*.

    // *My details are -* 

    //   *Name:* ${formData.name},
    //   *Phone:* ${formData.phone}, 
    //   *Email:* ${formData.email}, 
    //   *Queries:* ${formData.queries}`;
    //     const whatsappURL = `https://wa.me/7738527031?text=${encodeURIComponent(
    //       whatsappMessage
    //     )}`;
    //     window.open(whatsappURL, "_blank");

    //     setFormData({
    //       name: "",
    //       email: "",
    //       phone: "",
    //       queries:"",
    //     });
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center mb-10">
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
        Contact Us
      </h2>
      <p className="text-base lg:text-lg lg:w-[80%] text-center text-gray-500">
        Want a customized plan for your next vacation?
      </p>

      <div className="w-full p-10 lg:p-16 bg-red-100 rounded-2xl">
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-10">
          <div className="grid grid-col-1 lg:grid-cols-2 gap-5  lg:gap-8 w-[95%] lg:w-[60%] mx-auto">
            <input
              type="text"
              required
              name="name"
              placeholder="Name"
              className="px-5 py-3 border-b border-gray-500 bg-transparent border-0 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="Number"
              required
              placeholder="Contact"
              name="phone"
              className="px-5 py-3 border-b border-gray-500 bg-transparent border-0 focus:outline-none"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              required
              placeholder="Email"
              name="email"
              className="px-5 py-3 border-b border-gray-500 bg-transparent border-0 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              required
              placeholder="Queries"
              name="queries"
              className="px-5 py-3 border-b border-gray-500 bg-transparent border-0 focus:outline-none"
              value={formData.queries}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center lg:justify-end w-[60%] mx-auto">
            <button type="submit" className="bg-themeColor px-10 py-3 rounded-xl text-white font-medium">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
