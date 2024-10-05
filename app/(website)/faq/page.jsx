"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import IMAGES from "@/public/image";
import { motion } from "framer-motion";
import Image from "next/image";

// FAQ data using an array of objects for the content
const faqData = [
  {
    title: "General Questions",
    questions: [
      {
        question: "What is generally the size of a tour group?",
        answer:
          "Generally the number of guests traveling varies depending on the destination. The average group size for World tours is between 40 to 47, and for Indian tours, it is between 28 to 56. However, for special tours like 'My Fair Lady' or 'Second Innings', the group size may exceed these numbers.",
      },
      {
        question: "Who would be my co-travelers?",
        answer:
          "Your co-travelers can be any individual, such as a professional C.A., Doctor, Teacher, Teenager, Artist, Politician, Businessperson, or people from any religion, region, or language. We assure you that when you return from your dream holiday, you'll have new friends.",
      },
      {
        question: "Will it be possible to extend my stay at a destination?",
        answer:
          "You can extend your stay if you inform us at the time of booking. Additional charges will apply. Extensions or alterations cannot be made once the tour is in progress.",
      },
      {
        question: "Can I avail just a part of the tour?",
        answer:
          "It is not advisable to do tours partly as you won't be able to experience your dream destinations fully. Our travel consultants will guide you on suitable tour options.",
      },
      {
        question: "Is the tour itinerary susceptible to last-minute changes?",
        answer:
          "We do not change the itinerary or date of the tour. However, in case of force majeure events, circumstances may require us to change the routing or date for your safety.",
      },
      {
        question:
          "Can I incorporate any changes in my travel plan once the booking is done?",
        answer:
          "Yes, you can modify your booking or travel plan. Certain charges may apply for modifications or for canceling and making new arrangements. Our travel consultants will assist you.",
      },
      {
        question: "Is there any refund against cancellation?",
        answer:
          "Cancellation will attract certain charges. The travel consultant will provide details at the time of booking, or you can request information on cancellation charges.",
      },
      {
        question: "What are my options if a tour receives less response?",
        answer:
          "Generally, we operate all tours. In cases where the number of bookings falls below the minimum required, we may offer options to merge the tour with another or opt for a customized package, though some services may not be provided.",
      },
      {
        question: "Do you provide Leave Travel Certificates?",
        answer:
          "Yes, we provide leave travel certificates, provided you inform us of your requirement at the time of booking.",
      },
      {
        question:
          "If I misplace my passport, what assistance will be provided?",
        answer:
          "While only one Tour Leader manages the group and follows the itinerary, you may need to stay behind while the group moves ahead. Assistance will be provided on a chargeable basis, including help with lodging a complaint or securing a Landing Certificate from the Indian Embassy.",
      },
      {
        question: "What is an e-ticket?",
        answer:
          "An e-ticket is a paperless electronic document with a unique confirmation number that replaces paper tickets. You may request a copy for forex or VISA formalities. In case of group tours, we issue e-tickets if required, but any changes at the airport can cause issues for the entire group!",
      },
    ],
  },
  {
    title: "Tour Price Discounts",
    questions: [
      {
        question: "What does the World tour price include?",
        answer:
          "The World tour price generally includes your travel arrangements, accommodation, all meals, sightseeing, entrance charges, visas, airport taxes, and Tour Leader services. For more information, refer to the tour inclusion section on the respective tour itinerary page on our website.",
      },
      {
        question: "What does the Indian tour price include?",
        answer:
          "The Indian tour price generally includes your accommodation, all meals, sightseeing, entrance charges, and Tour Leader services, but does not include your to and fro journey tickets. However, some Airport to Airport tours include everything. Refer to the tour inclusion section on the respective tour itinerary page on our website.",
      },
      {
        question: "Can I avail any early booking benefit?",
        answer:
          "Yes, you can get an advance booking discount by paying the full registration amount at the time of booking. Discounts are given on a first-come, first-served basis, with limited seats, periods, and tours. Full payment discounts may also be available for early payments made 60-300 days before departure.",
      },
      {
        question:
          "What benefits can Repeat Travelers and Senior Citizens expect?",
        answer:
          "Vinifera offers discounts for repeat guests and senior citizens, which vary by tour. The travel consultant will provide details when you book.",
      },
      {
        question: "What are the benefits of group bookings?",
        answer:
          "You are eligible for group discounts if you book for a group of more than 8 guests on the same day.",
      },
      {
        question:
          "Is there any age criteria for discounts? Do children also get discounts?",
        answer:
          "Discounts apply to all guests aged 2 and above for both World and Indian tours. An infant is defined as a guest under 2 years, while a child is between 2 and 12 years old.",
      },
      {
        question:
          "Why is there a difference in the price for an Infant and a Child on World tours?",
        answer:
          "Airlines have different fares for infants and children based on their age. Infant airfare is 10% of the adult fare, while child fares may be 75% or equal to adult fares, depending on the airline. Children aged 2 and above are also provided separate coach seats throughout the tour.",
      },
      {
        question:
          "Why is the World tour price quoted in Indian Rupees and Foreign currency?",
        answer:
          "This is because the tour incurs expenses in two currencies. Air tickets, visas, documentation, and some land arrangements are done in Indian Rupees, while foreign currency is used for expenses such as hotel bookings, meals, coaches, sightseeing, and entrance tickets abroad.",
      },
    ],
  },
  {
    title: "On Tour",
    questions: [
      {
        question: "What are the modes of travel on tour?",
        answer:
          "The modes of travel depend upon the tour which you book. Generally, we travel by Flight, Coach, Train, Cruise, Speed boat, Jet Foil, Cable Car, etc. as mentioned in the itinerary. For more information refer to the respective tour itinerary page.",
      },
      {
        question: "Are there any night journeys on tour?",
        answer:
          "For flights, we may have night journeys, but we normally avoid night journeys on tour as far as possible.",
      },
      {
        question: "How hectic is the pace of the tours?",
        answer:
          "We have a wide range of products designed as leisurely paced to medium paced to fast. Most of the tours are medium to fast pace as we cover maximum must-see sightseeing; we do not have optional sightseeing.",
      },
      {
        question: "Do we have to walk a lot on tours?",
        answer:
          "Generally, we have to walk at sightseeing places, amusement parks, and at the airports sometimes for a long distance; however, the same will be timely instructed by the Tour Leader.",
      },
      {
        question: "Do we have to wake up early on tours?",
        answer:
          "Unless otherwise specified by the Tour Leader for world tour, we normally follow a 6-7-8 schedule i.e., wake up at 6 am, breakfast at 7 am, and departure at 8 am. For Indian tours, it's a 7-8-9 schedule i.e., wake up at 7 am, breakfast at 8 am, and departure at 9 am. However, the schedule may change as per the situation.",
      },
      {
        question: "Do we get wake-up calls on tours?",
        answer:
          "Yes, you do get telephonic wake-up calls through the hotel automated system; however, it is advisable to have your mobile alarms set to be on the safer side.",
      },
      {
        question: "What if I reach late and miss a part of the tour?",
        answer:
          "Punctuality is of utmost importance when traveling in a group. We do not want you to miss any part of the tour so please be on time and always follow the Tour Leader's instructions. In case you miss any part of the tour, we are not responsible/liable, and no refund shall be given to you in this regard.",
      },
      {
        question:
          "What assistance is provided to a disabled person or a senior citizen, who needs special assistance on tour?",
        answer:
          "A qualified companion must accompany the guest who needs such special assistance as individual assistance cannot be given to such guest by the Tour Leader, considering he has to manage the entire group.",
      },
      {
        question:
          "Can I take a wheelchair on tour? Will it be difficult while visiting places?",
        answer:
          "Yes, you can bring your own wheelchair and move at most of the sightseeing places, but a qualified companion must accompany guests who are traveling on a wheelchair.",
      },
      {
        question: "Will I get drinking water during sightseeing?",
        answer:
          "In most of the countries, tap water is considered very safe and widely available. In case it is not so, wherever Vinifera provides the same is mentioned in the respective tour itinerary page on the website.",
      },
      {
        question: "Will I get some time for myself on the tour?",
        answer:
          "Group Tour Itineraries are designed and planned in such a way that you should get to see maximum places, so you will get time only when you are back at the hotel. However, if you wish to skip any sightseeing, then you have to inform the Tour Leader accordingly, but you shall not get any refund for such services which you have not availed at your own discretion.",
      },
      {
        question:
          "At a particular destination, can my relative join me on the tour?",
        answer:
          "Yes, your relative is always welcome. S/he can join us on tour subject to your intimation to us at the time of your booking and payment of prescribed charges to make him/her eligible to join our tour and avail our services on tour.",
      },
      {
        question: "Will Vinifera recommend me where to shop on a tour?",
        answer:
          "Our Tour Leader will provide information about the shopping areas on tour; however, s/he will not suggest/recommend/promote any particular shop, area, etc. to you.",
      },
      {
        question:
          "Can I use my credit card for shopping/personal expense while on an International tour?",
        answer:
          "Yes, you can use Internationally accepted Credit cards for shopping and personal expenses, but kindly cross-check with your Bank before effecting any transaction. We are not responsible/liable for any loss, fraud, damage, cheating, etc., if any occurs in such cases.",
      },
      {
        question:
          "How can I stay in touch with my family and friends on a World tour?",
        answer:
          "While on tour, you can be in touch with your family and friends through a local calling card or local sim card as you may deem fit and desirable. You have to carry your mobile handset. We are not responsible for any charges levied by the international local authorities neither shall we be responsible for loss of your mobile handset.",
      },
      {
        question:
          "What assistance is provided if I discontinue the scheduled tour on account of illness?",
        answer:
          "If you fall sick on tour, kindly inform the Tour Leader immediately. The Tour Leader will assist you in making all arrangements for medical aid, doctor on call, etc. However, the expenses will have to be borne by you. Here, insurance plays a major role hence we highly recommend that you should get yourself and your family insured adequately before travel.",
      },
      {
        question: "Can I get medicine on a World tour?",
        answer:
          "We highly recommend you to carry sufficient medicines along with you on tour. While packing, distribute them evenly in different bags to ensure that you have some medicine with you in case there is any delay in getting baggage or loss. However, you do get medicines on tour, but your doctor's prescription for the same is a must.",
      },
    ],
  },
  {
    title: "Indian Tours",
    questions: [
      {
        question: "Does Vinifera book our journey tickets for Indian tours?",
        answer:
          "Indian tour price does not include air or railway tickets. In case you wish to travel by rail, the tickets have to be booked by yourself. We book for your air travel only. However, we also have Air to Air tours where the tour price is inclusive of to and fro air ticket cost.",
      },
      {
        question:
          "If I book my own railway/air tickets, do I have to submit a copy to Vinifera?",
        answer:
          "If you book your own railway/air tickets, then the ticket details must be shared with the travel consultant.",
      },
      {
        question: "Will Vinifera assist for one way journey tickets?",
        answer:
          "Vinifera will assist you with one-way tickets for regular tours, but for Air to Air packages, guests have to take to and fro tickets. They cannot opt for only one-way tickets as the to & fro ticket fare is included in the tour price.",
      },
      {
        question: "How much baggage is allowed per ticket?",
        answer:
          "At present, depending upon the airline, most airlines are allowing 15 Kgs of Cargo bags per ticket and 05 Kgs of Handbag per ticket. In addition to hand baggage, one personal item like a laptop or ladies purse is allowed. However, due to security reasons for Jammu and Srinagar flights, the hand baggage also goes along with the check-in baggage, and only a laptop or digital camera is permitted inside the aircraft.",
      },
      {
        question: "Do I need to carry any ID proof while traveling?",
        answer:
          "Yes, all tourists traveling by air/rail for Indian tours have to carry photo identification proof in the form of a driving license, election ID card, PAN card, passport, and for students, their school/college ID card. Also, at certain sightseeing places in India, any identity proof (except PAN card) is a must, which is mentioned on the respective tour itinerary page on our website.",
      },
    ],
  },
  {
    title: "Coach",
    questions: [
      {
        question: "How is the seat allocation in the coach?",
        answer:
          "Seat numbers in the coach are allotted on a booking priority, first come first serve basis. Seat numbers 1, 2, 3, and 4 in each coach are reserved for the Tour Leader/Guide and are Premium seats. Further seat allocation is done as per the booking priority, and the same is informed by the Tour Leaders on tour.",
      },
      {
        question: "How can I get first seats in the coach?",
        answer:
          "You need to book as early as possible to get the first seats in the coach. However, for selected World tours, seat numbers 3 and 4 are reserved as premium seats, which can be booked subject to availability and at an additional cost. Premium seats cannot be availed if the tour is full.",
      },
      {
        question:
          "How many hours approximately is the road journey every day? Do we have frequent stops en route?",
        answer:
          "The road journey is completely dependent on the tour itinerary and the number of places covered. The driving distance varies for each tour, and you get sufficient halts during the journey.",
      },
    ],
  },
  {
    title: "Meals & Bererages",
    questions: [
      {
        question: "What type of meals are included on tour?",
        answer:
          "As per the tour itinerary requirement, there is a preset menu. We serve vegetarian food along with one non-vegetarian dish. Breakfast is continental, and meals are Indian with an occasional addition of fast/local food.",
      },
      {
        question: "Can I request for a special meal?",
        answer:
          "Yes, special meals like Jain meals (no onion, garlic), fasting meals, and baby meals can be arranged subject to prior intimation. For baby meals, we provide tin milk, plain dal, and rice during meals as per the itinerary. For in-between requirements, we recommend you carry sufficient baby food along with you.",
      },
      {
        question: "Do you have a cook or caravan facility on world tours?",
        answer:
          "For World tours, we generally have meals at Indian restaurants, as it gives you an opportunity to enjoy a different ambiance and is comfortable. At times, we do provide packed food depending on the itinerary.",
      },
      {
        question:
          "I am an avid tea consumer, do you have provision for the same?",
        answer:
          "You can have tea/coffee at the time of breakfast. Also, at various sightseeing places, we provide tea/coffee/ice cream/soft drinks, etc., which is mentioned in our itinerary under Extra Toppings. Vinifera also provides you instant tea/coffee sachets with which you can have tea/coffee in your room whenever you want for World Tours.",
      },
    ],
  },
  {
    title: "Documentation",
    questions: [
      {
        question: "Do I need a passport to travel?",
        answer: "Yes, a passport is mandatory for any international travel.",
      },
      {
        question:
          "If I do not have a passport, will Vinifera assist for the same?",
        answer:
          "If you do not have a passport, you can apply for it online at www.passportindia.gov.in if you are an Indian National; however, Vinifera does not assist with this.",
      },
      {
        question:
          "With my maiden name reflecting on the passport, can I book the tour with my married name?",
        answer:
          "It is important that the tour booking be done as per your name on the passport, as all further travel arrangements are booked accordingly. The passport is the only valid document abroad for verification.",
      },
      {
        question: "What is Visa and how should I obtain the Visa?",
        answer:
          "A VISA is a permission granted by the high commission or consulate of the country you wish to visit, short for Visitors Intending to Stay Abroad. For certain countries, you may need to attend a personal interview. Vinifera will assist you in filing the visa application, and the visa facilitation fees are included in the tour price.",
      },
      {
        question: "What is the possibility of getting a VISA?",
        answer:
          "The granting or non-granting of a Visa solely depends on the respective Consulate/Embassy. We assist you in filing the application for the Visa but do not assure or guarantee the Visa, as this is beyond our control.",
      },
      {
        question:
          "If due to Visa rejection I need to cancel my travel plan then do I get a refund?",
        answer:
          "Yes, you can get a refund after deducting the Visa application fees and any cancellation charges, if applicable.",
      },
      {
        question: "Do I need Overseas Travel insurance?",
        answer:
          "It is advisable to acquire adequate Overseas Travel Insurance cover for protection against possible risks such as damage, loss, accident, or injury to life while on tour. For Europe and Dubai tours, insurance is included in the tour price for those aged up to 59 years for the duration of the tour. Guests above 59 years of age will have to pay the difference on the insurance premium as applicable.",
      },
      {
        question:
          "If I extend my holiday after or before the scheduled tour, how about my Visas/Insurance?",
        answer:
          "The Visa or Insurance included in the tour price is only for the tour duration. For your extended holiday, we will process your Visa or Insurance accordingly; you just need to pay the difference.",
      },
    ],
  },
  {
    title: "Tour Leader",
    questions: [
      {
        question: "Does the Tour Leader assist us on the entire tour?",
        answer:
          "Yes, the Tour Leader will assist you throughout the tour, which is one of the USPs of Vinifera. However, they are not responsible for baggage or any kind of personal belongings.",
      },
      {
        question:
          "In which language will the Tour Leader communicate with us on tour?",
        answer:
          "The Tour Leader will preferably communicate or give instructions in Hindi and English.",
      },
      {
        question:
          "Generally, how many Tour Leaders are allotted to a group tour?",
        answer:
          "For World tours, there is 1 Tour Leader for the entire group, whereas for Indian Tours, there is 1 Tour Leader with 1 or 2 Tour Assistants depending on the group size.",
      },
    ],
  },
  {
    title: "Booking Payment",
    questions: [
      {
        question: "How many days prior to the tour should I do the booking?",
        answer:
          "We recommend you to book your tour at least 9 months prior to the scheduled departure date as most of our tours fill up 6 months in advance. For Indian tours, railway booking opens 120 days prior to the departure date. However, if you book early, you can avail of the advance booking discounts and priority in the coach.",
      },
      {
        question: "How can I book a tour?",
        answer:
          "You can book your tour at any of the Vinifera offices, Vinifera's Preferred Sales Agents, or Vinifera Franchisee. Refer to our world showcase for the listing of our offices and Preferred Sales Agents and Franchisee. If guests are residing out of India, they can book their tour online.",
      },
      {
        question: "What are the documents required to book a tour?",
        answer:
          "To book a world tour, you need a passport with 6 months validity subsequent to the scheduled departure date of the tour and sufficient blank pages for visa purposes. You also need to pay a registration amount depending on the tour price. For Indian Tours, identification proof and registration amount is required. For detailed information on the booking procedure, click here.",
      },
      {
        question:
          "Do I need to pay the entire tour price lump-sum while booking?",
        answer:
          "If you pay the tour price at one go 60 days prior to departure, then you benefit from a full payment discount. It is not mandatory, though; you can pay the registration amount to book and pay the balance payment later.",
      },
      {
        question: "If I am an NRI, can I book your regular Indian tour?",
        answer:
          "Yes, NRIs can book any of Vinifera's Indian Tours. We have a separate NRI tour price in USD for all Indian tours. Kindly refer to the Tour Price section of the respective tour itinerary page.",
      },
      {
        question:
          "Can my son/daughter residing abroad sponsor my tour by paying in their currency? If yes, then how?",
        answer:
          "Yes, they can pay the same by Telegraphic Wire transfer but only in USD, Euro, and AUD currency. Any transaction charges levied by the bank will be borne by you or your son/daughter.",
      },
    ],
  },
  {
    title: "Post Booking",
    questions: [
      {
        question: "How can I check my payment and billing details?",
        answer:
          "You can check your billing and tour-related information online. For the same, click here. Then, type your login ID, which is your tour code and form number, and the password is printed on your payment receipt.",
      },
      {
        question: "Prior to tour departure, is there any information provided?",
        answer:
          "We provide a pre-departure information sheet once you book a tour, which consists of information about the destination, things to carry, weather, shopping, etc. It is also available on the website under post-booking information.",
      },
      {
        question: "Do we get any confirmation call of our scheduled departure?",
        answer:
          "Yes, 2 to 3 days prior to your scheduled departure, we give a call to inform you about the reporting time and place.",
      },
      {
        question:
          "Once we are on tour, are our relatives informed about our safety?",
        answer:
          "Once you reach the first destination, we inform your relatives through an SMS to the number provided by you while booking the tour. Additionally, we provide 2 sets of the hotel list so that one copy is kept with your relatives, allowing them to contact you at the hotel directly.",
      },
    ],
  },
  {
    title: "Refund",
    questions: [
      {
        question: "How can I use my refund amount for Future Tour?",
        answer:
          "A Future Tour Discount Letter (FTDL) is a better option compared to a refund as it fetches more benefits to you. It can be used for any tour and is transferable to your blood relatives, upon provision of NOC.",
      },
      {
        question: "After paying once, will I get a refund of the tour cost?",
        answer:
          "In case of cancellation of your tour by the Company, you will get a refund of the actual amount paid by you. However, if you cancel the tour, cancellation charges will be applicable as per the cancellation policy outlined below:\n\n**World Tours**:\n- More than 60 days: Registration amount\n- 60 - 46 days: 15.00%\n- 45 - 31 days: 25.00%\n- 30 - 15 days: 50.00%\n- 14 - 04 days: 60.00%\n- 03 - 01 days: 80.00%\n- On the day of departure: 100.00%\n- On tour: 100.00%\n\n**Indian Tours**:\n- More than 60 days: 5% or ₹1000, whichever is higher\n- 60 - 46 days: 15.00%\n- 45 - 31 days: 25.00%\n- 30 - 15 days: 40.00%\n- 14 - 04 days: 60.00%\n- 03 - 01 days: 80.00%\n- On the day of departure: 100.00%\n- On tour: 100.00%\n\nThese charges apply on the Tour Price (INR + Forex) excluding discounts.",
      },
      {
        question: "Is the Registration amount refundable?",
        answer:
          "The Registration amount paid at the time of booking is non-refundable and interest-free. However, to ensure your booking at the given price and allowed discount, you need to pay the entire amount of the initial deposit in the stipulated timeline.",
      },
      {
        question:
          "Can I transfer my Refund amount to any other tour or to my friend's or relative's tour?",
        answer:
          "Yes, your refund amount is transferable to your other tour. If you want your refund amount to be transferred to your friend's or relative's tour, we'll need a duly signed Authority Letter from you.",
      },
      {
        question:
          "Is my refund amount adjustable against any part-cancellation?",
        answer:
          "No, the refund amount is not adjustable against part cancellation.",
      },
      {
        question: "How much time does it usually take to process a refund?",
        answer:
          "Ideally, it takes 4 - 5 working days to process refunds once the guest agrees on the refund amount. However, to derive the best amount of refund, it may take additional operational time to deal with airlines, hoteliers, etc.",
      },
      {
        question: "What is the mode of payment in case of refund?",
        answer:
          "The refund amount is credited using the same mode of payment that you used to book the tour. If you used Cash/Demand Draft, the refund will be made via 'Account Payee' cheque only. For Credit Card payments, the transaction would be reversed accordingly, considering that bank charges/service charges on Credit Card payments are non-refundable.",
      },
      {
        question:
          "Are online refunds possible? If yes, what's the process and who will bear the transaction cost?",
        answer:
          "Yes, online refunds are possible if the booking was done online. If Vinifera cancels the tour for any reason, the entire tour cost will be refunded.",
      },
    ],
  },
];

