"use client";
import React, { useEffect, useState } from "react";
import CardCarousel from "@/_components/packages/CardCarousel";
import Carousel from "@/_components/Carousel";
import PriceCard from "@/_components/packages/PriceCard";
import Places from "@/_components/packages/Places";
import SelectMonth from "@/_components/packages/SelectMonth";
import TravelGuide from "@/_components/packages/TravelGuide";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

const faqData = [
  {
    id: 1,
    category: "Indian Tours",
    question: "Does Vinifera book our journey tickets for Indian tours?",
    answer:
      "Indian tour price does not include air or railway tickets. In case you wish to travel by rail, the tickets have to be booked by yourself. We book for air travel only. However, we also have Air to Air tours where the tour price includes both to and fro air ticket costs.",
  },
  {
    id: 2,
    category: "Indian Tours",
    question:
      "If I book my own railway/air tickets, do I have to submit a copy to Vinifera?",
    answer:
      "If you book your own tickets, you are required to submit the copies before the trip starts to ensure seamless coordination.",
  },
  {
    id: 3,
    category: "International Tours",
    question: "Will Vinifera assist for one way journey tickets?",
    answer:
      "Yes, Vinifera can assist in booking one-way journey tickets upon request.",
  },
  {
    id: 4,
    category: "Tour Price Discounts",
    question: "How much baggage is allowed per ticket?",
    answer:
      "The baggage allowance per ticket depends on the airline or railway guidelines, which will be informed during the booking.",
  },
  {
    id: 5,
    category: "General Questions",
    question: "Do I need to carry any ID proof while traveling?",
    answer:
      "Yes, you must carry a government-issued ID proof while traveling for security and verification purposes.",
  },
  {
    id: 5,
    category: "General Questions",
    question: "Who would be my co-travelers ?",
    answer:
      "Your co-travelers can be any individual, right from a professional C.A or Doctor to a teacher, a teenager, an artist, a politician, businessman, people of any religion, from any region, any language etc. When you return from your dream holiday, we assure you that there will be additions to your friends list.",
  },
  {
    id: 6,
    category: "General Questions",
    question: "Do you provide Leave Travel Certificate?",
    answer:
      "We do provide the leave travel certificate, subject to your intimation to us about your requirement at the time of booking the tour itself.",
  },
  {
    id: 7,
    category: "General Questions",
    question: "Is there any refund against cancellation?",
    answer:
      "Cancellation of tour will attract certain cancellation charges. The travel consultant will give you the details about such cancellation at the time of booking or for more information on cancellation charges.",
  },
];

const questionCategory = [
  "General Questions",
  "Tour Price Discounts",
  "On Tour",
  "Indian Tours",
  "Coach",
  "Meals & Beverages",
  "Documentation",
  "Tour Leader",
];

const Packages = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  // const package_id = searchParams.get("id");

  const [ package_id, setPackageId ] = useState(decodeURIComponent(params.slug));

  const [allPackages, setAllPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({});

  const [ selectedPackageReviews, setSelectedPackageReviews ] = useState([]);

  const [selectedQuestionCategory, setSelectedQuestionCategory] =
    useState("General Questions");

  const filteredFAQs = faqData.filter(
    (faq) => faq.category === selectedQuestionCategory
  );

  useEffect(() => {
    if(params.slug){
        const decodevalue = decodeURIComponent(params.slug);
        setPackageId(decodevalue)
    }
}, [params.slug])

  useEffect(() => {
    const abc = async () => {
      const response = await fetch(`/api/packageApi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setAllPackages(result.result);
      setSelectedPackage(
        result.result.find((pack) => pack.package_id === package_id)
      );


      const response1 = await fetch(`/api/reviewApi?id=${package_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result1 = await response1.json();

      setSelectedPackageReviews(result1.result1)
    };

    abc();
  }, []);

  useEffect(() => {
    try {
      // console.log(
      //   "allPackages selectedPackage: ",
      //   allPackages,
      //   selectedPackage
      // );
    } finally {
      setLoading(false);
    }
  }, [allPackages, selectedPackage]);

  return (
    <>
      <div className="w-[95%] mx-auto flex flex-col gap-5 my-10">
        {/* <CardCarousel/> */}

        {/* left side  */}
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          <div className="lg:col-span-2 flex  gap-5">
            {loading ? (
              <CarouselLoader />
            ) : (
              <Carousel selectedPackage={selectedPackage} />
            )}
          </div>

          <div className="flex flex-col gap-5 lg:gap-8 lg:px-5">
            {loading ? (
              <PriceCardLoader />
            ) : (
              <PriceCard selectedPackage={selectedPackage} />
            )}
            <div className="lg:hidden flex flex-col gap-5 lg:gap-8 py-5 lg:p-5 ">
              <div className="col-span-1 bg-white sticky top-20  overflow-y-auto">
                {/* <SelectMonth /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col  gap-5">
            <Places selectedPackage={selectedPackage} />
            <TravelGuide selectedPackage={selectedPackage} selectedPackageReviews={selectedPackageReviews}/>
          </div>

          {/* right side  */}

          <div className="hidden lg:flex flex-col gap-5 lg:gap-8 py-5 lg:p-5 ">
            <div className="col-span-1 bg-white sticky top-20 h-screen  overflow-y-auto">
              <SelectMonth />
            </div>
          </div>
        </div>

        <div className="mt-2 w-full lg:w-[65%]">
          <div className="text-xl font-bold">Frequently Asked Questions</div>
          <div className="mt-4">
            <div className="w-full">
              {/* FAQ Section */}
              <div className="w-full">
                <Autocomplete
                  variant="bordered"
                  placeholder="Select Category"
                  className="w-full"
                  selectedKey={selectedQuestionCategory}
                  onSelectionChange={setSelectedQuestionCategory}
                >
                  {questionCategory.map((item, index) => (
                    <AutocompleteItem key={item}>{item}</AutocompleteItem>
                  ))}
                </Autocomplete>

                {/* Accordion for FAQs */}
                <div className="mt-4">
                  <Accordion isCompact>
                    {filteredFAQs?.map((item, index) => {
                      return (
                        <AccordionItem
                          key={index}
                          title={
                            <div className="flex text-md font-bold pt-3 pr-3 pb-3">
                              {item.question}
                            </div>
                          }
                        >
                          <p className="text-gray-600">{item.answer}</p>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;

const CarouselLoader = () => {
  return (
    <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden bg-gray-200 animate-pulse"></div>
  );
};

// SkeletonLoader.js
const PriceCardLoader = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
        <div className="flex gap-10">
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          <div className="flex items-center">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded ml-2"></div>
          </div>
        </div>
      </div>

      <div className="border shadow-md rounded-xl w-full p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-base h-4 w-1/2 bg-gray-200 rounded"></p>
          <h2 className="text-3xl font-semibold h-8 bg-gray-200 rounded"></h2>
          <div className="flex items-center gap-5">
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-3">
            <div className="flex justify-center items-center">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
