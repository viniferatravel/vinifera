// import { MoveRight } from "lucide-react";
// import Image from "next/image"; // Import Image from Next.js
// import React from "react";
// import { motion } from "framer-motion";

// const cardVariants = {
//   hidden: { opacity: 0, y: 50 }, // Initial state (hidden and slightly shifted down)
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Final state (visible with animation)
// };

// const Page = () => {
//   const packageData = [
//     {
//       title: "Group Packages",
//       description:
//         "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
//       imageUrl: "/image/group_packages.jpg",
//     },
//     {
//       title: "Exclusive Packages",
//       description:
//         "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
//       imageUrl: "/image/popular_packages.jpg",
//     },
//     {
//       title: "Special Packages",
//       description:
//         "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
//       imageUrl: "/image/special_packages.jpg",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 p-5 lg:p-10 flex-col lg:flex-row bg-gray-100 rounded-2xl">
//       {/* Static card (Card 1) */}

//       <div className="flex flex-col gap-5 justify-center items-start p-5">
//         <h2 className="text-2xl font-semibold">Our Specialty Packages</h2>
//         <p>
//           Explore amazing destinations, enjoy comfortable stays, and create
//           lasting memories—all with packages designed to fit your budget and
//           delight every member.
//         </p>
//       </div>

//       {/* Dynamic cards (Cards 2, 3, 4) */}
//       {packageData.map((pkg, index) => (
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={cardVariants}
//           key={index}
//           className="border rounded-xl bg-white"
//         >
//           <div className="w-full h-[200px] p-2 pb-0  ">
//             <Image
//               src={pkg.imageUrl}
//               alt=""
//               height={500}
//               width={500}
//               className="h-full w-full object-cover rounded-lg"
//             />
//           </div>
//           <div className="p-5 flex flex-col gap-3">
//             <h3 className="text-lg font-semibold">{pkg.title}</h3>
//             <p>{pkg.description}</p>
//             <div className="flex gap-2 items-center text-themeColor font-semibold">
//               <button>Learn More</button>
//               <MoveRight />
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default Page;


import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Initial state (hidden and slightly shifted down)
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Final state (visible with animation)
};

const SpecialPackage = () => {
  const router = useRouter()
  const packageData = [
    {
      title: "Group Packages",
      description:
        "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
      imageUrl: "/image/group_packages.jpg",
    },
    {
      title: "Exclusive Packages",
      description:
        "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
      imageUrl: "/image/popular_packages.jpg",
    },
    {
      title: "Special Packages",
      description:
        "Explore amazing destinations, enjoy comfortable stays, and create lasting memories—all with packages designed to.",
      imageUrl: "/image/special_packages.jpg",
    },
  ];

  const handleLearnMore = (title) => {

    if(title === "Group Packages") {
      router.push(`/grouptours`)
    }

    if(title === "Exclusive Packages") {
      router.push(`/exclusive-tours`)
    }

    if(title === "Special Packages") {
      router.push(`/special-tours`)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 p-5 lg:p-10 flex-col lg:flex-row bg-gray-100 rounded-2xl">

      <div className="flex flex-col gap-5 justify-center items-start p-5">
        <h2 className="text-2xl font-semibold ">Our Specialty Packages</h2>
        <p>
          Explore amazing destinations, enjoy comfortable stays, and create
          lasting memories—all with packages designed to fit your budget and
          delight every member.
        </p>
      </div>

      {/* Dynamic cards (Cards 2, 3, 4) */}
      {packageData.map((pkg, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: false });

        return (
          <motion.div
            ref={ref}
            key={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="border rounded-xl bg-white"
          >
            <div className="w-full h-[200px] p-2 pb-0">
              <Image
                src={pkg.imageUrl}
                alt=""
                height={500}
                width={500}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p>{pkg.description}</p>
              <div className="flex gap-2 items-center text-themeColor font-semibold">
                <button onClick={() => handleLearnMore(pkg.title)}>Learn More</button>
                <MoveRight />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SpecialPackage
