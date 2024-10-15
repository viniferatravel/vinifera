import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Check } from "lucide-react"
import ContactForm from "@/_components/Contact"
import "@/app/styles/modal.css"
import axios from "axios";
import Swal from 'sweetalert2';


const CorporateTourEnquiry = ({ onSubmitSuccess }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyname: "",
        noofdays: "",
        destination: "",
        purpose: "",
        date: "",
        queries: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const abc = async () => {
            const response = await axios.post("/api/send-email", {
                operation: "corporateenquiry",
                name: formData.name,
                email: formData.email,
                number: formData.phone,
                companyname: formData.companyname,
                noofdays: formData.noofdays,
                destination: formData.destination,
                purpose: formData.purpose,
                date: formData.date,
                queries: formData.queries,
            });
            console.log(response.data, "check respobse");
            if (response.data.status === 200) {
                // alert(response.data.message);
                Swal.fire({
                    title: "Response sent successfully",
                    text: "Team connect with you soon",
                    icon: "success"
                });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    companyname: "",
                    noofdays: "",
                    destination: "",
                    purpose: "",
                    date: "",
                    queries: "",
                });
                onSubmitSuccess(true)
            }
            else if (response.data.status === 402) {
                Swal.fire({
                    title: " Number must be exactly 10 digits and contain only numeric values",
                    // text: "Team connect with you soon",
                    icon: "success"
                });
            }
            else if (response.data.status === 500) {
                Swal.fire({
                    title: "An error occurred during registration",
                    // text: "Team connect with you soon",
                    icon: "success"
                });
            }

        }

        abc()

        // console.log("Form submitted:", formData);

        //     const whatsappMessage = `Hi, I am interested in your service*.

        // *My details are -* 

        //   *Name:* ${formData.name},
        //   *Phone:* ${formData.phone}, 
        //   *Email:* ${formData.email}, 
        //   *Company Name:* ${formData.companyname},
        //   *No of Days:* ${formData.noofdays},
        //   *Destination:* ${formData.destination},
        //   *Purpose:* ${formData.purpose},
        //   *Travel Date:* ${formData.date},
        //   *Queries:* ${formData.queries}`;
        //     const whatsappURL = `https://wa.me/7738527031?text=${encodeURIComponent(
        //         whatsappMessage
        //     )}`;
        //     window.open(whatsappURL, "_blank");

        // setFormData({
        //     name: "",
        //     email: "",
        //     phone: "",
        //     companyname: "",
        //     noofdays: "",
        //     destination: "",
        //     purpose: "",
        //     date: "",
        //     queries: "",
        // });
    };


    return (
        // <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="hidden md:block w-[35%] ">
                <img
                    src="/image/corporate.jpeg"
                    alt="Tour Destination"
                    className="w-full h-full object-cover rounded-l-lg"
                />
            </div>

            {/* Form Section */}
            <div className="w-[65%] p-8">
                <h2 className="text-3xl font-bold mb-6 text-left">Corporate Tour Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Your Name*"
                            name="name"
                            className="px-3 py-2 border rounded-lg w-full"
                            value={formData.name}
                            onChange={handleChange}

                        />
                        <input
                            type="email"
                            required
                            placeholder="Email address*"
                            name="email"
                            className="px-3 py-2 border rounded-lg w-full"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Phone Number*"
                            name="phone"
                            className="px-3 py-2 border rounded-lg w-full"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Company Name*"
                            required
                            name="companyname"
                            className="px-3 py-2 border rounded-lg w-full"
                            value={formData.companyname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Enter number of days"
                            name="noofdays"
                            className="px-3 py-2 border rounded-lg w-full "
                            value={formData.noofdays}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Destination"
                            required
                            name="destination"
                            className="px-3 py-2 border rounded-lg w-full "
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        <select
                            className="px-3 py-2 border rounded-lg w-full"
                            defaultValue=""
                            required
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>What are you looking at</option>
                            <option>Meetings</option>
                            <option>Incentive tours</option>
                            <option>Conference</option>
                            <option>Exhibition</option>
                            <option>Educational tours</option>
                        </select>


                        <input
                            type="date"
                            required
                            className="px-3 py-2 border rounded-lg w-full"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <textarea
                        rows="3"
                        placeholder="Tour Details"
                        className="p-3 border rounded-lg w-full "
                        name="queries"
                        value={formData.queries}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="w-[40%] bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-600 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        // </div>
    );
};