const FAQ = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
  return (
    <div>
      <div className="relative h-[70vh] w-full">
        <Image
          src={IMAGES.faq}
          alt="contact-landing"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0  w-full h-full flex justify-center items-center">
          <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-center items-start gap-10">
            <h1 className="text-white text-3xl lg:text-5xl flex flex-col gap-2">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                Frequently Asking
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-themeColor px-1 py-3 "
              >
                Questions
              </motion.span>
            </h1>
            <div className="w-[70%] lg:w-1/3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white"
              >
                Choosing the right group tour involves various factors,
                including selecting the tour and booking. Our FAQ section
                addresses your questions to ensure a smooth travel experience.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto flex flex-col lg:flex-row gap-5 lg:gap-8 my-10">
        <motion.div initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={sectionVariants} className="flex w-full lg:w-[40%] lg:h-[500px] h-[300px] lg:sticky top-20 ">
          <Image
            src={IMAGES.faqicon}
            alt="contact-landing"
            width={300}
            height={300}
            className="object-scale-down w-full h-full"
          />
        </motion.div>
        <div className="flex w-full lg:w-[60%] flex-col gap-8">
          <h2 className="text-2xl px-5 font-semibold">FAQs</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants}
          >
            <Accordion variant="splitted">
              {faqData.map((section, sectionIndex) => (
                <AccordionItem
                  key={sectionIndex}
                  aria-label={section.title}
                  title={section.title}
                  className="font-bold text-red-500"
                >
                  <ul className="flex flex-col gap-5 p-5" role="list">
                    {section.questions.map((item, itemIndex) => (
                      <li
                        className="list-decimal p-2 font-bold text-black"
                        key={itemIndex}
                        role="listitem"
                      >
                        <strong>{item.question}</strong>
                        <br />
                        <span className="text-base font-normal text-gray-500">
                          {item.answer}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
