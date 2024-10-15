import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from 'sweetalert2';

const ContactForm = ({ selectedPackage, onSubmitSuccess }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    adults: "",
    travelDate: "",
    queries: "",
    termsAgreed: false,
    updatesAgreed: false,
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

    if (formData.termsAgreed && formData.updatesAgreed && formData.name && formData.email && formData.phone && formData.city && formData.adults && formData.travelDate) {
      const response = await axios.post("/api/send-email", {
        operation: "sendenquirymail",
        name: formData.name,
        email: formData.email,
        number: formData.phone,
        city: formData.city || null,
        adults: formData.adults || null,
        date: formData.travelDate || null,
        query: formData.queries || null,
        termsAgreed: formData.termsAgreed,
        updatesAgreed: formData.updatesAgreed,
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
          city: "",
          adults: "",
          travelDate: "",
          queries: "",
          termsAgreed: false,
          updatesAgreed: false,
        });
        onSubmitSuccess(true)
      }
      else if (response.data.status === 402) {
        Swal.fire({
          title: "Number must be exactly 10 digits and contain only numeric values",
          // text: "Team connect with you soon",
          icon: "success"
        });
      }
    }
    else {
      Swal.fire({
        title: "please select the check",
        // text: "Team connect with you soon",
        icon: "success"
      });
    }



    //     console.log("Form submitted:", formData);

    //     const whatsappMessage = `Hi, I am interested in your package named as *${selectedPackage?.package_name}*.

    // *My details are -* 

    //   *Name:* ${formData.name},
    //   *Phone:* ${formData.phone}, 
    //   *Email:* ${formData.email}, 
    //   *City:* ${formData.city},
    //   *No of Adults:* ${formData.adults},
    //   *Travel Date:* ${formData.travelDate},
    //   *Queries:* ${formData.queries}`;
    //     const whatsappURL = `https://wa.me/7738527031?text=${encodeURIComponent(
    //       whatsappMessage
    //     )}`;
    //     window.open(whatsappURL, "_blank");

    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   city: "",
    //   adults: "",
    //   travelDate: "",
    //   queries:"",
    //   termsAgreed: false,
    //   updatesAgreed: false,
    // });
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-lg w-full">
        <div className="flex justify-center items-center text-center">
          <h2 className="text-xl font-semibold text-red-600 text-center">
            Our expert will get in touch with you shortly
          </h2>
        </div>
        <p className="text-center font-bold text-lg mt-2 mb-6">
          {selectedPackage?.package_name}
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <div className="hidden sm:flex items-center justify-center h-[82%]">
              <Image
                src="/image/connntact.webp"
                alt={`connntact`}
                width={600}
                height={600}
                layout="responsive"
                className="object-scale-down w-[100%] h-[100%] rounded-full"
              />
            </div>
            <div className="w-full">

              <div>
                <label className="block text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email ID*</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                <div className="flex">
                  <select className="mt-1 mb-2 block w-1/4 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    <option>+91</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    className="mt-1 mb-2 block w-3/4 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="8123456789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current City*</label>
                <input
                  type="text"
                  name="city"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Current City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">No of Adults*</label>
                <input
                  type="number"
                  name="adults"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="No of Adults"
                  value={formData.adults}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Travel Date*</label>
                <input
                  type="date"
                  name="travelDate"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.travelDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Please write your Queries</label>
                <textarea
                  type="text"
                  name="queries"
                  placeholder="Please write your Queries"
                  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.queries}
                  onChange={handleChange}
                />
              </div>


            </div>
          </div>
          {/* 
        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" className="h-4 w-4 text-red-600" />
          <label className="text-sm">I&apos;m not a robot</label>
        </div> */}
          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              name="termsAgreed"
              className="h-4 w-4 text-red-600"
              checked={formData.termsAgreed}
              onChange={handleChange}
            />
            <label className="text-sm">
              I authorize viniferaa.com to contact me and have read the Terms and
              Conditions.
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-red-600"
              name="updatesAgreed"
              checked={formData.updatesAgreed}
              onChange={handleChange}
            />
            <label className="text-sm">
              I agree to receive updates & offers from vinifera.com.
            </label>
          </div>
          <div className="flex justify-between items-center mt-6 w-full">
            <p className="text-sm text-gray-600 text-left">
              <span role="img" aria-label="phone">
                📞
              </span>{" "}
              02268818888 (10am - 8pm)
            </p>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              CALL ME
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default ContactForm;
