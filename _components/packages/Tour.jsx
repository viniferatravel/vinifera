import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Calendar, Info, MapPin, Utensils, CookingPot, EggFried } from "lucide-react";
import { Button, Badge } from "@nextui-org/react"


const Tour = ({ selectedPackage }) => {

  const capitalizeFirstLetterOfEachWord = (str) => {
    return str?.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ');
  }

  return (
    <div className="w-full h-full items-left justify-start p-4 flex flex-col gap-4">
      <div className="">
        {/* Tour Itinerary Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Tour Itinerary</h1>
        </div>

        {/* <Button auto icon={<span>✈️</span>} className="bg-red-500 text-white">
          Apr 1, 2024 TO Mar 31, 2025
        </Button>

        <div className="flex items-center justify-between">
          <p className="text-black mt-2">
            Itinerary is valid from <span className="font-bold">Apr 1, 2024</span> to <span className="font-bold">Mar 31, 2025</span> ✈️
          </p>
          <div className="mt-6 flex justify-end">
            <Button auto icon={<span>🖨️</span>} className="bg-red-500 text-white">
              Print
            </Button>
          </div>
        </div> */}


        {/* Itinerary Title */}
        <div className="flex items-center mt-2">
          <h2 className="text-2xl font-bold">{selectedPackage?.package_name}</h2>
          {/* <p color="secondary" className="ml-4 bg-black text-white font-bold rounded-md p-1 text-xl">HG</p> */}
        </div>

        {/* Itinerary Details */}
        <div className="bg-gray-50 p-6 mt-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="text-red-500">📅</span>
            <p className="text-gray-600 font-medium ml-2">
              <span className="font-bold">{selectedPackage?.tour_itinerary?.days} Days, {selectedPackage?.tour_itinerary?.nights} Nights</span>,
              <span className="ml-2 font-bold">{selectedPackage?.tour_itinerary?.cities} Cities</span>,
              <span className="ml-2 font-bold">1 Country</span>
            </p>
          </div>

          {/* Destination Details */}
          <div className="flex items-center mt-4">
            <span className="text-red-500 ml-1">📍</span>
            <div className="ml-3">
              <p className="text-gray-800">
                <span className="font-bold">{capitalizeFirstLetterOfEachWord(selectedPackage?.state)}:</span> {selectedPackage?.tour_itinerary?.state_description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-justify">
        <h2 className="text-2xl font-bold mb-4">Days Plan</h2>
        <div>
          <Accordion defaultSelectedKeys={"0"} selectionMode="multiple">
            {selectedPackage?.days_plan?.map((day, index) => (

              <AccordionItem
                key={index}
                subtitle={"click here"}
                aria-label={`Day ${day.day}`}
                title={
                  <div className="block items-center">
                    <div className="bg-red-500 text-white rounded-md w-20 h-10 flex items-center justify-center mr-3 p-1">
                      Day {day.day}
                    </div>
                    <h3 className="text-xl font-semibold pt-4">{day.city_name}</h3>
                  </div>
                }
              >
                <div className="px-4 py-2">
                  <p className="text-gray-600">{day.description}</p>
                  {day.extra && (
                    <p className="text-gray-600 font-semibold mt-2">
                      Extra Topping: <span className="font-normal">{day.extra}</span>
                    </p>
                  )}
                  <div className="flex mt-4 space-x-2 place-content-end">
                    {day.inclusions.map((meal, index) => (
                      <div key={index} className="flex items-center space-x-1 text-gray-500">
                        {/* <img
                          src={`/${meal.toLowerCase()}.png`}
                          alt={meal}
                          className="w-5 h-5"
                        /> */}
                        {
                          meal === "Dinner"
                            ? <span className='inline-flex'><Utensils className='w-4 h-4 mt-1' /> &nbsp;{"Dinner"}</span>
                            : ""
                        }
                        {
                          meal === "Breakfast"
                            ? <span className='inline-flex'><EggFried className='w-4 h-4 mt-1' /> &nbsp;{"Breakfast"}</span>
                            : ""
                        }
                        {
                          meal === "Lunch"
                            ? <span className='inline-flex'><CookingPot className='w-4 h-4 mt-1' /> &nbsp;{"Lunch"}</span>
                            : ""
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionItem>

            ))}
          </Accordion>
        </div>
        {/* <button aria-label="Collapse All" className="text-red-500 font-bold mt-4">Collapse All</button> */}
      </div>

      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-4">Tour Information</h1>

        {/* Notes Section */}
        {selectedPackage?.notes?.length > 0 && (
          <section className="mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Notes:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.notes.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}


        {/* Special Notes Section */}
        {selectedPackage?.special_notes?.length > 0 && (
          <section className="mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Special Notes:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.special_notes.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </section>
        )}



        {/* Our Speciality */}
        {selectedPackage?.our_speciality?.length > 0 && (
          <section className="mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Our Specialty:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.our_speciality.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </section>
        )}



        {/* Road Transport */}
        {/* {selectedPackage?.our_speciality?.length > 0 && (
          <section className="mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Road Transport:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.our_speciality.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </section>
        )} */}



        {/* Reporting & Dropping for Joining & Leaving Guests */}
        {/* {selectedPackage?.our_speciality?.length > 0 && (
          <section className="mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Reporting & Dropping for Joining & Leaving Guests:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.our_speciality.map((item, index) => (
                <li key={index}> 
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )} */}

        {/* Important Notes */}
        {selectedPackage?.important_notes?.length > 0 && (
          <section className="mb-2 w-full">
            <h2 className="text-xl font-semibold mb-2">Important Notes:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedPackage.important_notes.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}



      </div>
    </div >
  );
};

export default Tour;
