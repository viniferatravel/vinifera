"use client";
// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const SiteFooter = () => {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full border-t-2">
//       <div className="flex w-[95%] mx-auto flex-col lg:flex-row py-16 border-b-2 gap-5">
//         <div className="flex-1 ">
//           <div className="w-full lg:w-[80%] flex flex-col gap-4">
//             <h2 className="text-2xl font-semibold">
//               Keep traveling all year round!
//             </h2>
//             <p>
//               Subscribe to our newsletter to find travel inspiration in your
//               inbox.
//             </p>

//             <div >
//               <div className="flex justify-between gap-5 flex-col lg:flex-row">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="border flex-1 p-3 rounded-xl"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email ID"
//                   className="border flex-1 p-3 rounded-xl"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between gap-5 flex-col lg:flex-row">
//                 <input
//                   type="number"
//                   placeholder="Phone Number"
//                   className="border flex-1 p-3 rounded-xl"
//                   required
//                 />
//                 <button
//                   type="text"
//                   className="border flex-1 p-3 rounded-xl bg-themeColor text-white font-medium"
//                 >
//                   Get a call back!
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col gap-5 p-5">
//           <div className="grid grid-cols-1 lg:grid-cols-3  gap-5">
//             <div className="">
//               <h3 className="font-semibold mb-4">Discover Us</h3>
//               <ul className="space-y-1 text-gray-600 flex flex-col">
//                 <Link href="/guest-reviews">Guest Reviews</Link>
//                 <Link href="/about">About Us</Link>
//                 <Link href="/team">Our Team</Link>
//                 <Link href="/tour-managers">Tour Managers</Link>
//                 <Link href="/sales-partners">Sales Partners</Link>
//                 <Link href="/careers">Careers</Link>
//                 <Link href="/csr-policy">CSR Policy</Link>
//               </ul>
//             </div>

//             {/* Support */}
//             <div className="">
//               <h3 className="font-semibold mb-4">Support</h3>
//               <ul className="space-y-1 text-gray-600 flex flex-col">
//                 <Link href="/contact">Contact Us</Link>
//                 <Link href="/feedback">Feedback</Link>
//                 <Link href="/faq">FAQ</Link>
//                 <Link href="/travel-deals">Travel Deals</Link>
//               </ul>
//             </div>

//             <div className="">
//               <h3 className="font-semibold mb-4">Resources</h3>
//               <ul className="space-y-1 text-gray-600 flex flex-col">
//                 <Link href="/tour-status">Tour Status</Link>
//                 <Link href="/blog">Blog</Link>
//                 <Link href="/podcasts">Podcasts</Link>
//                 <Link href="/video-blogs">Video Blogs</Link>
//                 <Link href="/travel-planner">Travel Planner</Link>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex w-[95%] mx-auto flex-col lg:flex-row pt-10">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//         <div className="p-3 flex flex-col gap-3">
//             <h4 className="font-semibold">Our Office</h4>
//             <p>1006, Juhi Niharika Mirage, Sector 10, Kharghar, 410210</p>
//           </div>

//           <div className="p-3 flex flex-col gap-3">
//             <h4 className="font-semibold  ">Call us</h4>
//             <p>1800 000 000 000</p>
//             <p className="text-gray-600">
//               Request a quote or just chat about your next vacation
//             </p>
//           </div>

//           <div className="p-3 flex flex-col gap-3">
//             <h4 className="font-semibold ">Write to us</h4>
//             <p className="text-gray-600">
//               Be it an inquiry, feedback, or a simple suggestion.
//             </p>
//             <p className="mt-1">travel@vinifera.com</p>
//           </div>

//           <div className="p-3 flex flex-col gap-3">
//             <p>Connect with us:</p>
//             <div className="flex space-x-4 mt-4 md:mt-0">
//               <Link href="https://facebook.com">
//                 <Facebook className="text-red-500 w-6 h-6" />
//               </Link>
//               <Link href="https://linkedin.com">
//                 <Linkedin className="text-red-500 w-6 h-6" />
//               </Link>
//               <Link href="https://youtube.com">
//                 <Youtube className="text-red-500 w-6 h-6" />
//               </Link>
//               <Link href="https://instagram.com">
//                 <Instagram className="text-red-500 w-6 h-6" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteFooter;

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  discoverLinks,
  supportLinks,
  quickLinks,
  socialLinks,
  copyright,
} from "@/config/siteConfig";
import FooterTabs from "./FooterTabs";
import axios from "axios";
import Swal from 'sweetalert2';

