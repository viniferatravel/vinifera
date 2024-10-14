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


  const [international, setinternational] = useState([]);


  const [noninternational, setnoninternational] = useState([]);


  const [packagedata, setpackagedata] = useState([]);


  const [specialpackagedata, setspecialpackagedata] = useState([]);


  const [exclusiveData, setexclusiveData] = useState('');


  const [specialCategory, setspecialCategory] = useState('');


  const [showTripsContent, setShowTripsContent] = useState(false);
  const [showPackagesContent, setShowPackagesContent] = useState(false);
  const [showspecialContent, setShowspecialContent] = useState(false);

  const [navAction, setNavAction] = useState("");

  useEffect(() => {
    const categories = links?.map(link => link.category) || [];
    const exclusiveData = categories.flat().find(item => item === "EXCLUSIVE");
    setexclusiveData(exclusiveData);

    const specialCategory = categories.flat().find(item => item === "SPECIAL");
    setspecialCategory(specialCategory);


    if (links) {
      const internationaldata = links.filter(link => link.sub_category.includes("INTERNATIONAL"));

      const noninternationaldata = links.filter(link => !link.sub_category.includes("INTERNATIONAL"));

      setinternational(internationaldata);
      setnoninternational(noninternationaldata)
    }

  }, [links]);

  useEffect(() => {
    async function getdata() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchallpackage",
      });
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

        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "SPECIAL")
        }));

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

  const handlenoninternational = (state) => {
    setNavAction("trip")
    router.push(`/filterpage/${state}`)
    localStorage.removeItem("selectedState");
  };

  const handleinternationaldata = (state) => {
    setNavAction("trip")
    router.push(`/filterpage/${state}`)
    localStorage.removeItem("selectedState");
  }

  const handlepackage = (cat) => {
    setNavAction("exclusive")
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
    localStorage.removeItem("selectedState");
  };

  const handlespecialpackage = (cat) => {
    setNavAction("special")
    const encodedCategory = encodeURIComponent(cat);
    router.push(`/filterpage/${encodedCategory}`);
    localStorage.removeItem("selectedState");
  }

  const handleCorporatePage = () => {
    router.push(`/corporate`);
    localStorage.removeItem("selectedState");
  }

  const handleTicketsPage = () => {
    router.push(`/tickets`);
    localStorage.removeItem("selectedState");
  }

  const handlePassportPage = () => {
    router.push(`/passport`);
    localStorage.removeItem("selectedState");
  }

  useEffect(() => {
    if (lastSegment === "corporate" || lastSegment === "passport" || lastSegment === "tickets") {
      setNavAction("")
    }
  }, [lastSegment])

  const isSpecialCategory = (cat) => {

    return cat.trim().split(' ').pop().toUpperCase() === 'SPECIAL';
  };

  const isNotSpecialCategory = (cat) => {

    return cat.trim().split(' ').pop().toUpperCase() !== 'SPECIAL';
  };

  useEffect(() => {

    noninternational && [...new Set(noninternational.map((e) => e.state))].map((state, i) => {
      if (state === lastSegment) {
        setNavAction("trip")
      }
    })

    {
      international && [...new Set(international.map((e) => e.state))].map((state, i) => {
        if (state === lastSegment) {
          setNavAction("trip")
        }
      })
    }

    if (lastSegment === "") {
      setNavAction("")
    }

  }, [lastSegment, links, noninternational, international]);

  useEffect(() => {
    const uniqueCategoriess = new Set();
    packagedata?.map((packageItem, index) => (
      packageItem?.category.map((cat, catIndex) => {

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "SPECIAL" || isSpecialCategory(cat)) {
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

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "EXCLUSIVE" || isNotSpecialCategory(cat)) {
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

  const handleAllExclusive = () => {
    router.push(`/exclusive-tours`)
  }

  const handleAllSpecial = () => {
    router.push(`/special-tours`)
  }

  return (
    <>

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
                {noninternational && [...new Set(noninternational.map((e) => e.state))].map((state, i) => (
                  <div key={i} className="w-full flex justify-center items-center flex-col p-2 gap-3 rounded-lg hover:bg-red-200 text-gray-600">
                    <p
                      className={lastSegment === state && navAction === "trip" ? "text-red-400 w-full text-sm cursor-pointer" : "w-full text-sm cursor-pointer"}
                      onClick={() => handlenoninternational(state)}
                    >
                      {state}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2 px-8 rounded-r-lg rounded-b-lg ">
              <p className="text-left p-2 text-xl font-bold pt-6 border-b pb-3 text-black ">INTERNATIONAL</p>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-2 ">
                {international && [...new Set(international.map((e) => e.state))].map((state, i) => (
                  <div key={i} className="w-full flex justify-start items-center flex-col p-2 gap-3 rounded-lg hover:bg-red-200 text-gray-600">
                    <p
                      className={lastSegment === state && navAction === "trip" ? "text-red-400 w-full text-sm cursor-pointer" : "w-full text-sm cursor-pointer"}
                      onClick={() => handleinternationaldata(state)}
                    >
                      {state}
                    </p>
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
                          <p key={`${index}-${catIndex}`} onClick={() => handlepackage(cat)} className={lastSegment === cat && navAction === "exclusive" ? "text-red-400 text-sm cursor-pointer p-2 hover:bg-red-200  rounded-lg" : "text-sm cursor-pointer p-2 hover:bg-red-200 text-gray-600 rounded-lg"}>
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

                    if (!uniqueCategories.has(cat)) {
                      uniqueCategories.add(cat);
                      if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "EXCLUSIVE" || isNotSpecialCategory(cat)) {

                      } else {
                        return (
                          <p key={`${index}-${catIndex}`} onClick={() => handlespecialpackage(cat)} className={navAction === "special" && cat === lastSegment ? "text-red-400 text-sm cursor-pointer p-2 rounded-lg hover:bg-red-200" : "text-sm cursor-pointer p-2 rounded-lg hover:bg-red-200 text-gray-600 "}>
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
      </div>
    </>
  );
};

const Mobilenavlink = ({ closeNavbar, lastSegment }) => {

  const [links, setlinks] = useState([]);


  const [international, setinternational] = useState([]);


  const [noninternational, setnoninternational] = useState([]);


  const router = useRouter();

  const [packagedata, setpackagedata] = useState([]);


  const [specialpackagedata, setspecialpackagedata] = useState([]);


  const [exclusiveData, setexclusiveData] = useState('');


  const [specialCategory, setspecialCategory] = useState('');


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

      setlinks(response.data.fetchalldata);
    }
    getdata();
  }, []);

  useEffect(() => {
    const categories = links?.map(link => link.category) || [];
    const exclusiveData = categories.flat().find(item => item === "EXCLUSIVE");
    setexclusiveData(exclusiveData);

    const specialCategory = categories.flat().find(item => item === "SPECIAL");
    setspecialCategory(specialCategory);

    if (links) {
      const internationaldata = links.filter(link => link.sub_category.includes("INTERNATIONAL"));

      const noninternationaldata = links.filter(link => !link.sub_category.includes("INTERNATIONAL"));

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


        const filteredPackages = response.data.packages.map(packageItem => ({
          ...packageItem,
          category: packageItem.category.filter(cat => cat !== "SPECIAL")
        }));


        setspecialpackagedata(filteredPackages);
      }
      getData()
    }
  }, [specialCategory]);

  const handleTrip = () => {
    setShowTripsContent(!showTripsContent);
    setSelectedState(null);
  };

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

  const isSpecialCategory = (cat) => {

    return cat.trim().split(' ').pop().toUpperCase() === 'SPECIAL';
  };

  const isNotSpecialCategory = (cat) => {

    return cat.trim().split(' ').pop().toUpperCase() !== 'SPECIAL';
  };


  useEffect(() => {


    noninternational && [...new Set(noninternational.map((e) => e.state))].map((state, i) => {
      if (state === lastSegment) {
        setNavAction("trip")
        setShowTripsContent(true)
        setflgtrue(true)
      }
    })


    {
      international && [...new Set(international.map((e) => e.state))].map((state, i) => {
        if (state === lastSegment) {
          setNavAction("trip")
          setShowTripsContent(true)
          setinternationalflag(true)
        }
      })
    }

  }, [lastSegment, links, noninternational, international]);


  useEffect(() => {
    const uniqueCategoriess = new Set();
    specialpackagedata?.map((packageItem, index) => (
      packageItem.category.map((cat, catIndex) => {

        if (!uniqueCategoriess.has(cat)) {
          uniqueCategoriess.add(cat);
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "EXCLUSIVE" || isNotSpecialCategory(cat)) {

          } else {
            if (cat === lastSegment) {
              setNavAction("special")
              setShowspecialContent(true)
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
          if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "SPECIAL" || isSpecialCategory(cat)) {

          } else {
            if (cat === lastSegment) {
              setNavAction("exclusive")
              setShowPackagesContent(true)
            }
          }
        }
      })
    ))
  }, [packagedata, lastSegment]);



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



          {showTripsContent && (
            <div className="border border-red-100 rounded-lg">
              <div className="p-3 cursor-pointer">
                <h1 className="text-md" onClick={handleindian}>DOMESTIC</h1>
                {flgtrue && (
                  <div>
                    {noninternational && [...new Set(noninternational.map((e) => e.state))].map((state, i) => (
                      <div key={i} className="mt-3 flex flex-col justify-start gap-1 rounded-lg border bg-gray-100">
                        <p className={lastSegment === state && navAction === "trip" ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"} onClick={() => handlenoninternational(state)}>
                          {state.toUpperCase()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 cursor-pointer">
                <h1 className="text-md" onClick={handleinternational}>INTERNATIONAL</h1>
                {internationalflag && (
                  <div>
                    {international && [...new Set(international.map((e) => e.state))].map((state, i) => (
                      <div key={i} className="mt-3 flex flex-col justify-start gap-1 rounded-lg border bg-gray-100">
                        <p className={lastSegment === state && navAction === "trip" ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"} onClick={() => handleinternationaldata(state)}>
                          {state.toUpperCase()}
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
              {packagedata?.map((packageItem, index) => (
                packageItem.category.map((cat, catIndex) => {
                  if (!uniqueCategories.has(cat)) {
                    uniqueCategories.add(cat);
                    if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "SPECIAL" || isSpecialCategory(cat)) {

                    } else {
                      return (
                        <p key={`${index}-${catIndex}`} onClick={() => handlepackage(cat)} className={navAction === "exclusive" && cat === lastSegment ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"}>
                          {cat}
                        </p>
                      );
                    }
                  }
                  return null;
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
              {specialpackagedata?.map((packageItem, index) => (
                packageItem.category.map((cat, catIndex) => {


                  if (!uniqueCategories.has(cat)) {
                    uniqueCategories.add(cat); // Add category to the Set
                    if (cat === "NORTH" || cat === "SOUTH" || cat === "EAST" || cat === "WEST" || cat === "EXCLUSIVE" || isNotSpecialCategory(cat)) {

                    } else {
                      return (
                        <p key={`${index}-${catIndex}`} onClick={() => handlespecialpackage(cat)} className={navAction === "special" && cat === lastSegment ? "text-red-400 p-3 cursor-pointer" : "p-3 cursor-pointer"}>
                          {cat}
                        </p>
                      );
                    }
                  }

                  return null;
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
    }, 2000);

    return () => clearInterval(interval);
  }, [places]);

  const closeNavbar = () => setOpen(false);



  return (
    <nav className="bg-white border-b sticky top-0 z-50 w-full ">
      <div className="flex items-center font-medium justify-between w-[95%] mx-auto">

        <div className="z-50 p-5 lg:w-auto w-full flex justify-between bg-white lg:bg-transparent">

          <div onClick={() => {
            router.push(`/`)
            localStorage.removeItem("selectedState");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }} className="flex items-end relative lg:w-[100px] cursor-pointer">
            <Image alt="viniferalogo" src={IMAGES.viniferaLogo} width={50} height={50} className="h-10 w-10 " />
            <p className="hidden text-themeColor text-xl absolute bottom-0 right-3 lg:flex item-end justify-end">inifera</p>
          </div>

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
            <button onClick={() => {
            <button onClick={() => {
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
