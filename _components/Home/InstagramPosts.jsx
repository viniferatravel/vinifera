// "use client";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, Navigation } from "swiper/modules";
// import { ChevronLeft, ChevronRight, Instagram, Video } from "lucide-react";
// import IMAGES from "@/public/image";
// import Image from "next/image";

// export default function InstagramReels() {
//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(false);

//   const mediaData = [
//     {
//       url: IMAGES.ayodhya,
//       type: "image",
//       alt: "Ayodhya Image 1",
//     },
//     {
//       url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d",
//       type: "video",
//       alt: "Ayodhya Video 1",
//     },
//     {
//       url: IMAGES.ayodhya,
//       type: "image",
//       alt: "Ayodhya Image 2",
//     },
//     {
//       url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d",
//       type: "video",
//       alt: "Ayodhya Video 2",
//     },
//     {
//       url: IMAGES.ayodhya,
//       type: "image",
//       alt: "Ayodhya Image 3",
//     },
//     {
//       url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d",
//       type: "video",
//       alt: "Ayodhya Video 3",
//     },
//     {
//       url: IMAGES.ayodhya,
//       type: "image",
//       alt: "Ayodhya Image 4",
//     },
//   ];

//   return (
//     <div className="w-[95%] mx-auto relative">
//       <Swiper
//         className="mySwiper"
//         navigation={{
//           nextEl: ".swiper-next",
//           prevEl: ".swiper-prev",
//         }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         style={{
//           "--swiper-navigation-size": "20px",
//         }}
//         modules={[Navigation, Autoplay]}
//         breakpoints={{
//           0: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//           1024: {
//             slidesPerView: 6,
//             spaceBetween: 20,
//           },
//         }}
//         onSlideChange={(swiper) => {
//           setIsBeginning(swiper.isBeginning);
//           setIsEnd(swiper.isEnd);
//         }}
//       >
//         {mediaData.map((media, index) => (
//           <SwiperSlide
//             key={index}
//             className="h-full w-full border rounded-xl overflow-hidden cursor-pointer"
//             onClick={() => {
//               console.log(`Slide ${index + 1} clicked`);
//             }}
//           >
//             <div className="relative aspect-[9/16] w-full h-full flex justify-center items-center rounded-2xl group z-50">
//               {media.type === "video" ? (
//                 <video
//                   src={media.url}
//                   className="w-full h-full object-cover rounded-2xl"
//                   muted
//                   autoPlay
//                   loop
//                 />
//               ) : (
//                 <Image
//                   src={media.url}
//                   fill
//                   alt={media.alt}
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               )}
//               <div className="hidden group-hover:flex absolute top-0 left-0 justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
                // {media.type === "video" ? (
                //   <Video className="w-6 h-6 text-white" />
                // ) : (
                //   <Instagram className="w-6 h-6 text-white" />
                // )}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="hidden lg:flex top-0 bottom-0 justify-between gap-5 w-full">
//         <div className="absolute flex justify-center items-center -translate-x-5 z-40 left-0 top-0 bottom-0 my-auto">
//           <button
//             className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${
//               isBeginning ? "opacity-50" : ""
//             }`}
//             disabled={isBeginning}
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="absolute flex justify-center items-center translate-x-5 z-40 right-0 top-0 bottom-0 my-auto">
//           <button
//             className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${
//               isEnd ? "opacity-50" : ""
//             }`}
//             disabled={isEnd}
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Instagram, Video } from "lucide-react";
import IMAGES from "@/public/image";
import Image from "next/image";

export default function InstagramReels() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const mediaData = [
    {
      url: IMAGES.ayodhya,
      type: "image",
      alt: "Ayodhya Image 1",
      link: "https://instagram.com/p/ABC123", // Add Instagram link here
    },
    {
      url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Use thumbnail for video
      type: "video",
      alt: "Ayodhya Video 1",
      link: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Add Instagram link here
    },
    {
        url: IMAGES.ayodhya,
        type: "image",
        alt: "Ayodhya Image 1",
        link: "https://instagram.com/p/ABC123", // Add Instagram link here
      },
      {
        url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Use thumbnail for video
        type: "video",
        alt: "Ayodhya Video 1",
        link: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Add Instagram link here
      },
      {
        url: IMAGES.ayodhya,
        type: "image",
        alt: "Ayodhya Image 1",
        link: "https://instagram.com/p/ABC123", // Add Instagram link here
      },
      {
        url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Use thumbnail for video
        type: "video",
        alt: "Ayodhya Video 1",
        link: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Add Instagram link here
      },
      {
        url: IMAGES.ayodhya,
        type: "image",
        alt: "Ayodhya Image 1",
        link: "https://instagram.com/p/ABC123", // Add Instagram link here
      },
      {
        url: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Use thumbnail for video
        type: "video",
        alt: "Ayodhya Video 1",
        link: "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/EF4FE14B2C7F11CED16585BCCB3FDC9C_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=instagram.fbom63-1.fna.fbcdn.net&_nc_cat=102&vs=5a52e9819dbb71ef&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9FRjRGRTE0QjJDN0YxMUNFRDE2NTg1QkNDQjNGREM5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUENsQnNHTjVoLTJwOEZBT1hWblVxWldXVlJicV9FQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJoKPvsKQuYgeFQIoAkMzLBdAO12yLQ5WBBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gcA&ccb=9-4&oh=00_AYB6aApJD3sqprGFJeo0IlButwsMdvhzwlohukp57tSJtA&oe=67140148&_nc_sid=1d576d", // Add Instagram link here
      },
  ];

  return (
    <div className="w-[95%] mx-auto relative">
      <Swiper
        className="mySwiper"
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-size": "20px",
        }}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {mediaData.map((media, index) => (
          <SwiperSlide
            key={index}
            className="h-full w-full border rounded-xl overflow-hidden cursor-pointer"
            onClick={() => {
              window.open(media.link, "_blank"); // Redirect to Instagram post
            }}
          >
            <div className="relative aspect-[9/16] w-full h-full flex justify-center items-center rounded-2xl group z-50">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="w-full h-full object-cover rounded-2xl"
                  muted
                />
              ) : (
                <Image
                  src={media.url}
                  fill
                  alt={media.alt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
              <div className="hidden group-hover:flex absolute top-0 left-0 justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
              {media.type === "video" ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <Instagram className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden lg:flex top-0 bottom-0 justify-between gap-5 w-full">
        <div className="absolute flex justify-center items-center -translate-x-5 z-40 left-0 top-0 bottom-0 my-auto">
          <button
            className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${
              isBeginning ? "opacity-50" : ""
            }`}
            disabled={isBeginning}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute flex justify-center items-center translate-x-5 z-40 right-0 top-0 bottom-0 my-auto">
          <button
            className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${
              isEnd ? "opacity-50" : ""
            }`}
            disabled={isEnd}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
