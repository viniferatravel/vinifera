import { Mail, Phone, Wallet, Download } from "lucide-react";
import React, { useState, useEffect } from "react";
import GuestModal from "@/_components/packages/Modal"

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="inline-flex">
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <defs>
              <clipPath id="half-star">
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              clipPath="url(#half-star)" />
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              className="text-gray-300"
              fill="currentColor"
              style={{ clipPath: "inset(0 0 0 50%)" }} // Left half
            />
          </svg>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index + fullStars + (hasHalfStar ? 1 : 0)}
              className="w-4 h-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
      </div>
      {/* <div className="pl-2">{rating}</div> */}
    </div>
  );
};

const PriceCard = ({ selectedPackage }) => {

  const [tourInclExclModal, setTourInclExclModal] = useState(false)
  const [enquiryClickModal, setEnquiryClickModal] = useState(false)

  const handleCloseTourInclExclModal = (val) => {
    setTourInclExclModal(val)
  }

  const handleCloseEnquiryModal = (val) => {
    setEnquiryClickModal(val)
  }

  const handleDownloadItenarary = async (selectedPack) => {
    const url = selectedPack?.package_pdf;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const a = document.createElement('a');
        const objectURL = URL.createObjectURL(blob);
        a.href = objectURL;
        a.download = `${selectedPack?.package_name}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectURL);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
  }


  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold">{selectedPackage?.package_name}</h2>
        <div className="flex gap-10">
          <div className="font-semibold">{selectedPackage?.tour_itinerary?.days}D/{selectedPackage?.tour_itinerary?.nights}N </div>
          <div className="flex items-center justify-center">
            <Rating rating={"5"} />
            <div> &nbsp;Reviews
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow-md rounded-xl w-full p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-base">Start From</p>
          <h2 className="text-3xl font-semibold">₹{selectedPackage?.price}*</h2>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => setEnquiryClickModal(true)} className="bg-[#ed1c24] py-2 px-4 rounded-full text-base font-semibold text-white hover:bg-red-600">
              Book Now
            </button>
            {/* <a href="/kutchPackage.pdf" download><button className="border border-[#ed1c24] py-2 px-4 rounded-full text-base font-semibold text-themeColor hover:bg-themeColor hover:text-white">
              Itenarary
            </button></a> */}
            <button 
            className="border border-[#ed1c24] py-2 px-4 rounded-full text-base font-semibold text-themeColor hover:bg-themeColor hover:text-white inline-flex"
            onClick={() => handleDownloadItenarary(selectedPackage)}
            >
              
              Itenarary
              <Download className="h-6 w-6 pl-2"/>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <Wallet className="size-5" />
            </div>
            <button type="button" className="text-base font-semibold text-blue-900" onClick={() => setTourInclExclModal(true)}>
              Tour Price Inclusions and Exclusions
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <Phone className="size-5" />
            </div>
            <p>
              Call Us for details&nbsp;
              <span className="text-base font-semibold cursor-pointer">
                1800 266 1100
              </span>
              (Toll Free)
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <Mail className="size-5" />
            </div>
            <p>
              Mail Us for details
              <span className="text-base font-semibold cursor-pointer">
                &nbsp;holiday@vinifera.in
              </span>
            </p>
          </div>

          <div>
            <GuestModal tourInclExclModal={tourInclExclModal} onCloseTourInclExclModal={handleCloseTourInclExclModal} action={"tourInclExcl"} />
          </div>

          <div>
            <GuestModal enquiryClickModal={enquiryClickModal} onCloseEnquiryModal={handleCloseEnquiryModal} action={"enquiry"} selectedPackage={selectedPackage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
