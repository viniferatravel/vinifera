"use client"
import React, { useEffect, useState } from 'react'
import Corporateone from '@/_components/Corporatesection/Corporateone'
import Whyus from "@/_components/Corporatesection/Whyus"
import Luxury from "@/_components/Luxury"
import Sectionfour from "@/_components/Sectionfour"
import Contact from "@/_components/tickets/Contact";
import { Dot } from 'lucide-react';
import { Star } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import GuestModal from "@/_components/packages/Modal";
import Experience from "@/_components/Corporatesection/Experience"
import CorparatePackages from "@/_components/Corporatesection/CorparatePackages"
import Work from "@/_components/Corporatesection/Work"
import Accordian from '@/_components/Corporatesection/Accordian'

const Corporate = () => {

  const router = useRouter()

  const [corporateClickModal, setCorporateClickModal] = useState(false);

  const corporateConnect = () => {
    setCorporateClickModal(true);
  };

  const handleCloseCorporateModal = (val) => {
    setCorporateClickModal(val);
  };

  const bgimage = [
    {
      key: "1",
      image: "/image/section-4.jpg"
    }
  ]

  const data = [
    {
      key: "1",
      heading: "Incentive Corporate Tours for you and",
      subheading: "Your Team!",
      point: (
        <>
          <div className="flex gap-1 lg:gap-5 justify-center items-center">
            <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center">
              <p>Meetings</p>
            </div>
            <div className="lg:text-xl text-blue-200 font-medium flex justify-start items-center">
              <Dot />
              <p>Incentives</p>
            </div>
          </div>
          <div>
            <p className="lg:text-xl text-white font-medium">
              8 Days | 7 Nights
            </p>
          </div>
        </>
      ),
      btn: (
        <><button type='button' className="bg-white px-4 py-3 rounded-xl" onClick={corporateConnect}>
          Book Now
        </button>
          <GuestModal
            corporateClickModal={corporateClickModal}
            onCloseCorporateModal={handleCloseCorporateModal}
            action={"corporate"}
          />
        </>
      )
    }
  ]

  const luxurydata = [
    {
      id: "1",
      image: "/image/rajasthan.jpg",
      destiny: "rajasthan",
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
            <p className='font-semibold text-sm mt-1'>Best of Rajasthan </p>
            <p className='font-semibold text-xs'>6 <span className='font-normal text-sm'>Days,</span>  5 <span className='font-normal text-sm'>Nights</span> </p>
          </div>

          <div>
            <p className='text-sm font-semibold text-end'>Starting from</p>
            <div className='flex justify-end items-end'>
              <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                router.push(`/filterpage/rajasthan`)
              }}>
                &#8377; 35,990
              </Button>
            </div>
          </div>
        </>
      )
    },
    {
      id: "2",
      image: "/image/goa.jpg",
      destiny: "goa",
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
            <p className='font-semibold text-sm mt-1'>Mesmerizing Goa </p>
            <p className='font-semibold text-xs'>5 <span className='font-normal text-sm'>Days,</span>  4 <span className='font-normal text-sm'>Nights</span> </p>
          </div>

          <div>
            <p className='text-sm font-semibold text-end'>Starting from</p>
            <div className='flex justify-end items-end'>
              <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                router.push(`/filterpage/goa`)
              }}>
                &#8377; 35,000
              </Button>
            </div>
          </div>
        </>
      )
    },
    {
      id: "3",
      image: "/image/ayodhya.jpg",
      destiny: "ayodhya",
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
            <p className='font-semibold text-sm mt-1'>Spiritual Ayodhya </p>
            <p className='font-semibold text-xs'>7 <span className='font-normal text-sm'>Days,</span>  6 <span className='font-normal text-sm'>Nights</span> </p>
          </div>

          <div>
            <p className='text-sm font-semibold text-end'>Starting from</p>
            <div className='flex justify-end items-end'>
              <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                router.push(`/filterpage/ayodhya`)
              }}>
                &#8377; 41,000
              </Button>
            </div>
          </div>
        </>
      )
    },
    {
      id: "4",
      image: "/image/jodhpur.jpg",
      destiny: "gujarat",
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
            <p className='font-semibold text-sm mt-1'>Rann ke Rang</p>
            <p className='font-semibold text-xs'>6 <span className='font-normal text-sm'>Days,</span>  5 <span className='font-normal text-sm'>Nights</span> </p>
          </div>

          <div>
            <p className='text-sm font-semibold text-end'>Starting from</p>
            <div className='flex justify-end items-end'>
              <Button color="default" className='w-28 p-2 bg-themeColor text-white font-semibold text-lg' onClick={() => {
                router.push(`/filterpage/gujarat`)
              }}>
                &#8377; 31,990
              </Button>
            </div>
          </div>
        </>
      )
    },
  ]

  return (
    <div>
      <Corporateone />
      <Whyus />
      <Luxury luxurydata={luxurydata} title={"Combining Luxury and Affordability"} description={"Explore amazing destinations, enjoy comfortable stays, and create lasting memories all with packages designed to fit your budget and delight every member. "} />
      <Sectionfour bgimage={bgimage} data={data} />
      <Experience/>
      <Work/>
      <CorparatePackages/>
      <div className='relative w-[95%] mx-auto'>
        <Contact />
      </div>
      <Accordian/>

    </div>
  )
}

export default Corporate