"use client"
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#ED1C24"
  }
};
const inicon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#ffff"
  }
};

 const Loading = () => (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-200">

  <div className="w-96 h-96 flex justify-center items-center">
    <Vini className="size-96"/>
  </div>
  </div>
);

export default Loading


const Vini = ({ size = 200, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}          // Set width to size prop
    height={size || height}         // Set height to size prop
    viewBox="0 0 47 51"  // Maintain the original aspect ratio
    fill="none"
    {...props}
    className="overflow-visible stroke-[#ED1C24] fill-[#ED1C24] stroke-2"
  >
    <motion.path fill="#ED1C24" d="M33.503 0h13.03L19.604 51V27.175L33.504 0Z" 
      variants={icon}
      initial="hidden"
      animate="visible"
      transition={{
        default: { duration: 2, ease: "easeInOut" },
        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
      }} />
    <motion.path
      fill="#ED1C24"
      d="M0 12.533h12.409l7.603 14.023L19.854 51 0 12.533Z"
      variants={icon}
      initial="hidden"
      animate="visible"
      transition={{
        default: { duration: 2, ease: "easeInOut" },
        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
      }} />
    <motion.path
      fill="#FFFDFD"
      stroke="#fff"
      strokeWidth={0.646}
      variants={inicon}
      initial="hidden"
      animate="visible"
      transition={{
        default: { duration: 3, ease: "easeInOut" },
        fill: { duration: 3, ease: [1, 0, 0.8, 1] }
      }}
      d="m14.777 41.67-2.998-5.953c2.833-.434 9.003-1.531 10.144-2.276 1.427-.93-11.78-3.142-12.595-3.288-.758-.136-1.513-.88 2.668-1.923 3.16-.788 6.734-1.615 8.058-1.801-1.737.662-6.693 2.58-2.288 2.98 2.184.198 6.95 1.075 9.059 1.489 4.157 1.365 2.42 3.164 1.55 4.28-.694.894-9.442 4.754-13.598 6.492Z"
    />
  </svg>
);

