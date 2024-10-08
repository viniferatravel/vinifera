import { Accordion, AccordionItem } from "@nextui-org/react";

const Accordian = () => {
    return (
        <>
            <div className="w-[95%] m-auto lg:mt-5 mb-5 xl:mt-10">
                <div className='flex justify-center items-center mb-5'>
                    <div className=' inline-block text-center'>
                        <h2 className='text-center font-bold text-xl lg:text-3xl text-gray-600'>FAQS</h2>
                        <div className='border-2 w-full rounded-full mt-1 border-themeColor'> 
                        </div>
                    </div>
                </div>

                <h3 className='w-full lg:w-[60%] m-auto text-center mt-8 mb-16'>For questions about passports and visas, please check the sections below for helpful information and resources. If you need further assistance, feel free to contact our support team!</h3>

                <div className="w-[95%] m-auto lg:grid grid-cols-2 gap-8 ">
                    <div>
                        <Accordion>
                            <AccordionItem key="1" aria-label="Accordion 1" title="1. What types of travel packages do you offer?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                We provide a wide range of travel packages designed specifically for corporate clients, including:

                                <ul className="list-disc list-inside">
                                        <li>Team-building retreats</li>
                                        <li>Client incentive trips</li>
                                        <li>Corporate meetings and conferences</li>
                                        <li>Customized leisure excursions Each package can be tailored to meet your specific needs and preferences.</li>
                                    </ul>
                                </div>
                            </AccordionItem>

                            <AccordionItem key="2" aria-label="Accordion 2" title="2. How can I book a travel package?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Booking is simple! Browse our travel packages, select your preferred option, and complete the online booking form. Our team will review your request and reach out to finalize the details and confirm your reservation.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="3" aria-label="Accordion 3" title="3. What payment methods are accepted?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                We accept various payment methods for your convenience, including:
                                    <ul className="list-disc list-inside">
                                        <li>Credit and debit cards</li>
                                        <li>Bank transfers</li>
                                        <li>UPI and other digital payment options You can choose your preferred method during checkout.</li>
                                       
                                    </ul>

                                </div>
                            </AccordionItem>

                            <AccordionItem key="4" aria-label="Accordion 4" title="4. Can I customize my travel package?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Absolutely! We understand that each corporate trip is unique. You can customize your package by adding specific destinations, activities, and accommodations. Just let us know your requirements, and we’ll create a tailored itinerary for you.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="5" aria-label="Accordion 5" title="5. What is your cancellation policy?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Our cancellation policy allows for cancellations up to [insert number of days] days before departure for a full refund. Please refer to our detailed terms and conditions for specific guidelines regarding cancellations and refunds.
                                </div>
                            </AccordionItem>

                            <AccordionItem  className=" border-b lg:border-none" key="6" aria-label="Accordion 6" title="6. Do you offer travel insurance?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes, we offer travel insurance options to protect your trip from unforeseen circumstances. You can select this option during the booking process for added peace of mind.

                                </div>
                            </AccordionItem>

                        </Accordion>
                    </div>
                    <div>
                        <Accordion>
                            <AccordionItem key="7" aria-label="Accordion 7" title="7. How can I contact customer support?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Our dedicated customer support team is here to help! You can reach us via:
                                <ul className="list-disc list-inside">
                                        <li>Phone: 1800 000 000</li>
                                        <li>Email: travels@viniferaa.com</li>
                                        <li>Live chat on our website during business hours We’re available [insert hours of operation] to assist you with any queries.</li>
                                       
                                    </ul>
                                </div>
                            </AccordionItem>

                            <AccordionItem key="8" aria-label="Accordion 8" title="8. Are your travel packages suitable for large groups?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes! We specialize in corporate travel for groups of all sizes. Please provide us with your group details, and we’ll design a package that meets your needs.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="9" aria-label="Accordion 9" title="9. What safety measures are in place for COVID-19?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Your safety is our priority. We follow all recommended health and safety protocols, including:

                                <ul className="list-disc list-inside">
                                        <li>Regular sanitization of vehicles and accommodations</li>
                                        <li>Compliance with local health guidelines</li>
                                        <li>Flexible booking options Stay informed by checking our COVID-19 updates section.</li>
                                       
                                    </ul>
                                </div>
                            </AccordionItem>

                            <AccordionItem key="10" aria-label="Accordion 10" title="10. Can I receive a quote before booking?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes, you can request a detailed quote by filling out our inquiry form with your travel preferences. Our team will respond promptly with a customized quote tailored to your needs.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="11" aria-label="Accordion 11" title="11. Do you provide local guides during trips?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes, all our packages include experienced local guides who provide valuable insights and enhance your travel experience. They ensure you make the most of your trip.

                                </div>
                            </AccordionItem>

                            <AccordionItem key="12" aria-label="Accordion 12" title="12. What if I have special requests, like dietary restrictions or accessibility needs?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                We are committed to accommodating your needs. Please inform us of any special requests at the time of booking, and we’ll do our best to ensure a comfortable experience for everyone.
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

               
            </div>



        </>
    );
}

export default Accordian;