const PassportTourEnquiry = ({ onSubmitSuccess }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        queries: "",
    });
    console.log(formData, "formData");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const abc = async () => {
            const response = await axios.post("/api/send-email", {
                operation: "passportmodalenquiry",
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                services: formData.service,
                query: formData.queries || null,
            });
            console.log(response.data, "check respobse");
            if (response.data.status === 200) {
                Swal.fire({
                    title: "Response sent successfully",
                    text: "Team connect with you soon",
                    icon: "success"
                });
                // alert(response.data.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    queries: "",
                });
                onSubmitSuccess(true)
            }
            else if (response.data.status === 402) {
                Swal.fire({
                    title: "Number must be exactly 10 digits and contain only numeric values",
                    // text: "Team connect with you soon",
                    icon: "success"
                });
            }
        }

        abc()




        //     const whatsappMessage = `Hi, I am interested in your service*.

        // *My details are -* 

        //   *Name:* ${formData.name},
        //   *Phone:* ${formData.phone}, 
        //   *Email:* ${formData.email}, 
        //   *Service:* ${formData.purpose},
        //   *Queries:* ${formData.queries}`;
        //     const whatsappURL = `https://wa.me/7738527031?text=${encodeURIComponent(
        //         whatsappMessage
        //     )}`;
        //     window.open(whatsappURL, "_blank");

        // setFormData({
        //     name: "",
        //     email: "",
        //     phone: "",
        //     service: "",
        //     queries: "",
        // });
    };


    return (
        // <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="hidden md:block w-[35%] ">
                <img
                    src="/image/passport.jpg"
                    alt="Tour Destination"
                    className="w-full h-full object-cover rounded-l-lg"
                />
            </div>
            {/* Form Section */}
            <div className="w-[65%] p-8">
                <h2 className="text-3xl font-bold mb-6 text-left">Passport Enquiry</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-36">
                    <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <input
                                type="text"
                                required
                                placeholder="Your Name*"
                                name="name"
                                className="px-3 py-2 border rounded-lg w-full"
                                value={formData.name}
                                onChange={handleChange}

                            />
                            <input
                                type="email"
                                required
                                placeholder="Email address*"
                                name="email"
                                className="px-3 py-2 border rounded-lg w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <input
                                type="tel"
                                required
                                placeholder="Phone Number*"
                                name="phone"
                                className="px-3 py-2 border rounded-lg w-full"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <select
                                className="px-3 py-2 border rounded-lg w-full"
                                defaultValue=""
                                required
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="" disabled hidden>What are you looking at</option>
                                <option>Passport</option>
                                <option>Visa</option>
                            </select>
                        </div>
                        <textarea
                            rows="3"
                            placeholder="Tour Details"
                            className="p-3 border rounded-lg w-full "
                            name="queries"
                            value={formData.queries}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-[40%] bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-600 transition duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // </div>
    );
};

