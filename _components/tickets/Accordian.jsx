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

                <h3 className='w-full lg:w-[60%] m-auto text-center mt-8 mb-16'>
                    For questions about passports and visas, please check the sections below for helpful information and resources. 
                    If you need further assistance, feel free to contact our support team!
                </h3>

                <div className="w-[95%] m-auto lg:grid grid-cols-2 gap-8 ">
                    <div>
                        <Accordion>
                            <AccordionItem key="1" aria-label="Accordion 1" title="1. What types of bookings can I make through this website?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    You can book a variety of travel options, including:
                                    <ul className="list-disc list-inside">
                                        <li>Flight bookings</li>
                                        <li>Train reservations</li>
                                        <li>Car rentals</li>
                                        <li>Bus tickets</li>
                                    </ul>
                                    We provide a comprehensive platform to meet all your travel needs.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="2" aria-label="Accordion 2" title="2. How does the booking inquiry process work?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    To inquire about a booking, simply fill out the inquiry form on our website with your travel details. 
                                    Once submitted, our team will reach out to you via WhatsApp or your preferred communication method to assist you further.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="3" aria-label="Accordion 3" title="3. What information do I need to provide for an inquiry?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Please provide the following information to help us assist you better:
                                    <ul className="list-disc list-inside">
                                        <li>Travel dates and times</li>
                                        <li>Preferred departure and arrival locations</li>
                                        <li>Number of passengers</li>
                                        <li>Any specific requirements (e.g., class of service, car type)</li>
                                    </ul>
                                </div>
                            </AccordionItem>

                            <AccordionItem key="4" aria-label="Accordion 4" title="4. Can I customize my travel itinerary?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Yes! You can customize your itinerary by specifying your preferences in the inquiry form, 
                                    and we’ll work with you to create a tailored travel plan.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="5" aria-label="Accordion 5" title="5. What payment methods do you accept?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We accept a variety of payment options for your convenience, including:
                                    <ul className="list-disc list-inside">
                                        <li>Credit and debit cards</li>
                                        <li>Bank transfers</li>
                                        <li>Digital wallets (UPI, Paytm, etc.)</li>
                                    </ul>
                                    You will receive payment details during the confirmation process.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="6" aria-label="Accordion 6" title="6. How will I receive my booking confirmation?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Once your booking is confirmed, you will receive a confirmation via email or your preferred messaging platform. 
                                    This will include all necessary details and your itinerary.
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div>
                        <Accordion>
                            <AccordionItem key="7" aria-label="Accordion 7" title="7. What should I do if I need to change or cancel my booking?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    If you need to make changes or cancel your booking, please contact us as soon as possible. 
                                    Our team will assist you with the process based on the specific policies related to your booking.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="8" aria-label="Accordion 8" title="8. Are there any additional fees for your services?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We strive to be transparent with our pricing. Any applicable service fees will be communicated upfront during the inquiry process. 
                                    There are no hidden charges.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="9" aria-label="Accordion 9" title="9. Do you offer travel insurance options?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Yes, we can assist you in obtaining travel insurance to protect your trip against unforeseen events. 
                                    Inquire during your booking process for more information.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="10" aria-label="Accordion 10" title="10. How can I contact customer support if I have questions?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    You can reach our customer support team via:
                                    <ul className="list-disc list-inside">
                                        <li>The inquiry form on our website</li>
                                        <li>Direct messaging through WhatsApp</li>
                                        <li>Email: travel@viniferaa.com</li>
                                    </ul>
                                    We’re here to help you with any questions or concerns!
                                </div>
                            </AccordionItem>

                            <AccordionItem key="11" aria-label="Accordion 11" title="11. What safety measures are in place for travel bookings?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We prioritize your safety by ensuring all travel providers adhere to health and safety guidelines. 
                                    This includes sanitation protocols for vehicles and accommodations.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="12" aria-label="Accordion 12" title="12. How do you ensure the best prices for bookings?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We work with multiple travel partners and aggregators to provide competitive pricing. 
                                    Our team continuously monitors rates to ensure you receive the best deals available.
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
