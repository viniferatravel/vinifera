"use client";
import { ChevronLeft, ChevronRight, Info, Minus, Phone, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";

const Selectdate = () => {

    const currentDate = new Date();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerPage, setSlidesPerPage] = useState(4);

    const [selectedTour, setSelectedTour] = useState(null);
    // console.log(selectedTour, "selectedTour");

    const [adult, setadult] = useState(0);
    // console.log(adult, "adult");

    const [child, setchild] = useState(0);
    // console.log(child, "child");

    const [infant, setinfant] = useState(0);
    // console.log(infant, "infant");

    const [selectdate, setselectdate] = useState(null);
    // console.log(selectdate, "selectdate");

    const [selectedRoomId, setSelectedRoomId] = useState(null);
    // console.log(selectedRoomId, "selectedRoomId");

    const [selectedtitle, setselectedtitle] = useState('Mr.');
    // console.log(selectedtitle, "selectedtitle")

    const [selectedgender, setselectedgender] = useState('Male');
    // console.log(selectedgender, "selectedgender")

    const handleadultincrement = () => {
        setadult(prevadult => prevadult + 1)
    }

    const handleadultdecrement = () => {
        setadult(prevadult => (prevadult > 0 ? prevadult - 1 : 0))
    }

    const handlechildincrement = () => {
        setchild(prevadult => prevadult + 1)
    }

    const handlechilddecrement = () => {
        setchild(prevadult => (prevadult > 0 ? prevadult - 1 : 0))
    }

    const handleinfantincrement = () => {
        setinfant(prevadult => prevadult + 1)
    }

    const handleinfantdecrement = () => {
        setinfant(prevadult => (prevadult > 0 ? prevadult - 1 : 0))
    }

    const handleNext = () => {
        if (currentIndex + slidesPerPage < slides.length) {
            setCurrentIndex(currentIndex + slidesPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - slidesPerPage >= 0) {
            setCurrentIndex(currentIndex - slidesPerPage);
        }
    };

    const handleRadioChange = (id) => {
        const tour = slides.find(slide => slide.id === id);
        setSelectedTour(tour);
    };

    const handledatechange = (date) => {
        setselectdate(date)
    }

    const handleRoomSelection = (roomId) => {
        const room = filteredRooms.find((room) => room.id === roomId);
        setSelectedRoomId(room);
    };

    const handleselecttitle = (value) => {
        setselectedtitle(value)
    }

    const handlegender = (value) => {
        setselectedgender(value)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {

                setSlidesPerPage(2);
            } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {

                setSlidesPerPage(2);
            } else {
                setSlidesPerPage(4);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = [
        { id: 1, date: "Oct 29, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 2, date: "Oct 5, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 3, date: "Oct 10, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 4, date: "Oct 15, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 5, date: "Oct 20, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 6, date: "Oct 25, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 7, date: "Oct 27, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
        { id: 8, date: "Oct 28, 2024", para: "Tour Length", days: "4N/5D", pricepara: "Start From", price: "₹1,02,000", seats: "Available Seats 8+" },
    ];

    const selecttitle = [
        { label: "Mr.", value: "Mr." },
        { label: "Mrs.", value: "Mrs." },
        { label: "Miss.", value: "Miss." },
    ]

    const selectgender = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Transgender", value: "Transgender" },
    ]

    const [filteredRooms, setFilteredRooms] = useState([]);
    // console.log(filteredRooms, "filteredRooms");

    const filterRoomsByAdultAndChild = () => {
        const rooms = {
            adultone: [
                { id: 1, type: '2 Double Bed Rooms', price: '₹2,27,116', adult: '1' },
                { id: 2, type: '1 Twin Room', price: '₹2,27,116', adult: '1' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹2,29,320', adult: '1' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹2,27,116', adult: '1' },
                { id: 5, type: '2 Single Rooms', price: '₹2,71,216', adult: '1' },
                { id: 6, type: '1 Single Room + 1 Half sharing with other form', price: '₹2,49,166', adult: '1' },
            ],
            adulttwo: [
                { id: 1, type: '2 Double Bed Rooms', price: '₹3,27,116', adult: '2' },
                { id: 2, type: '1 Twin Room', price: '₹3,27,116', adult: '2' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹3,29,320', adult: '2' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹3,27,116', adult: '2' },
            ],
            adultthree: [
                { id: 1, type: '2 Double Bed Rooms', price: '₹4,27,116', adult: '3' },
                { id: 2, type: '1 Twin Room', price: '₹4,27,116', adult: '3' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹4,29,320', adult: '3' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹4,27,116', adult: '3' },
            ],
            adultfour: [
                { id: 1, type: '3 Double Bed Rooms', price: '₹8,27,116', adult: '1', child: '1' },
                { id: 2, type: '1 Twin Room', price: '₹8,27,116', adult: '1', child: '1' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹4,29,320', adult: '1', child: '1' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹4,27,116', adult: '1', child: '1' },
            ],
            adultfive: [
                { id: 1, type: '3 Double Bed Rooms', price: '₹6,27,116', adult: '2', child: '1' },
                { id: 2, type: '1 Twin Room', price: '₹4,27,116', adult: '2', child: '1' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹4,29,320', adult: '2', child: '1' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹4,27,116', adult: '2', child: '1' },
            ],
            adultsix: [
                { id: 1, type: '3 Double Bed Rooms', price: '₹6,27,116', adult: '3', child: '2' },
                { id: 2, type: '1 Twin Room', price: '₹4,27,116', adult: '3', child: '2' },
                { id: 3, type: '1 Triple sharing room with another form', price: '₹4,29,320', adult: '3', child: '2' },
                { id: 4, type: '1 Double Room with Double Bed', price: '₹4,27,116', adult: '3', child: '2' },
            ],
        };

        let filteredData = [];
        if (adult === 1 && child === 0) {
            filteredData = rooms.adultone;
        } else if (adult === 2 && child === 0) {
            filteredData = rooms.adulttwo;
        } else if (adult === 3 && child === 0) {
            filteredData = rooms.adultthree;
        } else if (adult === 1 && child === 1) {
            filteredData = rooms.adultfour;
        } else if (adult === 2 && child === 1) {
            filteredData = rooms.adultfive;
        } else if (adult === 3 && child === 2) {
            filteredData = rooms.adultsix;
        }
        setFilteredRooms(filteredData);
    };

    useEffect(() => {
        filterRoomsByAdultAndChild();
    }, [adult, child]);

    return (
        <div className="bg-[#f2f2f2]">
            <div className=" w-[95%] m-auto">
                <h2 className="font-extrabold text-xl lg:text-3xl mb-8 pt-8">Review your dates</h2>
                <div className="w-full  grid grid-cols-1 lg:grid-cols-3 gap-9">
                    <div className=" col-span-1 lg:col-span-2">
                        <div className="rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-start gap-2">
                                    <div className="w-8 p-1 flex justify-center items-center rounded-md bg-[#ed1c24] text-white">
                                        <p className="font-extrabold">1</p>
                                    </div>
                                    <div className="p-1 font-extrabold">
                                        <p>Select Your Dates</p>
                                    </div>
                                </div>

                                {/* Buttons visible only on tablets and larger screens */}
                                <div className="grid-cols-2 gap-3 hidden sm:grid">
                                    <ChevronLeft
                                        className={`w-[40px] h-[40px] text-black p-2 shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.15)] rounded-full cursor-pointer ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={handlePrev}
                                        disabled={currentIndex === 0}
                                    />
                                    <ChevronRight
                                        className={`w-[40px] h-[40px] text-black p-2 shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.15)] rounded-full cursor-pointer ${currentIndex + slidesPerPage >= slides.length ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={handleNext}
                                        disabled={currentIndex + slidesPerPage >= slides.length}
                                    />
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="overflow-x-auto lg:overflow-x-hidden w-full relative">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)`,
                                        }}
                                    >
                                        {slides.map((slide) => (
                                            <div key={slide.id} className="w-1/2 sm:w-1/2 lg:w-1/4 flex-shrink-0 p-1 mt-4">
                                                <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] p-4 rounded-md">
                                                    <p className="font-semibold text-base">{slide.date}</p>
                                                    <p className="text-sm mt-2">{slide.para}</p>
                                                    <p className="font-semibold">{slide.days}</p>
                                                    <p className="text-sm mt-2">{slide.pricepara}</p>
                                                    <p className="font-semibold">&#8377; {slide.price}</p>
                                                    <p className="font-semibold text-sm text-[#ed1c24] mt-3">{slide.seats}</p>
                                                    <input
                                                        className="mt-3 w-[15px] h-[15px]"
                                                        type="radio"
                                                        checked={selectedTour?.id === slide.id}
                                                        onChange={() => handleRadioChange(slide.id)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg p-4 mt-8 bg-white">
                            <div className="flex justify-start gap-2">
                                <div className="w-8 p-1 flex justify-center items-center rounded-md bg-[#ed1c24] text-white">
                                    <p className="font-extrabold">2</p>
                                </div>
                                <div className="p-1 font-extrabold">
                                    <p>Add traveller details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                                <div className="flex justify-between md:justify-start gap-3">
                                    <div>
                                        <p className="font-semibold text-sm">Adults</p>
                                        <p className="text-xs">Above 12 yrs</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-3">
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handleadultdecrement()}>
                                            <Minus className="w-[15px] h-[15px]" />
                                        </div>
                                        <div className="text-lg">
                                            <p>{adult}</p>
                                        </div>
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handleadultincrement()}>
                                            <Plus className="w-[15px] h-[15px]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between md:justify-start gap-3">
                                    <div>
                                        <p className="font-semibold text-sm">Child</p>
                                        <p className="text-xs">Above 2-11 yrs</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-3">
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handlechilddecrement()}>
                                            <Minus className="w-[15px] h-[15px]" />
                                        </div>
                                        <div className="text-lg">
                                            <p>{child}</p>
                                        </div>
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handlechildincrement()}>
                                            <Plus className="w-[15px] h-[15px]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between md:justify-start gap-3">
                                    <div>
                                        <p className="font-semibold text-sm">Infant</p>
                                        <p className="text-xs">Above 0-1 yrs</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-3">
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handleinfantdecrement()}>
                                            <Minus className="w-[15px] h-[15px]" />
                                        </div>
                                        <div className="text-lg">
                                            <p>{infant}</p>
                                        </div>
                                        <div className="shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),_0px_0px_0px_1px_rgba(27,31,35,0.15)] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => handleinfantincrement()}>
                                            <Plus className="w-[15px] h-[15px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-[#f2f2f2] p-2 mt-8 flex justify-start md:items-center gap-2">
                                <Info className="w-[40px] h-[40px] md:w-[20px] md:h-[20px]" />
                                <p className="font-semibold">Please Note : <span className="font-normal">Traveller details should match information on passport</span></p>
                            </div>
                            <div className="mt-8">
                                <p className="font-extrabold">Lead Traveller</p>
                                <p className="mt-2">This traveller will serve as the contact person for the booking.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>Select an Title</label>
                                        <Autocomplete
                                            radius="sm"
                                            defaultSelectedKey={selectedtitle}
                                            onInputChange={(value) => handleselecttitle(value)}
                                            color="default"
                                            variant="bordered"
                                        >
                                            {selecttitle.map((selecttitle) => (
                                                <AutocompleteItem key={selecttitle.value} value={selecttitle.value}>
                                                    {selecttitle.label}
                                                </AutocompleteItem>
                                            ))}
                                        </Autocomplete>
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>First Name</label>
                                        <Input color="default"
                                            variant="bordered" type="text" radius="sm" />
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>Last Name</label>
                                        <Input color="default"
                                            variant="bordered" type="email" radius="sm" />
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>Email</label>
                                        <Input color="default"
                                            variant="bordered" type="email" radius="sm" />
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>Phone Number</label>
                                        <Input color="default"
                                            variant="bordered" type="text" radius="sm" />
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>Select an gender</label>
                                        <Autocomplete
                                            onInputChange={(value) => handlegender(value)}
                                            defaultSelectedKey={selectedgender}
                                            color="default"
                                            variant="bordered"
                                            radius="sm"
                                        >
                                            {selectgender.map((selectgender) => (
                                                <AutocompleteItem key={selectgender.value} value={selectgender.value}>
                                                    {selectgender.label}
                                                </AutocompleteItem>
                                            ))}
                                        </Autocomplete>
                                    </div>
                                    <div className="flex justify-start gap-2 flex-col">
                                        <label>select the date</label>
                                        <DatePicker
                                            selected={selectdate}
                                            onChange={handledatechange}
                                            minDate={currentDate}
                                            className="border border-gray-300 p-2 rounded-md font-light text-sm w-full"
                                        />
                                    </div>
                                </div>
                                <p className="mt-3">You will fill the remaining traveler data after payment.</p>
                            </div>
                        </div>
                        <div className="rounded-lg p-4 mt-8 bg-white">
                            <div className="flex justify-start gap-2">
                                <div className="w-8 p-1 flex justify-center items-center rounded-md bg-[#ed1c24] text-white">
                                    <p className="font-extrabold">3</p>
                                </div>
                                <div className="p-1 font-extrabold">
                                    <p>Select accommodation</p>
                                </div>
                            </div>
                            <p className="mt-3">Select the number of travellers per room type.</p>
                            <div className="mt-3">
                                <table className="min-w-full table-auto border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 text-left border border-gray-300">Room Type</th>
                                            <th className="px-4 py-2 text-left border border-gray-300">Price</th>
                                            <th className="px-4 py-2 text-left border border-gray-300">Selection</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRooms.map((room) => (
                                            <tr key={room.id} className="border">
                                                <td className="px-4 py-2 border">{room.type}</td>
                                                <td className="px-4 py-2 border">{room.price}</td>
                                                <td className="px-4 py-2 border text-center">
                                                    <input
                                                        type="radio"
                                                        name="roomSelection"
                                                        value={room.id}
                                                        checked={selectedRoomId && selectedRoomId.id === room.id}
                                                        onChange={() => handleRoomSelection(room.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="rounded-lg p-4 mt-8 flex flex-col gsp-3 bg-white">
                            <Checkbox radius="none">I have read and agreed to the Vinifera's <span className="text-[#ed1c24]">Terms & Condition</span></Checkbox>
                            <Button color="primary" className="mt-4">
                                Book Space
                            </Button>
                        </div>
                    </div>

                    <div className="sticky top-16 h-[50rem] col-span-1">
                        {selectedTour && (
                            <div className="rounded-lg p-4 bg-white mt-5">
                                <p className="font-extrabold text-lg">Tour Summary</p>
                                <p className="font-semibold text-base mt-2">Dubai With Abu Dhabi Economy</p>
                                <p className="text-sm">{selectedTour.days}</p>
                                <p className="font-semibold text-base mt-3">Start & End Date</p>
                                <p className="text-sm">{selectedTour.date} to {selectedTour.date}</p>
                                <p className="font-semibold text-base mt-3">What's included</p>
                                <p className="text-sm">Hotel, Meal, Sightseeing, Transport, Flight Included</p>
                            </div>
                        )}
                        {selectedRoomId && (
                            <div className="rounded-lg mt-5 p-4 bg-white">
                                <p className="font-extrabold text-lg">Price Breakdown</p>
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-sm">Room Description</p>
                                        <p className="text-xs">{selectedRoomId.type}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-sm text-end">Price</p>
                                        <p className="text-lg font-semibold text-end"> {selectedRoomId.price}</p>
                                        <p className="text-xs text-end">Excludes Tax Price</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="rounded-lg mt-5 p-4 bg-white">
                            <p className="font-extrabold text-lg">Need Help?</p>
                            <p className="text-base mt-2">Whether you have questions or need assistance with online booking procedures, our experts are just a call away. Reach out to us, and we'll ensure a smooth and hassle-free booking experience for you. Your satisfaction is our priority.</p>
                            <div className="mt-4">
                                <a className="flex gap-2 font-semibold text-lg" rel="stylesheet" href="tel:+91 18002661100"><Phone />1800 266 1100</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selectdate;


