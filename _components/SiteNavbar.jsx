"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import NavbarModal from "./NavbarModal";
import IMAGES from "@/public/image";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { usePathname } from 'next/navigation';
import { Button } from "@nextui-org/react";

const NavLinks = ({ closeNavbar, lastSegment }) => {

  const router = useRouter();

  const [links, setlinks] = useState([]);
  // console.log(links, "links");

  const [international, setinternational] = useState([]);
  // console.log(international, "international");

  const [noninternational, setnoninternational] = useState([]);
  // console.log(noninternational, "noninternational");

  const [packagedata, setpackagedata] = useState([]);
  // console.log(packagedata, "packagedata");

  const [specialpackagedata, setspecialpackagedata] = useState([]);
  console.log(specialpackagedata, "specialpackagedata");

  // const [activeIndex, setActiveIndex] = useState(0);
  // console.log(activeIndex, "activeIndex");

  const [exclusiveData, setexclusiveData] = useState('');
  // console.log(exclusiveData, "exclusiveData");

  const [specialCategory, setspecialCategory] = useState('');
  // console.log(specialCategory, "specialCategory");

  const [showTripsContent, setShowTripsContent] = useState(false);
  const [showPackagesContent, setShowPackagesContent] = useState(false);
  const [showspecialContent, setShowspecialContent] = useState(false);

  const [navAction, setNavAction] = useState("");

  useEffect(() => {
    const categories = links.map(link => link.category);
    // console.log(categories, "categories");

    const exclusiveData = categories.flat().find(item => item === "EXCLUSIVE");
    setexclusiveData(exclusiveData);

    const specialCategory = categories.flat().find(item => item === "SPECIAL");
    setspecialCategory(specialCategory);

    if (links) {
      const internationaldata = links.filter(link => link.sub_category.includes("INTERNATIONAL"));
      console.log(internationaldata, "internationaldata checl");

      const noninternationaldata = links.filter(link => !link.sub_category.includes("INTERNATIONAL"));
      console.log(noninternationaldata, "noninternationaldata check");

      setinternational(internationaldata);
      setnoninternational(noninternationaldata)
    }

  }, [links]);

  useEffect(() => {
    async function getdata() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchallpackage",
      });
      // console.log(response.data.fetchalldata, "check response");
      setlinks(response.data.fetchalldata);
    }
    getdata();
  }, []);

  useEffect(() => {
    if (exclusiveData) {
      async function getData() {
        const response = await axios.post("/api/fetchcategory", {
          operation: "fetchdatacategorieswise",
          category: exclusiveData,
        });
        // console.log(response.data.packages, "check packages");
        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "EXCLUSIVE")
        }));
        setpackagedata(filteredPackages);
      }
      getData();
    }

  }, [exclusiveData]);

  useEffect(() => {
    if (specialCategory) {
      async function getData() {
        const response = await axios.post("/api/fetchcategory", {
          operation: "fetchdatacategorieswise",
          category: specialCategory,
        });
        // console.log(response.data.packages, "check packages");

        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "SPECIAL")
        }));
        // console.log(filteredPackages, "filteredPackages");

        setspecialpackagedata(filteredPackages);
      }
      getData()
    }
  }, [specialCategory]);

  const handleMouseLeave = (e) => {
    setShowTripsContent(false);
    setShowPackagesContent(false);
    setShowspecialContent(false);
  };

  const uniqueCategories = new Set();

  // const handlecity = (uniqueCity) => {
  //   setNavAction("trip")
  //   router.push(`/filterpage/${uniqueCity}`)
  // }

  // const handlestate = (uniqueState) => {
  //   setNavAction("trip")
  //   router.push(`/filterpage/${uniqueState}`)
  // }

  const handlenoninternational = (state) => {
    setNavAction("trip")
    router.push(`/filterpage/${state}`)
  };

  const handleinternationaldata = (state) => {
    setNavAction("trip")
    router.push(`/filterpage/${state}`)
  }


  const handlepackage = (cat) => {
    setNavAction("exclusive")
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
  };

  const handlespecialpackage = (cat) => {
    setNavAction("special")
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
  }

  const handleCorporatePage = () => {
    router.push(`/corporate`);
  }

  const handleTicketsPage = () => {
    router.push(`/tickets`);
  }

  const handlePassportPage = () => {
    router.push(`/passport`);
  }



  useEffect(() => {
    if (lastSegment === "corporate" || lastSegment === "passport" || lastSegment === "tickets") {
      setNavAction("")
    }
  }, [lastSegment])


  // useEffect(() => {

  //   const stateForActive = Array.from(new Set(links.map((trip) => trip.state)))

  //   if (stateForActive.some((state) => state.toLowerCase() === lastSegment)) {
  //     setNavAction("trip");
  //   }

  //   if (links.some((trip) => trip.city === lastSegment)) {
  //     setNavAction("trip");
  //   }

  //   stateForActive.map((uniqueState, index) => {
  //     const isStateSelected = links.some(trip => trip.state === uniqueState && trip.city === lastSegment);

  //     if (isStateSelected) {
  //       setActiveIndex(index);
  //     }
  //   }) 

  // }, [lastSegment, links, activeIndex]);


  useEffect(() => {

    const uniqueCategoriess = new Set();
    packagedata?.map((packageItem, index) => (
      packageItem?.category.map((cat, catIndex) => {

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

          } else {
            if (cat === lastSegment) {
              setNavAction("exclusive")
            }
          }
        }
      })
    ))
  }, [packagedata, lastSegment]);

  useEffect(() => {
    const uniqueCategoriess = new Set();
    specialpackagedata?.map((packageItem, index) => (
      packageItem.category.map((cat, catIndex) => {
        // Check if the category has been added to the Set
        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat); // Add category to the Set
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

          } else {
            if (cat === lastSegment) {
              setNavAction("special")
            }
          }
        }
        return null;
      })
    ))
  }, [specialpackagedata, lastSegment])

  const isSpecialCategory = (cat) => {
    // Check if the last word of the category is "SPECIAL"
    return cat.trim().split(' ').pop().toUpperCase() === 'SPECIAL';
  };

  const isNotSpecialCategory = (cat) => {
    // Check if the last word of the category is NOT "SPECIAL"
    return cat.trim().split(' ').pop().toUpperCase() !== 'SPECIAL';
  };

  const handleAllExclusive = () => {
    router.push(`/exclusive-tours`)
  }

  const handleAllSpecial = () => {
    router.push(`/special-tours`)
  }



  return (
    <>

      {/* <div onMouseLeave={handleMouseLeave}>
        <div className="text-left md:cursor-pointer group grid grid-cols-1 lg:grid-cols-6 px-0 md:px-3">
          <p
            onMouseEnter={() => {
              setShowTripsContent(true);
              setShowPackagesContent(false);
              setShowspecialContent(false);
            }}
            className={navAction === "trip" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showTripsContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showTripsContent ? 'bg-gray-100' : ''}`}
          >
            TRIPS
            <span className="ml-2">
              {showTripsContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowPackagesContent(true);
              setShowTripsContent(false);
              setShowspecialContent(false);
            }}
            className={navAction === "exclusive" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showPackagesContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showPackagesContent ? 'bg-gray-100' : ''}`}
          >
            PACKAGES
            <span className="ml-2">
              {showPackagesContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(true);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            className={navAction === "special" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showspecialContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showspecialContent ? 'bg-gray-100' : ''}`}
          >
            SPECIAL
            <span className="ml-2">
              {showspecialContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handleCorporatePage}
            className={lastSegment === "corporate" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>CORPORATE</p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handlePassportPage}
            className={lastSegment === "passport" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>PASSPORT</p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handleTicketsPage}
            className={lastSegment === "tickets" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>TICKETS</p>
        </div>

        {showTripsContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 w-[80%] m-auto flex justify-start h-[60vh] rounded-lg bg-white"
            onMouseEnter={() => setShowTripsContent(true)}
            onMouseLeave={() => setShowTripsContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg w-[25%] px-4 py-2 bg-gray-200">
              <p className="text-center p-2 text-2xl font-semibold">TRIP STATES</p>
              {links &&
                Array.from(new Set(links.map((trip) => trip.state))) // Filter unique states
                  .map((uniqueState, stateIndex) => (
                    <div
                      key={stateIndex}
                      onMouseEnter={() => setActiveIndex(stateIndex)} // Set active index on hover
                      className={`w-full flex justify-start items-center flex-col p-2 gap-3 rounded-lg ${activeIndex === stateIndex ? 'bg-gray-600 text-white font-semibold' : ''
                        }`}
                    >
                      <p className="w-full text-sm cursor-pointer" onClick={() => handlestate(uniqueState)}>{uniqueState}</p>
                    </div>
                  ))}
            </div>
            <div className="w-[75%] py-2 px-10 bg-gray-100 rounded-r-lg rounded-b-lg">
              <p className="text-center p-2 text-2xl font-semibold">TRIP CITIES</p>
              {links[activeIndex] && (
                <div className="w-full grid grid-cols-4 gap-4 p-2">
                  {Array.from(
                    new Set(
                      links
                        .filter((trip) => trip.state === Array.from(new Set(links.map((trip) => trip.state)))[activeIndex]) // Filter by active state
                        .map((trip) => trip.city) // Get cities for the active state
                    )
                  ).map((uniqueCity, cityIndex) => {
                    return (
                      <p key={cityIndex} className={navAction === "trip" && lastSegment === uniqueCity ? "text-red-400 text-sm cursor-pointer" : "text-gray-600 text-sm cursor-pointer"} onClick={() => handlecity(uniqueCity)}>
                        {uniqueCity}
                      </p>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {showPackagesContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }} //
            className="absolute top-16 left-0 right-0 w-[80%] m-auto flex justify-start h-auto rounded-lg bg-white"
            onMouseEnter={() => setShowPackagesContent(true)}
            onMouseLeave={() => setShowPackagesContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg w-[25%] px-4 py-5">
              <div className="py-4 px-2 flex justify-start flex-col gap-3 bg-gray-200 rounded-lg">
                <p className="font-extrabold">SPECIALLY TOURS</p>
                <p className="font-normal text-sm leading-relaxed">
                  Specialty tours are designed to cater to specific interests and passions, offering unique and immersive experiences that go beyond the typical tourist activities. Here are some types of specialty tours.
                </p>
              </div>
            </div>
            <div className="w-[75%] py-5 px-10 rounded-r-lg rounded-b-lg">
              <div className="w-full grid grid-cols-3 gap-4 py-4 px-2">
                {packagedata?.map((packageItem, index) => (
                  packageItem?.category.map((cat, catIndex) => {

                    if (!uniqueCategories.has(cat)) {
                      uniqueCategories.add(cat);
                      if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

                      } else {
                        return (
                          <p key={`${index}-${catIndex}`} onClick={() => handlepackage(cat)} className={navAction === "exclusive" && cat === lastSegment ? "text-red-400 text-sm cursor-pointer" : "text-gray-600 text-sm cursor-pointer"}>
                            {cat}
                          </p>
                        );
                      }
                    }
                    return null;
                  })
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showspecialContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }} //
            className="absolute top-16 left-0 right-0 w-[80%] m-auto flex justify-start h-auto rounded-lg bg-white"
            onMouseEnter={() => setShowspecialContent(true)}
            onMouseLeave={() => setShowspecialContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg w-[25%] px-4 py-5 ">
              <div className="py-4 px-2 flex justify-start flex-col gap-3 bg-gray-200 rounded-lg">
                <p className="font-extrabold">SPECIAL TOURS</p>
                <p className="font-normal text-sm leading-relaxed">
                  Specialty tours are designed to cater to specific interests and passions, offering unique and immersive experiences that go beyond the typical tourist activities. Here are some types of specialty tours.
                </p>
              </div>
            </div>
            <div className="w-[75%] py-5 px-10 rounded-r-lg rounded-b-lg">
              <div className="w-full grid grid-cols-3 gap-4 py-4 px-2">
                {specialpackagedata.map((packageItem, index) => (
                  packageItem.category.map((cat, catIndex) => {
                    // Check if the category has been added to the Set
                    if (!uniqueCategories.has(cat)) {
                      uniqueCategories.add(cat); // Add category to the Set
                      if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

                      } else {
                        return (
                          <p key={`${index}-${catIndex}`} onClick={() => handlespecialpackage(cat)} className={navAction === "special" && cat === lastSegment ? "text-red-400 text-sm cursor-pointer" : "text-gray-600 text-sm cursor-pointer"}>
                            {cat}
                          </p>
                        );
                      }
                    }
                    return null; // Don't render if the category is already present
                  })
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div> */}

      <div onMouseLeave={handleMouseLeave}>
        <div className="text-left md:cursor-pointer group grid grid-cols-1 lg:grid-cols-6 px-0 md:px-3">
          <p
            onMouseEnter={() => {
              setShowTripsContent(true);
              setShowPackagesContent(false);
              setShowspecialContent(false);
            }}
            className={navAction === "trip" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showTripsContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showTripsContent ? 'bg-gray-100' : ''}`}
          >
            TRIPS
            <span className="ml-2">
              {showTripsContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowPackagesContent(true);
              setShowTripsContent(false);
              setShowspecialContent(false);
            }}
            className={navAction === "exclusive" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showPackagesContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showPackagesContent ? 'bg-gray-100' : ''}`}
          >
            PACKAGES
            <span className="ml-2">
              {showPackagesContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(true);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            className={navAction === "special" ? `text-red-400 p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showspecialContent ? 'bg-gray-100' : ''}` : `p-5 flex gap-1 md:justify-start items-center lg:justify-center ${showspecialContent ? 'bg-gray-100' : ''}`}
          >
            SPECIAL
            <span className="ml-2">
              {showspecialContent ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </span>
          </p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handleCorporatePage}
            className={lastSegment === "corporate" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>CORPORATE</p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handlePassportPage}
            className={lastSegment === "passport" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>PASSPORT</p>
          <p
            onMouseEnter={() => {
              setShowspecialContent(false);
              setShowTripsContent(false);
              setShowPackagesContent(false);
            }}
            onClick={handleTicketsPage}
            className={lastSegment === "tickets" ? "p-5 flex md:justify-start items-center lg:justify-center text-red-400" : "p-5 flex md:justify-start items-center lg:justify-center"}>TICKETS</p>
        </div>

        {showTripsContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 w-[80%] m-auto grid grid-cols-2 h-[60vh] rounded-lg bg-white pb-6 shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
            onMouseEnter={() => setShowTripsContent(true)}
            onMouseLeave={() => setShowTripsContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg px-8 py-2 ">
              <p className="text-left p-2 text-xl font-bold pt-6 border-b pb-3 text-black ">DOMESTIC</p>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-2 overflow-y-auto ">
                {noninternational && noninternational.map((e, i) => (
                  <div key={i} className="w-full flex justify-center items-center flex-col p-2 gap-3 rounded-lg hover:bg-red-200 text-gray-600">
                    <p className="w-full text-sm cursor-pointer" onClick={() => handlenoninternational(e.state)}>
                      {e.state}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2 px-8 rounded-r-lg rounded-b-lg ">
              <p className="text-left p-2 text-xl font-bold pt-6 border-b pb-3 text-black ">INTERNATIONAL</p>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-2 ">
                {international && international.map((e, i) => (
                  <div key={i} className="w-full flex justify-start items-center flex-col p-2 gap-3 rounded-lg hover:bg-red-200 text-gray-600">
                    <p className="w-full text-sm cursor-pointer" onClick={() => handleinternationaldata(e.state)}>{e.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showPackagesContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }} //
            className="absolute top-16 left-0 right-0 w-[80%] m-auto flex justify-start h-auto rounded-lg bg-white"
            onMouseEnter={() => setShowPackagesContent(true)}
            onMouseLeave={() => setShowPackagesContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg w-[25%] px-4 py-5">
              <div className="py-4 px-2 flex justify-start flex-col gap-3 bg-red-50 rounded-xl">
                <p className="font-bold text-lg">EXCLUSIVE TOURS</p>
                <p className="font-normal text-sm leading-relaxed">
                  Exclusive tours offer a premium and highly personalized travel experience for those seeking privacy, luxury, and uniqueness. Ideal for those who want to explore the world in style and comfort, with every detail taken care of.
                </p>
                <Button className="bg-blue-50 text-black font-semibold" onClick={handleAllExclusive}>
                  View All Exclusive Tours
                </Button>
              </div>
            </div>
            <div className="w-[75%] py-5 px-10 rounded-r-lg rounded-b-lg">
              <div className="w-full grid grid-cols-3 gap-4 py-4 px-2">
                {packagedata?.map((packageItem, index) => (
                  packageItem?.category.map((cat, catIndex) => {

                    if (!uniqueCategories.has(cat)) {
                      uniqueCategories.add(cat);
                      if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "SPECIAL" || isSpecialCategory(cat)) {

                      } else {
                        return (
                          <p key={`${index}-${catIndex}`} onClick={() => handlepackage(cat)} className={navAction === "exclusive" && cat === lastSegment ? "text-red-400 text-sm cursor-pointer" : "text-sm cursor-pointer p-2 hover:bg-red-200 text-gray-600 rounded-lg"}>
                            {cat}
                          </p>
                        );
                      }
                    }
                    return null;
                  })
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showspecialContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }} //
            className="absolute top-16 left-0 right-0 w-[80%] m-auto flex justify-start h-auto rounded-lg bg-white"
            onMouseEnter={() => setShowspecialContent(true)}
            onMouseLeave={() => setShowspecialContent(false)}
          >
            <div className="rounded-s-lg rounded-b-lg w-[25%] px-4 py-5 ">
              <div className="py-4 px-2 flex justify-start flex-col gap-3 bg-red-50 rounded-lg">
                <p className="font-bold text-lg">SPECIAL TOURS</p>
                <p className="font-normal text-sm leading-relaxed">
                  Specialty tours are designed to cater to specific interests and passions, offering unique and immersive experiences that go beyond the typical tourist activities. Here are some types of specialty tours.
                </p>
                <Button className="bg-blue-50 text-black font-semibold" onClick={handleAllSpecial}>
                  View All Special Tours
                </Button>
              </div>
            </div>
            <div className="w-[75%] py-5 px-10 rounded-r-lg rounded-b-lg">
              <div className="w-full grid grid-cols-3 gap-4 py-4 px-2">
                {specialpackagedata.map((packageItem, index) => (
                  packageItem.category.map((cat, catIndex) => {
                    // Check if the category has been added to the Set
                    if (!uniqueCategories.has(cat)) {
                      uniqueCategories.add(cat); // Add category to the Set
                      if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "EXCLUSIVE" || isNotSpecialCategory(cat)) {

                      } else {
                        return (
                          <p key={`${index}-${catIndex}`} onClick={() => handlespecialpackage(cat)} className={navAction === "special" && cat === lastSegment ? "text-red-400 text-sm cursor-pointer" : "text-sm cursor-pointer p-2 rounded-lg hover:bg-red-200 text-gray-600 "}>
                            {cat}
                          </p>
                        );
                      }
                    }
                    return null; // Don't render if the category is already present
                  })
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

const Mobilenavlink = ({ closeNavbar, lastSegment }) => {

  const [links, setlinks] = useState([]);
  // console.log(links, "links");

  const [international, setinternational] = useState([]);
  // console.log(international, "international");

  const [noninternational, setnoninternational] = useState([]);
  // console.log(noninternational, "noninternational");

  const router = useRouter();

  const [packagedata, setpackagedata] = useState([]);
  // console.log(packagedata, "packagedata");

  const [specialpackagedata, setspecialpackagedata] = useState([]);
  // console.log(specialpackagedata, "specialpackagedata");

  const [exclusiveData, setexclusiveData] = useState('');
  // console.log(exclusiveData, "exclusiveData");

  const [specialCategory, setspecialCategory] = useState('');
  // console.log(specialCategory, "specialCategory");


  const [selectedState, setSelectedState] = useState(null);

  const [navAction, setNavAction] = useState("");

  const [showTripsContent, setShowTripsContent] = useState(false);
  const [showPackagesContent, setShowPackagesContent] = useState(false);
  const [showspecialContent, setShowspecialContent] = useState(false);

  useEffect(() => {
    async function getdata() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchallpackage",
      });
      // console.log(response.data.fetchalldata, "check response");
      setlinks(response.data.fetchalldata);
    }
    getdata();
  }, []);

  useEffect(() => {
    const categories = links.map(link => link.category);
    // console.log(categories, "categories");

    const exclusiveData = categories.flat().find(item => item === "EXCLUSIVE");
    setexclusiveData(exclusiveData);

    const specialCategory = categories.flat().find(item => item === "SPECIAL");
    setspecialCategory(specialCategory);

    if (links) {
      const internationaldata = links.filter(link => link.sub_category.includes("INTERNATIONAL"));
      // console.log(internationaldata, "internationaldata checl");

      const noninternationaldata = links.filter(link => !link.sub_category.includes("INTERNATIONAL"));
      // console.log(noninternationaldata, "noninternationaldata check");

      setinternational(internationaldata);
      setnoninternational(noninternationaldata)
    }

  }, [links]);

  useEffect(() => {
    if (exclusiveData) {
      async function getData() {
        const response = await axios.post("/api/fetchcategory", {
          operation: "fetchdatacategorieswise",
          category: exclusiveData,
        });
        // console.log(response.data.packages, "check packages");
        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "EXCLUSIVE")
        }));
        setpackagedata(filteredPackages);
      }
      getData();
    }

  }, [exclusiveData]);

  useEffect(() => {
    if (specialCategory) {
      async function getData() {
        const response = await axios.post("/api/fetchcategory", {
          operation: "fetchdatacategorieswise",
          category: specialCategory,
        });
        // console.log(response.data.packages, "check packages");

        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "SPECIAL")
        }));
        // console.log(filteredPackages, "filteredPackages");

        setspecialpackagedata(filteredPackages);
      }
      getData()
    }
  }, [specialCategory]);

  const handleTrip = () => {
    setShowTripsContent(!showTripsContent);
    setSelectedState(null);
  };

  // const handleStateClick = (state) => {
  //   setSelectedState(state === selectedState ? null : state);
  // };

  const [flgtrue, setflgtrue] = useState(false);

  const [internationalflag, setinternationalflag] = useState(false);

  const handleindian = () => {
    setflgtrue(!flgtrue)
  }

  const handleinternational = () => {
    setinternationalflag(!internationalflag)
  }

  const handlepackageitem = () => {
    setShowPackagesContent(!showPackagesContent)
  }

  const handlespecialitem = () => {
    setShowspecialContent(!showspecialContent)
  }

  // const handlecity = (city) => {
  //   router.push(`/filterpage/${city}`)
  //   closeNavbar();
  // }

  const handlepackage = (cat) => {
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
    closeNavbar();
  };

  const handlespecialpackage = (cat) => {
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
    closeNavbar();
  }

  const handlenoninternational = (state) => {
    router.push(`/filterpage/${state}`)
    closeNavbar();
  };

  const handleinternationaldata = (state) => {
    router.push(`/filterpage/${state}`);
    closeNavbar();
  }

  const uniqueCategories = new Set();

  const handleCorporatePage = () => {
    router.push(`/corporate`);
    closeNavbar();
  }

  const handleTicketsPage = () => {
    router.push(`/tickets`);
    closeNavbar();
  }

  const handlePassportPage = () => {
    router.push(`/passport`);
    closeNavbar();
  }

  useEffect(() => {
    if (lastSegment === "corporate" || lastSegment === "passport" || lastSegment === "tickets") {
      setNavAction("")
    }
  }, [lastSegment])

  useEffect(() => {
    const uniqueCategoriess = new Set();
    specialpackagedata?.map((packageItem, index) => (
      packageItem.category.map((cat, catIndex) => {

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

          } else {
            if (cat === lastSegment) {
              setNavAction("special")
            }
          }
        }
        return null;
      })
    ))
  }, [specialpackagedata, lastSegment])


  useEffect(() => {

    const uniqueCategoriess = new Set();
    packagedata?.map((packageItem, index) => (
      packageItem?.category.map((cat, catIndex) => {

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST") {

          } else {
            if (cat === lastSegment) {
              setNavAction("exclusive")
            }
          }
        }
      })
    ))
  }, [packagedata, lastSegment]);

  function capitalizeWords(sentence) {
    if (typeof sentence !== 'string') {
      return '';
    }

    return sentence
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }


  // useEffect(() => {

  //   const stateForActive = Array.from(new Set(links.map((trip) => trip.state)))

  //   if (stateForActive.some((state) => state.toLowerCase() === lastSegment)) {
  //     setNavAction("trip");
  //     setShowTripsContent(true)
  //   }

  //   if (links.some((trip) => trip.city === lastSegment)) {
  //     setNavAction("trip");
  //     setShowTripsContent(true)
  //   }

  //   stateForActive.map((uniqueState, index) => {
  //     const isStateSelected = links.some(trip => trip.state === uniqueState && trip.city === lastSegment);

  //     if (isStateSelected) {
  //       setSelectedState(uniqueState);
  //     }
  //   })
  // }, [lastSegment, links]);


  const isSpecialCategory = (cat) => {
    // Check if the last word of the category is "SPECIAL"
    return cat.trim().split(' ').pop().toUpperCase() === 'SPECIAL';
  };


  return (
    <>
      <div>
        <div className="text-left cursor-pointer grid grid-cols-1 px-0">
          <div className="p-3 flex gap-1 justify-start items-center" onClick={handleTrip}>
            <p className={navAction === "trip" ? "text-red-400" : ""}>TRIP</p>
            {showTripsContent ? (
              <ChevronUp className="transition-transform duration-200" />
            ) : (
              <ChevronDown className="transition-transform duration-200" />
            )}
          </div>

          {/* {showTripsContent && (
            links && (
              <div className="border border-red-100 rounded-lg">
                {Array.from(new Set(links.map(trip => trip.state))).map((uniqueState, index) => {
                  // Check if any city in the current state is selected
                  const isStateSelected = links.some(trip => trip.state === uniqueState && trip.city === lastSegment);


                  return (
                    <div key={index} className="p-3">
                      <h1
                        className={
                          navAction === "trip" && (uniqueState === lastSegment || isStateSelected)
                            ? "text-red-400 cursor-pointer"
                            : "cursor-pointer"
                        }
                        onClick={() => handleStateClick(uniqueState)}
                      >
                        {capitalizeWords(uniqueState)}
                      </h1>

                      {selectedState === uniqueState && (
                        <div className="mt-3 flex flex-col justify-start gap-1 rounded-lg border bg-gray-100">
                          {links
                            .filter(trip => trip.state === uniqueState)
                            .map((trip, idx) => (
                              <p
                                key={idx}
                                onClick={() => handlecity(trip.city)}
                                className={
                                  navAction === "trip" && trip.city === lastSegment
                                    ? "text-red-400 p-2 cursor-pointer"
                                    : "p-2 cursor-pointer"
                                }
                              >
                                {capitalizeWords(trip.city)}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )} */}

          {showTripsContent && (
            <div className="border border-red-100 rounded-lg">
              <div className="p-3 cursor-pointer">
                <h1 className="text-lg" onClick={handleindian}>DOMESTIC</h1>
                {flgtrue && (
                  <div>
                    {noninternational && noninternational.map((e, i) => (
                      <div key={i} className="mt-3 flex flex-col justify-start gap-1 rounded-lg border bg-gray-100">
                        <p className="p-3 cursor-pointer" onClick={() => handlenoninternational(e.state)}>
                          {e.state}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 cursor-pointer">
                <h1 className="text-lg" onClick={handleinternational}>International</h1>
                {internationalflag && (
                  <div>
                    {international && international.map((e, i) => (
                      <div key={i} className="mt-3 flex flex-col justify-start gap-1 rounded-lg border bg-gray-100">
                        <p className="p-3 cursor-pointer" onClick={() => handleinternationaldata(e.state)}>
                          {e.state}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}


          <div className="p-3 flex gap-1 justify-start items-center" onClick={handlepackageitem}>
            <p className={navAction === "exclusive" ? "text-red-400" : ""}>PACKAGES</p>
            {showPackagesContent ? (
              <ChevronUp className="transition-transform duration-200" />
            ) : (
              <ChevronDown className="transition-transform duration-200" />
            )}
          </div>

          {showPackagesContent && (
            <div className="border border-red-100 rounded-lg"> {/* Single border for all categories */}
              {packagedata.map((packageItem, index) => (
                packageItem.category.map((cat, catIndex) => {
                  if (!uniqueCategories.has(cat)) {
                    uniqueCategories.add(cat); // Add category to the Set
                    return (
                      <p key={`${index}-${catIndex}`} onClick={() => handlepackage(cat)} className={navAction === "exclusive" && cat === lastSegment ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"}>
                        {cat}
                      </p>
                    );
                  }
                  return null; // Skip rendering if the category is already present
                })
              ))}
            </div>
          )}


          <div className="p-3 flex gap-1 justify-start items-center" onClick={handlespecialitem}>
            <p className={navAction === "special" ? "text-red-400" : ""}>SPECIAL</p>
            {showspecialContent ? (
              <ChevronUp className="transition-transform duration-200" />
            ) : (
              <ChevronDown className="transition-transform duration-200" />
            )}
          </div>

          {showspecialContent && (
            <div className="border border-red-100 rounded-lg"> {/* Single border for all special categories */}
              {specialpackagedata.map((packageItem, index) => (
                packageItem.category.map((cat, catIndex) => {
                  if (!uniqueCategories.has(cat)) {
                    uniqueCategories.add(cat); // Add category to the Set
                    return (
                      <p key={`${index}-${catIndex}`} onClick={() => handlespecialpackage(cat)} className={navAction === "special" && cat === lastSegment ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"}>
                        {cat}
                      </p>
                    );
                  }
                  return null; // Skip rendering if the category is already present
                })
              ))}
            </div>
          )}

          <div className="p-3 flex justify-start items-center">
            <p className={lastSegment === "corporate" ? "text-red-400" : ""} onClick={handleCorporatePage}>CORPORATE</p>
          </div>
          <div className="p-3 flex justify-start items-center">
            <p className={lastSegment === "passport" ? "text-red-400" : ""} onClick={handlePassportPage}>PASSPORT</p>
          </div>
          <div className="p-3 flex justify-start items-center">
            <p className={lastSegment === "tickets" ? "text-red-400" : ""} onClick={handleTicketsPage}>TICKETS</p>
          </div>
        </div>
      </div>
    </>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const pathname = usePathname();
  const [lastSegment, setLastSegment] = useState('');

  useEffect(() => {
    if (pathname) {
      const pathArray = pathname.split('/');
      const lastWord = pathArray[pathArray.length - 1] || pathArray[pathArray.length - 2];

      setLastSegment(decodeURIComponent(lastWord));
    }
  }, [pathname]);

  const places = [
    "Ladakh",
    "Coorg",
    "Jaipur",
    "Goa",
    "Kerala",
    "Shimla",
    "Rishikesh",
    "Manali",
    "Udaipur",
    "Agra",
  ];
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % places.length;
        setCurrentPlace(places[nextIndex]);
        return nextIndex;
      });
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const closeNavbar = () => setOpen(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 w-full ">
      <div className="flex items-center font-medium justify-between w-[95%] mx-auto">

        <div className="z-50 p-5 lg:w-auto w-full flex justify-between bg-white lg:bg-transparent">

          <Link href="/" className="flex items-end relative lg:w-[100px]">
            <Image src={IMAGES.viniferaLogo} width={50} height={50} className="h-10 w-10 " />
            <p className="hidden text-themeColor text-xl absolute bottom-0 right-3 lg:flex item-end justify-end">inifera</p>
          </Link>

          <div
            className={`lg:hidden justify-start items-center border py-1 px-3 rounded-md flex select-none min-w-[170px] md:w-[80%] md:m-auto text-start gap-2 ${open ? "hidden" : "block"
              }`}
            onClick={openModal}
          >
            <Search className="size-4 text-gray-600 cursor-pointer" />
            <p className="text-gray-400 text-sm">Search &quot;{currentPlace}&quot;</p>
          </div>
          <div className="flex gap-5 items-center justify-center">


            <div className="text-3xl lg:hidden" onClick={() => setOpen(!open)}>

              {open ? <X /> : <Menu />}
            </div>
          </div>
        </div>

        <div
          className="lg:flex justify-center items-center border py-1 px-3 gap-5 rounded-md hidden"
          onClick={openModal}
        >
          <Search className="size-4 text-gray-600 cursor-pointer" />
          <input
            className="border-none focus:ring-0 focus:outline-none text-gray-400 text-base"
            type="text"
            defaultValue={`Search "${currentPlace}"`}
            readOnly
          />
        </div>

        <ul className="lg:flex hidden uppercase items-center">
          <NavLinks closeNavbar={closeNavbar} lastSegment={lastSegment} />
        </ul>

        <div className="lg:block hidden">

          <div className="bg-themeColor text-white rounded-full size-6 p-4 flex justify-center items-center shadow-lg">
            <button className="" onClick={() => {
              router.push(`/filterpage/ALL`)
            }}>
              <ArrowRight strokeWidth={3} />
            </button>
          </div>
        </div>
        <ul
          className={`
            lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 px-4 z-30
            duration-500 ${open ? "left-0" : "left-[-100%]"}
          `}
        >
          <Mobilenavlink closeNavbar={closeNavbar} lastSegment={lastSegment} />
          <div className="py-5">
            <div className="bg-themeColor text-white rounded-full px-6 py-4 flex justify-center items-center">
              <button className="flex gap-5" onClick={() => {
                router.push(`/filterpage/ALL`)
              }}>
                Get Started
                <ArrowRight strokeWidth={3} />
              </button>
            </div>
          </div>
        </ul>
      </div>

      <NavbarModal isOpen={isModalOpen} onOpenChange={closeModal} />
    </nav>
  );
};

export default Navbar;
