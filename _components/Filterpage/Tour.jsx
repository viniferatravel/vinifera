"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { BedDouble, Bus, Camera, Dot, Plane, Utensils } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Sitefilter from "@/_components/Filterpage/Sitefilter";
import axios from "axios";
import { useRouter } from "next/navigation";
import GuestModal from "@/_components/packages/Modal";
import EmailModal from "@/_components/EmailModal"

const Tour = ({ slug }) => {
  // console.log(slug, "check props");

  const [enquiryClickModal, setEnquiryClickModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [fetchfiltertourdata, setfetchfiltertourdata] = useState([]);
  // console.log(fetchfiltertourdata, "fetchfiltertourdata");

  const [originaldata, setoriginaldata] = useState([]);
  // console.log(originaldata, "originaldata");

  const [datafetch, setdatafetch] = useState("");
  // console.log(datafetch, "datafetch");

  const [price, setprice] = useState("");
  // console.log(price, "price");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPackageData, setSelectedPackageData] = useState({});
  const handleCloseModal = (val) => {
    setModalOpen(false)
    setSelectedPackageData({})
    }

  const handleSeletedDuration = (value) => {
    setdatafetch(value);
  };

  const handleselectedprice = (value) => {
    setprice(value);
  };


  useEffect(() => {

    async function getData() {

      setLoading(true);
      try {

        if (slug === "experience") {

          try {
            const response = await fetch("/api/fetchcategory", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const result = await response.json();

            setfetchfiltertourdata(
              result?.result?.filter((item) =>
                item.sub_category.includes("BEACHES") || item.sub_category.includes("WINTER") || item.sub_category.includes("WINTER") || item.sub_category.includes("MOUNTAINS") || item.sub_category.includes("TREKKING")
              )
            );
            setoriginaldata(result.result?.filter((item) => item.sub_category.includes("BEACH", "WINTER")));

          } catch (error) {
            // console.log(error)
          }

        } else {
          const stateResponse = await axios.post("/api/fetchcategory", {
            operation: "fetchdatastatewise",
            state: slug,
          });
          // console.log(stateResponse.data.fetchstatedata, "check state");

          setfetchfiltertourdata(stateResponse.data.fetchstatedata);
          setoriginaldata(stateResponse.data.fetchstatedata);


          const cityResponse = await axios.post("/api/fetchcategory", {
            operation: "fetchdatacitywise",
            city: slug,
          });
          // console.log(cityResponse.data.fetchcitydata, "check city response");

          if (cityResponse.data.fetchcitydata && cityResponse.data.fetchcitydata.length > 0) {
            const alldata = cityResponse.data.fetchcitydata;
            setfetchfiltertourdata(alldata);
            setoriginaldata(alldata);
          } else {

            const categoryResponse = await axios.post("/api/fetchcategory", {
              operation: "fetchdatacategorieswise",
              category: slug,
            });
            // console.log(categoryResponse.data.packages, "check category response");

            if (categoryResponse.data.packages && categoryResponse.data.packages.length > 0) {
              const categorydata = categoryResponse.data.packages;
              setfetchfiltertourdata(categorydata);
              setoriginaldata(categorydata);
            }
          }
        }



      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
    // async function getData() {
    //   setLoading(true);
    //   try {
    //     const cityResponse = await axios.post("/api/fetchcategory", {
    //       operation: "fetchdatacitywise",
    //       city: slug,
    //     });

    //     if (cityResponse.data.fetchcitydata?.length > 0) {
    //       const alldata = cityResponse.data.fetchcitydata;
    //       setfetchfiltertourdata(alldata);
    //       setoriginaldata(alldata);
    //     } else {
    //       const categoryResponse = await axios.post("/api/fetchcategory", {
    //         operation: "fetchdatacategorieswise",
    //         category: slug,
    //       });

    //       if (categoryResponse.data.packages?.length > 0) {
    //         const categorydata = categoryResponse.data.packages;
    //         setfetchfiltertourdata(categorydata);
    //         setoriginaldata(categorydata);
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // getData();
  }, [slug]);

  useEffect(() => {
    if (datafetch) {
      const filteredData = originaldata.filter((tour) => {
        return (
          tour.tour_itinerary && Number(tour.tour_itinerary.days) <= datafetch
        );
      });
      // console.log(filteredData, "filteredData filter");
      setfetchfiltertourdata(filteredData);
    }
  }, [datafetch, originaldata]);

  useEffect(() => {
    if (price) {
      const filteredData = originaldata.filter((tour) => {
        // Ensure tour.price is a number for comparison
        const tourPrice = tour.price ? Number(tour.price.replace(/,/g, "")) : 0;
        const selectedPrice = price ? Number(price) : 0;

        return tourPrice <= selectedPrice;
      });
      // console.log(filteredData, "filteredData filter");
      setfetchfiltertourdata(filteredData);
    }
  }, [price, originaldata]);

  const handlepackage = (package_id) => {
    router.push(`/packages?id=${package_id}`);
  };

  function capitalizeWords(sentence) {
    return sentence
      .toLowerCase() // Convert the whole sentence to lowercase
      .split(" ") // Split the sentence by spaces into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a sentence
  }

  const getMapSrc = (cityName, stateName) => {
    const encodedCity = encodeURIComponent(`${cityName}, ${stateName}`);
    return `https://www.google.com/maps?q=${encodedCity}&output=embed`;
  };

  const handleCloseEnquiryModal = (val) => {
    setEnquiryClickModal(val);
  };

  return (
    <div>
      <div className="w-[95%] m-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4">
          <div className="col-span-1 lg:sticky lg:top-32 lg:h-[50vh]">
            <Sitefilter
              onSelectedDuration={handleSeletedDuration}
              onselectedprice={handleselectedprice}
            />
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div>
              <div className="w-full flex justify-between items-center">
                <div className="w-full lg:w-[55%]">
                  {/* <p className='font-semibold'> {slugfield} Packages (6 Tours Option)</p> */}
                  <p className="font-semibold mt-2 text-xl">
                    {capitalizeWords(slug)}
                    {slug.includes("TOUR") ? "" : " Tour"}(
                    {fetchfiltertourdata?.length} Tour Option)
                  </p>
                </div>
              </div>

              {loading ? (
                <SkeletonCard />
              ) :
                (fetchfiltertourdata.map((tour) => (
                  <div
                    key={tour.id}
                    className="rounded-lg w-full mt-7 grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 shadow-[rgba(0,_0,_0,_0.35)_0px_5px_15px] "
                  >
                    <div className="col-span-1">
                      <div className="w-full h-44 relative">
                        <Image
                          alt={tour.package_name}
                          src={tour.package_image[0]}
                          fill
                          className="rounded-lg"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex w-full mt-2 h-40 overflow-hidden">
                        <iframe
                          className="flex w-full overflow-hidden object-cover rounded-lg"
                          src={getMapSrc(tour?.city, tour?.state)}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                      <div className="flex justify-start items-center">
                        <p className="text-sm font-semibold text-red-700">
                          {tour?.sub_category
                            .filter(
                              (item) =>
                                item !== "EAST" &&
                                item !== "WEST" &&
                                item !== "NORTH" &&
                                item !== "SOUTH"
                            )
                            ?.map((item) => capitalizeWords(item))
                            .join(", ")}
                        </p>

                        {/* <div className='ml-2 p-1 rounded-md bg-gray-800'>
                                            <p className='font-extrabold text-white text-sm'>{tour.package_name}</p>
                                        </div> */}
                      </div>

                      <p className="text-xl font-semibold mt-1">
                        {tour.package_name}
                      </p>

                      {/* <div className='mt-2 flex lg:mt-2 justify-start items-center gap-2'>
                                            {tour.months}
                                        </div> */}

                      <div className="mt-4 w-full flex justify-start items-center gap-5">
                        <div className="flex justify-center items-center flex-col">
                          <div className="border bg-gray-100 w-[25px] h-[25px] rounded-large flex justify-center items-center">
                            <BedDouble className="w-[15px] h-[15px] text-red-700" />
                          </div>
                          <p className="text-xs font-semibold mt-1">Hotel</p>
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <div className="border bg-gray-100 w-[25px] h-[25px] rounded-large flex justify-center items-center">
                            <Utensils className="w-[15px] h-[15px] text-red-700" />
                          </div>
                          <p className="text-xs font-semibold mt-1">Meal</p>
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <div className="border bg-gray-100 w-[25px] h-[25px] rounded-large flex justify-center items-center">
                            <Camera className="w-[15px] h-[15px] text-red-700" />
                          </div>
                          <p className="text-xs font-semibold mt-1">
                            Sightseeing
                          </p>
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <div className="border bg-gray-100 w-[25px] h-[25px] rounded-large flex justify-center items-center">
                            <Bus className="w-[15px] h-[15px] text-red-700" />
                          </div>
                          <p className="text-xs font-semibold mt-1">Transport</p>
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <div className="border bg-gray-100 w-[25px] h-[25px] rounded-large flex justify-center items-center">
                            <Plane className="w-[15px] h-[15px] text-red-700" />
                          </div>
                          <p className="text-xs font-semibold mt-1">Flight</p>
                        </div>
                      </div>

                      <hr className="border border-black border-dotted mt-5 mb-4" />
                      <div className="mt-2">
                        <div className="flex flex-col lg:flex-row justify-start gap-1">
                          <div className="font-semibold w-full lg:w-[22%]">
                            <p> Destination :</p>
                          </div>
                          <div className="flex w-full lg:w-[75%] flex-wrap gap-1">
                            {tour.places.map((place) => (
                              <p key={place._id} className="text-sm ">
                                {place.name},
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-col lg:flex-row justify-start gap-1">
                          <div className="font-semibold w-full lg:w-[22%]">
                            <p> Highlights :</p>
                          </div>
                          <div className="flex w-full lg:w-[75%] justify-start flex-wrap gap-1 overflow-y-auto h-32">
                            {tour.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="w-full text-sm flex justify-start gap-1"
                              >
                                <div className="w-[5%] flex justify-start">
                                  <Dot />
                                </div>
                                <div className="w-[90%] flex justify-start">
                                  <p>{highlight}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {tour.highlight}
                    </div>

                    <div className="col-span-1">
                      {tour.offer ? (
                        <div className="text-xs rounded-md border bg-[#ffebd5] font-semibold text-[#f33624] p-2">
                          <p>{tour.offer}</p>
                        </div>
                      ) : (
                        <div className="text-xs rounded-md border bg-[#ffebd5] font-semibold text-[#f33624] p-1">
                          <p>No offer available</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="w-full">
                          <p className="text-xs font-extralight">Tour Duration</p>
                          {/* <p className='font-semibold text-base mt-2'>5D/4N</p> */}
                          {tour.tour_itinerary ? (
                            <p className="font-semibold text-base mt-2">
                              {tour.tour_itinerary.days}D/
                              {tour.tour_itinerary.nights}N
                            </p>
                          ) : (
                            <p className="font-semibold text-base mt-2">
                              Loading...
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <p className="text-xs font-extralight">Start From</p>
                          <p className="font-semibold text-lg mt-2">
                            &#8377; {tour.price}*
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handlepackage(tour.package_id)}
                        className="w-full bg-[#ed1c24] text-white font-extrabold mt-3 text-base"
                        radius="sm"
                      >
                        View Tour
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          color="default"
                          className="w-full font-extrabold mt-3 text-xs text-[#f33624] bg-white border border-[#f33624]"
                          radius="sm"
                          onClick={() => {
                            setEnquiryClickModal(true);
                            setSelectedTour(tour);
                          }}
                        >
                          Enquire Now
                        </Button>
                        <Button
                          color="default"
                          className="w-full font-extrabold mt-3 text-xs text-[#6c757d] bg-white border border-[#6c757d]"
                          radius="sm"
                          onClick={() => {
                            setModalOpen(true)
                            setSelectedPackageData(tour)
                          }}
                        >
                          Email Itinerary
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
                )}

              <EmailModal modalOpen={modalOpen} onCloseModal={handleCloseModal} selectedPackage={selectedPackageData} />

              <div>
                <GuestModal
                  enquiryClickModal={enquiryClickModal}
                  onCloseEnquiryModal={handleCloseEnquiryModal}
                  action={"enquiry"}
                  selectedPackage={selectedTour}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;

const SkeletonCard = () => {
  return (
    <div className="rounded-lg w-full mt-7 grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 shadow-[rgba(0,_0,_0,_0.35)_0px_5px_15px] animate-pulse">
      <div className="col-span-1">
        <div className="w-full h-44 bg-gray-200 rounded-lg"></div>
        <div className="flex w-full mt-2 h-40 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <div className="flex justify-start items-center">
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>

        <div className="h-6 w-1/2 bg-gray-200 rounded-md mt-1"></div>

        <div className="mt-4 w-full flex justify-start items-center gap-5">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col"
              >
                <div className="border bg-gray-200 w-[25px] h-[25px] rounded-large"></div>
                <div className="h-4 w-16 bg-gray-200 rounded-md mt-1"></div>
              </div>
            ))}
        </div>

        <hr className="border border-black border-dotted mt-5 mb-4" />
        <div className="mt-2">
          <div className="flex flex-col lg:flex-row justify-start gap-1">
            <div className="font-semibold w-full lg:w-[22%]">
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex w-full lg:w-[75%] flex-wrap gap-1">
              <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex flex-col lg:flex-row justify-start gap-1">
            <div className="font-semibold w-full lg:w-[22%]">
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex w-full lg:w-[75%] justify-start flex-wrap gap-1">
              <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="w-full">
            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-full">
            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
