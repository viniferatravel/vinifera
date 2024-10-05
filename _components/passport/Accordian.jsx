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

                <div className="w-[95%] m-auto lg:grid grid-cols-2 gap-8 hidden">
                    <div>
                        <Accordion>
                            <AccordionItem key="1" aria-label="Accordion 1" title="1. How can I connect with your team for assistance?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    You can connect with our team through our website by clicking the "Contact Us" button, where you can request a call or chat with one of our executives. We also offer offline consultations at our designated centers.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="2" aria-label="Accordion 2" title="2. What services do you provide for visa and passport applications?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We provide comprehensive support for both visa and passport applications, including initial consultations, document verification, form filling, and guidance throughout the application process, both online and offline.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="3" aria-label="Accordion 3" title="3. What documents do I need to prepare for my application?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    The required documents may vary by visa type or passport service. Generally, you will need:
                                    <ul className="list-disc list-inside">
                                        <li>A valid passport</li>
                                        <li>Passport-sized photograph</li>
                                        <li>Proof of travel arrangements</li>
                                        <li>Financial statement</li>
                                        <li>Any additional documents specified by the relevant authority</li>
                                    </ul>
                                    Our executives will guide you on specific requirements during your consultation.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="4" aria-label="Accordion 4" title="4. Can I schedule a call with an executive?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Yes! You can easily schedule a call through our website. Simply fill out the request form, and one of our executives will reach out to you at your preferred time.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="5" aria-label="Accordion 5" title="5. How long does the entire visa or passport process take?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Processing times vary based on the type of visa or passport service requested. Typically, visa applications take 5 to 15 working days, while passport renewals may take around 10 days. Our team will provide you with estimated timelines during your consultation.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="6" aria-label="Accordion 6" title="6. What if my visa application is denied?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    If your application is denied, our executive will help you understand the reasons and guide you through the appeal process or reapplication steps to increase your chances of success.
                                </div>
                            </AccordionItem>

                        </Accordion>
                    </div>
                    <div>
                        <Accordion>
                            <AccordionItem key="7" aria-label="Accordion 7" title="7. Do you offer in-person consultations?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Yes, we provide in-person consultations at our designated centers. You can schedule an appointment with an executive who will assist you with your application process.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="8" aria-label="Accordion 8" title="8. How can I track my application status?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    You can track your application status by contacting our support team or through the online portal once your application is submitted. Our executives will keep you updated at every step of the process.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="9" aria-label="Accordion 9" title="9. What payment methods do you accept?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    We accept various payment methods, including credit/debit cards, net banking, and digital wallets. You can select your preferred method during the payment process.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="10" aria-label="Accordion 10" title="10. Is customer support available for my questions?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    Yes! Our customer support team is available via phone, email, and live chat to assist you with any questions or concerns regarding your visa or passport application.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="11" aria-label="Accordion 11" title="11. Can I make changes to my application after submission?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    If you need to make changes to your application, please contact our executive as soon as possible. Depending on the stage of your application, we will advise you on the best course of action.
                                </div>
                            </AccordionItem>

                            <AccordionItem key="12" aria-label="Accordion 12" title="12. What should I do if I need urgent assistance?">
                                <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                    If you require urgent assistance, please call our customer support hotline or request an immediate callback through our website. Our team will prioritize your request and assist you as quickly as possible.
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="w-[95%] m-auto grid grid-cols-1 lg:hidden">

                    <Accordion >
                        <AccordionItem key="1" aria-label="Accordion 1" title="1. How can I connect with your team for assistance?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                You can connect with our team through our website by clicking the "Contact Us" button, where you can request a call or chat with one of our executives. We also offer offline consultations at our designated centers.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Accordion 2" title="2. What services do you provide for visa and passport applications?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                We provide comprehensive support for both visa and passport applications, including initial consultations, document verification, form filling, and guidance throughout the application process, both online and offline.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="3" aria-label="Accordion 3" title="3. What documents do I need to prepare for my application?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                The required documents may vary by visa type or passport service. Generally, you will need:
                                <ul className="list-disc list-inside">
                                    <li>A valid passport</li>
                                    <li>Passport-sized photograph</li>
                                    <li>Proof of travel arrangements</li>
                                    <li>Financial statement</li>
                                    <li>Any additional documents specified by the relevant authority</li>
                                </ul>
                                Our executives will guide you on specific requirements during your consultation.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="4" aria-label="Accordion 4" title="4. Can I schedule a call with an executive?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes! You can easily schedule a call through our website. Simply fill out the request form, and one of our executives will reach out to you at your preferred time.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="5" aria-label="Accordion 5" title="5. How long does the entire visa or passport process take?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Processing times vary based on the type of visa or passport service requested. Typically, visa applications take 5 to 15 working days, while passport renewals may take around 10 days. Our team will provide you with estimated timelines during your consultation.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="6" aria-label="Accordion 6" title="6. What if my visa application is denied?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                If your application is denied, our executive will help you understand the reasons and guide you through the appeal process or reapplication steps to increase your chances of success.
                            </div>
                        </AccordionItem>
                        <AccordionItem key="7" aria-label="Accordion 7" title="7. Do you offer in-person consultations?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes, we provide in-person consultations at our designated centers. You can schedule an appointment with an executive who will assist you with your application process.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="8" aria-label="Accordion 8" title="8. How can I track my application status?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                You can track your application status by contacting our support team or through the online portal once your application is submitted. Our executives will keep you updated at every step of the process.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="9" aria-label="Accordion 9" title="9. What payment methods do you accept?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                We accept various payment methods, including credit/debit cards, net banking, and digital wallets. You can select your preferred method during the payment process.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="10" aria-label="Accordion 10" title="10. Is customer support available for my questions?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                Yes! Our customer support team is available via phone, email, and live chat to assist you with any questions or concerns regarding your visa or passport application.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="11" aria-label="Accordion 11" title="11. Can I make changes to my application after submission?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                If you need to make changes to your application, please contact our executive as soon as possible. Depending on the stage of your application, we will advise you on the best course of action.
                            </div>
                        </AccordionItem>

                        <AccordionItem key="12" aria-label="Accordion 12" title="12. What should I do if I need urgent assistance?">
                            <div className="w-full bg-[#f1f1f1] p-4 text-sm leading-relaxed">
                                If you require urgent assistance, please call our customer support hotline or request an immediate callback through our website. Our team will prioritize your request and assist you as quickly as possible.
                            </div>
                        </AccordionItem>
                    </Accordion>


                </div>
            </div>



        </>
    );
}

export default Accordian;
