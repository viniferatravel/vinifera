import React from 'react';
import { Dot } from "lucide-react"

const Notes = ({ selectedPack }) => {

    return (
        <section className="py-8 px-4 bg-white w-[95%]">
            <div className='ml-8'>
                <h2 className="text-3xl font-bold text-left text-gray-800 mb-8">Notes</h2>
                <div className="max-w-4xl mx-auto">
                    <ul className="list-none space-y-2 text-md">
                        {selectedPack?.notes?.map((highlight, index) => {
                            return (
                            <li key={index} className="inline-flex gap-2 items-center justify-left w-full text-justify"><div><Dot color="black" className="h-5"/></div> {highlight}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </section>
    );
};

export default Notes;
