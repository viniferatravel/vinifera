import React from 'react';

const Highlights = ({selectedPack}) => {

    const highlights = [
        { title: "Panchmarhi", description: "Saputara ki Rani" },
        { title: "Bhimbhetka", description: "A UNESCO site to see archaeological treasures in the form of cave painting that reveal the life story of pre-historic cave dwellers in India." },
        { title: "Sanchi Stupa", description: "One of the oldest stone structures & UNESCO World Heritage site." },
        { title: "Ujjain", description: "Mahakal Corridor one of its kind in India." },
        { title: "Manav Museum", description: "India’s greatest museum, exhibiting prehistorical landscapes and evidence of human settlement." },
        { title: "Indore", description: "Cleanest city of India." },
        { title: "Omkareshwar temple", description: "It is one of the 12 revered Jyotirlinga shrines of Shiva." },
        { title: "Maheshwar", description: "Famous for its sarees." }
    ];

    return (
        <section className="py-8 px-4 bg-white w-[95%]">
            <div className='ml-8'>
                <h2 className="text-3xl font-bold text-left text-gray-800 mb-8">Highlights</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedPack.highlights.map((highlight, index) => {
                        const [title, description] = highlight.split("-")
                        return (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>
                    )})}
                </div>
            </div>

        </section>
    );
};

export default Highlights;
