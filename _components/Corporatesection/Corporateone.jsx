// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// // import IMAGES from '@/public/image';
// import corporateone from "@/public/image/cp1.jpg";
// import { Button } from "@nextui-org/button";
// import { motion } from "framer-motion";
// import GuestModal from "@/_components/packages/Modal"

// const Corporateone = () => {

//   const [ corporateClickModal, setCorporateClickModal ] = useState(false)

//   const corporateConnect = () => {
//     setCorporateClickModal(true)
//   }

//   const handleCloseCorporateModal = (val) => {
//     setCorporateClickModal(val)
//   }

//   return (
//     <div>
//       <div className=" w-full relative">
// <div className="relative h-[50vh] md:h-[80vh]  ">
//   <Image
//     alt="corporateone"
//     src={corporateone}
//     fill
//     style={{
//       objectFit: "cover",
//     }}
//   />
// </div>
//         <div className="absolute w-full h-full top-0 left-0 p-4 lg:p-12 bg-black/30">
//           <div className="inline-block text-white text-xl lg:text-4xl font-semibold leading-relaxed xl:leading-normal">
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0 }}
//             >
//               Efficiency,
//             </motion.p>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0 }}
//             >
//               Comfort, and
//             </motion.p>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="bg-themeColor p-1"
//             >

//               Cost Savings
//             </motion.p>
//           </div>
//           <div className="w-full md:w-[50%] lg:w-[38%] mt-10 md:mt-7 lg:mt-10 font-semibold text-white text-base">
//             <motion.p initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}>
//               At Vinifera, we provide efficient, comfortable, and cost effective
//               corporate travel solutions, so you can focus on growing your
//               business.
//             </motion.p>
//           </div>

//           <Button
//             color="default"
//             className="mt-10 md:mt-7 lg:mt-10 w-32 p-2 bg-themeColor text-white font-semibold"
//             radius="full"
//             onClick={corporateConnect}
//           >
//             Connect now
//           </Button>

//           <div>
//             <GuestModal  corporateClickModal={corporateClickModal} onCloseCorporateModal={handleCloseCorporateModal} action={"corporate"} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Corporateone;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import IMAGES from "@/public/image"; // Assuming your images are imported correctly
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import GuestModal from "@/_components/packages/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import Pagination
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination"; // Import pagination styles

const Corporateone = () => {
  const [corporateClickModal, setCorporateClickModal] = useState(false);

  const corporateConnect = () => {
    setCorporateClickModal(true);
  };

  const handleCloseCorporateModal = (val) => {
    setCorporateClickModal(val);
  };

  // Array of image data
  const imageData = [
    {
      src: IMAGES.corporateone,
      alt: "Corporate One",
    },
    {
      src: IMAGES.GroupTours,
      alt: "Corporate Two",
    },
    {
      src: IMAGES.ayodhya,
      alt: "Corporate Three",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Static text content (absolute) */}
      <div className="absolute w-full h-full top-0 left-0 p-4 lg:p-12 bg-black/30 z-10">
        <div className="inline-block text-white text-xl lg:text-4xl font-semibold leading-relaxed xl:leading-normal">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            Efficiency,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            Comfort, and
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-themeColor p-1"
          >
            Cost Savings
          </motion.p>
        </div>

        <div className="w-full md:w-[50%] lg:w-[38%] mt-10 md:mt-7 lg:mt-10 font-semibold text-white text-base">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            At Vinifera, we provide efficient, comfortable, and cost-effective
            corporate travel solutions, so you can focus on growing your
            business.
          </motion.p>
        </div>

        <Button
          color="default"
          className="mt-10 md:mt-7 lg:mt-10 w-36 p-6 text-md bg-themeColor text-white font-semibold"
          radius="full"
          onClick={corporateConnect}
        >
          Connect now
        </Button>

        <GuestModal
          corporateClickModal={corporateClickModal}
          onCloseCorporateModal={handleCloseCorporateModal}
          action={"corporate"}
        />
      </div>


      <Swiper
        modules={[Autoplay, Pagination]} 
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={0.5}
        slidesPerView={1}
        loop={true}
        className="relative z-0"
      >
        {imageData.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[50vh] md:h-[80vh]">
              <Image
                alt={image.alt} // Use alt text from the data
                src={image.src} // Use source from the data
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Corporateone;