const SiteFooter = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  const iconComponents = {
    Facebook: <Facebook className="size-5" />,
    Instagram: <Instagram className="size-5" />,
    Linkedin: <Linkedin className="size-5" />,
    Youtube: <Youtube className="size-5" />,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/send-email", {
      operation: "sendenquirymail",
      name: fullName,
      email: email,
      number: phoneNumber
    })
    console.log(response.data, "check respobse");
    if (response.data.status === 200) {
      // alert(response.data.message);
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      Swal.fire({
        title: "Email sent and enquiry saved successfully",
        text: "Team connect with you soon",
        icon: "success"
      });
    }
    else if (response.data.status === 402) {
      Swal.fire({
        title: "Number must be exactly 10 digits and contain only numeric values",
        // text: "Team connect with you soon",
        icon: "success"
      });
    }
    //     const whatsappMessage = `Hi, I am interested in your service*.

    // *My details are -* 

    //   *Name:* ${fullName},
    //   *Phone:* ${phoneNumber}, 
    //   *Email:* ${email}`;

    //     const whatsappURL = `https://wa.me/7738527031?text=${encodeURIComponent(
    //       whatsappMessage
    //     )}`;
    //     window.open(whatsappURL, "_blank");

    //     setFullName("");
    //     setEmail("");
    //     setPhoneNumber(0);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full border-t-2 mt-8">
      <FooterTabs />
      <div className="flex w-[95%] mx-auto flex-col lg:flex-row py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="p-3 flex flex-col gap-3">
            <h4 className="font-semibold">Our Office</h4>
            <p className="text-gray-400">
              1006, Juhi Niharika Mirage, Sector 10, Kharghar, 410210
            </p>

            <Link href="https://maps.app.goo.gl/LQZzRHKRaVXkZrc59" passHref target="_blank" className="font-semibold text-themeColor">

              Locate Us

            </Link>
          </div>

          <div className="p-3 flex flex-col gap-3">
            <h4 className="font-semibold">Call us</h4>
            <p className="text-gray-400">
              Request a quote or just chat about your next vacation
            </p>
            <p className="text-themeColor font-semibold">1800 000 000 000</p>
          </div>

          <div className="p-3 flex flex-col gap-3">
            <h4 className="font-semibold">Write to us</h4>
            <p className="text-gray-400">
              Be it an inquiry, feedback, or a simple suggestion.
            </p>
            <Link href="mailto:vinifera.travel@gmail.com" className="mt-1 text-themeColor font-semibold">
              vinifera.travel@gmail.com
            </Link>
          </div>

          <div className="p-3 flex flex-col gap-3">
            <p className="font-semibold">Connect with us:</p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-themeColor ">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-gray-100 hover:text-white hover:bg-themeColor p-2 rounded-full"
                >
                  {iconComponents[link.icon]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full ">
        <div className="flex w-[95%] mx-auto flex-col lg:flex-row py-5 lg:py-10 border-b-2 border-gray-300 gap-5 ">
          <div className="flex-1">
            <div className="w-full lg:w-[80%] flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">
                Keep traveling all year round!
              </h2>
              <p className="text-gray-600">
                Subscribe to our newsletter to find travel inspiration in your
                inbox.
              </p>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <div className="flex justify-between gap-5 flex-col lg:flex-row">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="border flex-1 p-3 rounded-xl font-normal"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="border flex-1 p-3 rounded-xl font-normal"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between gap-5 flex-col lg:flex-row">
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="border flex-1 p-3 rounded-xl font-normal"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="border flex-1 p-3 rounded-xl bg-themeColor text-white font-medium"
                    >
                      Get a call back!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5 p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 place-content-center">
              <div>
                <h3 className="font-semibold mb-4">Main Links</h3>
                <ul className="space-y-1 text-gray-600 flex flex-col">
                  {discoverLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-1 text-gray-600 flex flex-col">
                  {supportLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-1 text-gray-600 flex flex-col">
                  {quickLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full ">
        <div className="flex w-[95%] mx-auto flex-col lg:flex-row py-10 border-b-2 borde3-gray-400">
          <p className="text-gray-500">
            <span className="font-bold text-black">
              Caution: Beware of Fake Promotions or Offers :
            </span>
            Please do not trust or interact with any promotional emails, SMS, or
            web links asking you to click and provide your personal details. All
            authorized communications from Vinifera are sent only from domains
            @vinifera.com or @vinifera.in, or via SMS from VINFRA or 741324.
            Vinifera assumes no liability or responsibility for any fraudulent
            or misleading communication that is not sent from our registered
            domains.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 w-full ">
        <div className="flex w-[95%] mx-auto justify-between items-center flex-col lg:flex-row py-5 border-b-2 border-gray3400 gap-5">
          <p className="text-gray-500 ">
            © 2024 Vinifera Tours And Travels All Rights Reserved.
          </p>
          <ul className="flex justify-center items-center gap-5">
            {copyright.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
