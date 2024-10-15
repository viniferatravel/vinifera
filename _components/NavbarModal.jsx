"use client"
import { useState, useEffect, useRef } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { AlarmClockCheck, FilterIcon, MapPin, Search } from "lucide-react";
import Image from "next/image";
import corporateone from "@/public/image/cp1.jpg"
import axios from "axios";
import { useRouter } from "next/navigation";

const NavbarModal = ({ isOpen, onOpenChange }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);

  const router = useRouter();

  // Create a ref for the input element
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleClearFilters = () => {
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(null);
    setSelectedRange(null);
  };

  const handleSearch = () => {
    // Implement search logic here
    // console.log("Searching with filters:", {
    //   year: selectedYear,
    //   month: selectedMonth,
    //   range: selectedRange,
    // });
  };

  const [links, setlinks] = useState([]);
  // console.log(links, "links");

  const [cards, setcards] = useState([]);
  // console.log(cards, "cards");

  const [search, setsearch] = useState('');
  // console.log(search, "search");

  const [fetchfilterdata, setfetchfilterdata] = useState([]);
  // console.log(fetchfilterdata, "fetchfilterdata")

  const handlesearchinput = (e) => {
    setsearch(e.target.value);
  }

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
    async function getData() {
      const response = await axios.post("/api/fetchcategory", {
        operation: "fetchsortpackage",
      })
      // console.log(response.data.fetchsortdata, "check sort data");
      setcards(response.data.fetchsortdata)
    }
    getData();
  }, [])

  useEffect(() => {

    if (search.trim() === "") {
      setfetchfilterdata([]);
      return;
    }

    if (search) {

      const cityFilter = links?.filter(link =>
        link.city.toLowerCase().includes(search.toLowerCase())
      )

      const stateFilter =  links?.filter(link =>
        link.state.toLowerCase().includes(search.toLowerCase())
      )

      const packageFilter =  links?.filter(link =>
        link.package_name.toLowerCase().includes(search.toLowerCase())
      )

      if(cityFilter.length !== 0) {
        setfetchfilterdata(cityFilter);
      }

      if(stateFilter.length !== 0) {
        setfetchfilterdata(stateFilter);
      }

      if(packageFilter.length !== 0) {
        setfetchfilterdata(packageFilter);
      }

    } else {
      setfetchfilterdata(links);
    }
  }, [search, links]);

  const handlepackage = (package_id) => {
    router.push(`/packages/${package_id}`)
    onOpenChange()
  }

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

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      placement="top"
      scrollBehavior={"inside"}
    >
      <ModalContent>
        <ModalBody>
          <div className="w-full p-2 lg:p-5 flex flex-col gap-4 h-[500px] overflow-y-scroll">
            <div>
              <div className="flex justify-between items-center border py-1 px-3 gap-5 rounded-md mt-5 w-full lg:w-1/2">
                <input
                  ref={searchInputRef}
                  className="border-none focus:ring-0 focus:outline-none text-gray-400 text-base"
                  type="text"
                  name="search"
                  placeholder="Enter your city"
                  value={search}
                  onChange={handlesearchinput}
                />
                <Search className="size-4 text-gray-500 cursor-pointer" />
              </div>


              <div className="p-3 rounded-lg gap-5 w-full mt-5 bg-white">


                {search ? (
                  <>
                    <p className="mt-2 text-sm">Tour packages</p>
                    <hr className="border border-gray-100 my-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 cursor-pointer">
                      {fetchfilterdata && fetchfilterdata.map((tour,index) => (
                        <div className=" grid grid-cols-3 gap-5" key={index} onClick={() => handlepackage(tour.package_id)}>
                          <div className=" h-[5rem] relative col-span-1">
                            <div className='relative h-[5rem] rounded-md'>
                              <Image
                                alt={tour.package_name}
                                src={tour.package_image[0]}
                                fill
                                style={{
                                  objectFit: 'cover'
                                }}
                                className="rounded-md"
                              />
                            </div>
                          </div>

                          <div className="col-span-2">
                            <p className="font-semibold w-full">{tour.package_name}</p>

                            <div className="flex justify-start items-center gap-5 mt-2">
                              <div className="flex justify-start items-center gap-2">
                                <MapPin className="w-[15px] h-[15px] text-[#ff0000]" />
                                <p>{tour.city}</p>
                              </div>

                              <div className="flex justify-start items-center gap-2">
                                <AlarmClockCheck className="w-[15px] h-[15px] text-[#ff0000]" />
                                {fetchfilterdata.length > 0 && fetchfilterdata[0].tour_itinerary ? (
                                  <p className="text-sm flex justify-center items-center">
                                    {fetchfilterdata[0].tour_itinerary.days}D/{fetchfilterdata[0].tour_itinerary.nights}N
                                  </p>
                                ) : (
                                  null
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (<>
                  <p className="mt-2 text-sm">Hot Selling Destination</p>
                  <hr className="border border-gray-100 my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 cursor-pointer">
                    {cards && cards.map((tour,index) => (
                      <div className=" grid grid-cols-3 gap-5" key={index} onClick={() => handlepackage(tour.package_id)}>
                        <div className=" h-[5rem] relative col-span-1">
                          <div className='relative h-[5rem] rounded-md'>
                            <Image
                              alt={tour.package_name}
                              src={tour.package_image[0]}
                              fill
                              style={{
                                objectFit: 'cover'
                              }}
                              className="rounded-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-2">
                          <p className="font-semibold w-full">{tour.package_name}</p>

                          <div className="flex justify-start items-center gap-5 mt-2">
                            <div className="flex justify-start items-center gap-2">
                              <MapPin className="w-[15px] h-[15px] text-[#ff0000]" />
                              <p>{capitalizeWords(tour.city)}</p>
                            </div>

                            <div className="flex justify-start items-center gap-2">
                              <AlarmClockCheck className="w-[15px] h-[15px] text-[#ff0000]" />
                              
                                <p className="text-sm flex justify-center items-center">
                                  {tour.tour_itinerary.days}D/{tour.tour_itinerary.nights}N
                                </p>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>)}
              </div>

              {/* <div className="p-0 lg:p-5 flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex flex-col">
                    <div className="py-4 border-b w-full">
                      <h2 className="text-xl">Best season tours</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 py-5 text-sm">
                      <button className="border border-themeColor hover:text-white hover:bg-themeColor py-2 px-2 rounded-xl">
                        Europe
                      </button>
                     
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-4 border-b w-full">
                      <h2 className="text-xl">Hot selling destinations</h2>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-6 py-8">
                        {toursData.map((tour, index) => (
                          <div
                            key={index}
                            className="flex items-center md:space-x-4 md:flex-row flex-col"
                          >
                            <img
                              src={tour.image}
                              alt={tour.region}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-bold text-center md:text-start">
                                {tour.name}
                              </h3>
                              <p className="text-gray-600 text-center md:text-start">
                                {tour.tours} tours
                              </p>
                              <p className="text-gray-600 text-center md:text-start">
                                {tour.departures} departures
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex flex-col mb-5">
                  <div className="py-4 border-b w-full">
                    <h2 className="text-xl">When do you wish to travel?</h2>
                  </div>
                  <TourComponent
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    onYearChange={setSelectedYear}
                    onMonthChange={setSelectedMonth}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="py-4 border-b w-full">
                    <h2 className="text-xl">Popular Range</h2>
                  </div>
                  <SelectableBox
                    selectedRange={selectedRange}
                    onRangeChange={setSelectedRange}
                  />
                </div>
                <div>
                  <div>
                    <FilterIcon />
                  </div>
                  <div>
                    <p>
                      {selectedMonth} - {}
                    </p>
                    <p>{selectedRange}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Clear Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Search
              </button>
            </div> */}

            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const toursData = [
  {
    name: "Europe",
    tours: 103,
    departures: 135,
    image:
      "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    name: "South East Asia",
    tours: 55,
    departures: 213,
    image:
      "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    name: "Dubai Egypt Israel",
    tours: 26,
    departures: 52,
    image:
      "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    name: "Australia New Zealand",
    tours: 35,
    departures: 40,
    image:
      "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
  {
    name: "America",
    tours: 14,
    departures: 11,
    image:
      "https://assets.cntraveller.in/photos/6352a8c00831d51e5aa10703/master/pass/tokyoGettyImages-1031467664.jpeg",
  },
];

function TourComponent({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const data = {
    [currentYear]: [
      { month: "Jan", tours: 0 },
      { month: "Feb", tours: 0 },
      { month: "Mar", tours: 0 },
      { month: "Apr", tours: 0 },
      { month: "May", tours: 0 },
      { month: "Jun", tours: 0 },
      { month: "Jul", tours: 0 },
      { month: "Aug", tours: 0 },
      { month: "Sep", tours: 209 },
      { month: "Oct", tours: 357 },
      { month: "Nov", tours: 384 },
      { month: "Dec", tours: 270 },
    ],
    [nextYear]: [
      { month: "Jan", tours: 100 },
      { month: "Feb", tours: 120 },
      { month: "Mar", tours: 0 },
      { month: "Apr", tours: 0 },
      { month: "May", tours: 0 },
      { month: "Jun", tours: 0 },
      { month: "Jul", tours: 0 },
      { month: "Aug", tours: 0 },
      { month: "Sep", tours: 0 },
      { month: "Oct", tours: 0 },
      { month: "Nov", tours: 0 },
      { month: "Dec", tours: 0 },
    ],
  };

  return (
    <div className="p-4">
      {/* Year Selector */}
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value={currentYear}>{currentYear}</option>
        <option value={nextYear}>{nextYear}</option>
      </select>

      {/* Month Selector */}
      <select
        value={selectedMonth || ""}
        onChange={(e) => onMonthChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Select a month</option>
        {data[selectedYear]?.map((item) => (
          <option key={item.month} value={item.month}>
            {item.month}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectableBox({ selectedRange, onRangeChange }) {
  const ranges = [
    "0-50 km",
    "50-100 km",
    "100-150 km",
    "150-200 km",
    "200-250 km",
    "250+ km",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-4 py-2 border rounded ${selectedRange === range ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

export default NavbarModal;