export default function GuestModal({
    tourInclExclModal,
    onCloseTourInclExclModal,
    action, enquiryClickModal,
    onCloseEnquiryModal,
    selectedPackage,
    corporateClickModal,
    onCloseCorporateModal,
    passportClickModal,
    onClosePassportModal
}) {
    // console.log("selectedPackage:::::::>", selectedPackage)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState(action === "enquiry" ? "3xl" : action === "corporate" ? "4xl" : '5xl')

    const handleOpen = (size) => {
        onOpen();
    }

    useEffect(() => {
        if (tourInclExclModal === true) {
            handleOpen();
        }

        if (enquiryClickModal === true) {
            handleOpen();
        }

        if (corporateClickModal === true) {
            handleOpen();
        }

        if (passportClickModal === true) {
            handleOpen();
        }
    }, [tourInclExclModal, enquiryClickModal, corporateClickModal, passportClickModal, handleOpen])

    const handleClose = () => {
        onClose();
        if (action === "enquiry") {
            onCloseEnquiryModal(false)
        } else if (action === "corporate") {
            onCloseCorporateModal(false)
        } else if (action === "passport") {
            onClosePassportModal(false)
        } else {
            onCloseTourInclExclModal(false)
        }

    }

    const handleSubmitSuccess = (val) => {
        if (val) {
            handleClose()
        }
    }


    return (
        <>
            <Modal
                size={size}
                isOpen={isOpen}
                onClose={handleClose}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {action === "corporate" || action === "passport"
                                ? ""
                                : <ModalHeader className="flex flex-col gap-1">{action === "tourInclExcl" ? "Tour Price Inclusion and Exclusion" : "Enquiry Form"}</ModalHeader>
                            }
                            <ModalBody>
                                {action === "tourInclExcl"
                                    ? <><div className="grid grid-cols-2 gap-8 px-6 py-4">
                                        {/* Left Column - Includes */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Tour Price Includes:</h3>
                                            <ul className="list-none space-y-2 text-md">
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Accommodation on twin sharing basis for the duration of the tour in the itinerary.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Meals as mentioned in the itinerary.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Coach transfers from the first day meeting point to the last day dropping point.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> All entrance fees of the sightseeing places mentioned in the itinerary.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Services of the Tour Manager from the first day to the last day of the tour.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Cost of economy class return airfare from Airport to Airport tours (if specified).</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Cost of internal airfare (if specified in the itinerary).</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div> Cost of Travel Insurance up to 60 years of age.</li>
                                            </ul>
                                        </div>

                                        {/* Right Column - Excludes */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Tour Price Excludes:</h3>
                                            <ul className="list-none space-y-2 text-md">
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Cost of Rail or Airfare to and from the meeting and dropping place of the tour except Airport to Airport Tours / specifically mentioned in the tour itinerary.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Cost of any individual Airport / Railway station transfer.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any increase in the Airfare / Hotel tariff charges.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any increase in the fuel surcharge or any kind of taxes levied by the respective government or statutory bodies.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Cost of extension of the validity or deviation from the route of the tour in case of Airport to Airport tours.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Portage(Coolie charges), laundry, wines & alcoholic beverages, mineral water (unless specified), telephone charges, shopping, all items of personal nature and also food and drinks not forming the part of the group menus.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Extra stay pre/post tour.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any extra expenses incurred for changing the route due to any unforeseen circumstances, forced majeure instances, natural calamities, political disturbances, strikes, etc.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Extra cost incurred due to illness, accident, hospitalization or any individual unforeseen cost incurring incidence.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>In case of Pilgrimage tours cost of horse back, Doli, Helicopter (unless specifically mentioned), chopper, etc.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any private transfers taken to move from one place to another instead of coach.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Additional extra topping if taken.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>If any activity/sightseeing done twice.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any add-on sightseeing/activities along with transfers if done other than mentioned in the tour program.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Fur coats/Jackets to visit snow point or any special attire required to visit any particular sightseeing place.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Any upgradation in the room category or air line class.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Extra photographs clicked other than group photographs.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Extra water bottle charges.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Premium seat charges.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Medicines required if any.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>Service or Government taxes as applicable from time to time.</li>
                                                <li className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Check color="green" className="h-5" /></div>{"Anything not specifically mentioned in 'Your Tour Price Includes Column'."}</li>
                                            </ul>
                                        </div>
                                    </div>
                                        <p size={12} className="text-center text-red-600">
                                            Note: The above inclusions/exclusions are in general and tour wise it may change for which information is available with Sales person.
                                        </p>
                                    </>
                                    : ""
                                }

                                {action === "enquiry"
                                    ? <ContactForm selectedPackage={selectedPackage} onSubmitSuccess={handleSubmitSuccess} />
                                    : ""
                                }

                                {action === "corporate"
                                    ? <CorporateTourEnquiry onSubmitSuccess={handleSubmitSuccess} />
                                    : ""
                                }

                                {
                                    action === "passport"
                                        ? <PassportTourEnquiry onSubmitSuccess={handleSubmitSuccess} />
                                        : ""
                                }
                            </ModalBody>

                            {action === "tourInclExcl" || action === "enquiry" || action === "corporate" || action === "passport"
                                ? ""
                                : <>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            }

                            {/* {action === "enquiry"
                                ? <>
                                    <ModalFooter>
                                        <div className="flex justify-between items-center mt-6 w-full">
                                            <p className="text-sm text-gray-600 text-left">
                                                <span role="img" aria-label="phone">
                                                    📞
                                                </span>{" "}
                                                02268818888 (10am - 8pm)
                                            </p>
                                            <button
                                                type="submit"
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                            >
                                                CALL ME
                                            </button>
                                        </div>
                                    </ModalFooter>
                                </>
                                : ""
                            } */}

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
